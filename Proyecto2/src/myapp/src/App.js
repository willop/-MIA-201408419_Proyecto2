import React from 'react';
import Login from './Views/Login';
import Admin from './Views/Administrador'
import {
  Switch,
  Route,
  BrowserRouter,
  Link,
  Router,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route
        path='/login'
        render={(props) => <Login {...props}/>}
      />
      <Redirect from ="/" to ='/login' />
    </BrowserRouter>
  );
}

export default App;
