package main
import (
	"fmt"
	"io/ioutil"
	"net/http"
	"encoding/base64"
)

func ConverIMGgo2(ruta string) string{
	bytes, err := ioutil.ReadFile(ruta)
	if err != nil {
		fmt.Println("Error de ruta de la img: "+ruta)
	}
	tipoimg := http.DetectContentType(bytes)

	var base64 string

	switch tipoimg {
	case "image/jpeg":
		 base64 += "data:image/jpeg;base64,"
	case "image/png":
		base64 += "data:image/png;base64,"
	case "image/jpg":
		base64 += "data:image/jpeg;base64,"
	}
	

	base64 += toBase64(bytes)
	//fmt.Println("la codificacion es:\n")
	//fmt.Println(base64)
	
	return base64

	}

	func toBase64(b []byte) string {
		return base64.StdEncoding.EncodeToString(b)
	}