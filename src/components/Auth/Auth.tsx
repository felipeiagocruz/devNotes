import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import AuthRootState from "../../models/AuthRootState";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AuthRootState) => state.authSlice.user);

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
        dispatch(
          authActions.logIn({
            displayName: userData.displayName,
            email: userData.email,
            photo: userData.photoURL,
            uid: userData.uid,
            token: credential?.accessToken,
          })
        );
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
        dispatch(authActions.logOut());
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Fragment>
      <p>Auth</p>
      {user.uid ? (
        <div>
          <p>{user.displayName}</p>
          <p>{user.photo ? <img src={user.photo} alt="User photo" /> : ""}</p>

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
    </Fragment>
  );
};

export default Auth;
