package main 

import (
	"fmt"
	"encoding/json"
	"time"
	"bytes"
	"io/ioutil"
	"os"
	"strings"
	"encoding/base64"
	"image/gif"
	"image/png"
	"image/jpeg"
	"database/sql"
	"log"
	"github.com/mitchellh/mapstructure"
    "github.com/spf13/viper"
	"strconv"
	"net/http"
	 "github.com/gorilla/mux"
	"html/template"
	_ "github.com/mattn/go-oci8"
	//"strconv"
)

//************************************************************************************************
/***************************************************************************************************
//struct para la carga masiva*/


type Struct_Usuario struct {
	Nombre						string
	Apellido					string
	Password					string	
	Username					string	
	Resultados[]				Struct_Resultados
}

type Struct_Resultados struct{
	Temporada					string
	Tier						string
	Jornadas[]					Struct_Jornadas
}

type Struct_Jornadas struct{
	Jornada						string
	Predicciones[]				Struct_Predicciones
}

type Struct_Predicciones struct{
	Deporte						string
	Fecha						string
	Visitante					string
	Local						string
	Prediccion					Struct_Prediccion
	Resultado					Struct_Resultado
}

type Struct_Prediccion struct{
	Visitante					int
	Local						int
}

type Struct_Resultado struct{
	Visitante					int
	Local						int
}




/********************************* Estructuras para las bases de datos **************************/
type return_Login struct{
	ID_usuario 					int
	Tipo_rol 					int
	Username 					string
	
}

type return_perfil struct{
	Nombre 						string
	Apellido 					string
	FechaNacimiento 			string
	CorreoElectronico 			string
	FotoUsuario 				string
	TipoMembresia 				int
}

type return_nuevoUsuario struct{
	Confirmacion 				int
}


//********************* Estructuras desde react *********************************
//prueba
type Estructura struct{
	Id_estado 					int
	Estado_color 				string
}

// Login
type req_Login struct {
	USERNAME 					string `json:"user"`
	PASSWORD 					string	`json:"pass"`
}

//  Insert
type req_Create_new_User struct{
	Create_Username 			string  `json:"username"`
	Create_password 			string	`json:"password"`
	Create_Nombre 				string	`json:"nombre"`
	Create_Apellido 			string	`json:"apellido"`
	Create_fecha_nacimiento 	string	`json:"fecha_nacimiento"`
	Create_fecha_registro		string	
	Create_Correo_electronico 	string	`json:"correo"`
	Create_foto_perfil			string	`json:"fileimg"`
	Create_cliente_rol			int		
}

type req_Update struct{
	Update_Username				string `json:"Username"`
	Update_Nombre 				string `json:"Nombre"`
	Update_Apellido				string `json:"Apellido"`
	Update_Fecha				string `json:"Fecha"`
	Update_Correo				string `json:"Correo"`
	Update_Password				string `json:"Password"`
	Update_File					string `json:"File"`
}

//	Info usuario
type req_Usuario struct{
	Identificador				string	`json:"ident"`
}


//info cargamasiva
type req_cargaMasiva struct{
	DataCMasiva					string `json:"Data"`
}

/*********************************************** fin estructuras *****************************/

//********************************************* funciones API ********************************************
func PostCargaMasiva(w http.ResponseWriter, req *http.Request){
	fmt.Println("Carga masiva\n\n\n\n\n")	
	var datos req_cargaMasiva
	reqBody,_ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody, &datos)
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)

	var vaciovec return_nuevoUsuario
	vaciovec.Confirmacion=1
	json.NewEncoder(w).Encode(vaciovec)
	LeerCargamasiva(datos.DataCMasiva)
	//fmt.Println(datos.DataCMasiva)
}


func PostModificarPassword(w http.ResponseWriter, req *http.Request){
	fmt.Println("Consulta update\n\n\n\n\n")	
	var datos req_Update
	reqBody,_ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody, &datos)
	fmt.Println(datos.Update_Username)
	fmt.Println(datos.Update_File)
	fmt.Println(datos.Update_Password)
	DataToImgFromOracle(datos.Update_File,datos.Update_Username)
	datos.Update_File= "./ImgUsers/"+datos.Update_Username+".jpg"
	//datos.Create_foto_perfil="none"
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)

	err:= ConsultaUpdate(datos.Update_Username,datos.Update_Nombre,datos.Update_Apellido,datos.Update_Fecha,datos.Update_Correo,datos.Update_Password,datos.Update_File)
	if err != nil {
		var vaciovec return_nuevoUsuario
			vaciovec.Confirmacion=0
			json.NewEncoder(w).Encode(vaciovec)
	} else{
		var vaciovec return_nuevoUsuario
		vaciovec.Confirmacion=1
		json.NewEncoder(w).Encode(vaciovec)
		fmt.Println(err)
	}
	
	fmt.Println("Retorno")
	fmt.Println(err)


}


func LeerCargamasiva(_Data string){

	contador := 1
	//llibrerias
	vi := viper.New()
	vi.SetConfigType("yaml")
	//para leer en yaml
	var yamlDatos = []byte(_Data) // archivo = string
	vi.ReadConfig(bytes.NewBuffer(yamlDatos))
	DatosYaml := vi.AllSettings() //aca esta mapeado el string 
	//struct
	for idUs, infoUs := range DatosYaml{
		var Cliente Struct_Usuario
		dataMap := mapstructure.Decode(infoUs, &Cliente)
		if dataMap != nil{
			log.Panic(dataMap)
		}
		
		//fmt.Println("-" + idUs)
		//fmt.Println("--" +Cliente.Nombre)
		//fmt.Println("--" +Cliente.Apellido)
		//fmt.Println("--" +Cliente.Password)
		//fmt.Println("--" +Cliente.Username)

		//Todo el arbol
	//Temporadas 
	for temp := 0; temp < len(Cliente.Resultados); temp++{
		//fmt.Println("---" + Cliente.Resultados[temp].Temporada)
		//fmt.Println("---" + Cliente.Resultados[temp].Tier)
		
		for jorn := 0; jorn < len(Cliente.Resultados[temp].Jornadas); jorn++{
			//fmt.Println("----" + Cliente.Resultados[temp].Jornadas[jorn].Jornada)
			for dep := 0; dep < len(Cliente.Resultados[temp].Jornadas[jorn].Predicciones); dep++{
				/*
				fmt.Println("-" + idUs)
				fmt.Println("--" +Cliente.Nombre)
				fmt.Println("--" +Cliente.Apellido)
				fmt.Println("--" +Cliente.Password)
				fmt.Println("--" +Cliente.Username)
				fmt.Println("---" + Cliente.Resultados[temp].Temporada)
				*/
				tam:=len(Cliente.Resultados[temp].Temporada)
				aniotemporada := string(Cliente.Resultados[temp].Temporada[0:4])
				mestemporada := string(Cliente.Resultados[temp].Temporada[6:tam])
				var finfechatemporada string
				//fmt.Print("*********** Fecha: ")
				iniciofechatemporada := aniotemporada+"-"+mestemporada+"-01 00:00:00";

				if(mestemporada=="2"){
					finfechatemporada = aniotemporada+"-"+mestemporada+"-29 59:59:59"
				}else{
					finfechatemporada = aniotemporada+"-"+mestemporada+"-30 59:59:59"
				}
				//fmt.Println(iniciofechatemporada)
				//fmt.Println(finfechatemporada)
				//ahora vamos con la jornada
				VarNumJornada:= string(Cliente.Resultados[temp].Jornadas[jorn].Jornada[1:2])
				//fmt.Println(VarNumJornada)
				numsemana, err:= strconv.Atoi(VarNumJornada) 
				if err != nil{
					fmt.Println("Error:")
					fmt.Println(err)
				}
				var iniciofechajornada string
				var finfhechajornada string
				if numsemana == 1{
					iniciofechajornada = aniotemporada+"-" +mestemporada+"-"+ "01 00:00:00" 
					finfhechajornada = aniotemporada+"-" +mestemporada+"-"+"07 00:00:00"
				}else{
					numsemana=numsemana*7+1
					iniciofechajornada = aniotemporada+"-" +mestemporada+"-"+ strconv.Itoa(numsemana) +" 00:00:00"
					finfhechajornada = aniotemporada+"-" +mestemporada+"-"+ strconv.Itoa(numsemana+7) + "59:59:59"
				}
				/*
				fmt.Printf("Inicio fecha temporada (semana)")
				fmt.Printf(iniciofechajornada)
				fmt.Printf("Fin fecha temporada (semana)")
				fmt.Printf(finfhechajornada)
				*/
				PrediccionLocal := strconv.Itoa(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Prediccion.Local)
				PrediccionVisitante := strconv.Itoa(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Prediccion.Visitante)
				ResultadoVisitante :=  strconv.Itoa(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Resultado.Visitante)
				ResutladoLocal := strconv.Itoa(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Resultado.Local)

				/*
				fmt.Println("---" +  Cliente.Resultados[temp].Tier)
				fmt.Println("----" + Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Deporte)
				fmt.Println("----" + Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Fecha)
				fmt.Println("----" + Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Visitante)
				fmt.Println("----" + Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Local)
				fmt.Println(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Prediccion.Local)
				fmt.Println(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Prediccion.Visitante)
				fmt.Println(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Resultado.Visitante)
				fmt.Println(Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Resultado.Local)
				fmt.Println()	
				*/
				
				LlenarTablaTemporal(idUs,Cliente.Nombre,Cliente.Apellido,Cliente.Password,Cliente.Username,Cliente.Resultados[temp].Temporada,Cliente.Resultados[temp].Tier,Cliente.Resultados[temp].Temporada,Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Deporte,Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Fecha,Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Visitante,Cliente.Resultados[temp].Jornadas[jorn].Predicciones[dep].Local,PrediccionVisitante,PrediccionLocal,ResultadoVisitante, ResutladoLocal ,iniciofechatemporada,finfechatemporada,iniciofechajornada,finfhechajornada)
				//fmt.Println(contador)
				contador++;
				}
			}
		} 	
	}
}


//val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18,val19,val20     _IDUsuario,_NombreUsuario,_ApellidoUsuario,_PasswordUsuario,_UsernameUsuario,_Temporada,_TipoTier,_Jornada,_Deporte,_Fecha,_NombreVisitante,_NombreLocal,_PrediccionVisitante,_PrediccionLocal,_ResultadoVisitante,_ResutladoLocal,_FechaInicioTemporada,_FechaFinTemporada,_FechaInicioJornada,_FechaFinJornada
func LlenarTablaTemporal(val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18,val19,val20 string){
	//voy a mostrar los datos que obtube al recorrer
	Datos:= fmt.Sprintf("insert into Temporal (idusuario,nombreusuario,apellidoUsuario,passwordusuario,UsernameUsuario,Temporada,TipoTier,Jornada,Deporte,Fecha,NombreVisitante,NombreLocal,PrediccionVisitante,PrediccionLocal,ResultadoVisitante,ResultadoLocal,FechaInicioTemporada,FechaFinTemporada,FechaInicioJornada,FechaFinJornada) values (:val1,:val2,:val3,:val4,:val5,:val6,:val7,:val8,:val9,:val10,:val11,:val12,:val13,:val14,:val15,:val16,:val17,:val18,:val19,:val20)", val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18,val19,val20)

	//fmt.Println(Datos)
	
	db,err := Coneccion_Oracle()
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	_, error :=db.Exec("insert into Temporal (idusuario,nombreusuario,apellidoUsuario,passwordusuario,UsernameUsuario,Temporada,TipoTier,Jornada,Deporte,Fecha,NombreVisitante,NombreLocal,PrediccionVisitante,PrediccionLocal,ResultadoVisitante,ResultadoLocal,FechaInicioTemporada,FechaFinTemporada,FechaInicioJornada,FechaFinJornada) values (:val1,:val2,:val3,:val4,:val5,:val6,:val7,:val8,:val9,:val10,:val11,:val12,:val13,:val14,:val15,:val16,:val17,:val18,:val19,:val20)", val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18,val19,val20)

	if error != nil{
		fmt.Println(error)
		fmt.Println(Datos)
	}else{
		//fmt.Println("Consulta Realizada")
	}
}


func PostHomeEndPoint(w http.ResponseWriter, req *http.Request){
	//fmt.Fprintf(w,"Hola mundo, como estas, todo bien" , html.escapeString(r.URL.Path))
	var datos req_Login
	reqBody, _ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody, &datos)
	println(datos.USERNAME)
	println(datos.PASSWORD)
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)

	retornologin, err := ConsultaLogin(datos.USERNAME,datos.PASSWORD)
	fmt.Println(retornologin)
	
	if err != nil {
		var vaciovec return_Login
			vaciovec.ID_usuario=0; 
			vaciovec.Tipo_rol=-2; //error en consulta
			vaciovec.Username="";
			json.NewEncoder(w).Encode(vaciovec)
	} else{
		if len(retornologin)==0{
			var vaciovec return_Login
			vaciovec.ID_usuario=0; 
			vaciovec.Tipo_rol=-1; //usuario no existe
			vaciovec.Username="";
			json.NewEncoder(w).Encode(vaciovec)
		}else{
			//fmt.Println(retornologin[0].FotoUsuario)
			//retornologin[0].FotoUsuario=ConverIMGgo2(retornologin[0].FotoUsuario)
			json.NewEncoder(w).Encode(retornologin[0])
		}
		fmt.Println(retornologin)
	}
}	


func PostDatosUsuario(w http.ResponseWriter, req *http.Request){
	var datos req_Usuario
	reqBody,_ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody,&datos)
	fmt.Println(datos.Identificador)

	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)
	fmt.Println("El valor que ingresa a datos.iden es: ")
	
	retornodatosusuario, err := ConsultaUsuario(datos.Identificador)
	fmt.Println("Retorno del login: ")
	fmt.Println(retornodatosusuario)

	if err != nil{
		var varret return_perfil
		varret.TipoMembresia=10;
		json.NewEncoder(w).Encode(varret)
	}else{
		retornodatosusuario[0].FotoUsuario=ConverIMGgo2(retornodatosusuario[0].FotoUsuario)
		json.NewEncoder(w).Encode(retornodatosusuario[0])
	}
}

func PostCrearUsuario(w http.ResponseWriter, req *http.Request){
	var datos req_Create_new_User
	reqBody,_ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody, &datos)
	/*
	fmt.Println(datos.Create_Username)
	fmt.Println(datos.Create_password)
	fmt.Println(datos.Create_Nombre)
	fmt.Println(datos.Create_Apellido)
	fmt.Println(datos.Create_fecha_nacimiento)
	fmt.Println(datos.Create_Correo_electronico)
	*/
	//fmt.Print("Contenido de la img desde react: ")
	//fmt.Println(datos.Create_foto_perfil)
	DataToImgFromOracle(datos.Create_foto_perfil,datos.Create_Username)
	datos.Create_foto_perfil= "./ImgUsers/"+datos.Create_Username+".jpg"
	//fmt.Print("Contenido de la img desde react: ")
	//fmt.Println(datos.Create_foto_perfil)
	dt := time.Now() 
	var fecha_ahora string
	fecha_ahora=dt.Format("2006-01-02 15:04:05")
	//fmt.Println(fecha_ahora)
	datos.Create_fecha_registro=fecha_ahora
	//datos.Create_foto_perfil="none"
	datos.Create_cliente_rol=2;
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)

	err:= ConsultaCrearUsuario(datos.Create_Username,datos.Create_password,datos.Create_Nombre,datos.Create_Apellido,datos.Create_fecha_nacimiento,datos.Create_fecha_registro,datos.Create_Correo_electronico,datos.Create_foto_perfil)
	if err != nil {
		var vaciovec return_nuevoUsuario
			vaciovec.Confirmacion=0
			json.NewEncoder(w).Encode(vaciovec)
	} else{
		var vaciovec return_nuevoUsuario
		vaciovec.Confirmacion=1
		json.NewEncoder(w).Encode(vaciovec)
		fmt.Println(err)
	}
	
	fmt.Println("Retorno")
	fmt.Println(err)
}

func GetLoginEndPoint(w http.ResponseWriter, req *http.Request){

	//http.ServeFile(res, req, filepath.Join("./Pages/index.html"));
	template, err := template.ParseFiles("./Pages/Login.html")
	if err != nil{
		fmt.Fprintf(w,"Pagina no encontrada")
	}else{
		template.Execute(w, nil)
	}
}

func Coneccion_Oracle ()(db *sql.DB, e error){
	db, err := sql.Open("oci8", "willop/pcgamer@172.17.0.2:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	return db, nil
	//fmt.Println("Coneccion exitosa")
}

//funcion para hacer login

//******************************************** Descripcion consultas ******************************************
func ConsultaLogin(user,pass string)([]return_Login,error){
	Retorno := []return_Login{}
	db,err := Coneccion_Oracle()
	if err !=  nil{
		return nil, err
	}
	defer db.Close()
	var consulta string
	           consulta = "select cliente.id_cliente, cliente.cliente_rol, cliente.cliente_username from cliente where cliente.cliente_username= '"+user+"' and cliente.cliente_password='"+pass+"';"
	fmt.Println(consulta)
	rows, err := db.Query("select cliente.id_cliente, cliente.cliente_rol, cliente.cliente_username from cliente where cliente.cliente_username = '"+user+"' and cliente.cliente_password='"+pass+"'")
	if err != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows.Close()

	var tiporol return_Login
	for rows.Next(){
		err = rows.Scan(&tiporol.ID_usuario,&tiporol.Tipo_rol,&tiporol.Username)
		if err != nil{
			return nil, err
		}
		Retorno = append(Retorno,tiporol)
	}
	fmt.Println("Resultado de la consulta login: "+consulta)
	fmt.Println(Retorno)
	return Retorno,nil

}

func ConsultaUsuario(_Identificador string)([]return_perfil,error){
	
	Retorno:= []return_perfil{}
	db, err := Coneccion_Oracle()
	if err != nil{
		return nil,err
	}

	defer db.Close()
	var consulta string  //nombre, apellido , fechanacimien, correo, foto, membresia
			     consulta="select cliente.cliente_nombre, cliente.cliente_apellido, cliente.cliente_fecha_nacimiento, cliente.cliente_correo_electronico, cliente.cliente_foto_perfil from cliente where ID_cliente = " + _Identificador ;
	fmt.Println(consulta)
	rows, err := db.Query("select cliente.cliente_nombre, cliente.cliente_apellido, cliente.cliente_fecha_nacimiento, cliente.cliente_correo_electronico, cliente.cliente_foto_perfil from cliente where ID_cliente = " + _Identificador)
	if err!= nil{
		log.Fatal("Error fatal en la consulta\n",err)
	}
	defer rows.Close()

	var tipoo return_perfil
	for rows.Next(){
		err = rows.Scan(&tipoo.Nombre,&tipoo.Apellido,&tipoo.FechaNacimiento,&tipoo.CorreoElectronico,&tipoo.FotoUsuario)
			if err != nil{
				fmt.Println(err)
				return nil,err
			}
			Retorno = append(Retorno,tipoo)
	}
	fmt.Println("Retorno de la consulta del perfil de usuario")
	fmt.Println(Retorno)
	return Retorno,nil
}

func ConsultaCrearUsuario(_username string,_pass string,_nombre string,_apelli string,_fecha_nacimiento string,_fecha_registro string,_correo string,_foto string)error{
	db,err := Coneccion_Oracle()
	if err != nil{
		return err
	}
	defer db.Close()
	var consulta string
	consulta = "\n\ninsert into cliente (Cliente_username,cliente_password,Cliente_nombre,Cliente_apellido,Cliente_fecha_nacimiento,Cliente_fecha_registro,Cliente_correo_electronico,Cliente_foto_perfil,cliente_rol) values ('"+_username+"','"+_pass+"','"+_nombre+"','"+_apelli+"',TIMESTAMP '"+_fecha_nacimiento+" 00:00:00',TIMESTAMP '"+_fecha_registro+"','"+_correo+"','"+_foto+"',2);";
	fmt.Println(consulta)
	_, error := db.Exec("insert into cliente (Cliente_username,cliente_password,Cliente_nombre,Cliente_apellido,Cliente_fecha_nacimiento,Cliente_fecha_registro,Cliente_correo_electronico,Cliente_foto_perfil,cliente_rol) values ('"+_username+"','"+_pass+"','"+_nombre+"','"+_apelli+"',TIMESTAMP '"+_fecha_nacimiento+" 00:00:00',TIMESTAMP '"+_fecha_registro+"','"+_correo+"','"+_foto+"',2)")
	
	fmt.Println("Usuario creado con exito")
	
	return error

}

func Consulta1()([]Estructura, error){
	
	Eventostabla := []Estructura{}
	db, err := Coneccion_Oracle()

	if err !=  nil{
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("select ID_estado_evento,Estado_evento_color from estado_eventodeportivo")
	if err != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows.Close()
	
	var even Estructura

	for rows.Next() {


		err = rows.Scan(&even.Id_estado,&even.Estado_color)
		if err != nil{
			return nil, err
		}
		//fmt.Println(Estado_Evento_Color.estado_color)
		Eventostabla = append(Eventostabla,even)
	}
	fmt.Println(Eventostabla)
	return Eventostabla, nil
}

func ConsultaUpdate(_username,_nombre,_apellido,_fecha,_correo,_pass,_foto string)error{
	db,err := Coneccion_Oracle()
	if err != nil{
		return err
	}
	defer db.Close()
	var consulta string
	consulta = "Consulta:\nupdate Cliente set Cliente_password='"+_pass+"', Cliente_Nombre='"+_nombre+"', Cliente_apellido='"+_apellido+"' ,Cliente_fecha_nacimiento = TO_DATE('"+_fecha+"' ,'YYYY-MM-DD') , Cliente_correo_electronico='"+_correo+"', Cliente_foto_perfil ='"+_foto+"' where  cliente_username='"+_username+"';";
	fmt.Println(consulta)
	_,error := db.Exec("update Cliente set Cliente_password='"+_pass+"', Cliente_Nombre='"+_nombre+"', Cliente_apellido='"+_apellido+"' ,Cliente_fecha_nacimiento = TO_DATE('"+_fecha+"' ,'YYYY-MM-DD') , Cliente_correo_electronico='"+_correo+"', Cliente_foto_perfil ='"+_foto+"' where  cliente_username='"+_username+"'")

	fmt.Println("Usuario Actualizado con exito")
	return error
}
func GetConsulta1(w http.ResponseWriter, r *http.Request) {
	Eventostabla, err := Consulta1()
	
	if err != nil {
		fmt.Printf("Error al obtener los eventos a colores")
	} else{
		fmt.Println(Eventostabla)
		json.NewEncoder(w).Encode(Eventostabla)
		//enc := json.NewEncoder(os.Stdout)
		//enc.Encode(eventostabla)
		//crear_json, _ := json.Marshal(eventostabla)
	}
}

//****************************************************** funciones ***************************************************


func DataToImgFromOracle(dataimg,nombreimg string){
	idx := strings.Index(dataimg, ";base64,")
	if idx < 0 {
		panic("InvalidImage")
	}
	ImageType:= dataimg[11:idx]
	log.Println(ImageType)

	unbased, err := base64.StdEncoding.DecodeString(dataimg[idx+8:])
	if err != nil {
        panic("Cannot decode b64")
    }

    r := bytes.NewReader(unbased)
    switch ImageType {
    case "png":
        im, err := png.Decode(r)
        if err != nil {
            panic("Formato incorrecta del png")
        }

        f, err := os.OpenFile("./ImgUsers/"+nombreimg+".png", os.O_WRONLY|os.O_CREATE, 0777)
        if err != nil {
            panic("Cannot open file")
        }

        png.Encode(f, im)
		
    case "jpeg":
        im, err := jpeg.Decode(r)
        if err != nil {
            panic("Formato incorrecto jpeg")
        }

        f, err := os.OpenFile("./ImgUsers/"+nombreimg+".jpg", os.O_WRONLY|os.O_CREATE, 0777)
        if err != nil {
            panic("Cannot open file")
        }

        jpeg.Encode(f, im, nil)
    case "gif":
        im, err := gif.Decode(r)
        if err != nil {
            panic("Formato incorrecto gif")
        }

        f, err := os.OpenFile("./ImgUsers/"+nombreimg+".gif", os.O_WRONLY|os.O_CREATE, 0777)
        if err != nil {
            panic("Cannot open file")
        }

        gif.Encode(f, im, nil)
    }
}



	func main(){
	fmt.Println("Servidor de GO execute \nPort:4000\n...")
	
	//-------------------------------Inicio del servidor------------------
	router := mux.NewRouter().StrictSlash(true)
	//-----------------------------Para agreagar el css a todo
	router.PathPrefix("/CSS/").Handler(http.StripPrefix("/CSS/",http.FileServer(http.Dir("Pages/CSS/"))))
	http.Handle("/", router)


	//---------------------NOTA NO DIRECCIONES CON HIJOS --------------------------
	//------------------------------- RUTAS --------------------------------------
	router.HandleFunc("/Api",PostHomeEndPoint).Methods("POST")
	router.HandleFunc("/CrearUsuario",PostCrearUsuario).Methods("POST")
	router.HandleFunc("/DatosUsuario",PostDatosUsuario).Methods("POST")
	router.HandleFunc("/CambiarPassword",PostModificarPassword).Methods("POST")
	router.HandleFunc("/CargaMasiva",PostCargaMasiva).Methods("POST")
	router.HandleFunc("/consulta",GetConsulta1).Methods("GET")
	router.HandleFunc("/login",GetLoginEndPoint).Methods("GET")	//cuando ingrese a esta direccion
	//------------------------------------ Servidor ----------------------------------
	log .Fatal(http.ListenAndServe(":4000",router))



}