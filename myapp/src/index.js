import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Login from './Views/Login';
import reportWebVitals from './reportWebVitals';
//import {BrowserRouter} from "react-router-dom";
import ViewAdministrador from './Views/Administrador'
import Administrador from '../../Proyecto2/src/myapp/src/Views/Administrador';



ReactDOM.render(
  /*
  <BrowserRouter>
  <ViewAdministrador />
  </BrowserRouter>,

  <React.StrictMode>
  </React.StrictMode>,
  */
    <App />,
  document.getElementById('root')
 
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
ServiceWorker.unregister();
