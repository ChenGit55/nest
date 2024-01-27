import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from './client.provider';

@Module({
  controllers: [ClientController],
  imports: [DatabaseModule],
  providers: [ClientService, ...clientProviders],
})
export class ClientModule {}
