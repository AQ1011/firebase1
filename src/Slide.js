import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Slide.css';
import { useState, useEffect } from "react";
import { fb } from "./firebase/firebase";
import Typography from '@material-ui/core/Typography';

const db = fb.firestore()

const Slideshow = (props) => {
    
    return (
        <Carousel fade className="slide"
            interval = {3000}
            style={{ height: '50vh', background: '#000', overflow: 'hidden'}}>
            {props.posts.map(post => {
                return <Carousel.Item className='h-100 d-inline-block'>
                    <img
                        className="d-block m-auto h-100"
                        src={post.img}
                        alt="First slide"
                    >
                    </img>
                    <Carousel.Caption>
                        <Typography variant='h5' style={{
                        display: 'inline-block',
                        textShadow: '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                        width: '100%',
                        }}>{post.text}</Typography>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
            </Carousel>
    )
}
export default Slideshow;
