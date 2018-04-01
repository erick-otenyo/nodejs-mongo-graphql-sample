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
    return Author.findByIdAndUpdate(
      params.id,
      { $set: { ...params.data } },
      { new: true }
    ).catch(err => new Error("Couldn't Update author data, ", err));
  }
};
