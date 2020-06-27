import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerEmail = await this.customersRepository.findByEmail(email);

    if (customerEmail) {
      throw new AppError('This e-mail is already registered.');
    }

    const customers = await this.customersRepository.create({
      name,
      email,
    });

    return customers;
  }
}

export default CreateCustomerService;
