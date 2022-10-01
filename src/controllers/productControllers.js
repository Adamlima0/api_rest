import { createProduct, getProduct, getProductById, updateProduct, deleteProduct } from '../models/productModels.js';

class ProductController {
  async store(req, res) {
    //Logic
    const data = req.body;
    console.log('NEW', data);
    createProduct(data);
    res.status(201);
    res.json(data)
}

async updateProduct(req, res) {
  const {id} = req.params;
  const { title, photo, description, price} = req.body

  try {
    const result = await getProductById(Number(id))
    let modelo = {
      
      title: title,
      photo: photo,
      description: description,
      price: Number(price),
    }
    console.log("Found the product", modelo);

    if (result){
      const data = await updateProduct(Number(id), modelo)
      console.log("Updated the product", data);
      res.status(200);
      res.json({ ...data, id: id })
    
    } else {
      res.status(404)
      res.send("Product not found")
    }
  } catch (error) {
    console.log(error);
  }
}

async deleteProductById(req, res) {
  const {id} = req.params
  try { 
    const result = await getProductById(Number(id))
    if (result) {
      const finish = await deleteProduct(Number(id))
      if (finish) {
        res.status(200).send("Product deleted successfully!")
      } else {
        res.status(500).send("Something went wrong! Try again later!")
      }
    } else {
      res.status(404)
      res.send("Product not found!")
    }
  } catch (error) {

  }
}

getAll(req, res) {

  getProduct().then(product => {
    res.status(200)
    res.json(product);
    console.log("Found these product: ", product);
  }).catch(error => {
    res.status(500)
    res.json(error)
  })
  console.log("Errinho");
}

async getProductById(req, res) {
  const { id } = req.params;
  const product = await getProductById(Number(id))
  if (product.length < 1) {
    res.status(404);
    res.send("Product not found")
  } else {
    res.status(200).json(product);
  }
}
}
export default ProductController;