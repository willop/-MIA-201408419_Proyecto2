import React, { useState } from 'react';
import {InputGroupAddon,InputGroupText,Input, ButtonToggle, Button, InputGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Views/Stylelogin.css';
import logo from '../Views/Img/logoruleta.png';
import Loginboton from "../Funciones/Funcionboton";
import Cookies from 'universal-cookie';
import {FaUserCircle} from "react-icons/fa"
import {Si1Password} from "react-icons/si"
import imgg from "../Components/Imagenperfil"


const cookies = new Cookies()




const Login = (props) => {
    const [datos,setDatos] = useState({
        usuario: '',
        contra: ''
    }) 
    
    const redirec = (event)=>{
        window.location.href = "/CrearUsuario"
    }

    const Prueba = (event)=>{ 
        console.log(datos.usuario+"\nContrasenia:"+datos.contra)
    }
    
    
    const enviarDatos = async(event) =>{
        console.log("datos:"+datos.usuario+"\nContrasenia:"+datos.contra)
        var logg = await Loginboton(datos.usuario,datos.contra)        
        if(logg.ID_usuario===1){         
            cookies.set('ID_usuario',logg.ID_usuario,{path:"/"});
            cookies.set('Tipo_rol',logg.Tipo_rol,{path:"/"});
            cookies.set('Username', logg.Username,{path:"/"});     
            window.location.href = "/Administrador";
        }
        else if(logg.ID_usuario===0){
            alert('El usuario o password no son correctos')
        }
        else{
            cookies.set('ID_usuario',logg.ID_usuario,{path:"/"});
            cookies.set('Tipo_rol',logg.Tipo_rol,{path:"/"});
            cookies.set('Username', logg.Username,{path:"/"});
            window.location.href = "/Usuario";
        }
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
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><FaUserCircle /></InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username"  onChange={handleuserchange} name="usuario" />
                    </InputGroup>
                    
                <br />
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                                <InputGroupText><Si1Password/></InputGroupText>
                        </InputGroupAddon>
                            <Input placeholder="Password" type="password" onChange={handleuserchange} name="contra" />
                    </InputGroup>
                <br/>
                    <div id='Login-boton'>
                        <ButtonToggle color="primary" onClick={enviarDatos} >Login</ButtonToggle>  
                    </div>  
                    <Button id='btn-olvide-password' onClick={Prueba} color="link">Ovide mi password</Button>
                    <br/>
                    <Button id='btn-crear-usr' onClick={redirec} color="link">Crear nuevo usuario</Button>
            </div>   
        </div>         
  );
};



export default Login;

