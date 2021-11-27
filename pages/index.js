import React, { useState, useEffect } from "react";
import BaseAuthen from "@components/BaseAuthen";
import BaseDashboard from "@components/BaseDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import initFirebase from "@utils/initFirebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import adminUtil from "@utils/adminUtil";

export default function Index(prop) {
  const [isLogin, setIsLogin] = useState(false);
  const [checkCurrentUser, setCheckCurrentUser] = useState(true);

  useEffect(() => {
    let res = initFirebase();
    if (res != false) {
      console.log("init firebase");
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userObj = await adminUtil.checkAdmin(user.uid); //get user obj
          if (userObj.data.result == true) {
            // setAuthenSuccess()
            setIsLogin(true);
            console.log("userObj");
            console.log(userObj);
            setCheckCurrentUser(false);
          } else {
            setCheckCurrentUser(false);
          }
        } else {
          // console.log('User is not found');
          setCheckCurrentUser(false);
        }
      });
    } else {
      console.log("init firebase error");
    }
  }, []);

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        setIsLogin(false);
    }).catch((error) => {
        alert('fail please retry later');
    });
};

  return (
    <div className="relative text-center ">
      {checkCurrentUser ? (
        <div className="mt-12">
        <CircularProgress />
        </div>
      ) : isLogin ? (
        <BaseDashboard logout={logout} setIsLogin={setIsLogin}/>
      ) : (
        <BaseAuthen setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
