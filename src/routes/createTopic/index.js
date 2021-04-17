import {Button, Form} from "react-bootstrap";
import App from "../../App";

const CreateTopicRoute = () => {
  return (
    <App>
      <div className="create-topic-route">
        <Form>
          <Form.Group controlId="formTopicTitle">
            <Form.Label>Topic Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title"/>
          </Form.Group>
          <Form.Group controlId="formTopicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" rows={10}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </App>
  )
}

export default CreateTopicRoute;