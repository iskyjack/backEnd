import express from "express";
import { ApolloServer,AuthenticationError } from "apollo-server-express";
import cors from "cors";
const app = express();
import uuidv4 from 'uuid/v4';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import 'dotenv/config';
import jwt from "jsonwebtoken";
app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      let authenticated=await jwt.verify(token, process.env.SECRET)
      console.log(authenticated)
      return authenticated;
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: "/graphql" });

sequelize.sync().then(async () => {
    app.listen({ port: 8000 }, () => {
      console.log('Apollo Server on http://localhost:8000/graphql');
    });
  });
  