import {
  Button,
  Chip,
  Container,
  Input,
  Loader,
  Typography,
} from "bookmarker-ui";
import React, { useEffect } from "react";
import { useState } from "react";
import { useUser } from "context/userContext";
import deleteAccount from "services/deleteAccount";
import updateDisplayName from "services/updateDisplayName";
import updatePassword from "services/updatePassword";
import Main from "./Main";
import Layout from "containers/Layout";
import removeCollection from "services/removeCollection";
import ChipWrapper from "./ChipWrapper";
import Footer from "containers/Footer";

export default function Profile() {
  const { user, loadingUser } = useUser();
  const { email = "", displayName } = user;
  const [currentName, setCurrentName] = useState(displayName || "");

  useEffect(() => {
    setCurrentName(displayName || "");
  }, [displayName]);

  const initialPassword = {
    init: "",
    confirm: "",
    old: "",
  };
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState(initialPassword);
  const [formError, setFormError] = useState("");

  const { collections } = user;
  const submit = () => {
    setFormError("");
    const { init, confirm, old } = password;
    if (!old)
      setError({
        ...initialPassword,
        old: "Please provide password",
      });
    if (!init)
      setError({
        ...initialPassword,
        init: "Please provide password",
      });
    else if (!confirm)
      setError({
        ...initialPassword,
        confirm: "Please confirm your password",
      });
    else if (init !== confirm)
      setError({
        ...initialPassword,
        confirm: "Password does not match",
      });
    else
      updatePassword(email || "", old, init)
        ?.then(() => {
          alert("Password updated");
          setPassword(initialPassword);
        })
        .catch((err) => setFormError(err.message));
  };

  const deleteUser = () => {
    const password = prompt("Please enter password");
    deleteAccount(email || "", password || "")
      ?.then(() => console.log("account deleted"))
      .catch((err) => console.log(err));
  };
  if (loadingUser) return <Loader fullHeight />;

  return (
    <Layout activePath="profile" alignCenter={false}>
      <Main style={{ marginTop: 4 }}>
        <Container alignCenter>
          <Typography type="h2">Change name</Typography>
          <Input value={String(email)} label="Email" disabled />
          <Input
            value={currentName}
            label="Display name"
            type="text"
            onChange={(e) => setCurrentName(e.target.value)}
          />
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Button
              variant="primary"
              onClick={() => {
                if (currentName && currentName !== displayName)
                  updateDisplayName(currentName);
              }}
            >
              Update
            </Button>
          </div>
        </Container>
        <hr style={{ width: "80%" }} />
        <Container alignCenter>
          <Typography type="h2">Manage collections</Typography>
          <ChipWrapper>
            {collections
              .sort((a, b) => (a > b ? 1 : -1))
              .map((item, idx) => (
                <Chip
                  key={idx}
                  title={item}
                  onClick={() => {
                    return confirm("Remove collection?")
                      ? removeCollection(user.uid, item)
                      : null;
                  }}
                />
              ))}
          </ChipWrapper>
        </Container>
        <hr style={{ width: "80%" }} />
        <Container alignCenter>
          <Typography type="h2">Change Password</Typography>
          <Input
            value={password.old}
            label="Old Password"
            type="password"
            onChange={(e) =>
              setPassword({
                ...password,
                old: e.target.value,
              })
            }
            errorText={error.old}
            onFocus={() => setError(initialPassword)}
          />
          <Input
            value={password.init}
            label="New Password"
            type="password"
            onChange={(e) =>
              setPassword({
                ...password,
                init: e.target.value,
              })
            }
            errorText={error.init}
            onFocus={() => setError(initialPassword)}
          />
          <Input
            value={password.confirm}
            label="Repeat password"
            type="password"
            onChange={(e) =>
              setPassword({
                ...password,
                confirm: e.target.value,
              })
            }
            errorText={error.confirm}
            onFocus={() => setError(initialPassword)}
          />
          <div style={{ color: "red", marginTop: 4 }}>{formError}</div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Button variant="primary" onClick={submit}>
              Confirm
            </Button>
          </div>
        </Container>
        <hr style={{ width: "80%" }} />
        <Container alignCenter>
          <Typography type="h2">Manage account</Typography>
          <Button
            style={{ marginBottom: 8 }}
            onClick={() => alert("This feature is not supported yet")}
          >
            Download data
          </Button>
          <Button
            variant="secondary"
            style={{ marginBottom: 8 }}
            onClick={deleteUser}
          >
            Delete Account
          </Button>
        </Container>
      </Main>
      <Footer />
    </Layout>
  );
}
