import { GraphQLNonNull } from "graphql";

import { UserType, userRegisterType } from "../../types/user";

import User from "../../../models/user";

const addUser = async ({ username, password, email }) => {
  const user = new User();
  user.username = username;
  user.email = email;
  await user.setPassword(password);
  const newUser = user.save();
  if (!newUser) {
    throw new Error("Error adding user");
  }
  return newUser;
};

export default {
  type: UserType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(userRegisterType)
    }
  },
  resolve(root, params) {
    return addUser(params.data);
  }
};
