import { useRef } from "react";
import { useSelector } from "react-redux";
import AuthRootState from "../../models/AuthRootState";

type NoteProps = {
  id: string;
  noteName: string;
  noteURL: string;
  noteImg: string;
  collectionName: string | undefined;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const Note = (props: NoteProps) => {
  const user = useSelector((state: AuthRootState) => state.authSlice.user);
  const editNoteNameInput = useRef<HTMLInputElement | null>(null);
  const onSaveNoteHandler = async () => {
    console.log(props.collectionName);
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${props.collectionName}/${props.id}.json?access_token=${user?.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ noteName: editNoteNameInput.current?.value }),
      }
    ).then((data) => props.setIsLoading(true));
    if (editNoteNameInput.current?.value !== null) {
      editNoteNameInput.current!.value = "";
    }
  };

  const onDeleteNoteHandler = async () => {
    console.log(props.collectionName);
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${props.collectionName}/${props.id}.json?access_token=${user?.token}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
      }
    ).then((data) => props.setIsLoading(true));
  };
  return (
    <p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveNoteHandler();
        }}
      >
        {props.noteName} - Edit <input type="text" ref={editNoteNameInput} />
        {props.id}
        {props.noteURL}
        <img src={props.noteImg} />
        <button>Save</button>
      </form>
      <button onClick={onDeleteNoteHandler}>Delete</button>
    </p>
  );
};

export default Note;
