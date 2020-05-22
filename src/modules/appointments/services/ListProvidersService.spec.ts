import 'reflect-metadata';

import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/repositories/Fakes/FakeUsersRespository';

import { ListProvidersService } from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('List the providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste1@teste.com',
      password: 'senha123',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'teste2@teste.com',
      password: 'senha123',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'teste3@teste.com',
      password: 'senha123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
