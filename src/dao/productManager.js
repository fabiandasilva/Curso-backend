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

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");

    if (data.length === 0) {
      throw new Error("No hay productos cargados");
    }
  }

  async getProductById(id) {
    const result = this.#products.filter((product) => product._id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    console.log("getProductById: ", result[0]);
  }

  async addProduct(newProduct) {
    try {
      newProduct.price = Number(newProduct.price);
      newProduct.stock = Number(newProduct.stock);

      this.#products.push(newProduct);

      await this.updateFile();

      console.log("Producto añadido exitosamente:", newProduct);
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
      throw error;
    }
  }

  async updateProduct(id, obj) {
    const result = this.#products.filter((product) => product._id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    const product = result[0];
    product.title = obj.title;
    product.description = obj.description;
    product.price = obj.price;
    product.thumbnail = obj.thumbnail;
    product.category = obj.category;
    product.code = obj.code;
    product.stock = obj.stock;

    await this.updateFile();
  }

  async deleteProduct(id) {
    const result = this.#products.filter((product) => product._id === id);

    if (result.length === 0) {
      throw new Error("El producto no existe");
    }

    console.log("deleteProduct: ", result[0]);

    const newProducts = this.#products.filter((product) => product._id !== id);

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
