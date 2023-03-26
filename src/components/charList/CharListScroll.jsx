import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import Modal from '../modal/Modal';
import useRickService from '../../services/RickService';

import './charList.scss';
const CharListScroll = () => {
  const [char, setChar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [pages, setPages] = useState(1);
  const { loading, error, getAllCharacters } = useRickService();

  const { ref, entry } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        setPages((pages) => pages + 1);
      }
    },
  });

  const onOpenModal = (id) => {
    setIsOpen(true);
    setCharId(id);
  };

  const onRequest = () => {
    getAllCharacters(pages).then(onAllCharLoaded);
  };

  const onAllCharLoaded = (dataChar) => {
    setChar((char) => [...char, ...dataChar]);
  };

  useEffect(() => {
    onRequest();
  }, [pages]);

  const charItems = (dataChar) => {
    const elements = dataChar.map(({ id, name, image }, i) => {
      if (dataChar.length === i + 1) {
        return (
          <CSSTransition timeout={400} classNames='char__item' key={id}>
            <li
              ref={ref}
              className='char__item'
              onClick={() => onOpenModal(id)}
            >
              <img className='char__item-img' src={image} alt={name} />
              <div className='char__item-name'>{name}</div>
            </li>
          </CSSTransition>
        );
      } else {
        return (
          <CSSTransition timeout={400} classNames='char__item' key={id}>
            <li className='char__item' onClick={() => onOpenModal(id)}>
              <img className='char__item-img' src={image} alt={name} />
              <div className='char__item-name'>{name}</div>
            </li>
          </CSSTransition>
        );
      }
    });
    return (
      <ul className='char__items'>
        <TransitionGroup component={null}>{elements}</TransitionGroup>
      </ul>
    );
  };

  const listChar = charItems(char);
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <h2>Something wrong...</h2> : null;

  return (
    <>
      <div className='char'>
        {errorMessage}
        {listChar}
        {spinner}
        {isOpen && <Modal id={charId} isOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default CharListScroll;
