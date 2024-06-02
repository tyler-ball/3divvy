/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContract = /* GraphQL */ `
  query GetContract($id: ID!) {
    getContract(id: $id) {
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
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
export const listContracts = /* GraphQL */ `
  query ListContracts(
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContracts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        contractor
        createdAt
        id
        jobID
        paid
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        email
        id
        profileOwner
        shippingAddress
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
