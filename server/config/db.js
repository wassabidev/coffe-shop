import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  console.log('MONGO_URI:', process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
