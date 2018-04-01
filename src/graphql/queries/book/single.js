import { GraphQLID, GraphQLNonNull } from "graphql";
import { BookType } from "../../types/book";
import Book from "../../../models/book";

export default {
  type: BookType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Book.findById(args.id);
  }
};
