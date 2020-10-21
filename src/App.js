import React, {useState} from 'react';
import './App.css';

function App() {

  const [response, setResponse] = useState(null);

  function handleClick() {

      fetch("https://bookbnb-develop.herokuapp.com/v1/users", {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
      })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((r) => {
          setResponse(r);
      });

  }

  return (
      <div className='login'>
        <div className='login-button' onClick={handleClick}>
          Login
        </div>
        <div className='response'>
            {response && response.length > 0 ? response[0].email : null}
        </div>
      </div>
  );

}

export default App;
