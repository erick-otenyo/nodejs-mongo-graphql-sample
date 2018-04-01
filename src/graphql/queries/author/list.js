import { GraphQLList } from "graphql";
import { AuthorType } from "../../types/author";
import Author from "../../../models/author";

export default {
  type: new GraphQLList(AuthorType),
  resolve(parent, args) {
    return Author.find({});
  }
};
