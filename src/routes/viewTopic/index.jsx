import React, {useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import App from "../../App";
import {getAllTopics, increaseInvolvedCount} from "../login/firebaseConfig";
import {cards} from "../topics";

import "./index.css";

const Message = ({username, text}) => {
  return (
    <div className="message">
      <span className="username">{username}</span>
      <span className="text">{text}</span>
    </div>
  )
}

const messages = [
  {username: "Tom", text: "Hello!"},
  {username: "Mel", text: "Hi Tom!"},
  {username: "Tom", text: "Hi Mel! How are you doing?"}
]

const ViewTopicRoute = () => {
  const {topicId} = useParams();
  const [topic, setTopic] = useState();

  useEffect(() => {
    (async () => {
      const topics = await getAllTopics();
      const topic = topics.find(({id}) => id === topicId);
      setTopic(topic);
    })()
  }, [topic]);

  return (
    <App>
      {topic !== undefined ? (
        <div className="view-topic-route">
          <Card border="dark">
            <Card.Body>
              <Card.Title>{topic.title}</Card.Title>
              <Card.Subtitle className="text-muted">
                {topic.involvedCount ?? 0} involved
              </Card.Subtitle>
              <Card.Text>{topic.description}</Card.Text>
              <Card.Link onClick={async () => {
                await increaseInvolvedCount(topicId);
                setTopic({...topic});
              }}>Get Involved!</Card.Link>
            </Card.Body>
          </Card>
          <div className="chat">
            <div className="messages">
              {messages.map(({username, text}) => <Message username={username} text={text} /> )}
            </div>
            <div className="input">
              <Form>
                <Form.Control type="text" placeholder="Message"/>
                <Button>Send</Button>
              </Form>
            </div>
          </div>
        </div>
      ) : "Topic not found"}
    </App>
  )
}

export default ViewTopicRoute;