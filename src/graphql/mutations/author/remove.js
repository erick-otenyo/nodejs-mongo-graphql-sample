import { GraphQLNonNull, GraphQLID } from "graphql";

import { AuthorType, authorInputType } from "../../types/author";

import Author from "../../../models/author";

export default {
  type: AuthorType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const removedAuthor = Author.findByIdAndRemove(params.id).exec();
    if (!removedAuthor) {
      throw new Error("Error removing book");
    }
    return removedAuthor;
  }
};
