const fs = require("fs").promises;

class CartManager {
  #cart = [];

  constructor() {
    this.path = "./cart.db.json";
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.#cart = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  }

  async getProductsInCart() {
    const data = await fs.readFile(this.path, "utf-8");

    if (data.length === 0) {
      throw new Error("No hay productos cargados");
    }

    return JSON.parse(data);
  }

  async getProductInCartById(id) {
    const data = await fs.readFile(this.path, "utf-8");

    const carts = JSON.parse(data);

    const result = carts.filter((cart) => Number(cart.id) === Number(id));

    if (result.length === 0) {
      throw new Error("El carrito no existe");
    }

    return result;
  }

  async createCart() {
    await this.loadCarts();

    const newCart = {
      id: this.#cart.length + 1,
      products: [],
    };

    this.#cart.push(newCart);

    await this.updateFile();
  }

  addProductInCart(cartId, productId) {
    const cart = this.#cart.find((cart) => cart.id === cartId);

    if (!cart) {
      throw new Error("El carrito no existe");
    }

    const existingProduct = cart.products.find(
      (product) => product.product === Number(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    this.updateFile();

    return cart;
  }

  async updateFile() {
    await fs.writeFile(
      this.path,
      JSON.stringify(this.#cart, null, "\t"),
      "utf-8"
    );
  }
}

module.exports = CartManager;
