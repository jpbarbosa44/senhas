import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Key } from './schemas/key.schema';
import { CreatedKeyDto } from './DTO/CreateKeyDTO';

@Injectable()
export class KeysService {
  constructor(
    @InjectModel('Key')
    private readonly KeyModel: Model<Key>,
  ) {}

  async createKey(createdKeyDto: CreatedKeyDto) {
    try {
      const { key, type } = createdKeyDto;

      const createdKey = new this.KeyModel({ key, type });
      return await createdKey.save();
    } catch (error) {
      throw new Error(`Erro ao criar a chave: ${error.message}`);
    }
  }

  async getAllKeys() {
    try {
      const keysWithPriority = await this.KeyModel.find({
        status: false,
        type: 'prioritaria',
      }).exec();
      const keysWithoutPriority = await this.KeyModel.find({
        status: false,
        type: 'normal',
      }).exec();

      const allKeys = [...keysWithPriority, ...keysWithoutPriority];

      return allKeys;
    } catch (error) {
      throw new Error(`Erro ao obter todas as chaves: ${error.message}`);
    }
  }

  async callKey(id: string) {
    try {
      const calledKey = await this.KeyModel.findByIdAndUpdate(
        id,
        { status: true },
        { new: true },
      ).exec();
      if (!calledKey) {
        return { success: false, message: 'Chave não encontrada.' };
      }
      return {
        success: true,
        message: `Senha ${calledKey.key} chamada com sucesso!`,
        data: calledKey,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao chamar a chave: ${error.message}`,
      };
    }
  }

  async removeKey(id: string) {
    try {
      const deletedKey = await this.KeyModel.findOneAndDelete({
        _id: id,
      }).exec();
      if (!deletedKey) {
        return { success: false, message: 'Chave não encontrada.' };
      }
      return {
        success: true,
        message: `Senha ${deletedKey} apagada com sucesso!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao apagar a chave: ${error.message}`,
      };
    }
  }
}
