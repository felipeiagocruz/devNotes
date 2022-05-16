import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Card from "../components/Layout/Card";
import classes from "./MyCollections.module.css";

type MyCollectionsProps = {
  postHandler: (value: any) => void;
  loadedCollections: loadedCollection[];
  setIsLoading: (value: boolean) => void;
};

type loadedCollection = {
  id: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  fetchData: () => Promise<any>;
};

const MyCollections = (props: MyCollectionsProps) => {
  const [isAddCollection, setIsAddCollection] = useState(false);
  useEffect(() => {
    props.setIsLoading(true);
  }, []);
  //Creating a ref with the input field
  let collectionInput = useRef<HTMLInputElement | null>(null);
  return (
    <Card>
      <header className={classes.header}>
        <h1 className={classes.headerItem}>My collections</h1>{" "}
        <span className={classes.headerItem}>
          <AiOutlinePlus
            onClick={() => {
              setIsAddCollection(!isAddCollection);
            }}
          />
        </span>
      </header>
      <hr />
      {isAddCollection && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.postHandler(collectionInput);
          }}
          className={classes.formNewCollection}
        >
          <p>
            <label>New collectioon name:</label>
          </p>
          <p>
            <input type="text" ref={collectionInput}></input>
            <button>Create</button>
          </p>
          <hr />
        </form>
      )}

      <ul className={classes.collectionList}>
        {props.loadedCollections.map((collection) => (
          <Link to={`/mycollections/${collection.id}`} key={collection.id}>
            <li key={collection.id}>{collection.id}</li>
          </Link>
        ))}
      </ul>
    </Card>
  );
};

export default MyCollections;
