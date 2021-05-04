//import React from 'react';

import { Input, ButtonToggle } from 'reactstrap';
import './StyleUsuario.css'
import { BiUserPlus, BiHome } from "react-icons/bi"
import { MdPayment } from "react-icons/md"
import Cookies from 'universal-cookie';
//import GetInfo from '../Funciones/FuncionInfoPerfil'
import imgg from "./Img/apuestas.png"
import { useState,useEffect } from 'react';

const cookies = new Cookies();
        

function Usuario(props) {

    const[img,setImg] = useState('')

    useEffect(() => {
        var iden = cookies.get('ID_usuario') + "";

        console.log("Quiero el identificador de mi cookie " + iden);
        var url = "http://localhost:4000/DatosUsuario";
        var inforenviar = {
            'ident': ''+iden
        }

        fetch(
            url,
                {
                    method:'POST',
                    body: JSON.stringify(inforenviar)
                })
        .then(Response =>Response.json())
        .then(function(jsons){
            setImg(jsons)
        })
        .catch(error => console.error('Error:',error))
        
        /*var infomostrar = GetInfo(iden);
        console.log("Probando usestate"+infomostrar)
        console.log("accediendo a la data: "+infomostrar.nombre)
        setImg(infomostrar)
*/
        console.log(img)
    },[]);
    

    const cerrar = () => {
        cookies.remove('ID_usuario', { path: "/" });
        cookies.remove('Username', { path: "/" });
        cookies.remove('Tipo_rol', { path: "/" });
        window.location.href = "./login";
    }

    return (
        <div id="div_container_usuario">

            <div className="slidebar">
                <div >
                <img src={imgg} id="foto_preview"  / >                
                </div>
                <ul>
                    <header>{img.Nombre}</header>
                    <header>Hola</header>
                    <li><BiUserPlus />   Perfil</li>
                    <li><BiHome />   Inicio</li>
                    <li><MdPayment />   Membresia</li>
                </ul>
            </div>
            <ButtonToggle color="primary" onClick={cerrar} >Cerrar sesion</ButtonToggle>
            <ButtonToggle color="primary" onClick={cerrar} >Cerrar sesion</ButtonToggle>
            <ButtonToggle color="primary" onClick={cerrar} >Cerrar sesion</ButtonToggle>
            <div id="div_img">
                <img src={img.FotoUsuario} width="500px" />
            </div>
        </div>
    );
}

export default Usuario;