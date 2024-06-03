import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a.schema({
  RequiredMaterials: a.enum(["Plastic", "Resin", "CarbonFiber"]),
  Colors: a.enum(["Red", "White", "Black", "Blue", "Transparent"]),
  ContractStatus: a.enum(["Accepted", "Printing", "Shipped"]),
  Paid: a.enum(["Unpaid", "Paid"]),
  Job: a
    .model({
      submitter: a.string().required(),
      title: a.string(),
      description: a.string(),
      amountOffered: a.float(),
      requiredMaterials: a.ref("RequiredMaterials").array(),
      colors: a.ref("Colors").array(),
      modelFilePath: a.string(),
      modelSize: a.integer(),
      contract: a.hasOne('Contract', 'jobID'),
      hasPaid: a.boolean().default(false),
      hasContract: a.boolean().default(false)
    })
    .authorization((allow) => [
      allow.ownerDefinedIn("submitter"),
      allow.authenticated().to(["read", "update"])]),
  Contract: a
    .model({
      jobID: a.id().required(),
      job: a.belongsTo('Job', 'jobID'),
      contractor: a.string().required(),
      status: a.ref("ContractStatus"),
    })
    .authorization((allow) => [
      allow.ownerDefinedIn("contractor"),
      allow.authenticated().to(["read", "update"])]),
  UserProfile: a
    .model({
      profileOwner: a.string().required(),
      email: a.string().required(),
      shippingAddress: a.string(),
    })
    .authorization((allow) => [
      allow.ownerDefinedIn("profileOwner"),
      allow.authenticated().to(["read"])]),
}).authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
