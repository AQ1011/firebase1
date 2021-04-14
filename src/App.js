import {storage} from "./firebase/firebase";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';


const App = () => {

  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.file[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  }

  function getImage(e){
    const image = storage.ref("images").child()
  }
    
    return (
      <div className="App">
          <form onSubmit={handleUpload}>
            <input type="text"/> 
            <input type="file" onChange={handleChange} />
            <button disabled={!file}>upload to firebase</button>
          </form>
          <Button variant="primary">Get Images</Button>
          <img src={url} alt="" />
      </div>
    );
}

export default App;
