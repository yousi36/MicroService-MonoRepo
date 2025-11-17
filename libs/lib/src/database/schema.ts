// libs/shared/src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Each user has only one role
  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  roleId: Types.ObjectId;

  // For customers: many-to-many with products they purchased
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  purchasedProducts: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);



export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);







export type CatalogDocument = Catalog & Document;

@Schema({ timestamps: true })
export class Catalog {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  // Optional reverse reference (products belonging to this catalog)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId[];
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);





export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  // Created by admin/seller
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  // Many-to-many with Catalog
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Catalog' }] })
  categories: Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
