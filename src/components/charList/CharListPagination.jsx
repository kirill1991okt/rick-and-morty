import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import Modal from '../modal/Modal';
import { Pagination } from '@mui/material';
import useRickService from '../../services/RickService';
import { useOnRequest } from '../../hooks/useOnRequest';

import './charList.scss';

const CharList = ({ state }) => {
  const [char, setChar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [pages, setPages] = useState(1);
  const [max, setMax] = useState(null);
  const { loading, error, getAllCharacters, getMaxPages } = useRickService();

  const onOpenModal = (id) => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
    setCharId(id);
  };

  const handleClick = (e, pages) => {
    setPages(pages);
  };

  const onRequest = useOnRequest({ state, pages, setChar, getAllCharacters });

  useEffect(() => {
    getMaxPages().then((pages) => {
      setMax(pages);
    });
  }, []);

  useEffect(() => {
    onRequest();
  }, [pages]);

  const charItems = (dataChar) => {
    const elements = dataChar.map(({ id, name, image }, i) => {
      return (
        <li className='char__item' onClick={() => onOpenModal(id)}>
          <img className='char__item-img' src={image} alt={name} />
          <div className='char__item-name'>{name}</div>
        </li>
      );
    });

    return <ul className='char__items'>{elements}</ul>;
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <h2>Something wrong...</h2> : null;
  const content = !(loading || error) ? charItems(char) : null;

  return (
    <>
      <div className='char'>
        {content}
        {spinner}
        {errorMessage}
        <div className='pagination'>
          <Pagination
            count={max}
            color='secondary'
            hidePrevButton
            hideNextButton
            size='large'
            onChange={handleClick}
          />
        </div>
      </div>
      {isOpen && <Modal id={charId} isOpen={setIsOpen} />}
    </>
  );
};

export default CharList;
