import { GraphQLID, GraphQLNonNull } from "graphql";
import { UserType } from "../../types/user";
import User from "../../../models/user";

export default {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args, { user }) {
    if (user) {
      return User.findById(user.id);
    }
    return null;
  }
};
