//import React from 'react';

import {Input, ButtonToggle } from 'reactstrap';
import './StyleUsuario.css'
import {BiUserPlus,BiHome} from "react-icons/bi"
import {MdPayment} from "react-icons/md"
import Cookies from 'universal-cookie';
import React, { Component } from 'react';
import GetInfo from '../Funciones/FuncionInfoPerfil'


const cookies = new Cookies();
var infomostrar

class Usuario extends Component {
    cerrar() {
        cookies.remove('ID_usuario',{path:"/"});
        cookies.remove('Username',{path:"/"});
        cookies.remove('Tipo_rol',{path:"/"});
        window.location.href="./login";
    }
 

    componentWillMount() {
        
        var iden = cookies.get('ID_usuario')+"";
        console.log("Quiero el identificador de mi cookie "+ iden);
        infomostrar = GetInfo(iden);
    }
    



    render() {
        return (
            <div id="div_container_usuario">
            
            <div className="slidebar">
                <header>Usuario</header>
                <ul>
                    <li><BiUserPlus/>   Perfil</li>
                    <li><BiHome/>   Inicio</li>
                    <li><MdPayment/>   Membresia</li>
                    <li> infomostrar.Nombre</li>
                </ul>
            </div>    
            <ButtonToggle color="primary" onClick={this.cerrar} >Cerrar sesion</ButtonToggle> 
            <ButtonToggle color="primary" onClick={this.cerrar} >Cerrar sesion</ButtonToggle> 
            <ButtonToggle color="primary" onClick={this.cerrar} >Cerrar sesion</ButtonToggle> 
            <img src={infomostrar.FotoUsuario} width="500px"/>

        </div>
        );
    }
}

export default Usuario;

