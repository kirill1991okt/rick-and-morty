import { useState } from 'react';
import { Switch, FormControlLabel, Button } from '@mui/material';
import CharListScroll from '../charList/CharListScroll';
import CharListPagination from '../charList/CharListPagination';

import './app.scss';

function App() {
  const [state, setState] = useState(false);

  const handlerScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setState(e.target.checked);
  };

  return (
    <div className='App'>
      <FormControlLabel
        className='App__control'
        control={
          <Switch checked={state} onChange={handleChange} color='secondary' />
        }
        label='Turn off scroll'
      />
      {state ? <CharListPagination /> : <CharListScroll />}
      <button className='top' onClick={handlerScrollToTop}>
        To top
      </button>
    </div>
  );
}

export default App;
