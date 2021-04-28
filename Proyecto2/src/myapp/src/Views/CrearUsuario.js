import React, { Component, useState } from 'react';
import {Input, ButtonToggle, Button, Form, FormGroup, Label, FormFeedback, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleCrearUsuario.css';
import CrearNuevoUsuario from '../Funciones/FuncionCrearNuevoUsuario';



const CrearUsuario  =(props) => {
    
    
    const [datoss, setDatos]=useState({
        Username: '',
        Password: '',
        Nombre: '',
        Apellido: '',
        Fecha_nacimiento: '',
        Correo_electronico:''
    })





    const BotonCrearUsuario =async(event) =>{
        event.preventDefault()
        var logg = await CrearNuevoUsuario(datoss.Username,datoss.Password,datoss.Nombre,datoss.Apellido,datoss.Fecha_nacimiento,datoss.Correo_electronico);
        console.log("retorno de funcion")
        console.log(logg)
        if(logg.Confirmacion==1){
            window.location.href = "/login"
        }
    }

    const handleInputChange = (event) =>{
        setDatos({...datoss,[event.target.name]: event.target.value})
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
                    </div> 
                    <div id="boton_crear_usuario">
                        <ButtonToggle onClick={BotonCrearUsuario}  color='primary'>Crear Usuario</ButtonToggle>    
                    </div>
                                
                </div>
            </div>
        );
}

export default CrearUsuario;