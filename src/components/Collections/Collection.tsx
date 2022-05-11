import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectionsActions } from "../../store/collectionsSlice";
import AuthRootState from "../../models/AuthRootState";
import CollectionRootState from "../../models/CollectionRootState";

type CollectionProps = {
  id: string;
  collectionName: string;
};

const Collection = (props: CollectionProps) => {
  const user = useSelector((state: AuthRootState) => state.authSlice.user);
  const dispatch = useDispatch();
  const addNoteInput = useRef<HTMLInputElement | null>(null);
  const notes = useSelector(
    (state: CollectionRootState) => state.collectionsSlice.collections
  );

  const onSaveHandler = async () => {
    dispatch(
      collectionsActions.editColletion({
        id: props.id,
        notations: {
          img: "a",
          url: "a",
          notation: "a",
        },
      })
    );
    const data = await fetch(
      `https://devnotes-b1a97-default-rtdb.firebaseio.com/users/${user?.uid}/collections/${props.id}.json?access_token=${user?.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({
          collectionName: props.collectionName,
          notations: {
            img: "a",
            url: "a",
            notation: addNoteInput.current?.value,
          },
        }),
      }
    );
  };
  return (
    <div>
      <p>{props.collectionName}</p>
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
    </div>
  );
};

export default Collection;
