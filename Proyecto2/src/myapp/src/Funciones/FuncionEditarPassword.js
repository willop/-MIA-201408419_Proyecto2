
var sha256 = require('js-sha256');


async function FuncionEditarPassword(parampass) {
    var retorno;
    var pass_encript = await sha256(parampass)
    var url="http://localhost:4000/CambiarPassword";
    var inforenviar = {
    'passwordnew':''+pass_encript
    }

    await fetch(url,{
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
    //encriptar el pass

}

export default FuncionEditarPassword;