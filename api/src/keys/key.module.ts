import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyController } from './key.controller';
import { KeysService } from './key.service';
import { KeySchema } from './schemas/key.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }])],
  controllers: [KeyController],
  providers: [KeysService],
})
export class KeysModule {}
