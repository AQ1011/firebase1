import {storage, fb} from "./firebase/firebase";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'firebase/firestore';

const db = fb.firestore()

const App = () => {

  const [url, setURL] = useState(null);

  const [posts, setPosts] = useState([]);

  const handleChange= async (e) => {
    const file = e.target.files[0]
    const storageRef = fb.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setURL(await fileRef.getDownloadURL())
  }

  function handleUpload(e) {
    e.preventDefault();
    const text = e.target.text.value
    if(!text) return;
    db.collection("post").add({
      text: text,
      img: url
    })
    document.getElementById('imglist').innerHTML += '<li><img width="100" src="'+ url + '"><p>asyn load</p></li>'
  }

  useEffect(() => {
    const getPost = async () => {
      const postsCollection = await db.collection('post').get()
      setPosts(postsCollection.docs.map(doc => {
        return doc.data();
      }))
    }
    getPost()
  },[])
    
    return (
      <div className="App">
          <form onSubmit={handleUpload}>
            <input type="text" name="text"/> 
            <input type="file" onChange={handleChange} />
            <button >upload to firebase</button>
          </form>
          <img width="200" src={url} alt="" />
          <ul id="imglist">
            {posts.map(post => {
              return <li key={post.id}>
                <img width="100" src={post.img}/>
                <p>{post.text}</p>
                </li>
            })}
          </ul>
      </div>
    );
}

export default App;
