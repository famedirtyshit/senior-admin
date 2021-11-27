import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BaseRecoverPassword from "@components/BaseRecoverPassword";
import { useState } from "react";

const buttonStyles = makeStyles((theme) => ({
  style: {
    borderRadius: "50px",
    paddingLeft: "65px",
    paddingRight: "65px",
    paddingTop: "15px",
    paddingBottom: "15px",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
  },
  otherStyle: {
    borderRadius: "50px",
    paddingLeft: "65px",
    paddingRight: "65px",
    paddingTop: "15px",
    paddingBottom: "15px",
    border: "solid 2px white",
    boxShadow: "none",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      light: "#F0930D",
      main: "#416C94",
      dark: "#416C94",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#db4132",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
});

export default function BaseSignIn(prop) {
  const [recoverModalStatus, setRecoverModalStatus] = useState(false);

  const closeRecoverModal = () => {
    setRecoverModalStatus(false);
  };

  const openRecoverModal = () => {
    setRecoverModalStatus(true);
  };

  const buttonClasses = buttonStyles();
  return (
    <div className="bg-white rounded-3xl rounded-3xl 2xl:grid 2xl:grid-cols-10 w-2/3 mx-auto ">
      <ThemeProvider theme={theme}>
        <div></div>
       
        <div className="2xl:col-span-8 py-28">
          <h1 className="text-historyBlue text-4xl font-bold text-center pb-20">
            Sign in to Catus
          </h1>
          <div className="grid grid-cols-1 gap-6 justify-items-center">
            <TextField
              error={prop.validType == "siemail" ? true : false}
              id="signin-email"
              label="Email"
              variant="outlined"
              className="w-3/6"
            />
            <TextField
              error={prop.validType == "sipassword" ? true : false}
              id="signin-password"
              label="Password"
              variant="outlined"
              type="password"
              className="w-3/6"
            />
          </div>
          <div className="grid grid-cols-1 justify-items-center">
            <p
              onClick={openRecoverModal}
              className="my-6 text-textGray cursor-pointer inline-block font-normal"
            >
              Forgot your password?
            </p>
            <BaseRecoverPassword
              recoverModalStatus={recoverModalStatus}
              closeRecoverModal={closeRecoverModal}
            />
            <Button
              onClick={prop.signIn}
              variant="contained"
              color="primary"
              className={buttonClasses.style}
            >
              <span className="text-xl font-semibold">SIGN IN</span>
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
