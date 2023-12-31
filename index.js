let products = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
    code: "ESC1",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
    code: "CAL2",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
    code: "GLO3",
  },
];

class ProductManager {
  #products = [];

  addProduct(title, description, price, thumbnail, code, stock) {
    //Agrego los productos al arreglo de products inicial y al agregarlo debe crearse un id único
    this.#products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#products.length + 1,
    });

    //Todos los campos son obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    //Valido que no se repita el campo code
    const result = this.#products.filter((product) => product.code === code);
    //Si el campo code se repite, emito un error
    if (result.length > 1) {
      throw new Error("El código del producto ya existe");
    }
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    //Busco el producto por id
    const product = this.#products.find((product) => product.id === id);
    //Si no existe el producto, emito un error
    if (!product) {
      throw new Error("No existe el producto");
    }
    return product;
  }
}

//Pruebo el método addProduct
const manager = new ProductManager();
manager.addProduct(
  "Escuadra",
  "Escuadra de 30 cm",
  123.45,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  "ESC1",
  20
);
manager.addProduct(
  "Calculadora",
  "Calculadora científica",
  234.56,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  "CAL2",
  10
);
manager.addProduct(
  "Globo Terráqueo",
  "Globo terráqueo de 30 cm",
  345.67,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  "GLO3",
  15
);

//Pruebo si code se repite
manager.addProduct("Globo Terráqueo", "Globo terráqueo de 30 cm", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", "GLO3", 15);

console.log(manager.getProducts());

//Pruebo el método getProductById
const product1 = manager.getProductById(1);
const product10 = manager.getProductById(10);

console.log(product1, product10);
