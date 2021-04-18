import React, {useEffect} from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import "./App.css";
import {getCurrentUser, getRedirectResult, signOut} from "./routes/login/firebaseConfig";

function App({showNavbar = true, children}) {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      if (currentUser === null) {
        history.push("/login");
      }
    })();
  }, []);

  return (
    <div className="App">
      {showNavbar && (
        <Navbar variant="dark" bg="dark" expand="xl" collapseOnSelect>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand>Raising Awareness</Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            <span className="material-icons add-icon" onClick={() => history.push("/topic/new")}>add</span>
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={async () => {
                await signOut();
                history.push("/login");
              }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      <Container>
        {children}
      </Container>
    </div>
  );
}

export default App;
