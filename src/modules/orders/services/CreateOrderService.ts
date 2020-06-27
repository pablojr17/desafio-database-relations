import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerID = await this.customersRepository.findById(customer_id);

    if (!customerID) {
      throw new AppError('Custumer does not exists.');
    }

    const checkProduct = products.map(product => ({ id: product.id }));

    const productUpdate = await this.productsRepository.findAllById(
      checkProduct,
    );

    if (productUpdate.length < products.length) {
      throw new AppError('Product does not exists.');
    }

    const updateProductStock = productUpdate.map(updateProduct => {
      const { quantity } = products.find(
        p => p.id === updateProduct.id,
      ) as IProduct;

      return {
        id: updateProduct.id,
        quantity: updateProduct.quantity - quantity,
      };
    });

    if (updateProductStock.some(p => p.quantity < 0)) {
      throw new AppError('Product do not have this quantity in stock');
    }

    const orders = await this.ordersRepository.create({
      customer: customerID,
      products: productUpdate.map(p => {
        const product = products.find(x => x.id === p.id) as IProduct;

        return {
          quantity: product?.quantity,
          product_id: p.id,
          price: p.price,
        };
      }),
    });

    await this.productsRepository.updateQuantity(updateProductStock);

    return orders;
  }
}

export default CreateOrderService;
