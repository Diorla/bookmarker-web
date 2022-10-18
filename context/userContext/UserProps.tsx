import UpdatedUser from "./UpdatedUser";

export default interface UserProps {
  user: UpdatedUser;
  loadingUser: boolean;
  error: Error | null;
}
