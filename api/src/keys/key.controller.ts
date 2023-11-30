import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { KeysService } from './key.service';
import { CreatedKeyDto } from './DTO/CreateKeyDTO';

@Controller('keys')
export class KeyController {
  constructor(private readonly keyService: KeysService) {}

  @Post()
  createKey(@Body() createdKeyDto: CreatedKeyDto) {
    return this.keyService.createKey(createdKeyDto);
  }

  @Get()
  findAllKeys() {
    return this.keyService.getAllKeys();
  }

  @Get(':id')
  callKey(@Param('id') id: string) {
    return this.keyService.callKey(id);
  }

  @Delete(':id')
  removeKey(@Param('id') id: string) {
    return this.keyService.removeKey(id);
  }
}
