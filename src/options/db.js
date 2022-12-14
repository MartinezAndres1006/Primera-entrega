const knex = require('knex')
const options = require('./mysql.config')



const listaProductos = [{
    "nombre": "Remera nike",
    "descripcion": "Talle l",
    "codigo": 12561,
    "foto": "url",
    "precio": 4500,
    "stock": 23
},{
    "nombre": "Telefono",
    "descripcion": "256gb ram",
    "codigo": 12564,
    "foto": "Url",
    "precio": 16500,
    "stock": 125

},{
    "nombre": "Mouse",
    "descripcion": "Es el redragon griffin",
    "codigo": 12517,
    "foto": "url",
    "precio": 8500,
    "stock": 11

}]


    const db = knex(options);
    try {
         db.schema.createTable('productos', (table) => {
            table.increments('id').primary();
            table.string('nombre');
            table.string('descripcion');
            table.integer('precio');
            table.integer('stock');
            table.string('foto');
            table.string('codigo');
            table.dateTime('timestamp').defaultTo(db.fn.now());
        });
         db('productos').insert(listaProductos);
        console.log("Datos de productos agregados");
       
    } catch (err) {
    
        console.log(err);
    };