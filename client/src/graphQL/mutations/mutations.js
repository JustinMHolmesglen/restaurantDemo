import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    createdAt
    token
  }
}
`;
export const DELETE_USER = gql`
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const LOGIN_USER = gql`
mutation Mutation($input: LoginInput!) {
  loginUser(input: $input) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const UPDATE_USER = gql`
mutation Mutation($updateUserId: ID!, $input: CreateUserInput!) {
  updateUser(id: $updateUserId, input: $input) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const CREATE_RATING = gql`
mutation Mutation($input: RatingEntryInput!) {
  createRatingEntry(input: $input) {
    id
    dish
    description
    spice
    user
    createdAt
    updatedAt
  }
}`;

export const DELETE_RATING = gql`
mutation Mutation($deleteRatingEntryId: ID!) {
  deleteRatingEntry(id: $deleteRatingEntryId) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const UPDATE_RATING = gql`
mutation UpdateRating($updateRatingEntryId: ID!, $input: RatingEntryInput!) {
  updateRatingEntry(id: $updateRatingEntryId, input: $input) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const ADD_DISH = gql`
mutation AddDish($input: DishInput) {
  addDish(input: $input) {
    _id
    dish
    description
    spice
    category
  }
}`;

export const EDIT_DISH = gql`
mutation EditDish($editDishId: ID!, $input: DishInput) {
  editDish(id: $editDishId, input: $input) {
    _id
    dish
    description
    spice
    category
  }
}`;

export const DELETE_DISH = gql`
mutation DeleteDish($deleteDishId: ID!) {
  deleteDish(id: $deleteDishId) {
    _id
    dish
    description
    spice
    category
  }
}`;

export const ADD_CATEGORY = gql`
mutation AddCategory($input: DishInput, $addCategoryInput2: CategoryInput) {
  addCategory(input: $addCategoryInput2) {
    _id
    name
  }
}`;

export const ADD_ENQUIRY = gql`
mutation AddEnquiry($input: EnquiryInput) {
  addEnquiry(input: $input) {
    
    message
  }
}`;


