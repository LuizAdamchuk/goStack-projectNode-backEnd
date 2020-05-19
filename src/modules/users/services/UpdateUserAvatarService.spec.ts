import 'reflect-metadata';

import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import { FakeUsersRepository } from '@modules/users/repositories/Fakes/FakeUsersRespository';

import { UpdateUserAvatarService } from './UpdateUserAvatarService';

describe('Update user avatar', () => {
  it('should be able to update a new user avatar', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeUserRepository = new FakeUsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorage,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'senha123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toEqual('avatar.jpg');
  });

  it('none no-authenticated users should be able update avatar', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorage,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete old avatar when new one are update', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeUserRepository = new FakeUsersRepository();

    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorage,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'senha123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toEqual('avatar2.jpg');
  });
});
