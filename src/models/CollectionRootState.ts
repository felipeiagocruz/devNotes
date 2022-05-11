type Collection = {
  id: string;
  collectionName: string;
  notations: {
    id: string;
    img: string;
    url: string;
    notation: string;
  }[];
};

type CollectionRootState = {
  collectionsSlice: {
    collections: Collection[];
  };
};

export default CollectionRootState;
