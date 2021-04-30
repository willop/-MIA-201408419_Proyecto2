
var sha256 = require('js-sha256');

async function CrearNuevoUsuario(paramusu,parampass,paramnombre,paramapellido,paramfechanacimiento,paramcorreo,paramfile){
    var retorno;
    var pass_encript = await sha256(parampass)
    var url="http://localhost:4000/CrearUsuario";
    var inforenviar = {
    'username':''+paramusu,
    'password':''+pass_encript,
    'nombre':''+paramnombre,
    'apellido':''+paramapellido,
    'fecha_nacimiento':''+paramfechanacimiento,
    'correo':''+paramcorreo,
    'fileimg':''+paramfile
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

export default CrearNuevoUsuario