import { useState } from "react";
import Input from "../../components/input";
import signInWithEmail from "../../services/signInWithEmail";

export default function SignIn({ toggleForm }: { toggleForm: () => void }) {
  const init = {
    email: "",
    password: "",
  };
  const [details, setDetails] = useState(init);

  const submit = async () => {
    try {
      return await signInWithEmail(details);
    } catch (err) {
      return console.log(err.message);
    }
  };

  return (
    <div>
      <Input
        label="Email"
        value={details.email}
        onChangeText={(email) =>
          setDetails({
            ...details,
            email,
          })
        }
        type="email"
      />
      <Input
        label="Password"
        value={details.password}
        onChangeText={(password) =>
          setDetails({
            ...details,
            password,
          })
        }
        type="password"
      />
      <button onClick={toggleForm}>New user</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
