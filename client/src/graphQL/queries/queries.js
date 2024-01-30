import { gql } from '@apollo/client';


export const GET_CATEGORY = gql`
query Categories($categoryId: ID) {
    category(id: $categoryId) {
      _id
      name
    }
  }`;


export const GET_ALL_CATEGORIES = gql`
query Categories {
  categories {
    _id
    name
  }
}`;

export const GET_DISH = gql`
query Dish($dishId: ID) {
  dish(id: $dishId) {
    _id
    dish
    description
    spice
    category
  }
}`;

export const GET_ALL_DISHES = gql`
query Dishes {
  dishes{
    _id
    dish
    description
    spice
    category
  }
}`;

export const GET_DISH_TYPE = gql`
query GetDishType {
  dishes {
    _id
    dish
    description
    spice
    category
  }
}
`;

export const SEARCH_DISH = gql`
query SearchDish($dish: String) {
  searchDishes(dish: $dish) {
    _id
    dish
    description
    spice
    category
  }
}
`;

export const GET_RATING = gql`
query RatingEntries {
  ratingEntries {
    id
    title
    body
    mood
    user
    createdAt
    updatedAt
  }
}`;

export const GET_ALL_RATINGS = gql`
query GetRatingEntry($getRatingEntryId: ID!) {
  getRatingEntry(id: $getRatingEntryId) {
    id
    dish
    description
    spice
    user
    createdAt
    updatedAt
  }
}`;

export const GET_USER = gql`
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    createdAt
    token
  }
}`;

export const GET_ENQUIRY = gql`
query GetEnquiry($id: ID!) {
  getEnquiry(id: $id){
    id
    name
    phone
    email
    message
    
  }
}`;

export const GET_ENQUIRIES = gql`
query GetEnquiries {
  getEnquiries {
    id
    name
    phone
    email
    message
  }
}`;
