import colors from 'colors'
import moongose from 'mongoose';

export const connectDB = async () =>{
    
    try{
        
        const {connection} = await moongose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`
        console.log('conectado en '+url);
        
    }catch(error){
        console.log(colors.red.bold(error));
        
    }
}
