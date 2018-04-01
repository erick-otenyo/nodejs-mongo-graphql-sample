import { GraphQLNonNull, GraphQLID } from "graphql";

import { BookType, bookInputType } from "../../types/book";

import Book from "../../../models/book";

export default {
  type: BookType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: "data",
      type: new GraphQLNonNull(bookInputType)
    }
  },
  resolve(parent, params) {
    return Book.findByIdAndUpdate(
      params.id,
      { $set: { ...params.data } },
      { new: true }
    ).catch(err => new Error("Couldn't Update User data, ", err));
  }
};
