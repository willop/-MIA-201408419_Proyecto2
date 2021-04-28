import React from 'react';
import Login from './Views/Login';
import Admin from './Views/Administrador'
import CrearUsuario from './Views/CrearUsuario'
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
        exact path='/login'
        render={(props) => <Login {...props}/>}
      />
      <Route
        exact path='/Administrador'
        render={(props) => <Admin {...props}/>}
      />
      <Route
        exact path='/CrearUsuario'
        render={(props) => <CrearUsuario {...props}/>}
      />
    </BrowserRouter>
  );
}

export default App;
