import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import Book from "../../models/book";
import Author from "../../models/author";
import { BookType } from "../types/book";

export const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

export const authorInputType = new GraphQLInputObjectType({
  name: "AuthorInput",
  fields: () => ({
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});
