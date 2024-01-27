import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { Client } from './client.entity';
import { Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('new')
  async createClient(
    @Body() clientData: { name: string; email: string; cpf: string },
  ) {
    const createdClient = await this.clientService.createClient(clientData);
    return { success: true, data: createdClient };
  }

  @Get('list')
  async listClients(): Promise<Client[]> {
    return this.clientService.listClients();
  }

  @Get(':id')
  async selectClient(@Param('id') id: number): Promise<Client | undefined> {
    return this.clientService.selctClient(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updatedData: Partial<Client>,
  ): Promise<UpdateResult> {
    return this.clientService.updateClient(id, updatedData);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.clientService.deleteClient(id);
  }
}
