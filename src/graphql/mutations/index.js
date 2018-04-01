import userMutation from "./user";
import bookMutation from "./book";
import authorMutation from "./author";

export default {
  ...userMutation,
  ...bookMutation,
  ...authorMutation
};
