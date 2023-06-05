import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import React, { useEffect, useRef, useState } from 'react'
import Carousel from './Carousels';
import { Button, Card, Col, Container, Form, InputGroup, Overlay, Row } from 'react-bootstrap'
import apiDeputados from '../pages/services/apiDeputados'
import { BsQuestionCircle } from "react-icons/bs";
import Link from 'next/link'
import Footer from './Footer';

const HomeScreen = (props) => {

  return (
    
    <div style={{ margin: "6vh 0"}}>
        <Container>
            <Menu/>
            {props.children}
        </Container>
        <Footer/>
    </div>

  )
}

export default HomeScreen