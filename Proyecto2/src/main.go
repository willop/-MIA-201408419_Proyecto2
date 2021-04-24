package main 

import (
	"fmt"
	"encoding/json"
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
type Estructura struct{
	Id_estado int
	Estado_color string
}

type Login struct {
	USERNAME string `json:"username"`
	PASSWORD string	`json:"password"`
}




/*********************************************** fin estructuras *****************************/

func PostHomeEndPoint(w http.ResponseWriter, req *http.Request){
	//fmt.Fprintf(w,"Hola mundo, como estas, todo bien" , html.escapeString(r.URL.Path))
	var datos Login
	reqBody, _ := ioutil.ReadAll(req.Body)
	json.Unmarshal(reqBody, &datos)
	println(datos.USERNAME)
	println(datos.PASSWORD)
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(reqBody))


	
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
	//para responder a la pagina

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
	router.HandleFunc("/consulta",GetConsulta1).Methods("GET")
	router.HandleFunc("/login",GetLoginEndPoint).Methods("GET")	//cuando ingrese a esta direccion
	//------------------------------------ Servidor ----------------------------------
	log .Fatal(http.ListenAndServe(":4000",router))
}