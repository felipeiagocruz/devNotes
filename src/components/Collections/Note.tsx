import { useRef } from "react";
import { useSelector } from "react-redux";
import AuthRootState from "../../models/AuthRootState";

type NoteProps = {
  id: string;
  noteName: string;
  collectionName: string;
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
        <button>Save</button>
      </form>
    </p>
  );
};

export default Note;
