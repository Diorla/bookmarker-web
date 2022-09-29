import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function verifyPassword(
  newPassword: string,
  actionCode: string,
  callback: (data: any) => void,
  errFn: (error: Error) => void
) {
  const auth = getAuth();

  verifyPasswordResetCode(auth, actionCode)
    .then((email) => {
      confirmPasswordReset(auth, actionCode, newPassword)
        .then((resp) => {
          signInWithEmailAndPassword(auth, email, newPassword);
          callback(resp);
        })
        .catch((error) => {
          errFn(error);
        });
    })
    .catch((error) => {
      errFn(error);
    });
}
