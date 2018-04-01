import { GraphQLNonNull, GraphQLString } from "graphql";

import { userLoginType } from "../../types/user";

import User from "../../../models/user";

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  const isValidPassword = user && (await user.validPassword(password));
  if (!user || !isValidPassword) {
    throw new Error("Incorrect email or password");
  }
  const token = user.generateJWT();
  return token;
};

export default {
  type: GraphQLString,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(userLoginType)
    }
  },
  resolve(root, params) {
    return login(params.data);
  }
};
