import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Modal from "../components/Layout/Modal";
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

      <Modal
        show={isAddCollection}
        onClose={() => {
          setIsAddCollection(false);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.postHandler(collectionInput);
          }}
          className={classes.formNewCollection}
        >
          <h2>New collection name:</h2>

          <p>
            <input type="text" ref={collectionInput}></input>
            <button>Create</button>
          </p>
        </form>
      </Modal>

      {props.loadedCollections.length > 0 ? (
        <ul className={classes.collectionList}>
          {props.loadedCollections.map((collection) => (
            <Link to={`/mycollections/${collection.id}`} key={collection.id}>
              <li key={collection.id}>{collection.id}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <h2>Click the "+" button to add your first collection of notes.</h2>
      )}
    </Card>
  );
};

export default MyCollections;
