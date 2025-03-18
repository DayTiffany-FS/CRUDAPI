import React, { useEffect, useState } from "react";

import './App.css';

function App() {
  const [songs, setSongs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:3170/api/v1` 
    : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {

    if(!ignore){
      getSongs();
    }

    return () => {
      ignore = true;
    }
  }, [])
    
  const getSongs = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE/songs}`)
                .then(res => res.json())
                .then(data => {
                  console.log({data})
                  setSongs(data)
                })
    } catch (error) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Songs:</h1>
        <ul>
          <li>Songs</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
