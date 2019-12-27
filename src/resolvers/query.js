import jwt from "jsonwebtoken";
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
export default {
  Query: {
    userinstitutions:combineResolvers(
      isAuthenticated,
       async (parent, args, context, info) => {
      try {
        return await context.models.userInstitution.findAll();
      } catch (e) {
        return Error(e);
      }
    }),
    getuserinstitutions:combineResolvers(
      isAuthenticated,
       async (parent, args, context, info) => {
      try {
        return await context.models.userInstitution.findAll({
          where: {
            user_id: args.id
          }
        });
      } catch (e) {
        return Error(e);
      }
    })
  },
};
