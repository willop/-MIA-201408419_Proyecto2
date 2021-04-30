import React, { useState } from 'react';
import {Input, ButtonToggle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Views/Stylelogin.css';
import logo from '../Views/Img/logoruleta.png';
import Loginboton from "../Funciones/Funcionboton";
import Cookies from 'universal-cookie';


const cookies = new Cookies()




const Login = (props) => {
    const [datos,setDatos] = useState({
        usuario: '',
        contra: ''
    }) 
    
    const redirec = (event)=>{
        window.location.href = "/CrearUsuario"
    }
    
    
    const enviarDatos = async(event) =>{
        var logg = await Loginboton(datos.usuario,datos.contra)
        console.log(logg)
        if(logg.ID_usuario!==0){
            cookies.set('ID_usuario',logg.ID_usuario,{path:"/"});
            cookies.set('Tipo_rol',logg.Tipo_rol,{path:"/"});
            cookies.set('Username', logg.Username,{path:"/"});
            window.location.href = "/Administrador";
        }else{
            alert('El usuario o password no son correctos')
        }
        //Loginboton(datos.usuario,datos.contra)
        //console.log(datos.username);
        //console.log(datos.password);
    }
    
    const handleuserchange = (event) =>{
        setDatos({...datos,[event.target.name]: event.target.value})
    }
    

        if(cookies.get('ID_usuario')){
            window.location.href="/Administrador"
        }
        
  return (
        <div id='fondo-div-login'>   
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
                    <Button id='btn-olvide-password' color="link">Ovide mi password</Button>
                    <br/>
                    <Button id='btn-crear-usr' onClick={redirec} color="link">Crear nuevo usuario</Button>
            </div>   
        </div>         
  );
};



export default Login;