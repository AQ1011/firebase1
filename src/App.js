import {fb} from "./firebase/firebase";
import React, { useState, useEffect } from "react";
import 'firebase/firestore';
import Grid from '@material-ui/core/Grid';
import ImageList from './ImageList';
import UploadForm from './UploadForm';
import { makeStyles } from '@material-ui/core/styles';

const App = () => {  

  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateState = (collections) => {
    if(!(collections.size === 0)) {
        const p = collections.docs.map((post)=>post.data());
        const lastDoc = collections.docs[collections.docs.length - 1];
        setPosts(posts => [...posts,...p]);
        setLastDoc(lastDoc);
        setIsEmpty(false);
        setLoading(false);
    } else {
        setIsEmpty(true);
        setLoading(false);
    }
}
    return (
      <div className="App" style={{backgroundColor: '#e3f2fd', minHeight: '100vh'}}>
        <Grid container justify="space-between" >
          <Grid item lg={3}/>
          <Grid item lg={3} md={4}>
              <ImageList />
          </Grid>
          <Grid item lg={3}>
              <UploadForm />
          </Grid>
        </Grid>          
      </div>
    );
}

export default App;
