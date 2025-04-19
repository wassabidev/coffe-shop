import dotenv from 'dotenv';
dotenv.config();  // Asegúrate de que dotenv.config() se llame antes de acceder a las variables de entorno

console.log('MONGO_URI:', process.env.MONGO_URI);  // Esto debería imprimir la URL de MongoDB
console.log('Current working directory:', process.cwd());
