//import Login from "../Views/Login"

var sha256 = require('js-sha256');



async function Login(param1,param2){

    //encriptado 
    var retorno
    var pass_encript = await sha256(param2);
    var url = 'http://localhost:4000/Api';

    //info de que le voy a mandar
    var info = {'user':''+param1, 'pass':''+pass_encript}

    await fetch(url,{
        method:'POST',
        body: JSON.stringify(info)    
    })

    .then(response => response.json())

    .then(function(jsons){
        console.log(jsons)
        retorno = jsons

        if(jsons.ID_usuario ===0){
            alert("Usuario incorrecto " + jsons.ID_usuario)
            
        } else{             
            if(jsons.Tipo_rol === 1){
                alert("Bienvenido administrador "+jsons.ID_usuario)
                //return jsons
            }else{
                alert("Bienvnido usuario")          
                //
            }      
        }
    })

    .catch(error => console.error('Error:',error))
    //.then(response => console.log('Success:',response))
    return retorno

    //console.log("El nombre del usuario es: "+param1);
    //console.log("El password del usuario es: "+param2);
}
export default Login;