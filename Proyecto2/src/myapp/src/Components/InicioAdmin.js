import React, {useState} from 'react';
import "./StyleHomeAdmin.css"
import {Input,Card, CardTitle, CardText,FormGroup, Label } from 'reactstrap';
import CargaMasivafun from "../Components/EnvioCargaMasiva"

const yaml = require('js-yaml');


function InicioAdmin(props) {

    const[valor, setvalor]=useState('')



    const CargaMasiva=async(e)=>{
        console.log("Hola mundos")
        var readd = new FileReader();
        if (e.target.files[0]){
          readd.readAsText(e.target.files[0])
          readd.onload = () => {
            try {
              var archivo = readd.result;
              console.log(archivo)
              //setvalor(Object.values(archivo))
              CargaMasivafun(archivo)
            } catch (error) {
              console.log(error)
            }
          }
        }
    
      }




    return (
        <div>
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
      
        </div>
      </center>
        </div>
    );
}

export default InicioAdmin;