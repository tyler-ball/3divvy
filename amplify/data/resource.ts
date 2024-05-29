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
      contract: a.hasOne('Contract', 'jobID')
    })
    .authorization((allow) => [
      allow.ownerDefinedIn("submitter"),
      allow.authenticated().to(["read"])]),
  Contract: a
    .model({
      jobID: a.id().required(),
      job: a.belongsTo('Job', 'jobID'),
      contractor: a.string().required(),
      status: a.ref("ContractStatus"),
      paid: a.ref("Paid")
    })
    .authorization((allow) => [allow.ownerDefinedIn("contractor")]),
  UserProfile: a
    .model({
      profileOwner: a.string().required(),
      email: a.string().required(),
      shippingAddress: a.string(),
      ccNum: a.string(),
    })
    .authorization((allow) => [allow.ownerDefinedIn("profileOwner")]),
}).authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
