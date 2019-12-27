import { gql } from "apollo-server-express";
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
   
  }
  extend type Mutation {
    registeruser(input: UserInput!): Token!
    signIn(login: String!, password: String!): Token!
  }
  type User {
    id: ID!
    fname: String!
    lname: String!
    mobileno: String!
    email: String!
    password: String!
  }
  type Token {
    token: String
  }
  input UserInput {
    fname: String!
    lname: String!
    mobileno: String!
    email: String!
    password: String!
  }
`;
