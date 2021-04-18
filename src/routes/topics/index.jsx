import {useHistory} from "react-router-dom";
import App from "../../App";
import {Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getAllTopics} from "../login/firebaseConfig";

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

const PostCard = ({id, title, description, involvedCount, onOpenClick}) => {
  if (description.length > 128) {
    description = `${description.substring(0, 128)}...`
  }

  return (
    <Card border="dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted">
          {involvedCount ?? 0} involved
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Link className="justify-content-end" onClick={() => onOpenClick(id)}>Open</Card.Link>
      </Card.Body>
    </Card>
  )
}

const TopicsRoute = () => {
  const [topics, setTopics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let topics = await getAllTopics();
      topics = topics.sort((a, b) => (b.involvedCount ?? 0) - (a.involvedCount ?? 0));
      setTopics(topics);
    })()
  }, []);

  const onOpenClick = (id) => {
    history.push(`/topic/${id}`);
  }

  return (
    <div>
      <App>
        {topics.map(({id, title, description, involvedCount}) => (
          <PostCard id={id} title={title} description={description} involvedCount={involvedCount} onOpenClick={onOpenClick}/>
        ))}
      </App>
    </div>
  );
}

export default TopicsRoute;