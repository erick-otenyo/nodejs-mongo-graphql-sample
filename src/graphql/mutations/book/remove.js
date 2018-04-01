import { GraphQLNonNull, GraphQLID } from "graphql";

import { BookType, bookInputType } from "../../types/book";

import Book from "../../../models/book";

export default {
  type: BookType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const removedBook = Book.findByIdAndRemove(params.id).exec();
    if (!removedBook) {
      throw new Error("Error removing book");
    }
    return removedBook;
  }
};
