package main 

import (
	"fmt"
	//"encoding/json"
	//"path/filepath"
	"log"
	"net/http"
	 "github.com/gorilla/mux"
	"html/template"
)

func GetHomeEndPoint(w http.ResponseWriter, req *http.Request){
	//fmt.Fprintf(w,"Hola mundo, como estas, todo bien" , html.escapeString(r.URL.Path))
	template, err := template.ParseFiles("./Pages/index.html")
	if err != nil{
		fmt.Fprintf(w,"Pagina no encontrada")
	}else{
		template.Execute(w, nil)
	}
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

/*func GetAdminEndPoint(w http.ResponseWriter, req *http.Request){

}
*/

func main(){
	fmt.Println("Servidor de GO execute \nPort:4000\n...")

	//-------------------------------Inicio del servidor------------------
	router := mux.NewRouter()
	//-----------------------------Para agreagar el css a todo
	router.PathPrefix("/CSS/").Handler(http.StripPrefix("/CSS/",http.FileServer(http.Dir("Pages/CSS/"))))
	http.Handle("/", router)


	//---------------------NOTA NO DIRECCIONES CON HIJOS --------------------------
	//------------------------------- RUTAS --------------------------------------
	router.HandleFunc("/home",GetHomeEndPoint).Methods("GET")
	router.HandleFunc("/login",GetLoginEndPoint).Methods("GET")	//cuando ingrese a esta direccion
	//------------------------------------ Servidor ----------------------------------
	log .Fatal(http.ListenAndServe(":4000",router))
}