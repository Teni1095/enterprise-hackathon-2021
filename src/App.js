import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import "./App.css";

function App({showNavbar = true, children}) {
  const history = useHistory();

  return (
    <div className="App">
      {showNavbar && (
        <Navbar variant="dark" bg="dark">
          <Navbar.Brand>Raising Awareness</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <span className="material-icons add-icon" onClick={() => history.push("/topic/new")}>add</span>
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
