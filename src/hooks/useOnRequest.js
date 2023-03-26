export const useOnRequest = ({ state, pages, setChar, getAllCharacters }) => {
  const onRequest = () => {
    getAllCharacters(pages).then(onAllCharLoaded);
  };

  const onAllCharLoaded = (dataChar) => {
    state ? setChar([...dataChar]) : setChar((char) => [...char, ...dataChar]);
  };

  return onRequest;
};
