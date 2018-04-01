import { GraphQLID, GraphQLNonNull } from "graphql";
import { AuthorType } from "../../types/author";
import Author from "../../../models/author";

export default {
  type: AuthorType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Author.findById(args.id);
  }
};
