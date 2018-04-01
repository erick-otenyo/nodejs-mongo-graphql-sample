import { GraphQLList } from "graphql";
import { BookType } from "../../types/book";
import Book from "../../../models/book";

export default {
  type: new GraphQLList(BookType),
  resolve(parent, args) {
    return Book.find({});
  }
};
