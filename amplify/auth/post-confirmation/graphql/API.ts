/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Contract = {
  __typename: "Contract",
  contractor: string,
  createdAt: string,
  id: string,
  job?: Job | null,
  jobID: string,
  paid?: Paid | null,
  status?: ContractStatus | null,
  updatedAt: string,
};

export type Job = {
  __typename: "Job",
  amountOffered?: number | null,
  colors?: Array< Colors | null > | null,
  contract?: Contract | null,
  createdAt: string,
  description?: string | null,
  id: string,
  modelFilePath?: string | null,
  requiredMaterials?: Array< RequiredMaterials | null > | null,
  submitter: string,
  title?: string | null,
  updatedAt: string,
};

export enum Colors {
  Black = "Black",
  Blue = "Blue",
  Red = "Red",
  Transparent = "Transparent",
  White = "White",
}


export enum RequiredMaterials {
  CarbonFiber = "CarbonFiber",
  Plastic = "Plastic",
  Resin = "Resin",
}


export enum Paid {
  Paid = "Paid",
  Unpaid = "Unpaid",
}


export enum ContractStatus {
  Accepted = "Accepted",
  Printing = "Printing",
  Shipped = "Shipped",
}


export type UserProfile = {
  __typename: "UserProfile",
  createdAt: string,
  email: string,
  id: string,
  profileOwner: string,
  shippingAddress?: string | null,
  updatedAt: string,
};

export type ModelContractFilterInput = {
  and?: Array< ModelContractFilterInput | null > | null,
  contractor?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  jobID?: ModelIDInput | null,
  not?: ModelContractFilterInput | null,
  or?: Array< ModelContractFilterInput | null > | null,
  paid?: ModelPaidInput | null,
  status?: ModelContractStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelPaidInput = {
  eq?: Paid | null,
  ne?: Paid | null,
};

export type ModelContractStatusInput = {
  eq?: ContractStatus | null,
  ne?: ContractStatus | null,
};

export type ModelContractConnection = {
  __typename: "ModelContractConnection",
  items:  Array<Contract | null >,
  nextToken?: string | null,
};

export type ModelJobFilterInput = {
  amountOffered?: ModelFloatInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  colors?: ModelColorsListInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  modelFilePath?: ModelStringInput | null,
  not?: ModelJobFilterInput | null,
  or?: Array< ModelJobFilterInput | null > | null,
  requiredMaterials?: ModelRequiredMaterialsListInput | null,
  submitter?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelColorsListInput = {
  contains?: Colors | null,
  eq?: Array< Colors | null > | null,
  ne?: Array< Colors | null > | null,
  notContains?: Colors | null,
};

export type ModelRequiredMaterialsListInput = {
  contains?: RequiredMaterials | null,
  eq?: Array< RequiredMaterials | null > | null,
  ne?: Array< RequiredMaterials | null > | null,
  notContains?: RequiredMaterials | null,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items:  Array<Job | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  and?: Array< ModelUserProfileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserProfileFilterInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  profileOwner?: ModelStringInput | null,
  shippingAddress?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelContractConditionInput = {
  and?: Array< ModelContractConditionInput | null > | null,
  contractor?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  jobID?: ModelIDInput | null,
  not?: ModelContractConditionInput | null,
  or?: Array< ModelContractConditionInput | null > | null,
  paid?: ModelPaidInput | null,
  status?: ModelContractStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateContractInput = {
  contractor: string,
  id?: string | null,
  jobID: string,
  paid?: Paid | null,
  status?: ContractStatus | null,
};

export type ModelJobConditionInput = {
  amountOffered?: ModelFloatInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  colors?: ModelColorsListInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  modelFilePath?: ModelStringInput | null,
  not?: ModelJobConditionInput | null,
  or?: Array< ModelJobConditionInput | null > | null,
  requiredMaterials?: ModelRequiredMaterialsListInput | null,
  submitter?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateJobInput = {
  amountOffered?: number | null,
  colors?: Array< Colors | null > | null,
  description?: string | null,
  id?: string | null,
  modelFilePath?: string | null,
  requiredMaterials?: Array< RequiredMaterials | null > | null,
  submitter: string,
  title?: string | null,
};

export type ModelUserProfileConditionInput = {
  and?: Array< ModelUserProfileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  profileOwner?: ModelStringInput | null,
  shippingAddress?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  email: string,
  id?: string | null,
  profileOwner: string,
  shippingAddress?: string | null,
};

export type DeleteContractInput = {
  id: string,
};

export type DeleteJobInput = {
  id: string,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type UpdateContractInput = {
  contractor?: string | null,
  id: string,
  jobID?: string | null,
  paid?: Paid | null,
  status?: ContractStatus | null,
};

export type UpdateJobInput = {
  amountOffered?: number | null,
  colors?: Array< Colors | null > | null,
  description?: string | null,
  id: string,
  modelFilePath?: string | null,
  requiredMaterials?: Array< RequiredMaterials | null > | null,
  submitter?: string | null,
  title?: string | null,
};

export type UpdateUserProfileInput = {
  email?: string | null,
  id: string,
  profileOwner?: string | null,
  shippingAddress?: string | null,
};

export type ModelSubscriptionContractFilterInput = {
  and?: Array< ModelSubscriptionContractFilterInput | null > | null,
  contractor?: ModelStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  jobID?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionContractFilterInput | null > | null,
  paid?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionJobFilterInput = {
  amountOffered?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionJobFilterInput | null > | null,
  colors?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  modelFilePath?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionJobFilterInput | null > | null,
  requiredMaterials?: ModelSubscriptionStringInput | null,
  submitter?: ModelStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  profileOwner?: ModelStringInput | null,
  shippingAddress?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetContractQueryVariables = {
  id: string,
};

export type GetContractQuery = {
  getContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type ListContractsQueryVariables = {
  filter?: ModelContractFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContractsQuery = {
  listContracts?:  {
    __typename: "ModelContractConnection",
    items:  Array< {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      createdAt: string,
      email: string,
      id: string,
      profileOwner: string,
      shippingAddress?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateContractMutationVariables = {
  condition?: ModelContractConditionInput | null,
  input: CreateContractInput,
};

export type CreateContractMutation = {
  createContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type CreateJobMutationVariables = {
  condition?: ModelJobConditionInput | null,
  input: CreateJobInput,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteContractMutationVariables = {
  condition?: ModelContractConditionInput | null,
  input: DeleteContractInput,
};

export type DeleteContractMutation = {
  deleteContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type DeleteJobMutationVariables = {
  condition?: ModelJobConditionInput | null,
  input: DeleteJobInput,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateContractMutationVariables = {
  condition?: ModelContractConditionInput | null,
  input: UpdateContractInput,
};

export type UpdateContractMutation = {
  updateContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type UpdateJobMutationVariables = {
  condition?: ModelJobConditionInput | null,
  input: UpdateJobInput,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateContractSubscriptionVariables = {
  contractor?: string | null,
  filter?: ModelSubscriptionContractFilterInput | null,
};

export type OnCreateContractSubscription = {
  onCreateContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  submitter?: string | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteContractSubscriptionVariables = {
  contractor?: string | null,
  filter?: ModelSubscriptionContractFilterInput | null,
};

export type OnDeleteContractSubscription = {
  onDeleteContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  submitter?: string | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateContractSubscriptionVariables = {
  contractor?: string | null,
  filter?: ModelSubscriptionContractFilterInput | null,
};

export type OnUpdateContractSubscription = {
  onUpdateContract?:  {
    __typename: "Contract",
    contractor: string,
    createdAt: string,
    id: string,
    job?:  {
      __typename: "Job",
      amountOffered?: number | null,
      colors?: Array< Colors | null > | null,
      createdAt: string,
      description?: string | null,
      id: string,
      modelFilePath?: string | null,
      requiredMaterials?: Array< RequiredMaterials | null > | null,
      submitter: string,
      title?: string | null,
      updatedAt: string,
    } | null,
    jobID: string,
    paid?: Paid | null,
    status?: ContractStatus | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  submitter?: string | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    amountOffered?: number | null,
    colors?: Array< Colors | null > | null,
    contract?:  {
      __typename: "Contract",
      contractor: string,
      createdAt: string,
      id: string,
      jobID: string,
      paid?: Paid | null,
      status?: ContractStatus | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description?: string | null,
    id: string,
    modelFilePath?: string | null,
    requiredMaterials?: Array< RequiredMaterials | null > | null,
    submitter: string,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email: string,
    id: string,
    profileOwner: string,
    shippingAddress?: string | null,
    updatedAt: string,
  } | null,
};
