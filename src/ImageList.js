import {fb} from "./firebase/firebase";
import React, { useState, useEffect } from "react";
import 'firebase/firestore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
    post:{
        padding: '10px',
        marginTop: '16px',
        marginBottom: '16px',
        backgroundColor: 'white'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },    
    mybutton: {
        marginTop: '16px',
        borderRadius: '99vw',
        background: '#448aff',
        color: 'white'
    },
    toTopBtn: {
        borderRadius: '1000px',
        background: '',
        position: 'sticky',
        right: '1vw',
        bottom: '1vh'
    }
});

const db = fb.firestore()

const ImageList = () => {
    
    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [lastDoc, setLastDoc] = useState();
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => { 
        db.collection('posts')
            .orderBy("dateAdded","desc")
            .limit(10)
            .get()
            .then((collections)=> {
                updateState(collections);
            })
    },[])
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
    const fetchMore = () => {
        setLoading(true);
        db.collection('posts')
            .orderBy("dateAdded","desc")
            .startAfter(lastDoc)
            .limit(10)
            .get()
            .then((collections) => {
                updateState(collections)
            })
    }
    const toTop = event =>{        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }
    return(
        <div id="image-list">
                {posts.map(post => {
                  return <Paper  className={classes.post} elevation={3}>
                    <img width="100%" src={post.img}/>
                    <Typography>{post.text}</Typography>
                    </Paper>
                })}
                <div className={classes.center}>                    
                    {loading && <CircularProgress />}
                    {!isEmpty && !loading && <Button className={classes.mybutton} onClick={fetchMore}>More</Button>}
                    {isEmpty && <Typography>No</Typography>}
                </div>
        </div>
    )
}

export default ImageList