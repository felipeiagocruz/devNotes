import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectionsActions } from "../../store/collectionsSlice";
import AuthRootState from "../../models/AuthRootState";

import Note from "./Note";

type CollectionProps = {
  id: string;
  collectionName: string;
  notations: {}[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  fetchData: () => Promise<any>;
};

const Collection = (props: CollectionProps) => {
  const [notes, setNotes] = useState([]);
  const user = useSelector((state: AuthRootState) => state.authSlice.user);
  const dispatch = useDispatch();
  const addNoteInput = useRef<HTMLInputElement | null>(null);
  const notesData = useSelector((state: any) =>
    state.collectionsSlice.collections.filter(
      (collection: { id: string }) => collection.id === props.id
    )
  );

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
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${props.id}.json?access_token=${user?.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ noteName: addNoteInput.current?.value }),
      }
    ).then((data) => props.setIsLoading(true));
    if (addNoteInput.current?.value !== null) {
      addNoteInput.current!.value = "";
    }
  };
  return (
    <div>
      <p>{props.id}</p>
      <p>Give note name:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveHandler();
        }}
      >
        <input type="text" ref={addNoteInput} />
        <button>Add note</button>
      </form>
      {notes
        ? notes.map((note: { id: string; noteName: string }) => (
            <Note
              id={note.id}
              noteName={note.noteName}
              isLoading={props.isLoading}
              setIsLoading={props.setIsLoading}
              collectionName={props.id}
            />
          ))
        : ""}
    </div>
  );
};

export default Collection;
