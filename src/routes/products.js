const express = require('express')
const router = express.Router()
const contenedorProductos = require('../Dbsql/productosEnMemoria')
const contenedor = new contenedorProductos()
// const file = 'src/products.txt'

const multer = require('multer')

getNow = () => {
    const FyH = new Date();
    return `${FyH.getDate()}/${FyH.getMonth()}-${FyH.getHours()}:${FyH.getMinutes()}`;
}

const date = getNow()

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'public/img')
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = router.use(multer({
    storage,
    dest: "public/img"
}).single('image'))




const middlewareProducts = (req, res, next) => {
    let products = req.body
    if (!products.nombre || !products.precio) {
        return res.status(400).send({
            Error: "Se requieren mas datos"
        })
    } else {

        next()
    }
}

router.get('/', async (req, res) => {
    try {
        const productos = await contenedor.getAll()
        productos ? res.status(200).json(productos) : res.status(404).json({
            message: "No hay productos"
        });
    } catch (error) {
        res.status(500).json({
            message: err.message
        });
    }
})


router.get('/productos/:id', async (req, res) => {
    try {
        const producto = await contenedor.getOnlyOne(req.params.id)
        producto.lenght > 0 ? res.status(200).json(producto) : res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            message: err.message
        });
    }

})
router.post('/productos', middlewareProducts, async (req, res) => {

    try {
        const nuevoProducto = await contenedor.create(req.body);
        res.status(201).json({
            message: "Producto creado con éxito",
            producto: nuevoProducto,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})



router.put('/productos/:id', async (req, res) => {

    try {
        const productoActualizado = await contenedor.update(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Producto actualizado con éxito",
            producto: productoActualizado,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }


})




router.delete('/productos/:id', async (req, res) => {
    try {

        const productoEliminado = await contenedor.deleteById(req.params.id);
        productoEliminado ? res.status(200).json({
                message: "Producto borrado con éxito",
                id: req.params.id
            }) :
            res.status(404).json({
                message: "Producto no encontrado: id " + req.params.id
            });
    } catch (error) {
        return error.message
    }

});




module.exports = router