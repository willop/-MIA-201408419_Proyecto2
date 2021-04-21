package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-oci8"
)

type Estado struct {
	ID_ESTADO_EVENTO       int
	ESTADO_EVENTO_COLOR    string
}

func main() {
	db, err := sql.Open("oci8", "willop/pcgamer@172.17.0.2:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows, err := db.Query("select estado_evento_color from estado_eventodeportivo")
	if err != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows.Close()


	var nombre string
	for rows.Next() {
		rows.Scan(&nombre)
	}
	fmt.Println("EL COLOR DEL ESTADO ES: " + nombre)
	
/*
	rows2, err2 := db.Query("select * from estado_eventodeportivo;")
	if err2 != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows2.Close()
	//fmt.Println(rows2)

	for rows2.Next() {

		var nombre string
		var localidad string
		rows2.Scan(&nombre, &localidad)
		fmt.Println("Departamento es " + nombre + " con localidad " + localidad)
	}
	*/
}