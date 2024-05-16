import pulumi
import json
import pulumi_aws as aws
import pulumi_aws_apigateway as apigateway

#vpc = aws.ec2.Vpc("vpc", cidr_block="10.0.0.0/16")
#subnets = aws.ec2.get_subnets(filters=[{"name": "vpc-id", "values": [vpc.id]}])
#sids = subnets.ids
# Export the list of subnet IDs
#pulumi.export('subnet_ids', sids)

# subnet_group = aws.rds.SubnetGroup("rds_subnet_group", subnet_ids=sids)

lambda_sg = aws.ec2.SecurityGroup("lambdaSG",
	egress=[{
		"protocol": "tcp",
		"from_port": 3306,
		"to_port": 3306,
		"cidr_blocks": ["0.0.0.0/0"]
	}]
)

rds_sg = aws.ec2.SecurityGroup("rdsSG")
aws.ec2.SecurityGroupRule("rdsIngress",
	type='ingress',
	security_group_id=rds_sg.id,
	from_port=3306,
	to_port=3306,
	protocol='tcp',
	source_security_group_id=lambda_sg.id
)
#aws.ec2.SecurityGroupRule("rdsIngressTotal",
#	type='ingress',
#	security_group_id=rds_sg.id,
#	from_port=0,
#	to_port=65535,
#	protocol='tcp',
#	source_security_group_id=lambda_sg.id
#)

#rds_sg = aws.ec2.SecurityGroup("rdsSG",
#	ingress=[{
#		"protocol": "tcp",
#		"from_port": 3306,
#		"to_port": 3306,
#		"cidr_blocks": ["0.0.0.0/0"],
#		"source_security_group_id": lambda_sg.id
#	}]
#)

rds_instance = aws.rds.Instance('mysql',
	multi_az=False,
    allocated_storage=10,
    storage_type="gp2",
    engine="mysql",
    instance_class="db.t3.micro",
    db_name="mydb",
    username="mysqladmin",
    password="mypassword",
	vpc_security_group_ids=[rds_sg.id],
    skip_final_snapshot=True
)


snet_group_name = rds_instance.db_subnet_group_name
snet_group = aws.rds.SubnetGroup.get("rds_subnet_group", snet_group_name)

#snet_id  = snet_group.subnet_ids[0]
#pulumi.export("snet_id", snet_id)
#snet = aws.ec2.get_subnet(id=snet_id)
#vpc_id = snet.vpc_id
#pulumi.export("vpc", vpc_id)

lambda_role = aws.iam.Role("lambdaRole",
    assume_role_policy="""{
        "Version": "2012-10-17",
        "Statement": [{
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {"Service": "lambda.amazonaws.com"}
        }]
    }""")

# Attach the AWSLambdaVPCAccessExecutionRole policy
aws.iam.RolePolicyAttachment('lambdaVPCAccessExecutionRole',
    role=lambda_role.name,
    policy_arn='arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole')

# Attach the AWSLambdaFullAccess policy
aws.iam.RolePolicyAttachment('lambdaFullAccess',
    role=lambda_role.name,
    policy_arn='arn:aws:iam::aws:policy/AWSLambda_FullAccess')

# Attach the AmazonRDSFullAccess policy
aws.iam.RolePolicyAttachment('rdsFullAccess',
    role=lambda_role.name,
    policy_arn='arn:aws:iam::aws:policy/AmazonRDSFullAccess')



migrate_function = aws.lambda_.Function('dbMigrate',
    runtime="python3.8",
    code=pulumi.FileArchive("./create_db"),
    handler="handler.handler",
    role=lambda_role.arn,
    environment=aws.lambda_.FunctionEnvironmentArgs(
        variables={
           "DB_ENDPOINT": rds_instance.endpoint,
           "DB_USER": "mysqladmin",
           "DB_PASS": "mypassword",
           "DB_NAME": "mydb"
        }
    ),
	vpc_config=aws.lambda_.FunctionVpcConfigArgs(
		subnet_ids=snet_group.subnet_ids,
		security_group_ids=[lambda_sg.id]
	)
)

invoke_lambda = aws.lambda_.Invocation("invokeMyFunction",
    function_name=migrate_function.name,
    input=json.dumps({"payload": "your-payload"}),  # Change the payload as per your function's requirement
    qualifier=migrate_function.version)
pulumi.export('lambda_invocation_response', invoke_lambda.result)

# API
filter_jobs_handler = aws.lambda_.Function('filterJobs',
    runtime="python3.8",
    code=pulumi.FileArchive("./filter_jobs"),
    handler="handler.handler",
    role=lambda_role.arn,
    environment=aws.lambda_.FunctionEnvironmentArgs(
        variables={
           "DB_ENDPOINT": rds_instance.endpoint,
           "DB_USER": "mysqladmin",
           "DB_PASS": "mypassword",
           "DB_NAME": "mydb"
        }
    ),
	vpc_config=aws.lambda_.FunctionVpcConfigArgs(
		subnet_ids=snet_group.subnet_ids,
		security_group_ids=[lambda_sg.id]
	)
)

api_gateway = aws.apigatewayv2.Api("apiGateway", protocol_type="HTTP")

# Create a Lambda permission to allow the API Gateway to invoke the function
lambda_permission = aws.lambda_.Permission("lambdaPermission",
    action="lambda:InvokeFunction",
    function=filter_jobs_handler.name,
    principal="apigateway.amazonaws.com",
    source_arn=api_gateway.execution_arn.apply(lambda arn: arn + "/*/*")
)

integration = aws.apigatewayv2.Integration("myIntegration",
    api_id=api_gateway.id,
    integration_type="AWS_PROXY",  # Choose from HTTP, HTTP_PROXY, AWS, AWS_PROXY
    integration_method="GET",     # Use appropriate HTTP method
    integration_uri=filter_jobs_handler.arn, # Replace with your Lambda ARN
)

# Create a route for the API Gateway
api_gateway_route = aws.apigatewayv2.Route("apiGatewayRoute",
    api_id=api_gateway.id,
    route_key="GET /jobs",
    target=pulumi.Output.concat("integrations/", integration.id)
)



# Deploy the API Gateway
api_gateway_deployment = aws.apigatewayv2.Deployment("apiGatewayDeployment",
    api_id=api_gateway.id,
    opts=pulumi.ResourceOptions(depends_on=[api_gateway_route]),
	triggers={"redeployment": pulumi.Output.all(api_gateway_route.route_key).apply(lambda x: str(x))}
)

# Create a stage to expose the REST API
api_gateway_stage = aws.apigatewayv2.Stage("apiGatewayStage",
    api_id=api_gateway.id,
    deployment_id=api_gateway_deployment.id,
    name="prod"
)

# Export the API Gateway endpoint URL
pulumi.export('api_gateway_url', api_gateway_stage.invoke_url)

# Create an API Gateway Rest API.
# api = apigateway.RestAPI("api",
# 	routes=[
# 		apigateway.RouteArgs(path="/get_jobs",
# 							method=apigateway.Method.GET,
# 							event_handler=filter_jobs_handler)
# 	]
# )
# 
# pulumi.export("api_url", api.url)

