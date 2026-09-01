import mongoose, { Schema, Document } from 'mongoose';

export type InterestType =
  | 'fitness'
  | 'travel'
  | 'sports'
  | 'agriculture'
  | 'commuting'
  | 'outdoor'
  | 'photography'
  | 'health'
  | 'education'
  | 'general';

export interface ILocation {
  city: string;
  state: string;
  country: string;
  lat?: number;
  lon?: number;
}

export interface INotificationPrefs {
  severeWeather: boolean;
  rain: boolean;
  heat: boolean;
  airQuality: boolean;
  morningBriefing: boolean;
  eveningForecast: boolean;
  travel: boolean;
}

export interface IUser extends Document {
  name: string;
  email?: string;
  location: ILocation;
  interests: InterestType[];
  favoriteLocations: ILocation[];
  temperatureUnit: 'C' | 'F';
  language: string;
  notifications: INotificationPrefs;
  theme: 'dark' | 'light' | 'system';
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  lat: { type: Number },
  lon: { type: Number },
}, { _id: false });

const NotificationPrefsSchema = new Schema<INotificationPrefs>({
  severeWeather: { type: Boolean, default: true },
  rain: { type: Boolean, default: true },
  heat: { type: Boolean, default: true },
  airQuality: { type: Boolean, default: false },
  morningBriefing: { type: Boolean, default: true },
  eveningForecast: { type: Boolean, default: false },
  travel: { type: Boolean, default: false },
}, { _id: false });

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, lowercase: true, trim: true },
    location: { type: LocationSchema, required: true },
    interests: {
      type: [String],
      enum: ['fitness', 'travel', 'sports', 'agriculture', 'commuting', 'outdoor', 'photography', 'health', 'education', 'general'],
      default: ['general'],
    },
    favoriteLocations: [LocationSchema],
    temperatureUnit: { type: String, enum: ['C', 'F'], default: 'C' },
    language: { type: String, default: 'en' },
    notifications: { type: NotificationPrefsSchema, default: () => ({}) },
    theme: { type: String, enum: ['dark', 'light', 'system'], default: 'dark' },
    onboardingCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
