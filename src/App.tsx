import NavBar from "./components/Layout/NavBar";
import AuthRootState from "./models/AuthRootState";
import "./App.css";
import MyCollections from "./pages/MyCollections";
import { Routes, Route, Navigate } from "react-router-dom";
import Collection from "./pages/Collection";
import Note from "./pages/Note";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { collectionsActions } from "./store/collectionsSlice";
import { RefObject, useEffect, useState } from "react";

function App() {
  /**
   * For now i'm using this state with a prop drill do update the useEffect
   * inside this component. This probrably need to be reworked.
   */
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //Using selector to get user to do Auth actions
  const user = useSelector((state: AuthRootState) => state.authSlice.user);

  /**
   * Since the final shape of collections has not been defined, i'm using a any
   * type. This loadedCollections is updated on every re-render because of the
   * drill state isLoading
   */

  const loadedCollections: [] = useSelector(
    (state: any) => state.collectionsSlice.collections
  );

  /**
   * This function is resposable to comunicate with the real time database
   * firebaseAPI {@link https://firebase.google.com/docs/reference/rest/database} to make post,
   * it takes the user from the AuthSlice store to autenticate inside the firebase rules.
   * @param input is a useRef to the input field inside the form.
   */
  const postHandler = async (input: RefObject<HTMLInputElement>) => {
    const response = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${input.current?.value}/.json?access_token=${user?.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ noteName: "My new notes" }),
      }
    );
    if (input.current?.value !== null) {
      input.current!.value = "";
    }
    setIsLoading(true);
  };

  /**
   * Make a get request to firebase and set the redux store with the content relative to
   * the user.
   * @returns a array made of the object inside firebase real time database,
   * it will be used inside redux store.
   */
  const fetchData = async () => {
    const response = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user.uid}/collections.json`
    );
    const data = await response.json();
    const transformedCollections = [];

    for (const key in data) {
      const commentObj = {
        id: key,
        ...data[key],
      };
      transformedCollections.push(commentObj);
    }
    return transformedCollections;
  };

  useEffect(() => {
    fetchData()
      .then((data) => dispatch(collectionsActions.loadCollection(data)))
      .then((data) => setIsLoading(false));
  }, [isLoading]);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="mycollections"
          element={
            user.uid ? (
              <MyCollections
                loadedCollections={loadedCollections}
                postHandler={postHandler}
                setIsLoading={setIsLoading}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="mycollections/:collectionId"
          element={
            user.uid ? (
              <Collection isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="mycollections/:collectionId/note/:noteId"
          element={
            user.uid ? (
              <Note isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
