const express = require('express')
const router = express.Router()
const Contenedor = require('../persistence/contenedor')
const contenedor = new Contenedor()
const file = 'src/cart.txt'


router.get (("/:id/productos"), (req,res) => {
  const { id } = req.params;
  const product = contenedor.getById(parseInt(id), file);
  product ? res.json({
          product_id: id,
          producto: product
      }) :
      res.status(404).json({
          message: `No tenemos este producto id: ${id}`
      });
}) ;

router.post (("/"), (req,res) => {
        let carrito = {
        timestamp: new Date ().toLocaleString(),
        productos: req.body
    }
    contenedor.save(carrito, file)
    res.json (carrito)
    console.log(file)
  
    
})

router.delete (("/:id"), (req,res) => {
  const { id } = req.params;
  const product = contenedor.deleteById(parseInt(id), file);
  if (product) {
      res.json({
          message: 'Producto eliminado',
          id: id
      })
  } else {
      res.json({
          message: 'Producto no encontrado. Id: ' + id
      })
  };

})


module.exports= router