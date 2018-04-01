import { GraphQLNonNull } from "graphql";

import { AuthorType, authorInputType } from "../../types/author";

import Author from "../../../models/author";

export default {
  type: AuthorType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(authorInputType)
    }
  },
  resolve(root, params) {
    const author = new Author(params.data);
    const newAuthor = author.save();
    if (!newAuthor) {
      throw new Error("Error adding author");
    }
    return newAuthor;
  }
};
