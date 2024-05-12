#"""An AWS Python Pulumi program"""
#
#import pulumi
#import pulumi_aws_native as aws_native
#
#user_pool = aws_native.cognito.UserPool("default",
#    account_recovery_setting=aws_native.cognito.UserPoolAccountRecoverySettingArgs(
#        recovery_mechanisms=[aws_native.cognito.UserPoolRecoveryOptionArgs(
#            name="verified_email",
#            priority=1,
#        )],
#    ),
#    admin_create_user_config=aws_native.cognito.UserPoolAdminCreateUserConfigArgs(
#        allow_admin_create_user_only=False,
#        unused_account_validity_days=7,
#    ),
#    alias_attributes=[],
#    auto_verified_attributes=["email"],
#    deletion_protection="ACTIVE",
#    email_configuration=aws_native.cognito.UserPoolEmailConfigurationArgs(
#        email_sending_account="COGNITO_DEFAULT",
#    ),
#    lambda_config=aws_native.cognito.UserPoolLambdaConfigArgs(),
#    mfa_configuration="OFF",
#    policies=aws_native.cognito.UserPoolPoliciesArgs(
#        password_policy=aws_native.cognito.UserPoolPasswordPolicyArgs(
#            minimum_length=8,
#            require_lowercase=True,
#            require_numbers=True,
#            require_symbols=False,
#            require_uppercase=True,
#            temporary_password_validity_days=7,
#        ),
#    ),
#    schema=[
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="profile",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="address",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="birthdate",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="10",
#                min_length="10",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="gender",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="preferred_username",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="Number",
#            developer_only_attribute=False,
#            mutable=True,
#            name="updated_at",
#            number_attribute_constraints=aws_native.cognito.UserPoolNumberAttributeConstraintsArgs(
#                min_value="0",
#            ),
#            required=False,
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="website",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="picture",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="identities",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=False,
#            name="sub",
#            required=True,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="1",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="phone_number",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="Boolean",
#            developer_only_attribute=False,
#            mutable=True,
#            name="phone_number_verified",
#            required=False,
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="zoneinfo",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="locale",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="email",
#            required=True,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="Boolean",
#            developer_only_attribute=False,
#            mutable=True,
#            name="email_verified",
#            required=False,
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="given_name",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="family_name",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="middle_name",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="name",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#        aws_native.cognito.UserPoolSchemaAttributeArgs(
#            attribute_data_type="String",
#            developer_only_attribute=False,
#            mutable=True,
#            name="nickname",
#            required=False,
#            string_attribute_constraints=aws_native.cognito.UserPoolStringAttributeConstraintsArgs(
#                max_length="2048",
#                min_length="0",
#            ),
#        ),
#    ],
#    user_attribute_update_settings=aws_native.cognito.UserPoolUserAttributeUpdateSettingsArgs(
#        attributes_require_verification_before_update=["email"],
#    ),
#    user_pool_name="default",
#    user_pool_tags={},
#    username_attributes=["email"],
#    username_configuration=aws_native.cognito.UserPoolUsernameConfigurationArgs(
#        case_sensitive=False,
#    ),
#    verification_message_template=aws_native.cognito.UserPoolVerificationMessageTemplateArgs(
#        default_email_option="CONFIRM_WITH_CODE",
#    ),
#    opts=pulumi.ResourceOptions(protect=True))
#
## TODO
## pulumi import aws-native:cognito:UserPoolClient streamlit-app 'us-west-2_hL7O6cfkj/600cmd89ln6444e1lt0cerna86'
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

# Create an API Gateway Rest API.
api = apigateway.RestAPI("api",
	routes=[
		apigateway.RouteArgs(path="/get_jobs",
							method=apigateway.Method.GET,
							event_handler=filter_jobs_handler)
	]
)

pulumi.export("api_url", api.url)

