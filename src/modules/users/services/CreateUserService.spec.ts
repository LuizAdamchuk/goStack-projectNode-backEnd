import 'reflect-metadata';

import { AppError } from '@shared/errors/AppError';
import { CreateUserService } from './CreateUserService';
import { FakeUsersRepository } from '@modules/users/repositories/Fakes/FakeUsersRespository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'senha123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'senha123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'teste@teste.com',
        password: 'senha123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
