import { readFileSync } from 'fs';
import { orderBy } from 'lodash';

class ListaDeCosas {
  name: string;
  cosas: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(nuevaCosa: any) {
    this.cosas.push(nuevaCosa);
  }

  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;

  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const data = readFileSync(__dirname + '/products.json', 'utf-8');
    const products: Product[] = JSON.parse(data);
    for (const product of products) {
      this.addProduct(product);
    }
  }

  addProduct(product: Product): void {
    const exists = this.getProduct(product.id);
    if (!exists) {
      this.add(product);
    }
  }

  getProduct(id: number): Product {
    const product = this.cosas.find(c => c.id === id);
    return product;
  }

  removeProduct(id: number): Product {
    const product = this.getProduct(id);

    this.cosas = this.cosas.filter(c => c.id !== id);

    return product;
  }

  getSortedByPrice(order: 'asc' | 'desc' = 'asc'): Product[] {
    return orderBy(this.cosas, ['price'], [order]);
  }
}

export { ListaDeProductos, Product };
