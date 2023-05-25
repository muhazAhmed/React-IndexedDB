import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const Update = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const db = await openDB('myDatabase', 1);
      const transaction = db.transaction('users', 'readonly');
      const objectStore = transaction.objectStore('users');

      const cursor = await objectStore.openCursor();
      if (cursor) {
        const user = cursor.value;
        setUsername(user.username);
        setEmail(user.email);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const updatedUser = {
      username,
      email,
    };
  
    const db = await openDB('myDatabase', 1);
    const transaction = db.transaction('users', 'readwrite');
    const objectStore = transaction.objectStore('users');
  
    const getRequest = objectStore.get(username);
    getRequest.onsuccess = (event) => {
      const existingUser = event.target.result;
      if (existingUser) {
        existingUser.email = updatedUser.email;
        objectStore.put(existingUser, username).onsuccess = () => {
          console.log('User updated successfully');
        };
      }
    };
  
    transaction.oncomplete = () => {
      // Reset the input fields
      setUsername('');
      setEmail('');
    };
    transaction.onerror = () => {
      console.error('Failed to update user');
    };
  };
  
  

  return (
    <div>
      <h1>Update User</h1>
      <input
        placeholder="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Update;
