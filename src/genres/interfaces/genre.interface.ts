
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface Genre extends Document {
  readonly id: String;
  readonly title: String;
}