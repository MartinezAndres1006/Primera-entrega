const knex = require('knex')
const options = require('../options/mysql.config')
const contenedoBase = require('./contenedorBase')
const db = knex(options)




class ContenedorMemoria extends contenedoBase{
constructor(){
    super("carritos")
}
    
    
    async agregarProducto(idCarrito, idProducto) {
        try {
          await db("carritos_productos").insert({
            carrito_id: idCarrito,
            producto_id: idProducto,
          });
        } catch (error) {
          return error.message;
        }
      }
    
      async borrarProducto(idCarrito, idProducto) {
        try {
          await db("carritos_productos")
            .where("carrito_id", idCarrito)
            .andWhere("producto_id", idProducto)
            .del();
        } catch (error) {
          return error.message;
        }
      }
    
      async listarProductosDelCarrito(idCarrito) {
        try {
          const productos = await db("carritos_productos")
            .select("producto_id")
            .where("carrito_id", idCarrito)
            .join("productos", "carritos_productos.producto_id", "productos.id")
            .select("productos.*");
          return productos;
                 
        } catch (error) {
          return error.message;
        }
      }
    
    
    
    }
    


