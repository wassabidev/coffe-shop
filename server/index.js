import express from 'express';
import connectDB from './config/db.js';
import multer from 'multer';
import Product from './models/Product.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',  // Asegúrate de que este sea el puerto de tu frontend
}));
app.use('/uploads', express.static('../public/uploads'));

connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, stock, type, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = new Product({ name, description, stock, type, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
})

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);

  } catch (error){
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
})

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id);
    res.status(200).json(products);

  } catch(error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
})



const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);