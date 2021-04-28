import {Input, ButtonToggle } from 'reactstrap';
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Views/StyleAdmin.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Administrador extends Component{

  cerrar=() =>{
    cookies.remove('ID_usuario',{path:"/"});
    cookies.remove('Username',{path:"/"});
    cookies.remove('Tipo_rol',{path:"/"});
    window.location.href="./login";
}

componentDidMount(){
  if(!cookies.get('ID_usuario')){
      window.location.href="/login"
  } 
}
render(){

  console.log("ID_usuario: "+cookies.get('ID_usuario'));
  console.log("Username: "+cookies.get('Username'));
  console.log("Tipo_rol: "+cookies.get('Tipo_rol'));


  return (  
        <div id='View-Administrador'>
            <h1>Hola desde el administrador</h1>
            <ButtonToggle color="primary" onClick={()=>this.cerrar()} >Cerrar sesion</ButtonToggle>  
        </div>       
  );
};

}

export default Administrador;