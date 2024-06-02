/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContract = /* GraphQL */ `
  mutation CreateContract(
    $condition: ModelContractConditionInput
    $input: CreateContractInput!
  ) {
    createContract(condition: $condition, input: $input) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        id
        modelFilePath
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      paid
      status
      updatedAt
      __typename
    }
  }
`;
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $condition: ModelJobConditionInput
    $input: CreateJobInput!
  ) {
    createJob(condition: $condition, input: $input) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        paid
        status
        updatedAt
        __typename
      }
      createdAt
      description
      id
      modelFilePath
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: CreateUserProfileInput!
  ) {
    createUserProfile(condition: $condition, input: $input) {
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
export const deleteContract = /* GraphQL */ `
  mutation DeleteContract(
    $condition: ModelContractConditionInput
    $input: DeleteContractInput!
  ) {
    deleteContract(condition: $condition, input: $input) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        id
        modelFilePath
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      paid
      status
      updatedAt
      __typename
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $condition: ModelJobConditionInput
    $input: DeleteJobInput!
  ) {
    deleteJob(condition: $condition, input: $input) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        paid
        status
        updatedAt
        __typename
      }
      createdAt
      description
      id
      modelFilePath
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: DeleteUserProfileInput!
  ) {
    deleteUserProfile(condition: $condition, input: $input) {
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
export const updateContract = /* GraphQL */ `
  mutation UpdateContract(
    $condition: ModelContractConditionInput
    $input: UpdateContractInput!
  ) {
    updateContract(condition: $condition, input: $input) {
      contractor
      createdAt
      id
      job {
        amountOffered
        colors
        createdAt
        description
        id
        modelFilePath
        requiredMaterials
        submitter
        title
        updatedAt
        __typename
      }
      jobID
      paid
      status
      updatedAt
      __typename
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $condition: ModelJobConditionInput
    $input: UpdateJobInput!
  ) {
    updateJob(condition: $condition, input: $input) {
      amountOffered
      colors
      contract {
        contractor
        createdAt
        id
        jobID
        paid
        status
        updatedAt
        __typename
      }
      createdAt
      description
      id
      modelFilePath
      requiredMaterials
      submitter
      title
      updatedAt
      __typename
    }
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: UpdateUserProfileInput!
  ) {
    updateUserProfile(condition: $condition, input: $input) {
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
