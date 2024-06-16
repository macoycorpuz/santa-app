import React from 'react';

const App: React.FC = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    console.log(form.userid.value, form.wish.value);
    e.preventDefault();
  };

  return (
    <>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className='bold'>Ho ho ho, what you want for Christmas?</p>
        <form onSubmit={onSubmit}>
          who are you?
          <input name='userid' placeholder='charlie.brown' />
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
