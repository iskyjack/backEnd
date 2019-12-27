import uuidv4 from "uuid/v4";
import "dotenv/config";
import Query from "./query";
import Mutation from "./mutation"

export default {
  Query: Query.Query,
  Mutation: Mutation.Mutation
};
