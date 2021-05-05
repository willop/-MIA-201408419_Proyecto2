import { React } from 'react';
import { Button, InputGroup, InputGroupAddon, ButtonToggle, Input,InputGroupText } from 'reactstrap';
import "./StyleFormularioUsuario.css";
import imgg from "../Views/Img/apuestas.png"
import { useState } from 'react';
import {MdAddAPhoto} from "react-icons/md"
//import BotonModificar from '../Funciones/FuncionEditarPassword'



function FormularioUsuario(props) {

    const [botonmodificaractivo, setBotonModificarActivo] = useState(false)
    const [camposeditables, setEdit] = useState(false)
    const [DatosFormulario, ssetDatos] = useState({
        Nombre: '',
        Apellido: '',
        Fecha: '',
        Correo: '',
        Membresia: '',
        Password: ''

    })

    const filesSelectedHandler = async (event) => {
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        console.log(base64)
        DatosFormulario.file = base64
        console.log(DatosFormulario.Username)
        console.log(DatosFormulario.file)
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

    const ModificarUsuario = () => {
        setBotonModificarActivo(true);
        setEdit(true)
    }

    const handleuserChange = (event) => {
        ssetDatos({ ...DatosFormulario, [event.target.name]: event.target.value })
        console.log(DatosFormulario)
    }

    const GuardarCambios = () => {
        setBotonModificarActivo(false);
        setEdit(false)
        //alert(Contraseña)
        //BotonModificar()
    }

    return (
        <div id="div_formulario">
            <InputGroup hidden={!camposeditables}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText><MdAddAPhoto /></InputGroupText>
                </InputGroupAddon>
                <input type="file" name="file" id="file" onChange={filesSelectedHandler} accept=".jpg" />
            </InputGroup>
            <img id="div_imagen" src={imgg} hidden={camposeditables} />
            <div id="div_campos">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button>Nombre         </Button>
                    </InputGroupAddon>
                    <Input name="Nombre" onChange={handleuserChange} disabled={!camposeditables} />
                </InputGroup>
                <br /><br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button>Apellido         </Button>
                    </InputGroupAddon>
                    <Input name="Apellido" onChange={handleuserChange} disabled={!camposeditables} />
                </InputGroup>
                <br /><br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button>Fecha de Nacimiento</Button>
                    </InputGroupAddon>
                    <Input name="Fecha" onChange={handleuserChange} disabled={!camposeditables} />
                </InputGroup>
                <br /><br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button>Correo electronico</Button>
                    </InputGroupAddon>
                    <Input name="Correo" onChange={handleuserChange} disabled={!camposeditables} />
                </InputGroup>
                <br /><br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button>Membresia Actual!</Button>
                    </InputGroupAddon>
                    <Input name="Membresia" onChange={handleuserChange} disabled={!camposeditables} />
                </InputGroup>
                <br /><br />
                <InputGroup hidden={!camposeditables}>
                    <InputGroupAddon addonType="prepend">
                        <Button color="warning" >Contraseña</Button>
                    </InputGroupAddon>
                    <Input name="Password" onChange={handleuserChange} />
                </InputGroup>
                <br /><br />
                <div id="Contenedor_boton">
                    <center>
                        <ButtonToggle hidden={botonmodificaractivo} onClick={ModificarUsuario} color="warning">Modificar Datos</ButtonToggle>
                        <br />
                        <ButtonToggle hidden={!botonmodificaractivo} onClick={GuardarCambios} color="danger">Modificar Contraseña</ButtonToggle>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default FormularioUsuario;