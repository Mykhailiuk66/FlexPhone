import { connect } from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export const connectToDB = async () => {
  try {
    const db = await connect(MONGO_URL!);
    console.log('MongoDB connected to', db.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};
