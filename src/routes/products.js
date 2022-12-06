const express = require('express')
const router = express.Router()
const Contenedor = require('../persistence/contenedor')
const contenedor = new Contenedor()
const file = 'src/products.txt'

const multer = require('multer')


let admin= false

getNow = () => {
    const FyH = new Date();
    return `${FyH.getDate()}/${FyH.getMonth()}-${FyH.getHours()}:${FyH.getMinutes()}`;
}

const date=getNow()

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

router.get('/', (req, res) => {
    const products =  contenedor.read(file)
        products?
        res.status(200).json(products) :
        res.status(400).json({
            mensaje: "No hay productos existentes"
        });
})


router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const product = contenedor.getById(parseInt(id), file);
    product ? res.json({
            product_id: id,
            producto: product
        }) :
        res.status(404).json({
            message: `No tenemos este producto id: ${id}`
        });
})
    router.post('/productos', middlewareProducts, (req, res) => {

        if(admin== true){
            console.log("Acceso concedido");
        const product = req.body;
        product.timestamp = date;
        const savedProduct =  contenedor.save(product, file)
       
       product ? res.status(200).json({
            mensaje: "Producto guardado",
            producto: savedProduct,
          })
        : res.status(400).json({ mensaje: "No se pudo guardar el producto" });

        }else{
            console.log("Acceso denegado!");
            res.json("Papa no eres admin")
        }
    })



if(admin==true){

    
}
router.put('/productos/:id', (req, res) => {
   
   if(admin== true){

    const { id } = req.params;
    let body = req.body;
    const product = contenedor.getById(parseInt(id), file);
    if (product) {
        contenedor.updateProduct(id, body, file)
        res.json({
            message: 'Producto actualizado',
            producto: body
        })
    } else {
        res.json({
            message: 'No existe tal producto id :' + id
        })
    }
   }else{
    res.json("Papa no eres admin")
   }
   
   

})




router.delete('/productos/:id', (req, res) => {
    
    if(admin== true){
    
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
}else{
    console.log("Acceso denegado!");
    res.json("No eres admin rey!")
}
});




module.exports = router