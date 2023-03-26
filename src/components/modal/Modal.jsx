import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import useRickService from '../../services/RickService';

import './modal.scss';

const Modal = ({ id, isOpen }) => {
  const [charId, setCharId] = useState(null);

  const { loading, error, getCharacter } = useRickService();

  const onRequest = () => {
    if (!id) return;
    getCharacter(id).then(onCharLoaded);
  };

  const onCharLoaded = (charData) => {
    setCharId(charData);
  };

  useEffect(() => {
    onRequest();
  }, [id]);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      isOpen(false);
    }
  });

  return ReactDOM.createPortal(
    <>
      <div onClick={() => isOpen(false)} className='modal'>
        <div className='modal__container'>
          {error ? (
            <h2 style={{ backgroundColor: '#fff' }}>Someting wrong...</h2>
          ) : null}
          {charId ? <View char={charId} /> : null}
          {loading ? <Spinner /> : null}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

const View = ({ char, loading }) => {
  const arr = Object.entries(char);
  const firstLetterToUpperCase = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <>
      <img src={char.image} alt={char.name} className='modal__img' />
      <div className='modal__descr'>
        {arr
          .filter((item) => item[0] !== 'id' && item[0] !== 'image')
          .map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className='modal__descr-items'>
                  <span className='modal__descr-item'>
                    {firstLetterToUpperCase(item[0])}:
                  </span>
                  <div>{item[1]}</div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Modal;
