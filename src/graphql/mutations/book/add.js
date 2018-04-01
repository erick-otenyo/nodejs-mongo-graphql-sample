import { GraphQLNonNull } from "graphql";

import { BookType, bookInputType } from "../../types/book";

import Book from "../../../models/book";

export default {
  type: BookType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(bookInputType)
    }
  },
  resolve(root, params) {
    const book = new Book(params.data);
    const newBook = book.save();
    if (!newBook) {
      throw new Error("Error adding book");
    }
    return newBook;
  }
};
