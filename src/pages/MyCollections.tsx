import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";

import Collection from "./Collection";

type MyCollectionsProps = {
  postHandler: (value: any) => void;
  loadedCollections: loadedCollection[];
};

type loadedCollection = {
  id: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  fetchData: () => Promise<any>;
};

const MyCollections = (props: MyCollectionsProps) => {
  //Creating a ref with the input field
  let collectionInput = useRef<HTMLInputElement | null>(null);
  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.postHandler(collectionInput);
        }}
      >
        <input type="text" ref={collectionInput}></input>
        <button>Click here to create a new collection</button>
      </form>
      {props.loadedCollections.map((collection) => (
        <Link to={`/collection/${collection.id}`} key={collection.id}>
          {collection.id}
        </Link>
      ))}
    </Fragment>
  );
};

export default MyCollections;
