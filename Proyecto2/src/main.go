package main 

import (
	"fmt"
	//"encoding/json"
	"log"
	"net/http"
	 "github.com/gorilla/mux"
)

func GetHomeEndPoint(w http.ResponseWriter, req *http.Request){
	fmt.Fprintf(w,"Hola mundo, como estas, todo bien")
}
func GetLoginEndPoint(w http.ResponseWriter, req *http.Request){

}
func GetAdminEndPoint(w http.ResponseWriter, req *http.Request){

}


func main(){
	fmt.Println("Hello world")

	//rutas
	router := mux.NewRouter()
	router.HandleFunc("/home",GetHomeEndPoint).Methods("GET")
	router.HandleFunc("/home/login",GetLoginEndPoint).Methods("GET")	//cuando ingrese a esta direccion
	router.HandleFunc("/home/Admin",GetAdminEndPoint).Methods("GET")

	
	log .Fatal(http.ListenAndServe(":4000",router))
}