const cartsModel = require("./models/carts.model");
const productsModel = require("./models/product.model");

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
    try {
      await this.loadCarts();

      const newCart = new cartsModel({ products: [] });

      const addNewCart = new cartsModel(newCart);
      this.#cart.push(newCart);

      await this.updateFile();
      await addNewCart.save();
      res.status(201).json({ message: "Carrito creado" });
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cartId, productId) {
    try {
      const product = await productsModel.findById(productId);
      if (!product) {
        throw new Error("El producto no existe");
      }

      let cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error("El carrito no existe");
      }

      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        product.stock -= 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
        product.stock -= 1;
      }

      await cart.save();
      await product.save();

      const index = this.#cart.findIndex((c) => c._id.toString() === cartId);
      if (index !== -1) {
        this.#cart[index] = cart;
      } else {
        this.#cart.push(cart);
      }

      await this.updateFile();
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const cart = await cartsModel.findByIdAndDelete(id);
      if (!cart) {
        throw new Error("El carrito no existe");
      }

      const index = this.#cart.findIndex((c) => c._id.toString() === id);
      if (index !== -1) {
        this.#cart.splice(index, 1);
      }

      await this.updateFile();
    } catch (error) {
      throw error;
    }
  }

  async updateFile() {
    // Transformar el formato del carrito para que coincida con el requerido en el archivo JSON
    const formattedCart = this.#cart.map((cart) => ({
      _id: cart._id,
      products: cart.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    }));
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
