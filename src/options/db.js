const knex = require('knex')
const options = require('./mysql.config')




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
        console.log("Datos de productos agregados");
       
    } catch (err) {
    
        console.log(err);
    };