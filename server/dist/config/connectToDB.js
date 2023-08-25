"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const connectToDB = async () => {
    try {
        const db = await (0, mongoose_1.connect)(MONGO_URL);
        console.log('MongoDB connected to', db.connection.name);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
