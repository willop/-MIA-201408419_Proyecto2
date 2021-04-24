//import Login from "../Views/Login"

async function Login(param1,param2){
    //direccion a conectar 
    var url = 'http://localhost:4000/Api';

    //info de que le voy a mandar
    var info = {'USERNAME':''+param1, 'PASSWORD':''+param2}
    fetch(url,{
        method:'POST',
        body: JSON.stringify(info)
    })
    //.then(res=> res.json())
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error('Error:',error))
    //.then(response => console.log('Success:',response))

    console.log("El nombre del usuario es: "+param1);
    console.log("El password del usuario es: "+param2);
}
export default Login;