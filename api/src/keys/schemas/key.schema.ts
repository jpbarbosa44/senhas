import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type KeyDocument = Key & Document;

enum KeyType {
  NORMAL = 'normal',
  PRIORITARIA = 'prioritaria',
}

@Schema()
export class Key {
  @Prop({ unique: true, required: true, validate: /^[1-9]\d*$/ })
  key: number;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;

  @Prop({
    enum: [KeyType.NORMAL, KeyType.PRIORITARIA],
    default: KeyType.NORMAL,
  })
  type: KeyType;

  @Prop({ default: false })
  status: boolean;
}

export const KeySchema = SchemaFactory.createForClass(Key);

KeySchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
