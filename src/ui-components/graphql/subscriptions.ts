/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContract = /* GraphQL */ `
  subscription OnCreateContract(
    $contractor: String
    $filter: ModelSubscriptionContractFilterInput
  ) {
    onCreateContract(contractor: $contractor, filter: $filter) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        hasContract
        hasPaid
        id
        modelFilePath
        modelSize
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      status
      updatedAt
      __typename
    }
  }
`;
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob(
    $filter: ModelSubscriptionJobFilterInput
    $submitter: String
  ) {
    onCreateJob(filter: $filter, submitter: $submitter) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        status
        updatedAt
        __typename
      }
      createdAt
      description
      hasContract
      hasPaid
      id
      modelFilePath
      modelSize
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onCreateUserProfile(filter: $filter, profileOwner: $profileOwner) {
      createdAt
      email
      id
      profileOwner
      shippingAddress
      updatedAt
      __typename
    }
  }
`;
export const onDeleteContract = /* GraphQL */ `
  subscription OnDeleteContract(
    $contractor: String
    $filter: ModelSubscriptionContractFilterInput
  ) {
    onDeleteContract(contractor: $contractor, filter: $filter) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        hasContract
        hasPaid
        id
        modelFilePath
        modelSize
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      status
      updatedAt
      __typename
    }
  }
`;
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob(
    $filter: ModelSubscriptionJobFilterInput
    $submitter: String
  ) {
    onDeleteJob(filter: $filter, submitter: $submitter) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        status
        updatedAt
        __typename
      }
      createdAt
      description
      hasContract
      hasPaid
      id
      modelFilePath
      modelSize
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onDeleteUserProfile(filter: $filter, profileOwner: $profileOwner) {
      createdAt
      email
      id
      profileOwner
      shippingAddress
      updatedAt
      __typename
    }
  }
`;
export const onUpdateContract = /* GraphQL */ `
  subscription OnUpdateContract(
    $contractor: String
    $filter: ModelSubscriptionContractFilterInput
  ) {
    onUpdateContract(contractor: $contractor, filter: $filter) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        hasContract
        hasPaid
        id
        modelFilePath
        modelSize
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      status
      updatedAt
      __typename
    }
  }
`;
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob(
    $filter: ModelSubscriptionJobFilterInput
    $submitter: String
  ) {
    onUpdateJob(filter: $filter, submitter: $submitter) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        status
        updatedAt
        __typename
      }
      createdAt
      description
      hasContract
      hasPaid
      id
      modelFilePath
      modelSize
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onUpdateUserProfile(filter: $filter, profileOwner: $profileOwner) {
      createdAt
      email
      id
      profileOwner
      shippingAddress
      updatedAt
      __typename
    }
  }
`;
