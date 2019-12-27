import "dotenv/config";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  let returnValue = await jwt.sign({ id, email, username }, secret, {
    expiresIn
  });
  return returnValue;
};

export default {
  Mutation: {
    createuserinstitution:combineResolvers(
      isAuthenticated,
     async (parent, args, context, info) => {
     console.log(parent)
      try {
        return await context.models.userInstitution.create({
          companyname: args.input.companyname,
          address: args.input.address,
          image: args.input.image,
          document: args.input.document,
          video: args.input.video,
          user_id: args.input.user_id
        });
      } catch (error) {
        throw new Error(error);
      }
    }),
    deleteuserinstitution:combineResolvers(
      isAuthenticated,
     async (parent, args, context, info) => {
      try {
        return await context.models.userInstitution.destroy({
          where: { id: args.id }
        });
      } catch (error) {
        throw new Error(error);
      }
    }),
    updateuserinstitution: combineResolvers(
      isAuthenticated,
    async (parent, args, context, info) => {
      try {
        return await context.models.userInstitution.update(
          args.input,
          { where: { id: args.input.id } }
        );
      } catch (error) {
        throw new Error(error);
      }
    }),

    registeruser:
     async (parent, args, context, info) => {
      try {
        const user = await context.models.User.create({
          fname: args.input.fname,
          lname: args.input.lname,
          mobileno: args.input.mobileno,
          email: args.input.email,
          password: args.input.password
        });
        let token = await createToken(user, context.secret, "30m");
        return { token: token };
      } catch (error) {
        throw new Error(error);
      }
    },
    signIn:
     async (parent, { login, password }, { models, secret }) => {
     try{
      const user = await models.User.findByLogin(login);
      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }
      return { token: createToken(user, secret, "30m") };
     }catch(e){
       throw new Error(e)
     }
    }
  },
  User: {
    id: (user, args, { models }) => {
      return user.id}
  },
};
