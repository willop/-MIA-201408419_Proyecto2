import {Input, ButtonToggle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleAdmin.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

 const cerrarsesion=()=>{
    cookies.remove('ID_usuario',{path:"/"});
    cookies.remove('Username',{path:"/"});
    cookies.remove('Tipo_rol',{path:"/"});
    window.location.href("./");
}

const Administrador = (props) => {
  console.log("ID_usuario: "+cookies.get('ID_usuario'));
  console.log("Username: "+cookies.get('Username'));
  console.log("Tipo_rol: "+cookies.get('Tipo_rol'));


  return (
      
        <div id='View-Administrador'>
            <h1>Hola desde el administrador</h1>
            <ButtonToggle color="primary" onClick={()=>this.cerrarsesion()}>Cerrar sesion</ButtonToggle>  

        </div>       
  );
};

export default Administrador;