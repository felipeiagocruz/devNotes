import { Fragment, RefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthRootState from "../../models/AuthRootState";

import { useRef } from "react";
import { collectionsActions } from "../../store/collectionsSlice";

import Collection from "./Collection";

const MyCollections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //Creating a ref with the input field
  let collectionInput = useRef<HTMLInputElement | null>(null);
  //Using selector to get user to do Auth actions
  const user = useSelector((state: AuthRootState) => state.authSlice.user);

  const loadedCollections: {
    collectionName: string;
    id: string;
    notations: {}[];
  }[] = useSelector((state: any) => state.collectionsSlice.collections);

  const postHandler = async (input: RefObject<HTMLInputElement>) => {
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${input.current?.value}/.json?access_token=${user?.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ noteName: "My new notes" }),
      }
    );
    if (collectionInput.current?.value !== null) {
      collectionInput.current!.value = "";
    }
    setIsLoading(true);
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user.uid}/collections.json`
    );
    const data = await response.json();
    console.log(data);
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
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postHandler(collectionInput);
        }}
      >
        <input type="text" ref={collectionInput}></input>
        <button>Click here to create a new collection</button>
      </form>
      {loadedCollections.map((collection) => (
        <Collection
          key={collection.id}
          id={collection.id}
          collectionName={collection.collectionName}
          notations={collection.notations}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fetchData={fetchData}
        />
      ))}
    </Fragment>
  );
};

export default MyCollections;
