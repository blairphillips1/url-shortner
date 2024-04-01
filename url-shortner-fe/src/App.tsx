import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';

function App() {
  const [ clientCreateUrl, setClientCreateUrl ] = useState<boolean>(true);
  return (
    <div className="flex-container">
      <h1>URL Shortner</h1>
      <button onClick={() => setClientCreateUrl(!clientCreateUrl)}>
        I want to {clientCreateUrl ? 'delete' : 'create'} a url instead
      </button>
      <InputBox clientCreateUrl={clientCreateUrl} />
    </div>
  );
}

export default App
