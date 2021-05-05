
async function FuncionInfoPerfil(param) {
    var retorno
    var url = "http://localhost:4000/DatosUsuario";
    var inforenviar = {
        'ident': ''+param
    }

    await fetch(
        url,
        {
            method:'POST',
            body: JSON.stringify(inforenviar)
        })
    .then(Response =>Response.json())
    .then(function(jsons){
        //console.log(jsons)
        retorno = jsons
    })
    .catch(error => console.error('Error:',error))
    
    return retorno
}

export default FuncionInfoPerfil;
