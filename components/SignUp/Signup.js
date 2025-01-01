import styles from "./Signup.module.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);

  const handleHaveAccount = () => setHaveAccount(!haveAccount);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submitHandler = async (event) => {
    event.preventDefault();

    const userDetails = {
      enteredPassword,
      enteredEmail,
    };

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userDetails.enteredEmail,
        userDetails.enteredPassword
      );

      const user = userCredentials.user;
      setEnteredEmail("");
      setEnteredPassword("");
      user && router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logInHandler = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      router.push("/");
    } catch (error) {
      console.log("Failed to log in");
    }
  };

  return (
    <div className={styles.sign_up_container}>
      <div className={styles.sign_up_form}>
        <h2>{haveAccount ? "Login" : "Sign up"}</h2>

        <div className={styles.form_actions}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-email"
              label="Email"
              variant="outlined"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
              fullWidth
              sx={{ display: "block", marginBottom: "1.5rem" }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className={styles.sign_up_btn_container}>
              {haveAccount ? (
                <button onClick={logInHandler}>Login</button>
              ) : (
                <button onClick={submitHandler}>Sign up</button>
              )}
            </div>
            <p className={styles.have_account} onClick={handleHaveAccount}>
              {haveAccount
                ? "Don't have an account? Sign Up"
                : "Have an account? Login"}
            </p>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;
