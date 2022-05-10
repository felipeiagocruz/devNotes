import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import store from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./store/authSlice";

type RootState = {
  authSlice: {
    user: {
      displayName: string | null;
      email: string | null;
      photo: string | null;
      uid: string | null;
      token: string | null;
    };
  };
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authSlice.user);

  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD6lWYSgIDTHpzBTyZCWcb9Nm6sZpFmRPs",

    authDomain: "devnotes-b1a97.firebaseapp.com",

    projectId: "devnotes-b1a97",

    storageBucket: "devnotes-b1a97.appspot.com",

    messagingSenderId: "371995372691",

    appId: "1:371995372691:web:2afaa71c09b87f18e63166",

    measurementId: "G-9123PBG5JM",
  };

  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  const signInHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const userData = result.user;
        // ...
        console.log(userData);
        dispatch({ type: "logIn", payload: userData });
        // return setUser({
        //   displayName: userData.displayName,
        //   email: userData.email,
        //   photo: userData.photoURL,
        //   uid: userData.uid,
        //   token: credential?.accessToken,
        // });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "logIn", payload: null });
        // return setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const postHandler = async () => {
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${
        user!.uid
      }/teste.json?access_token=${user?.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ form: "test" }),
      }
    );
    console.log(data);
  };

  // type UserData = {
  //   displayName: string | null;
  //   email: string | null;
  //   photo: string | null;
  //   uid: string | null;
  //   token: string | undefined;
  // };
  // //https://devnotes-b1a97-default-rtdb.firebaseio.com/

  // const [user, setUser] = useState<UserData | null>();
  return (
    <div className="App">
      {user.uid ? (
        <div>
          <p>{user.token}</p>
          {user.displayName}
          {user.uid}
          {user.photo ? <img src={user.photo} alt="User photo" /> : ""}
          <button onClick={postHandler}>Click here to put</button>
          <button
            onClick={() => {
              signOutHandler();
            }}
          >
            Logout.
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            signInHandler();
          }}
        >
          Login here.
        </button>
      )}
    </div>
  );
}

export default App;
