import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className='bold'>Ho ho ho, what you want for Christmas?</p>
        who are you?
        <input name='userid' placeholder='charlie.brown' />
        <form method='post'>
          what do you want for christmas?
          <textarea
            name='wish'
            rows={10}
            cols={45}
            maxLength={100}
            placeholder='Gifts!'
          ></textarea>
          <br />
          <button type='submit' id='submit-letter'>
            Send
          </button>
        </form>
      </main>
    </>
  );
};

export default App;
