const express = require('express')
const router = express.Router()
const Contenedor = require('../Dbsql/carritosEnMemoria')
const contenedor = new Contenedor()
const file = 'src/cart.txt'


router.get("/", async (req, res) => {
    try {
      const carritos = await contenedor.getAll();
      carritos
        ? res.status(200).json(carritos)
        : res.status(404).json({ message: "No hay carritos" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const carritoNuevo= await contenedor.create(req.body);
      res.status(201).json({
        message: "Carrito creado con éxito",
        carrito: carritoNuevo,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  router.delete("/:id", async (req, res) => {
    try {
      const carrito = await contenedor.getOnlyOne(req.params.id);
      if (carrito) {
        const carritoBorrado = await contenedor.deleteById(req.params.id);
        res.status(200).json({
          message: "Carrito eliminado",
          carrito: carritoBorrado,
        });
      } else {
        res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


module.exports= router