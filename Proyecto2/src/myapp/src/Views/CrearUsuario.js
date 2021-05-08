
import React, { useState } from 'react';
import {InputGroupAddon,InputGroupText,Input, ButtonToggle, InputGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleCrearUsuario.css';
import CrearNuevoUsuario from '../Funciones/FuncionCrearNuevoUsuario';
import Logo from './Img/apuestas.png';
import {BiUserPlus} from "react-icons/bi"
import {FaUserEdit} from "react-icons/fa"
import {Si1Password,SiGmail} from "react-icons/si"
import {MdDateRange,MdAddAPhoto} from "react-icons/md"
import Cookies from 'universal-cookie';


const CrearUsuario = (props) => {


    const [datoss, setDatos] = useState({
        Username: '',
        Password: '',
        Nombre: '',
        Apellido: '',
        Fecha_nacimiento: '',
        Correo_electronico: '',
        file: ''
    })





    const BotonCrearUsuario = async (event) => {
        event.preventDefault()
        var logg = await CrearNuevoUsuario(datoss.Username, datoss.Password, datoss.Nombre, datoss.Apellido, datoss.Fecha_nacimiento, datoss.Correo_electronico, datoss.file);
        console.log("retorno de funcion")
        console.log(logg)
        if (logg.Confirmacion === 1) {
            window.location.href = "/login"
        }
    }



    const handleInputChange = (event) => {
        setDatos({ ...datoss, [event.target.name]: event.target.value })
    }


    /*
    const handleReaderLoaded = (event) => {
        let binaryString = event.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

*/

    const filesSelectedHandler = async (event) => {
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        console.log(base64)
        datoss.file = base64
        console.log(datoss.Username)
        console.log(datoss.file)
    }

    const convertobase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            };

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }




    return (
        <div id="fondo_divx">
            <div id="Contenedor_formulario">
                <div id="Formulario">
                    <img src={Logo} id="logoquiniela" />
                    <div id="FormularioCompacto">
                        <br />
                        <h3><label >Usuario</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><BiUserPlus id="BiUserPlus"/></InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={handleInputChange} placeholder="Username" name="Username" />
                        </InputGroup>
                        
                        <br />
                        <h3><label >Password</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><Si1Password/></InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={handleInputChange} placeholder="Password" name="Password" />
                        </InputGroup>
                        
                        <br />
                        <h3><label >Nombre</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><FaUserEdit/></InputGroupText>
                            </InputGroupAddon>
                            <Input name="Nombre" onChange={handleInputChange} placeholder="Nombre" />
                        </InputGroup>
                        
                        <br />
                        <h3><label >Apellido</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><FaUserEdit/></InputGroupText>
                            </InputGroupAddon>
                            <Input name="Apellido" onChange={handleInputChange} placeholder="Apellido" />
                        </InputGroup>
                        
                        <br />
                        <h3><label >Fecha de nacimiento</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdDateRange/></InputGroupText>
                            </InputGroupAddon>
                            <Input type="date" name="Fecha_nacimiento" onChange={handleInputChange} placeholder="Fecha de nacimiento" />
                        </InputGroup>
                        
                        <br />
                        <h3><label >Correo electronico</label></h3>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><SiGmail/></InputGroupText>
                            </InputGroupAddon>
                            <Input name="Correo_electronico" onChange={handleInputChange} placeholder="Correo electronico" />
                        </InputGroup>
                        
                        <br /> <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdAddAPhoto/></InputGroupText>
                            </InputGroupAddon>
                            <input type="file" name="file" id="file" onChange={filesSelectedHandler} accept=".jpg" />
                        </InputGroup>
                        
                        <br />
                    </div>
                </div>
                <div id="boton_crear_usuario">
                    <ButtonToggle onClick={BotonCrearUsuario} color='primary'>Crear Usuario</ButtonToggle>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;