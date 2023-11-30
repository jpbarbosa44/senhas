import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeysModule } from './keys/key.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jp445barbosa90:wtqDoRvSiSLWd2tz@cluster0.xfbnhwd.mongodb.net/?retryWrites=true&w=majority',
    ),
    KeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
