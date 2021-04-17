import {useEffect} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import App from "../../App";
import "./index.css"
import {getCurrentUser, getRedirectResult, signIn} from "./firebaseConfig";

const LoginRoute = () => {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const redirectUser = await getRedirectResult();
      const currentUser = await getCurrentUser();
      if (currentUser !== null || redirectUser !== null) {
        history.push("/");
      }
    })();
  }, []);

  return (
    <App showNavbar={false}>
      <div className="login-route">
        <Form>
          {/*<Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>*/}
          <Button variant="primary" type="submit" onClick={async () => {
            const uc = await signIn();
            console.log(uc);
          }}>
            Sign-in with Google
          </Button>
        </Form>
      </div>
    </App>
  )
}

export default LoginRoute;