const fs = require("fs").promises;

class ProductManager {
  #products = [];

  constructor() {
    this.path = "./product.db.json";
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.#products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  }

  async addProduct(
    title,
    description,
    price,
    thumbnail,
    category,
    code,
    stock,
    status
  ) {
    price = Number(price);
    stock = Number(stock);

    if (isNaN(price) || isNaN(stock)) {
      throw new Error("Precio y stock deben ser números");
    }

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !category ||
      !code ||
      !stock
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const result = this.#products.filter((product) => product.code === code);

    if (result.length > 0) {
      throw new Error("El código del producto ya existe");
    }

    this.#products.push({
      title,
      description,
      price,
      thumbnail,
      category,
      code,
      stock,
      status,
      id: this.#products.length + 1,
    });

    const path = this.path;

    await this.updateFile();
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");

    if (data.length === 0) {
      throw new Error("No hay productos cargados");
    }

    console.log("getProducts: ", data);
  }

  async getProductById(id) {
    const result = this.#products.filter((product) => product.id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    console.log("getProductById: ", result[0]);
  }

  async updateProduct(id, obj) {
    const result = this.#products.filter((product) => product.id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    //Actualizo el producto
    const product = result[0];
    product.title = obj.title;
    product.description = obj.description;
    product.price = obj.price;
    product.thumbnail = obj.thumbnail;
    product.category = obj.category;
    product.code = obj.code;
    product.stock = obj.stock;

    const path = this.path;

    await this.updateFile();
  }

  async deleteProduct(id) {
    const result = this.#products.filter((product) => product.id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    console.log("deleteProduct: ", result[0]);

    const newProducts = this.#products.filter((product) => product.id !== id);

    const path = this.path;

    await this.updateFile();

    this.#products = newProducts;

    console.log("deleteProduct actualizado: ", this.#products);

    await this.updateFile();
  }

  async updateFile() {
    await fs.writeFile(
      this.path,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
  }
}

module.exports = ProductManager;
