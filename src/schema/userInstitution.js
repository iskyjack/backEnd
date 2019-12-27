import { gql } from "apollo-server-express";
export default gql`

scalar Object
extend type Query {
    userinstitutions: [UserInstitution!]!
    getuserinstitutions(id:ID!):[UserInstitution!]!
  }
  extend type Mutation  {
    createuserinstitution(input:UserInstitutionInput): UserInstitution!
    updateuserinstitution(input:UserInstitutionUpdate): Object
    deleteuserinstitution(id: ID!): Boolean
  }
  type UserInstitution {
    id: ID!
    user_id: ID
    companyname: String
    address: String
    image: String
    document: String
    video: String
  }

  input UserInstitutionInput {
    user_id: ID
    companyname: String
    address: String
    image: String
    document: String
    video: String
  }

  input UserInstitutionUpdate {
    user_id: ID
    companyname: String
    address: String
    image: String
    document: String
    video: String
    id:ID!
  }
`;
