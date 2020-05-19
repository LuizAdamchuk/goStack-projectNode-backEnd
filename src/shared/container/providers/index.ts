import { container } from 'tsyringe';

import { IStoragedProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import { DiskStorageProvider } from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStoragedProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
