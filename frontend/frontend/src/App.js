import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://philipstatic-anitabasic-3000.codio-box.uk/exchange-rates')
      .then(response => {
        setRates(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Exchange Rates</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {Object.keys(rates).map((currency, index) => (
          <li key={index}>{currency}: {rates[currency]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
