import React from 'react';

async function  CargaMasiva(param) {
    var retorno
    console.log("Lo que va es: "+param)
    var url = "http://localhost:4000/CargaMasiva"
    var inforenviar={
        'Data': ''+param
    }

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(inforenviar)
    })
    .then(Response =>Response.json())
    .then(function(jsons){
        console.log(jsons)
        retorno = jsons
        if(jsons.Confirmacion === 0){
            alert("Error al crear a un nuevo usuario")
        }
        else{
            alert("Usuario creado con exito")
        }
    })
    .catch(error => console.error('Error:',error))

    return retorno
}

export default CargaMasiva;