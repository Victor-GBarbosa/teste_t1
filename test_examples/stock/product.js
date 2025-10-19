class Product {
  #id;
  #name;
  #price;
  #stockQuantity;
  #sells;

  constructor(id, name, price, stockQuantity) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#stockQuantity = stockQuantity;
    this.#sells = 0;
  }

  writeUp() {
    return `id: ${this.#id}, name: ${this.#name}, price: ${this.#price}`;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get stockQuantity() {
    return this.#stockQuantity;
  }

  get sells() {
    return this.#sells;
  }
}
export default Product;
