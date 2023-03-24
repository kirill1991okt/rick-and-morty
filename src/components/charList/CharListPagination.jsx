import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import Modal from '../modal/Modal';
import { Pagination } from '@mui/material';
import useRickService from '../../services/RickService';

import './charList.scss';

const CharList = () => {
  const [char, setChar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [pages, setPages] = useState(1);
  const { loading, error, getAllCharacters } = useRickService();

  const onOpenModal = (id) => {
    setIsOpen(true);
    setCharId(id);
  };

  const handleClick = (e, pages) => {
    setPages(pages);
  };

  const onRequest = () => {
    getAllCharacters(pages).then(onAllCharLoaded);
  };

  const onAllCharLoaded = (dataChar) => {
    setChar([...dataChar]);
  };

  useEffect(() => {
    onRequest();
  }, [pages]);

  const charItems = (dataChar) => {
    const elements = dataChar.map(({ id, name, image }, i) => {
      return (
        <li key={i} className="char__item" onClick={() => onOpenModal(id)}>
          <img className="char__item-img" src={image} alt={name} />
          <div className="char__item-name">{name}</div>
        </li>
      );
    });

    return <ul className="char__items">{elements}</ul>;
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <h2>Something wrong...</h2> : null;
  const content = !(loading || error) ? charItems(char) : null;

  return (
    <>
      <div className="char">
        {content}
        {spinner}
        {errorMessage}
        <div className="pagination">
          <Pagination
            count={42}
            color="secondary"
            hidePrevButton
            hideNextButton
            size="large"
            onChange={handleClick}
          />
        </div>
        {isOpen && <Modal id={charId} isOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default CharList;
