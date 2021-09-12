import React, { useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input/Input";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "PASS_INPUT":
      return {
        ...state,
        formValid:
          action.val.trim().length > 6 && state.emailValue.includes("@"),
        passValue: action.val,
        passValid: action.val.trim().length > 6,
      };
    case "EMAIL_INPUT":
      return {
        ...state,
        formValid:
          action.val.includes("@") && state.passValue.trim().length > 6,
        emailValue: action.val,
        emailValid: action.val.includes("@"),
      };
    case "FORM_VALID":
      return {
        ...state,
        formValid: action.val,
      };
    default:
      throw new Error();
  }
};

/* const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
}; */

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  //const [formIsValid, setFormIsValid] = useState(false);

  const initialFormState = {
    passValue: "",
    emailValue: "",
    passValid: null,
    emailValid: null,
    formValid: false,
  };

  const [formState, dispatchForm] = useReducer(loginReducer, initialFormState);

  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: "",
  //   isValid: null,
  // });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log("Effect Running!");

    return () => console.log("Effect Cleanup");
  }, []);

  const { emailValid: emailIsValid, passValid: passwordIsValid } = formState;
  //const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      dispatchForm({
        type: "FORM_VALID",
        val: emailIsValid && passwordIsValid,
      });
    }, 500);

    return () => {
      console.log("Clear timer!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    dispatchForm({ type: "EMAIL_INPUT", val: event.target.value });

    //setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    //dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    dispatchForm({ type: "PASS_INPUT", val: event.target.value });

    //setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  // const validateEmailHandler = () => {
  //   dispatchEmail({ type: "INPUT_BLUR" });
  // };

  // const validatePasswordHandler = () => {
  //   dispatchPassword({ type: "INPUT_BLUR" });
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(formState.emailValue, formState.passValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label={"Email:"}
          stateHandler={formState.emailValue}
          inputValid={formState.emailValid}
          onChange={emailChangeHandler}
          //onBlur={validateEmailHandler}
          type={"email"}
          id={"email"}
        />
        <Input
          label={"Password:"}
          stateHandler={formState.passValue}
          inputValid={formState.passValid}
          onChange={passwordChangeHandler}
          //onBlur={validatePasswordHandler}
          type={"password"}
          id={"password"}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.formValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
