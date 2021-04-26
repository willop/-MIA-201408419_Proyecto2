import React, { Fragment,useState } from 'react';
import {Input, ButtonToggle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylelogin.css';
import logo from './Img/logoruleta.png';
import Loginboton from "../Funciones/Funcionboton";
import Cookies from 'universal-cookie';


const cookies = new Cookies()

const Login = (props) => {
    const [datos,setDatos] = useState({
        usuario: '',
        contra: ''
    }) 
    
    
    const enviarDatos = async(event) =>{
        var logg = await Loginboton(datos.usuario,datos.contra)
        console.log(logg)
        cookies.set('ID_usuario',logg.ID_usuario,{path:"/"});
        cookies.set('Tipo_rol',logg.Tipo_rol,{path:"/"});
        cookies.set('Username', logg.Username,{path:"/"});
        window.location.href = "./Administrador";
        //Loginboton(datos.usuario,datos.contra)
        //console.log(datos.username);
        //console.log(datos.password);
    }
    
    const handleuserchange = (event) =>{
        setDatos({...datos,[event.target.name]: event.target.value})
    }

  return (
        <div id='Login'>
            <br/>
            <div>
                <img src={logo} id="Logo-login"/>
            </div>
            <br/>
                <Input placeholder="Username"  onChange={handleuserchange} name="usuario" />
            <br />
                <Input placeholder="Password" type="password" onChange={handleuserchange} name="contra" />
            <br/>
                <div id='Login-boton'>
                    <ButtonToggle color="primary" onClick={enviarDatos} >Login</ButtonToggle>  
                </div>  
                <a href="www.google.com" id='olvide-password'>Olvide mi password</a>
        </div>       
  );
};



export default Login;