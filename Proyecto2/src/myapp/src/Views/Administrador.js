
import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Views/StyleAdmin.css';
import Cookies from 'universal-cookie';
import { BiUserPlus, BiHome,BiCalendar } from "react-icons/bi";
import { MdPayment,MdDateRange, MdClass } from "react-icons/md";
import { GiChampions,GiSoccerBall,GiExitDoor } from "react-icons/gi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import HomeAdmin from "../Components/InicioAdmin"
import Formulario from "../Components/FormularioUsuario"
import imgg from "./Img/apuestas.png"
//import Funinfoadmin from '../Funciones/FuncionInfoAdmin'



const cookies = new Cookies();

function Administrador(props) {

  const [switchComp, setSwitch] = useState(0);
  const [Informacion1, setInfoadmin1]= useState();
  const [Informacion2, setInfoadmin2]= useState();
  const [Informacion3, setInfoadmin3]= useState();

  function Switchdiv(event, param){
    getdatosadmin()
    console.log("hola desde "+param)
    setSwitch(param)
}

    const getdatosadmin= async (event) =>{
      var retorno
      var url = "http://localhost:4000/GetDatos";
      await fetch(url)
      .then(Response =>Response.json())
      .then(function(jsons){
          retorno = jsons
          setInfoadmin1(retorno[0])
          setInfoadmin2(retorno[1])
          setInfoadmin3(retorno[2])
          
      })
      .catch(error => console.error('Error:',error))
      console.log(retorno[0])
      //setInfoadmin(retorno[0].Membresia_Tipo,retorno[0].Membresia_cantida,retorno[0].Membresia_total)
    }


function Componente () {
        //home
  if (switchComp===1) {
      return <Formulario/>
        //perfil
  } else if (switchComp===2) {
      return <HomeAdmin info1={Informacion1} info2={Informacion2}  info3={Informacion3} total={Informacion1}/>
      
  } else if (switchComp===3) {
      return ""
  } else if (switchComp===4) {
      return ""
      
  } else if (switchComp===5) {
      return ""

  } else if (switchComp===6) {
      return ""
      
  } else if (switchComp===7) {
      return ""

  } else if (switchComp===8) {
      return ""
      
  } else if (switchComp===9) {
      return ""
  }else{
    return ""
  }
  

}

  const  cerrar=() =>{
    cookies.remove('ID_usuario',{path:"/"});
    cookies.remove('Username',{path:"/"});
    cookies.remove('Tipo_rol',{path:"/"});
    window.location.href="./login";
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
          <li onClick={(e)=> {Switchdiv(e, 1)}}><BiUserPlus />   Perfil</li>
          <li onClick={(e)=> {Switchdiv(e, 2)}}><BiHome />   Inicio</li>
          <li onClick={(e)=> {Switchdiv(e, 3)}}><MdPayment />   Membresia</li>
          <li onClick={(e)=> {Switchdiv(e, 4)}}><BiCalendar />   Jornadas</li>
          <li onClick={(e)=> {Switchdiv(e, 5)}}><MdDateRange />   Temporada</li>
          <li onClick={(e)=> {Switchdiv(e, 6)}}><MdClass />   Resultados</li>
          <li onClick={(e)=> {Switchdiv(e, 7)}}><GiChampions />   Recompensas</li>
          <li onClick={(e)=> {Switchdiv(e, 8)}}><GiSoccerBall />   Deportes</li>
          <li onClick={(e)=> {Switchdiv(e, 9)}}><HiOutlineChartSquareBar />   Reportes</li>
          <li id="Close_session" onClick={cerrar} ><GiExitDoor />   Cerrar sesion</li>
        </ul>
      </div>
      <div id="Componente">
        <Componente/>
      </div>
      
    </div>
  );
}


export default Administrador;