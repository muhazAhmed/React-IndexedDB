import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';
import { Link } from 'react-router-dom';


const Get = () => {
    const [userData, setUserData] = useState({ 
        username: '', 
        email: '' 
    });

    useEffect(() => {
        const fetchData = async () => {
          const db = await openDB('myDatabase', 1);
          const transaction = db.transaction('users', 'readonly');
          const objectStore = transaction.objectStore('users');
          const cursor = await objectStore.openCursor();
      
          if (cursor) {
            setUserData(cursor.value);
          }
        };
      
        fetchData();
      }, []);
      console.log(userData)
      
      return (
        <div>
          <h1>Welcome back {userData.username}</h1>
          <h3>Your email address is: {userData.email}</h3>
          <Link to="/update"><button>Update</button></Link>
          <Link to="/delete"><button>Delete</button></Link>
        </div>
      );
      
}

export default Get
