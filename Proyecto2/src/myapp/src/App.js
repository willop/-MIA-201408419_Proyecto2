import React from 'react';
import Login from './Views/Login';
import Admin from './Views/Administrador'
import CrearUsuario from './Views/CrearUsuario'
import Usuario from './Views/Usuario'
import FormularioUsuario from "./Components/FormularioUsuario"
import HomeAdmin from "./Components/InicioAdmin"



import {
  Route,
  BrowserRouter,

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
      <Route
        exact path='/Usuario'
        render={(props) => <Usuario {...props}/>}
      />
      <Route
        exact path='/Prueba2'
        render={(props) => <HomeAdmin {...props}/>}
      />
      <Route
        exact path='/Prueba'
        render={(props) => <FormularioUsuario {...props}/>}
      />
    </BrowserRouter>
  );
}

export default App;
