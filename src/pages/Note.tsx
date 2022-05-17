import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthRootState from "../models/AuthRootState";
import { useParams } from "react-router-dom";
import NoteEdit from "../components/Collections/NoteEdit";
import Card from "../components/Layout/Card";

type NoteProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const Note = (props: NoteProps) => {
  const [noteData, setNoteData] = useState<{
    noteName: string;
    img: string;
    url: string;
    notes: string;
    embedVideo: string;
  }>({ noteName: "", img: "", url: "", notes: "", embedVideo: "" });
  const [deleteRedirect, setDeleteRedirect] = useState(false);
  const params = useParams();
  const { collectionId, noteId } = params;
  const user = useSelector((state: AuthRootState) => state.authSlice.user);

  const getNoteInfo = async () => {
    const response = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}/${noteId}.json?access_token=${user?.token}`
    );
    const data = await response.json();
    setNoteData(data);
  };

  const onSaveNoteHandler = async (
    noteEditName: string | undefined,
    noteEditNotes: string | undefined,
    noteEditUrl: string | undefined
  ) => {
    const videoURL = noteEditUrl;
    let videoId: string | undefined = "";
    if (noteEditUrl !== undefined) {
      videoId = noteEditUrl!
        .slice(noteEditUrl!.indexOf("watch?v="), noteEditUrl!.length)
        .replace("watch?v=", "");
    }
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}/${noteId}.json?access_token=${user?.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({
          noteName: noteEditName,
          notes: noteEditNotes,
          url: videoURL || "",
          img: `https://img.youtube.com/vi/${videoId}/0.jpg`,
          embedVideo: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        }),
      }
    ).then((data) => props.setIsLoading(true));

    props.setIsLoading(true);
  };

  const onDeleteNoteHandler = async () => {
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${collectionId}/${noteId}.json?access_token=${user?.token}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
      }
    ).then((data) => props.setIsLoading(true));
    setDeleteRedirect(true);
  };

  useEffect(() => {
    getNoteInfo();
  }, [props.isLoading]);

  return (
    <Card>
      <NoteEdit
        collectionId={collectionId}
        noteName={noteData!.noteName}
        noteId={noteId}
        noteUrl={noteData!.url}
        noteImg={noteData!.img}
        noteEmbedVideo={noteData.embedVideo}
        noteNotes={noteData!.notes}
        deleteRedirect={deleteRedirect}
        onSaveNoteHandler={onSaveNoteHandler}
      />
      <button onClick={onDeleteNoteHandler}>Delete</button>
    </Card>
  );
};

export default Note;
