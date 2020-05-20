import { container } from 'tsyringe';

import { IStoragedProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import { DiskStorageProvider } from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStoragedProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
