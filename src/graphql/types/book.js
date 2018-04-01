import Author from "../../models/author";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} from "graphql";

import { AuthorType } from "../types/author";
import { UserType } from "../types/user";
import User from "../../models/user";

export const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
});

export const bookInputType = new GraphQLInputObjectType({
  name: "BookInput",
  fields: () => ({
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    authorId: { type: new GraphQLNonNull(GraphQLID) }
  })
});
