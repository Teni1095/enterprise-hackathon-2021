import React from 'react';

import "./App.css";
import {Card, Container, Navbar} from "react-bootstrap";

const cards = [
  {
    title: "Homelessness in Newcastle",
    text: "The rate of homelessness in the UK and Newcastle especially has been rising rapidly over the last few years. Please take your time to read this post and try to raise awareness for this issue.",
    numRaised: 103
  },
  {
    title: "Police Brutality",
    text: "Police violence needs to stop. With the recent attacks on vulnerable people in the US and UK it's clear something needs to change.",
    numRaised: 76
  }
]

const PostCard = ({title, text, numRaised}) => {
  if (text.length > 128) {
    text = `${text.substring(0, 128)}...`
  }

  return (
    <Card border="dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted">
          {numRaised} people agree
        </Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        <Card.Link className="justify-content-end">Open</Card.Link>
      </Card.Body>
    </Card>
  )
}

function App() {
  return (
    <div className="App">
      <Navbar variant="dark" bg="dark">
        <Navbar.Brand>Raising Awareness</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <span className="material-icons add-icon">add</span>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        {cards.map(({title, text, numRaised}) => (
          <PostCard title={title} text={text} numRaised={numRaised}/>
        ))}
      </Container>
    </div>
  );
}

export default App;
