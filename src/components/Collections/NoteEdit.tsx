import { Fragment, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import classes from "./NoteEdit.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineOndemandVideo } from "react-icons/md";

type NoteEditProps = {
  collectionId: string | undefined;
  noteName: string | undefined;
  noteId: string | undefined;
  noteUrl: string | undefined;
  noteImg: string | undefined;
  noteNotes: string | undefined;
  noteEmbedVideo: string | undefined;
  setIsDeleting: (value: boolean) => void;
  deleteRedirect: boolean;
  onSaveNoteHandler: (
    noteEditName: string | undefined,
    noteEditNotes: string | undefined,
    noteEditUrl: string | undefined
  ) => void;
};
const NoteEdit = (props: NoteEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const editNoteNameInput = useRef<HTMLInputElement | null>(null);
  const editNotesInput = useRef<HTMLTextAreaElement | null>(null);
  const editNoteUrlInput = useRef<HTMLInputElement | null>(null);

  const onEdit = (
    notename: string | undefined,
    notes: string | undefined,
    url: string | undefined
  ) => {
    props.onSaveNoteHandler(notename, notes, url);
    // if (editNoteNameInput.current?.value !== null) {
    //   editNoteNameInput.current!.value = "";
    // }
    // if (editNoteUrlInput.current?.value !== null) {
    //   editNoteUrlInput.current!.value = "";
    // }
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
            <h2> {props.noteName}</h2>
            <span className={classes.headerItem}>
              <MdOutlineOndemandVideo
                onClick={() => {
                  setIsVideo(!isVideo);
                }}
              />
              <AiFillEdit
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              />
              <AiFillDelete
                onClick={() => {
                  props.setIsDeleting(true);
                }}
              />
            </span>
          </header>
          <hr />

          <h2 className={classes.noteName}>
            Note Name:{" "}
            {isEditing ? (
              <Fragment>
                <input
                  type="text"
                  defaultValue={props.noteName}
                  ref={editNoteNameInput}
                />
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
              </Fragment>
            ) : (
              props.noteName
            )}
          </h2>
          <p className={classes.url}>
            {isEditing ? (
              <Fragment>
                <label id="url">Url: </label>
                <input
                  id="url"
                  type="text"
                  defaultValue={props.noteUrl}
                  ref={editNoteUrlInput}
                />
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
              </Fragment>
            ) : (
              <a href={props.noteUrl}>{props.noteUrl}</a>
            )}
          </p>
          {isVideo && props.noteEmbedVideo && (
            <div dangerouslySetInnerHTML={{ __html: props.noteEmbedVideo }} />
          )}
          <p>
            <textarea
              className={classes.note}
              onChange={() => {
                onEdit(
                  props.noteName,
                  editNotesInput.current?.value,
                  props.noteUrl
                );
              }}
              ref={editNotesInput}
              defaultValue={props.noteNotes}
              rows={15}
            />
          </p>
        </div>
      ) : (
        <Navigate to="/mycollections" />
      )}
    </form>
  );
};

export default NoteEdit;
