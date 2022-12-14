const knex = require('knex')
const options = require('../options/mysql.config')

const db = knex(options)

class contenedorBase {
    constructor(table) {
        this.table = table;
    }

    async getAll() {
        try {
            const products = await db(this.table).select("*")
            return products
        } catch (error) {
            return error.message
        }
    }



    async getOnlyOne(id) {
        try {
            const product = await db(this.table).select("*").where("id", id)
            return product
        } catch (error) {
            return error.message
        }
    }



    async deleteByid(id) {
        try {
            const productClear = await db(this.table).where("id", id).del()

            return productClear
        } catch (error) {
            return error.message
        }
    }


    async create(body) {
        try {
          const nuevoProductoId = await db(this.table).insert(body);
          const nuevoProducto = await db(this.table).select("*").where("id", nuevoProductoId);
          return nuevoProducto;
        } catch (error) {
          return error.message;
        }
      }



      async update(id, body) {
        try {
          const { nombre, descripcion, codigo, foto, precio, stock } = body;
          const timestamp = new Date();
          await db(this.table).where("id", id).update({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
            timestamp,
            });
          const updated_product = this.getOne(id);
          return updated_product;
    
        } catch (error) {
          return error.message;
        }
      }










}

 module.exports = contenedorBase