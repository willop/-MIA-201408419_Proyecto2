import React, { Component, useState } from 'react';
import {Input, ButtonToggle, Button, Form, FormGroup, Label, FormFeedback, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleCrearUsuario.css';
import CrearNuevoUsuario from '../Funciones/FuncionCrearNuevoUsuario';
import { ImagePicker } from 'react-file-picker'


const CrearUsuario  =(props) => {
    
    
    const [datoss, setDatos]=useState({
        Username: '',
        Password: '',
        Nombre: '',
        Apellido: '',
        Fecha_nacimiento: '',
        Correo_electronico:'',
        file:''
    })





    const BotonCrearUsuario =async(event) =>{
        event.preventDefault()
        var logg = await CrearNuevoUsuario(datoss.Username,datoss.Password,datoss.Nombre,datoss.Apellido,datoss.Fecha_nacimiento,datoss.Correo_electronico,datoss.file);
        console.log("retorno de funcion")
        console.log(logg)
        if(logg.Confirmacion==1){
            window.location.href = "/login"
        }
    }



    const handleInputChange = (event) =>{
        setDatos({...datoss,[event.target.name]: event.target.value})
    }






    /*
    const handleReaderLoaded = (event) => {
        let binaryString = event.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

*/

    const filesSelectedHandler = async(event) =>{
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        console.log(base64)
        datoss.file= base64
        console.log(datoss.Username)
        console.log(datoss.file)
    }


    const convertobase64 =(file)=>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload=()=>{
                resolve(fileReader.result)
            };

            fileReader.onerror =(error) =>{
                reject(error);
            }
        });
    }




        return (
            <div id="fondo_divx">
                <div id="Contenedor_formulario">
                    <div id="Formulario">
                        <br/>
                        <h3><label >Usuario</label></h3>
                        <Input onChange={handleInputChange} placeholder="Username"  name="Username"  />
                        <br/>
                        <h3><label >Password</label></h3>
                        <Input  onChange={handleInputChange} placeholder="Password" name="Password"/>
                        <br/>
                        <h3><label >Nombre</label></h3>
                        <Input name="Nombre" onChange={handleInputChange} placeholder="Nombre" />
                        <br/>
                        <h3><label >Apellido</label></h3>
                        <Input  name="Apellido" onChange={handleInputChange} placeholder="Apellido" />
                        <br/>
                        <h3><label >Fecha de nacimiento</label></h3>
                        <Input type="date" name="Fecha_nacimiento" onChange={handleInputChange} placeholder="Fecha de nacimiento" />
                        <br/>
                        <h3><label >Correo electronico</label></h3>
                        <Input name="Correo_electronico" onChange={handleInputChange} placeholder="Correo electronico" />
                        <br/>
                            <input type="file" name="file" id="file" onChange={filesSelectedHandler} accept=".jpg, .png, .jpeg"/>                                                           
                        <br/>                       
                    </div> 
                    <div id="boton_crear_usuario">
                        <ButtonToggle onClick={BotonCrearUsuario}  color='primary'>Crear Usuario</ButtonToggle>    
                    </div>
                                
                </div>
            </div>
        );
}

export default CrearUsuario;