// notification.model.ts

import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  message: String,
  isRead: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export interface Notification extends mongoose.Document {
  message: string;
  isRead: boolean;
  createdAt: Date;
}
