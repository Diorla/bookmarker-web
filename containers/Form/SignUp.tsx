import { useState } from "react";
import Input from "../../components/input";
import signUpWithEmail from "../../services/signUpWithEmail";
import Card from "./Card";
import LinkButton from "./LinkButton";
import SubmitButton from "./SubmitButton";

export default function SignUp({ toggleForm }: { toggleForm: () => void }) {
  const init = {
    email: "",
    password: "",
    repassword: "",
  };
  const [details, setDetails] = useState(init);

  const [error, setError] = useState(init);

  const submit = async () => {
    try {
      const { email, password, repassword } = details;
      if (!email) setError({ ...init, email: "Please provide email" });
      else if (!password)
        setError({ ...init, password: "Please provide password" });
      else if (!repassword)
        setError({ ...init, repassword: "Please confirm your password" });
      else if (password !== repassword)
        setError({ ...init, repassword: "Password does not match" });
      else return await signUpWithEmail(details);
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <Card>
      <h2 style={{ textAlign: "center" }}>Sign up</h2>
      <Input
        label="Email"
        value={details.email}
        onFocus={() => setError(init)}
        errorText={error.email}
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
        onFocus={() => setError(init)}
        value={details.password}
        errorText={error.password}
        onChangeText={(password) =>
          setDetails({
            ...details,
            password,
          })
        }
        type="password"
      />
      <Input
        label="Confirm password"
        onFocus={() => setError(init)}
        value={details.repassword}
        errorText={error.repassword}
        onChangeText={(repassword) =>
          setDetails({
            ...details,
            repassword,
          })
        }
        type="password"
      />
      <div>
        <LinkButton onClick={toggleForm}>Already a member</LinkButton>
      </div>
      <SubmitButton>
        <button onClick={submit}>Submit</button>
      </SubmitButton>
    </Card>
  );
}
