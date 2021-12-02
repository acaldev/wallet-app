import { Schema } from 'mongoose';

export function transformSchema(schema: Schema): Schema {
  return schema.set('toJSON', {
    transform: (doc, ret, _options) => {
      const { _id: id } = ret;
      ret = { ...{ id }, ...ret };
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
}
