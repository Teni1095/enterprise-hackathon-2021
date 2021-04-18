import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import App from "../../App";
import {createTopic} from "../login/firebaseConfig";

const CreateTopicRoute = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  return (
    <App>
      <div className="create-topic-route">
        <Form>
          <Form.Group controlId="formTopicTitle">
            <Form.Label>Topic Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(event) => {
              setTitle(event.target.value);
            }}/>
          </Form.Group>
          <Form.Group controlId="formTopicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" rows={10} value={description} onChange={(event) => {
              setDescription(event.target.value);
            }}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={async () => {
            await createTopic(title, description);
            history.push("/");
          }}>
            Submit
          </Button>
        </Form>
      </div>
    </App>
  )
}

export default CreateTopicRoute;