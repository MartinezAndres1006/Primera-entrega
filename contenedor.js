const fs= require('fs')

class Contenedor{
   
   
    save(product, file) {
        console.log("Guardando...", product);

        let nextId = this.getNextId(file);

        product.id = nextId;

        const allProductsArray = this.read(file);

        allProductsArray.push(product);

        this.write(allProductsArray, file);
      }
    
     


      updateProduct(id, product, file){

        const productsArray = this.read(file);
         let index = productsArray.findIndex(product => product.id == id);
            if(index >= 0){
                productsArray[index] = product;
                this.write(productsArray, file);
                console.log('producto Actualizado');
            }else{
                console.log('No se encontro el producto');
            }
    }




     
     
      getNextId(file) {
        let lastId = 0;
        let allProductsArray = this.read(file);
        if (allProductsArray.length > 0) {
          lastId = allProductsArray[allProductsArray.length - 1].id;
        }
        return lastId + 1;
      }
    
     
     
     
     
     
     
     
      read(file) {
        let allProductsArray = [];
        try {
          let allProductsString = fs.readFileSync(file, "utf8");
          
          allProductsString.length > 0
            ? (allProductsArray = JSON.parse(allProductsString))
            : (allProductsArray = []);
        } catch (err) {
          console.log("Error en la lectura del archivo", err);
        }
        return allProductsArray;
      }
    
      async write(allProductsArray, file) {
       
        let allProductsString = JSON.stringify(allProductsArray);
        try {
          await fs.writeFileSync(file, allProductsString);
        } catch (err) {
          console.log("Error en la escritura", err);
        }
      }
        
    
    
    
      getAll(productos){
        let Allproducts= this.read(productos)
        return Allproducts
    }
    
    
    
    
    
    getById(id,productos){
        let Allproducts= this.read(productos)
        let producto=Allproducts.find((producto)=>producto.id==id)
        return producto
      }
    
    
    
    
    
      deleteAll(file){
      let Allproducts= this.read(file)
          if(Allproducts>=0){
            try{
              fs.unlinksync(Allproducts)
            }catch(error){
              console.log("No se pudo eliminar el archivo deseado",error)}
          }else{
            console.log("No existe ningun archivo")
          }
    }
    
    
    
    
    
    deleteById(id, file){
      let allProducts = this.read(file);
      let index = allProducts.findIndex(product => product.id == id);
      if(index >= 0){
          allProducts.splice(index, 1);
          let json = JSON.stringify(allProducts);
          try{
              fs.writeFileSync(file, json);
              return id
          }
          catch(err){
              console.log('Error en la escritura', err);
          }
      }
  }

    async createFile(file_path) {
      try {

        await fs.promises.writeFile(file_path, "", "utf8");

      } 
      catch (err) {
  
        console.log("Error en la creación del archivo", err);
  
      }
    }
  }
    

module.exports=Contenedor