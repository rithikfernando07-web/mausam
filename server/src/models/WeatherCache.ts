import mongoose, { Schema, Document } from 'mongoose';

export interface IWeatherCache extends Document {
  cityKey: string;
  scenario: string;
  data: Record<string, any>;
  expiresAt: Date;
}

const WeatherCacheSchema = new Schema<IWeatherCache>(
  {
    cityKey: { type: String, required: true, index: true },
    scenario: { type: String, required: true, default: 'normal' },
    data: { type: Schema.Types.Mixed, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

export default mongoose.model<IWeatherCache>('WeatherCache', WeatherCacheSchema);
