import { User } from "firebase/auth";

export default interface UpdatedUser extends User {
  collections: string[];
}
