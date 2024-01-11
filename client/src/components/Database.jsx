import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/Database.css"

import { FaSearch } from 'react-icons/fa';
import axios from "../axios";


const DatabasePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [databases, setDatabases] = useState();
  const [selectedDatabase, setSelectedDatabase] = useState();
  const [editIndex, setEditIndex] = useState(null);
  const [database, setDatabase] = useState();
  const [link, setLink] = useState("");
  const navigate = useNavigate();


  const handleDoubleClick = (index, key) => {
    setEditIndex(index);
  };

  const handleBlur = () => {
    setEditIndex(null);
  };

  const handleChange = (index, key, newValue) => {
    const newData = [...database];
    newData[index][key] = newValue;
    setDatabase(newData);
  };

  const handleInputClick = () => {
    if(!loaded){
      const data = {
        mongoDBUri: link,
      }
      axios.defaults.withCredentials = true;
      axios
        .post(`/connect-to-mongodb`, data, { credentials: "include" })
        .then((res) => {
          setDatabases(res.data.databases)
          setLoaded(true);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  const handleClickDatabase = (clickedKey) => {
    setSelectedDatabase(clickedKey);
  }

  const handleClickCollection = (collection) => {
    const data = {
      mongoDBUri: link,
    }
    axios.defaults.withCredentials = true;
    axios
      .post(`/get-data/${selectedDatabase}/${collection}`, data, { credentials: "include" })
      .then((res) => {
        setDatabase(res.data)
        setLoaded(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  const handleButtonClick = () => {
      navigate('/');
  };

  return ( 
      <div className="home-database" style={{display: "block"}}>
        <div className="home-header">
          <header
            data-thq="thq-navbar"
            className="navbarContainer home-navbar-interactive"
          >
            <span className="logo" onClick={handleButtonClick} style={{cursor: "pointer"}}>Easy MongoDB</span>
          </header>
        </div>
        <div className="database-hero">
          <div className="input-link">
            <input type="text" value={link} onChange={(event) => setLink(event.target.value)} className="input-link-fs" placeholder={loaded ? "Write your prompt" : "Enter your link"}/>
            <button className="buttonFilled" style={{height: "100%"}} onClick={handleInputClick}><FaSearch /></button>
          </div>
          <div className="databases-list">
            {databases && loaded && !selectedDatabase ? (
              <h3>Select Databases</h3>
            ) : (<></>)}
            {!selectedDatabase && loaded && databases ? (
              Object.entries(databases).map(([key, value]) => (
                <button className="buttonFilled databases" onClick={() => handleClickDatabase(key)} key={key}>
                  {key}
                </button>
              ))
            ) : databases && loaded && selectedDatabase ? (
              <>
                <h3>Select Collection</h3>
                {databases[selectedDatabase].map(item => (
                  <button className="buttonFilled databases" onClick={() => handleClickCollection(item)} key={item}>
                    {item}
                  </button>
                ))}
              </>
            ) : database ? (
              <div className="database-collection">
                {database.map((user, index) => (
                  <div key={index} className="database-info">
                    {Object.entries(user).map(([key, value]) => (
                      <p key={key} className="database-info-text">
                        <strong>{key}:</strong> "
                        <div
                          className={`${editIndex === index ? 'editable' : ''}`}
                          onDoubleClick={() => handleDoubleClick(index, key)}
                          onBlur={handleBlur}
                          contentEditable={editIndex === index}
                          style={{ whiteSpace: 'nowrap', display: 'inline' }}
                          onInput={(e) => handleChange(index, key, e.target.textContent)}
                        >
                          {String(value)}
                        </div>"
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (<></>)}
          </div>
        </div>
      </div>
  );
}
 
export default DatabasePage;