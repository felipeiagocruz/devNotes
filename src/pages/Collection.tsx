import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AuthRootState from "../models/AuthRootState";

import Note from "../components/Collections/Note";
import { useParams } from "react-router-dom";

type CollectionProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  fetchData: () => Promise<any>;
};

const Collection = (props: CollectionProps) => {
  const params = useParams();
  const { collectionId } = params;
  const [notes, setNotes] = useState([]);
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
    console.log(transformedNotes);
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
  };
  const onDeleteHandler = async () => {
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}.json?access_token=${user?.token}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
      }
    ).then((data) => props.setIsLoading(true));
  };

  return (
    <div>
      <p>{collectionId}</p>
      <p>Give note name:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveHandler();
        }}
      >
        <label id="notename">Note name:</label>
        <input id="notename" type="text" ref={addNoteInput} />
        <label id="noteurl">URL:</label>
        <input id="noteurl" type="text" ref={addURLInput} />
        <button>Add note</button>
      </form>
      <button onClick={onDeleteHandler}>Delete collection</button>
      {notes
        ? notes.map(
            (note: {
              id: string;
              noteName: string;
              url: string;
              img: string;
            }) => (
              <Note
                id={note.id}
                noteName={note.noteName}
                noteURL={note.url}
                noteImg={note.img}
                isLoading={props.isLoading}
                setIsLoading={props.setIsLoading}
                collectionName={collectionId}
              />
            )
          )
        : ""}
    </div>
  );
};

export default Collection;
