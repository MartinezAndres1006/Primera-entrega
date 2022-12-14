const knex = require('knex')
const options = require('./mysql.config')




const db = knex(options);

//     db.schema.createTable('productos', (table) => {
//         table.increments('id').primary();
//         table.string('nombre');
//         table.string('descripcion');
//         table.integer('precio');
//         table.integer('stock');
//         table.string('foto');
//         table.string('codigo');
//     })
    
//     // db('productos').insert(productos)
    
//     .then(()=>{
//         console.log('Tabla creada')})       

// .catch(err=>  console.log("error en agregar los productos",err)) 




db.schema.createTable('carritos',(table)=>{
    table.increments("id").primary();
    table.dateTime("timestamp").defaultTo(db.fn.now())
    table.string('productos')
})

.then(()=>{
    console.log('Tabla de carritos creada')})       

.catch(err=>  console.log("error en agregar los productos", err)) 


