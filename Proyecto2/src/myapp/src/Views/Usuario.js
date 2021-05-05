import React from 'react';
import { Input, ButtonToggle } from 'reactstrap';
import './StyleUsuario.css'
import { BiUserPlus, BiHome } from "react-icons/bi"
import { MdPayment } from "react-icons/md"
import Cookies from 'universal-cookie';
//import GetInfo from '../Funciones/FuncionInfoPerfil'
import imgg from "./Img/apuestas.png"
import { useState,useEffect } from 'react';
import { GiExitDoor } from "react-icons/gi";
import FormularioPerfil from "../Components/FormularioUsuario"



const cookies = new Cookies();
        

function Usuario(props) {

    const[img,setImg] = useState('')
    const[estadodiv, setEstadodiv] = useState(0)

    
    function Switchdiv(event, param){
        console.log("hola desde "+param)
        
        switch (param) {
            case "Perfil":
                setEstadodiv(1)
                break;
            case "Inicio":
                setEstadodiv(2)
                break;
            case "Membresia":
                setEstadodiv(3)    
                break;
            default:
                break;
        }
    }

    



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



    function Componente () {
        
        if (estadodiv===1) {
            
            return <FormularioPerfil name=""/>
        } else if (estadodiv===2) {
            console.log("Accion en membresia")
            return ""
        } else if (estadodiv===3) {
            console.log("Accion en membresia")
            return ""
        }
            return ""

    }
    

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
                    <li name="Perfil" onClick={(e)=> {Switchdiv(e, "Perfil")}}><BiUserPlus />   Perfil</li>
                    <li name="Inicio" onClick={(e)=> {Switchdiv(e, "Inicio")}}><BiHome />   Inicio</li>
                    <li name="Membresia"onClick={(e)=> {Switchdiv(e, "Membresia")}}><MdPayment />   Membresia</li>
                    <li id="Close_session" onClick={cerrar} ><GiExitDoor />   Cerrar sesion</li>
                </ul>
            </div>
            <div id="div_img">
                <img src={img.FotoUsuario} width="500px" />
            </div>
            <div id="Contenido_usuario">
                <Componente />
            </div>
        </div>
    );
}

export default Usuario;