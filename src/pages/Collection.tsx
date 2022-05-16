import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AuthRootState from "../models/AuthRootState";
import Card from "../components/Layout/Card";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import classes from "./Collection.module.css";

import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

type CollectionProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const Collection = (props: CollectionProps) => {
  const [isAddNote, setIsAddNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const { collectionId } = params;
  const [notes, setNotes] = useState([]);
  const [deleteRedirect, setDeleteRedirect] = useState(false);
  const user = useSelector((state: AuthRootState) => state.authSlice.user);
  const addNoteInput = useRef<HTMLInputElement | null>(null);
  const addURLInput = useRef<HTMLInputElement | null>(null);
  //gets from redux store the data referent exclusively to the itens of the collection.
  const notesData = useSelector((state: any) =>
    state.collectionsSlice.collections.filter(
      (collection: { id: string }) => collection.id === collectionId
    )
  );

  /**
   * Transform the notesData with is a object in a array to be map.
   */
  const transformNotes = () => {
    const transformedCollections = [];
    for (const key in notesData) {
      const collectionObj = {
        ...notesData[key],
      };
      transformedCollections.push(collectionObj);
    }
    const transformedNotes: any = [];

    transformedCollections.map((collection) => {
      for (const key in collection) {
        if (collection.id) {
          const noteObj = {
            id: key,
            ...collection[key],
          };
          transformedNotes.push(noteObj);
        }
      }
      transformedNotes.shift();
      return transformedNotes;
    });
    setNotes(transformedNotes);
  };

  useEffect(() => {
    transformNotes();
  }, [props.isLoading]);

  const onSaveHandler = async () => {
    const videoURL = addURLInput.current?.value;
    const videoId: string | undefined = addURLInput.current?.value
      .slice(
        addURLInput.current?.value.indexOf("watch?v="),
        addURLInput.current?.value.length
      )
      .replace("watch?v=", "");
    console.log(videoId);
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}.json?access_token=${user?.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({
          noteName: addNoteInput.current?.value,
          url: videoURL,
          img: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        }),
      }
    ).then((data) => props.setIsLoading(true));
    if (addNoteInput.current?.value !== null) {
      addNoteInput.current!.value = "";
    }
    if (addURLInput.current?.value !== null) {
      addURLInput.current!.value = "";
    }
  };
  const onDeleteHandler = async () => {
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}.json?access_token=${user?.token}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
      }
    ).then((data) => props.setIsLoading(true));
    setDeleteRedirect(true);
  };

  return (
    <Card>
      {deleteRedirect == false ? (
        <Fragment>
          <header className={classes.header}>
            <h1>
              My collections {">"} {collectionId}
            </h1>
            <span className={classes.headerItem}>
              <AiOutlinePlus
                onClick={() => {
                  setIsAddNote(!isAddNote);
                }}
              />
              <AiFillDelete
                onClick={() => {
                  setIsDeleting(!isDeleting);
                }}
              />
            </span>
          </header>

          <hr />

          {isAddNote && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveHandler();
              }}
              className={classes.formNewNote}
            >
              <p>
                <label id="notename">Note name:</label>
              </p>
              <p>
                <input id="notename" type="text" ref={addNoteInput} />
              </p>
              <p>
                <label id="noteurl">URL:</label>
              </p>
              <p>
                <input id="noteurl" type="text" ref={addURLInput} />
              </p>
              <button className={classes.button}>Add note</button>
              <hr />
            </form>
          )}
          {isDeleting && (
            <div className={classes.formDelete}>
              <h2>Are you sure that you wanna delete this collection?</h2>
              <button className={classes.button} onClick={onDeleteHandler}>
                Yes, delete this collection
              </button>
              <hr />
            </div>
          )}

          {notes
            ? notes.map(
                (note: { id: string; noteName: string; img: string }) => (
                  <div className={classes.note}>
                    <Link to={`note/${note.id}`} replace>
                      <p>{note.noteName}</p>
                    </Link>
                    <p>
                      <img
                        src={note.img || "https://img.youtube.com/vi/0/0.jpg"}
                        alt=""
                      />
                    </p>
                    <hr />
                  </div>
                )
              )
            : ""}
        </Fragment>
      ) : (
        <Navigate to="/mycollections" />
      )}
    </Card>
  );
};

export default Collection;
