package main 

import (
	"fmt"
	"encoding/json"
	"time"
	//"os"
	"io/ioutil"
	//"path/filepath"
	"database/sql"
	"log"
	"net/http"
	 "github.com/gorilla/mux"
	"html/template"
	_ "github.com/mattn/go-oci8"
)

/********************************* Estructuras para las bases de datos **************************/
type return_Login struct{
	ID_usuario int
	Tipo_rol int
	Username string
}

type return_nuevoUsuario struct{
	Confirmacion int
}


//********************* Estructuras desde react *********************************
//prueba
type Estructura struct{
	Id_estado int
	Estado_color string
}

// Login
type req_Login struct {
	USERNAME string `json:"user"`
	PASSWORD string	`json:"pass"`
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
	Create_foto_perfil			string	
	Create_cliente_rol			int		
}





/*********************************************** fin estructuras *****************************/

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
			//fmt.Println("no vacio: ")
			json.NewEncoder(w).Encode(retornologin[0])
		}
		fmt.Println(retornologin)
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
	dt := time.Now() 
	var fecha_ahora string
	fecha_ahora=dt.Format("2006-01-02 15:04:05")
	fmt.Println(fecha_ahora)
	datos.Create_fecha_registro=fecha_ahora
	datos.Create_foto_perfil="none"
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

func ConsultaLogin(user,pass string)([]return_Login,error){
	Retorno := []return_Login{}
	db,err := Coneccion_Oracle()
	if err !=  nil{
		return nil, err
	}
	defer db.Close()
	var consulta string
	consulta = "select cliente.cliente_rol, cliente.id_cliente,cliente.cliente_username from cliente where cliente.cliente_username= '"+user+"' and cliente.cliente_password='"+pass+"';"
	rows, err := db.Query("select cliente.cliente_rol, cliente.id_cliente, cliente.cliente_username from cliente where cliente.cliente_username= '"+user+"' and cliente.cliente_password='"+pass+"'")
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

	router.HandleFunc("/consulta",GetConsulta1).Methods("GET")
	router.HandleFunc("/login",GetLoginEndPoint).Methods("GET")	//cuando ingrese a esta direccion
	//------------------------------------ Servidor ----------------------------------
	log .Fatal(http.ListenAndServe(":4000",router))
}