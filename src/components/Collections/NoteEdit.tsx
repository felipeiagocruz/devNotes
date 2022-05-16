import { useRef } from "react";
import { Navigate } from "react-router-dom";
import classes from "./NoteEdit.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

type NoteEditProps = {
  collectionId: string | undefined;
  noteName: string | undefined;
  noteId: string | undefined;
  noteUrl: string | undefined;
  noteImg: string | undefined;
  noteNotes: string | undefined;
  deleteRedirect: boolean;
  onSaveNoteHandler: (
    noteEditName: string | undefined,
    noteEditNotes: string | undefined,
    noteEditUrl: string | undefined
  ) => void;
};
const NoteEdit = (props: NoteEditProps) => {
  const editNoteNameInput = useRef<HTMLInputElement | null>(null);
  const editNotesInput = useRef<HTMLTextAreaElement | null>(null);
  const editNoteUrlInput = useRef<HTMLInputElement | null>(null);

  const onEdit = (
    notename: string | undefined,
    notes: string | undefined,
    url: string | undefined
  ) => {
    props.onSaveNoteHandler(notename, notes, url);
    if (editNoteNameInput.current?.value !== null) {
      editNoteNameInput.current!.value = "";
    }
    if (editNoteUrlInput.current?.value !== null) {
      editNoteUrlInput.current!.value = "";
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {props.deleteRedirect == false ? (
        <div>
          <header className={classes.header}>
            <h1>{`My collections > ${props.collectionId} > ${props.noteName}`}</h1>
            <span className={classes.headerItem}>
              <AiFillEdit />
              <AiFillDelete />
            </span>
          </header>
          <hr />
          <p>
            Name: {props.noteName} - Edit{" "}
            <input type="text" ref={editNoteNameInput} />
            <button
              onClick={() => {
                onEdit(
                  editNoteNameInput.current?.value,
                  editNotesInput.current?.value,
                  props.noteUrl || ""
                );
              }}
            >
              Save
            </button>
          </p>
          <p>
            Url: {props.noteUrl}
            <input type="text" ref={editNoteUrlInput} />
            <button
              onClick={() => {
                onEdit(
                  props.noteName,
                  editNotesInput.current?.value,
                  editNoteUrlInput.current?.value
                );
              }}
            >
              Save
            </button>
          </p>
          <a href={props.noteUrl} target="_blank">
            <img src={props.noteImg} />
          </a>
          <p>
            <textarea
              onChange={() => {
                onEdit(
                  props.noteName,
                  editNotesInput.current?.value,
                  props.noteUrl
                );
              }}
              rows={4}
              cols={50}
              ref={editNotesInput}
              defaultValue={props.noteNotes}
            />
          </p>
          {props.noteId}
        </div>
      ) : (
        <Navigate to="/mycollections" />
      )}
    </form>
  );
};

export default NoteEdit;
