import React from 'react';

async function FuncionInfoAdmin(props) {
    var retorno
    var url = "http://localhost:4000/GetDatos";
    await fetch(url)
    .then(Response =>Response.json())
    .then(function(jsons){
        retorno = jsons
    })
    .catch(error => console.error('Error:',error))
    return retorno
}
