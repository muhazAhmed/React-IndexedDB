import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { openDB } from 'idb';


function App() {

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const user = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    // Save the user data to IndexedDB
    const db = await openDB('myDatabase', 1);
    const transaction = db.transaction('users', 'readwrite');
    const objectStore = transaction.objectStore('users');
    objectStore.add(user);
  
    // Clear the form
    form.reset();
  };
  
  useEffect(() => {
    const setupIndexedDB = async () => {
      const db = await openDB('myDatabase', 1, {
        upgrade(db) {
          db.createObjectStore('users', { keyPath: 'username' });
        },
      });
    };
  
    setupIndexedDB();
  }, []);  

  return (
    <>
    <h1>Create User</h1>
    <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  )
}

export default App
