import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import queries from "./queries";
import mutations from "./mutations";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: queries
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: mutations
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
