import Head from "next/head";
import BaseSignIn from "@components/BaseSignIn";
import BaseSignUp from "@components/BaseSignUp";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import initFirebase from "@utils/initFirebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import BaseAuthenResModal from "@components/BaseAuthenResModal";
let passwordValidator = require("password-validator");
import accountUtil from "@utils/accountUtil";
import adminUtil from "@utils/adminUtil";
import { useRouter } from "next/router";

const sectionStyles = makeStyles((theme) => ({
  style: {},
}));
export default function Authen(prop) {
  const router = useRouter();
  const [authenType, setAuthenType] = useState(
    router.query.type == "signup" ? "signup" : "signin"
  );
  const [validMsg, setValidMsg] = useState("");
  const [validStatus, setValidStatus] = useState(false);
  const [validType, setValidType] = useState("pass");
  const [resAlertType, setResAlertType] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);


  useEffect(() => {
    let res = initFirebase();
    if (res != false) {
      console.log("init firebase");
    } else {
      console.log("init firebase error");
    }
  }, []);

  const sectionClasses = sectionStyles();

  const goSignUp = () => {
    setAuthenType("signup");
  };

  const goSignIn = () => {
    setAuthenType("signin");
  };

  const handleModalClose = () => {
    setValidStatus(false);
    // setValidMsg('');
  };

  const signIn = async () => {
    const auth = getAuth();
    let valid = validateSignIn(
      document.getElementById("signin-email").value,
      document.getElementById("signin-password").value
    );
    if (!valid.status) {
      setValidStatus(true);
      setValidMsg(valid.msg);
      setValidType(valid.type);
      setResAlertType(false);
      return;
    } else {
      setValidType(valid.type);
      setResAlertType(true);
    }
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        document.getElementById("signin-email").value,
        document.getElementById("signin-password").value
      );
      const user = userCredential.user;
      console.log("signin");
      // console.log(user)
      if (!user.emailVerified) {
        setValidStatus(true);
        setValidMsg("please verify your email before singin");
        setResAlertType(true);
        logOut();
      } else {
        let userObj = await adminUtil.checkAdmin(user.uid); //get user obj
        if (userObj.data.result == true) {
          // setAuthenSuccess()
          prop.setIsLogin(true);
        } else {
          setValidStatus(true);
          setValidMsg("user not found !!");
          setResAlertType(true);
          logOut();
        }
        // console.log(adminUtil);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setValidStatus(true);
      console.log(error);
      if (errorCode) {
        setValidMsg(errorCode.replace("auth/", ""));
      } else {
        setValidMsg("error please retry later");
      }

      setResAlertType(false);
      console.log("signin error");
      // console.log(errorCode.replace('auth/', ""));
      // console.log(error)
    }
  };

  const validateSignIn = (email, password) => {
    if (!email) {
      return { status: false, msg: "please input your email", type: "siemail" };
    }
    let checker = /\S+@\S+\.\S+/;
    if (checker.test(email) == false) {
      return { status: false, msg: "email format wrong", type: "siemail" };
    }
    if (!password) {
      return {
        status: false,
        msg: "please input your password",
        type: "sipassword",
      };
    }
    return { status: true, msg: "pass", type: "pass" };
  };


  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signout");
      })
      .catch((error) => {
        console.log("signout fail");
        console.log(error);
      });
  };



  return (
    <div style={{ fontFamily: "Prompt" }} className={"2xl:container mx-auto"}>
      <Head>
        <title>CatUs</title>
        <meta name="description" content="CatUs Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="2xl:py-8">
        <Link href="/">
          <a>
            <h1 className="text-mainBlue 2xl:text-7xl font-bold  inline-block">
              Catus
            </h1>
          </a>
        </Link>
      </header>
      <main className="bg-mainBlue mb-36 py-16 px-80">
        <section className={sectionClasses.style}>     
            <BaseSignIn
              validType={validType}
              goSignUp={goSignUp}
              signIn={signIn}
            />  
          <BaseAuthenResModal
            loadingStatus={loadingStatus}
            resAlertType={resAlertType}
            modalStatus={validStatus}
            handleModalClose={handleModalClose}
            msg={validMsg}
          />
        </section>
      </main>
    </div>
  );
}
