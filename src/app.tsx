import axios from 'axios';
import React, { useState } from 'react';

const SUCCESS = 'success';
const ERROR = 'error';
const LOADING = 'loading';

const sendWish = async (userid: string, wish: string) => {
  const url = 'http://localhost:3000/wish';
  const response = await axios.post(url, { userid, wish });
  return response;
};

const App: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const userid = form.userid.value 
    const wish = form.wish.value 

    setStatus(LOADING);
    setMessage('Sending wish...');
    sendWish(userid, wish).then(({ data }) => {
      if(!data?.isWishSent) return;
      setStatus(SUCCESS);
      setMessage('Wish sent!');
    }).catch((err) => {
      setStatus(ERROR);
      setMessage(err.response.data.message)
    })
  };

  return (
    <>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>
        <form onSubmit={onSubmit}>
          who are you?
          <input name="userid" placeholder="charlie.brown" required />
          what do you want for christmas?
          <textarea
            name="wish"
            rows={10}
            cols={45}
            maxLength={100}
            placeholder="Gifts!"
            required
          ></textarea>
          <br />
          <button type="submit" id="submit-letter">
            Send
          </button>
          <p className={status}>
            {message}
          </p>
        </form>
      </main>
    </>
  );
};

export default App;
