import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import User from "../../models/user";
import { BookType } from "../types/book";
import Book from "../../models/book";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ userId: parent.id });
      }
    }
  })
});

export const userRegisterType = new GraphQLInputObjectType({
  name: "UserRegisterInput",
  fields: () => ({
    username: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

export const userLoginType = new GraphQLInputObjectType({
  name: "UserLoginInput",
  fields: () => ({
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});
