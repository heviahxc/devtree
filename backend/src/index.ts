import colors from 'colors'
import server from './server';

//procces.env.PORT es para cuando subamos nuestro proyecto, tome el puerto que le asigna el hosting
const port = process.env.PORT || 4000;

server.listen(port, () =>{
    console.log(colors.blue.bold("Hola desde index"));
    
});

