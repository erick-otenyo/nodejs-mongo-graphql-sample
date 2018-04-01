import book from "./book";
import author from "./author";
import user from "./user";

export default {
  ...book,
  ...author,
  ...user
};
