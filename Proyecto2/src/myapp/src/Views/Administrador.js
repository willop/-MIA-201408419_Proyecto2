import {Input,Card, CardTitle, CardText,FormGroup, Label } from 'reactstrap';
import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Views/StyleAdmin.css';
import Cookies from 'universal-cookie';
import { BiUserPlus, BiHome,BiCalendar } from "react-icons/bi";
import { MdPayment,MdDateRange, MdClass } from "react-icons/md";
import { GiChampions,GiSoccerBall,GiExitDoor } from "react-icons/gi";
import { HiOutlineChartSquareBar } from "react-icons/hi";

import imgg from "./Img/apuestas.png"
import { useEffect } from 'react';

const yaml = require('js-yaml');

const cookies = new Cookies();

function Administrador(props) {

  const[valor, setvalor]=useState('')



  const  cerrar=() =>{
    cookies.remove('ID_usuario',{path:"/"});
    cookies.remove('Username',{path:"/"});
    cookies.remove('Tipo_rol',{path:"/"});
    window.location.href="./login";
}

  const CargaMasiva=async(e)=>{
    console.log("Hola mundos")
    var readd = new FileReader();
    if (e.target.files[0]){
      readd.readAsText(e.target.files[0])
      readd.onload = () => {
        try {
          var archivo = yaml.load(readd.result)
          console.log(archivo)
          setvalor(archivo)
        } catch (error) {
          console.log(error)
        }
      }
    }

  }
/*
if(!cookies.get('ID_usuario')){
  window.location.href="/login"
} */

console.log("ID_usuario: "+cookies.get('ID_usuario'));
console.log("Username: "+cookies.get('Username'));
console.log("Tipo_rol: "+cookies.get('Tipo_rol'));


  return (
    <div id="div_container_admin">
      <div className="slidebar">
        <div >
          <img src={imgg} id="foto_preview" />
        </div>
        <ul>
          <header>Hola</header>
          <li><BiUserPlus />   Perfil</li>
          <li><BiHome />   Inicio</li>
          <li><MdPayment />   Membresia</li>
          <li><BiCalendar />   Jornadas</li>
          <li><MdDateRange />   Temporada</li>
          <li><MdClass />   Resultados</li>
          <li><GiChampions />   Recompensas</li>
          <li><GiSoccerBall />   Deportes</li>
          <li><HiOutlineChartSquareBar />   Reportes</li>
          <li id="Close_session" onClick={cerrar} ><GiExitDoor />   Cerrar sesion</li>
        </ul>
      </div>
      <div id="Informacion">
        <div id="Capital_temporada">
          <center>
            <Card body inverse color="info">
              <CardTitle tag="h5">Capital de Temporada</CardTitle>
              <CardText>
                <h1>1234</h1>
              </CardText>
            </Card>
          </center>
        </div>
        <br />
        <div id="div_cant_membresias">
          <Card body inverse style={{ backgroundColor: '#D47907', borderColor: '#333' }}>
            <CardTitle tag="h5">Capital de Temporada</CardTitle>
            <CardText>
              <h1>1234</h1>
            </CardText>
          </Card>
          <Card body inverse style={{ backgroundColor: '#9D9D9D', borderColor: '#333' }}>
            <CardTitle tag="h5">Capital de Temporada</CardTitle>
            <CardText>
              <h1>1234</h1>
            </CardText>
          </Card>
          <Card body inverse color="warning">
            <CardTitle tag="h5">Capital de Temporada</CardTitle>
            <CardText>
              <h1>1234</h1>
            </CardText>
          </Card>
        </div>
        <br/>
      </div>
      <center>
        <div id="div_CargaMasiva">
        <FormGroup>
        <Label for="Carga masiva">Carga Masiva</Label>
        <Input type="file" name="file" onChange={CargaMasiva}  id="exampleFile" />
      </FormGroup>
      <Input disabled="true" value={valor} name="ejemplo"></Input>
        </div>
      </center>
      
    </div>
  );
}


export default Administrador;