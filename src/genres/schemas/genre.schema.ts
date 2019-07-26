import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

export const GenreSchema = new mongoose.Schema({
  id: ObjectID,
  title: String
});