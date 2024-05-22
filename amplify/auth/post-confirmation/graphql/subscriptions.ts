/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateContract = /* GraphQL */ `subscription OnCreateContract(
  $contractor: String
  $filter: ModelSubscriptionContractFilterInput
) {
  onCreateContract(contractor: $contractor, filter: $filter) {
    contractor
    createdAt
    id
    job {
      amountOffered
      createdAt
      description
      id
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
    jobID
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContractSubscriptionVariables,
  APITypes.OnCreateContractSubscription
>;
export const onCreateJob = /* GraphQL */ `subscription OnCreateJob(
  $filter: ModelSubscriptionJobFilterInput
  $submitter: String
) {
  onCreateJob(filter: $filter, submitter: $submitter) {
    amountOffered
    contract {
      contractor
      createdAt
      id
      jobID
      updatedAt
      __typename
    }
    createdAt
    description
    id
    requiredMaterials
    submitter
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJobSubscriptionVariables,
  APITypes.OnCreateJobSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onCreateUserProfile(filter: $filter, profileOwner: $profileOwner) {
    ccNum
    createdAt
    email
    id
    profileOwner
    shippingAddress
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onDeleteContract = /* GraphQL */ `subscription OnDeleteContract(
  $contractor: String
  $filter: ModelSubscriptionContractFilterInput
) {
  onDeleteContract(contractor: $contractor, filter: $filter) {
    contractor
    createdAt
    id
    job {
      amountOffered
      createdAt
      description
      id
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
    jobID
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContractSubscriptionVariables,
  APITypes.OnDeleteContractSubscription
>;
export const onDeleteJob = /* GraphQL */ `subscription OnDeleteJob(
  $filter: ModelSubscriptionJobFilterInput
  $submitter: String
) {
  onDeleteJob(filter: $filter, submitter: $submitter) {
    amountOffered
    contract {
      contractor
      createdAt
      id
      jobID
      updatedAt
      __typename
    }
    createdAt
    description
    id
    requiredMaterials
    submitter
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJobSubscriptionVariables,
  APITypes.OnDeleteJobSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onDeleteUserProfile(filter: $filter, profileOwner: $profileOwner) {
    ccNum
    createdAt
    email
    id
    profileOwner
    shippingAddress
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onUpdateContract = /* GraphQL */ `subscription OnUpdateContract(
  $contractor: String
  $filter: ModelSubscriptionContractFilterInput
) {
  onUpdateContract(contractor: $contractor, filter: $filter) {
    contractor
    createdAt
    id
    job {
      amountOffered
      createdAt
      description
      id
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
    jobID
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContractSubscriptionVariables,
  APITypes.OnUpdateContractSubscription
>;
export const onUpdateJob = /* GraphQL */ `subscription OnUpdateJob(
  $filter: ModelSubscriptionJobFilterInput
  $submitter: String
) {
  onUpdateJob(filter: $filter, submitter: $submitter) {
    amountOffered
    contract {
      contractor
      createdAt
      id
      jobID
      updatedAt
      __typename
    }
    createdAt
    description
    id
    requiredMaterials
    submitter
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJobSubscriptionVariables,
  APITypes.OnUpdateJobSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onUpdateUserProfile(filter: $filter, profileOwner: $profileOwner) {
    ccNum
    createdAt
    email
    id
    profileOwner
    shippingAddress
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
