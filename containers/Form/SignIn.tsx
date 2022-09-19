import { useState } from "react";
import Input from "../../components/input";
import signInWithEmail from "../../services/signInWithEmail";
import Card from "./Card";
import LinkButton from "./LinkButton";
import SubmitButton from "./SubmitButton";

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
      return console.log(err);
    }
  };

  return (
    <Card>
      <h2 style={{ textAlign: "center" }}>Sign in</h2>
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
      <div>
        <LinkButton onClick={toggleForm}>Are you a new user</LinkButton>
      </div>
      <SubmitButton>
        <button onClick={submit}>Submit</button>
      </SubmitButton>
    </Card>
  );
}
