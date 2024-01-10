const fs = require("fs").promises;

class ProductManager {
  #products = [];

  constructor() {
    this.path = "./productos.txt";
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    //Verifico que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    //Verifico que no se repita el campo code
    const result = this.#products.filter((product) => product.code === code);
    //Si el campo code se repite, emito un error
    if (result.length > 1) {
      throw new Error("El código del producto ya existe");
    }

    //Agrego los productos al arreglo vacio de products
    this.#products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#products.length + 1,
    });

    //Declaro la direccion del path
    const path = this.path;

    //Guardo los productos agregados en el archivo productos.txt pero no los sobreescribo
    await fs.writeFile(
      path,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
  }

  async getProducts() {
    //Leo el archivo productos.txt
    const data = await fs.readFile(this.path, "utf-8");

    //Si el archivo está vacio, emito un error
    if (data.length === 0) {
      throw new Error("No hay productos cargados");
    }

    console.log("getProducts: ", data);
  }
  async getProductById(id) {
    //Busco el producto por id en el archivo productos.txt
    const result = this.#products.filter((product) => product.id === id);

    //Si el producto no existe, emito un error
    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    //Devuelvo el resultado en formato objeto
    console.log("getProductById: ", result[0]);
  }

  async updateProduct(id, obj) {
    //Busco el producto por id en el archivo productos.txt
    const result = this.#products.filter((product) => product.id === id);

    //Si el producto no existe, emito un error
    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    //Actualizo el producto
    const product = result[0];
    product.title = obj.title;
    product.description = obj.description;
    product.price = obj.price;
    product.thumbnail = obj.thumbnail;
    product.code = obj.code;
    product.stock = obj.stock;

    //Declaro la direccion del path
    const path = this.path;

    //Guardo los productos agregados en el archivo productos.txt pero no los sobreescribo
    await fs.writeFile(
      path,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
  }

  async deleteProduct(id) {
    //Busco el producto por id en el archivo productos.txt
    const result = this.#products.filter((product) => product.id === id);

    //Si el producto no existe, emito un error
    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    //Imprimo el resultado de arreglo a objeto
    console.log("deleteProduct: ", result[0]);

    //Creo un nuevo arreglo con los productos que no coinciden con el id
    const newProducts = this.#products.filter((product) => product.id !== id);

    //Declaro la direccion del path
    const path = this.path;

    await fs.writeFile(
      path,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
    
    //Actualizo el arreglo de productos
    this.#products = newProducts;

    //Imprimo el arreglo de productos actualizado
    console.log("deleteProduct actualizado: ", this.#products);

    //Guardos los productos actualizados en el archivo productos.txt pero los sobreescribo
    await fs.writeFile(
      path,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
  }
}

//Pruebo el método addProduct
const manager = new ProductManager();
manager.addProduct(
  "Casa",
  "Regla de plástico transparente",
  89.99,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  "REG2",
  15
);

manager.addProduct(
  "Compás",
  "Compás de metal",
  199.99,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  "COM1",
  10
);

//Pruebo el método getProducts
// manager.getProducts();


//Pruebo el método getProductById
// manager.getProductById(1);


//Pruebo el método updateProduct
// manager.updateProduct(1, {
//   title: "Regla de plástico transparente",
//   description: "Regla de plástico transparentes",
//   price: 89.992,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//   code: "REG2s",
//   stock: 150,
// });


//Pruebo el método deleteProduct
// manager.deleteProduct(1);
