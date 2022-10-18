import { createContext } from "react";
import UserProps from "./UserProps";
import initialUser from "./initialUser";

export default createContext<UserProps>({
  user: initialUser,
  loadingUser: true,
  error: null,
});
