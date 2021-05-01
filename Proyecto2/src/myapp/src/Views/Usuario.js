//import React from 'react';

import {Input, ButtonToggle } from 'reactstrap';
import './StyleUsuario.css'
import {BiUserPlus,BiHome} from "react-icons/bi"
import {MdPayment} from "react-icons/md"
//rsc
import Cookies from 'universal-cookie';
import React, { Component } from 'react';


const cookies = new Cookies();

class Usuario extends Component {

    cerrar=(event) =>{
        cookies.remove('ID_usuario',{path:"/"});
        cookies.remove('Username',{path:"/"});
        cookies.remove('Tipo_rol',{path:"/"});
        cookies.remove("FotoUsuario",{path:"*/"});
        window.location.href="./login";
    }

    


    render() {
        return (
            <div id="div_container_usuario">
            
            <div class="slidebar">
                <header>Usuario</header>
                <ul>
                    <li><BiUserPlus/>   Perfil</li>
                    <li><BiHome/>   Inicio</li>
                    <li><MdPayment/>   Membresia</li>
                </ul>
            </div>    
            <ButtonToggle color="primary" onClick={()=>this.cerrar()} >Cerrar sesion</ButtonToggle> 
            <ButtonToggle color="primary" onClick={()=>this.cerrar()} >Cerrar sesion</ButtonToggle> 
            <ButtonToggle color="primary" onClick={()=>this.cerrar()} >Cerrar sesion</ButtonToggle> 

            
        </div>
        );
    }
}

export default Usuario;


