import {useHistory} from "react-router-dom";
import App from "../../App";
import {Card} from "react-bootstrap";
import React from "react";

export const cards = [
  {
    id: 0,
    title: "Homelessness in Newcastle",
    text: "The rate of homelessness in the UK and Newcastle especially has been rising rapidly over the last few years. Please take your time to read this post and try to raise awareness for this issue.",
    numRaised: 103
  },
  {
    id: 1,
    title: "Police Brutality",
    text: "Police violence needs to stop. With the recent attacks on vulnerable people in the US and UK it's clear something needs to change.",
    numRaised: 76
  }
]

const PostCard = ({id, title, text, numRaised, onOpenClick}) => {
  if (text.length > 128) {
    text = `${text.substring(0, 128)}...`
  }

  return (
    <Card border="dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted">
          {numRaised} involved
        </Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        <Card.Link className="justify-content-end" onClick={() => onOpenClick(id)}>Open</Card.Link>
      </Card.Body>
    </Card>
  )
}

const TopicsRoute = () => {
  const history = useHistory();

  const onOpenClick = (id) => {
    history.push(`/topic/${id}`);
  }

  return (
    <div>
      <App>
        {cards.map(({id, title, text, numRaised}) => (
          <PostCard id={id} title={title} text={text} numRaised={numRaised} onOpenClick={onOpenClick}/>
        ))}
      </App>
    </div>
  );
}

export default TopicsRoute;