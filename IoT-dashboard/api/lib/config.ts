require('dotenv').config();

export const config = {
   port: process.env.PORT, 
   databaseUrl: process.env.MONGODB_URI
};