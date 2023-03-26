import { useHttp } from '../hooks/http.hook';

const useRickService = () => {
  const { loading, error, request } = useHttp();

  const _apiBase = `https://rickandmortyapi.com/api/character`;

  const getMaxPages = async () => {
    const res = await request(_apiBase);

    return res.info.pages;
  };

  const getAllCharacters = async (pages) => {
    const res = await request(`${_apiBase}?page=${pages}`);

    return res.results.map(_translateChar);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/${id}`);

    return _translateChar(res);
  };

  const _translateChar = (char) => {
    return {
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      origin: char.origin.name,
      location: char.location.name,
      gender: char.gender,
      image: char.image,
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getMaxPages,
    loading,
    error,
  };
};

export default useRickService;
