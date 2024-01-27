import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}

  async createClient(clientData: {
    name: string;
    email: string;
    cpf: string;
  }): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  async listClients(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async selctClient(id: number): Promise<Client | undefined> {
    return this.clientRepository.findOneBy({ id });
  }

  async updateClient(
    id: number,
    updatedData: Partial<Client>,
  ): Promise<UpdateResult> {
    return this.clientRepository.update(id, updatedData);
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.clientRepository.delete(id);
  }
}
