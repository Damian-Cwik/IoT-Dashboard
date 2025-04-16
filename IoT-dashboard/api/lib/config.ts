require('dotenv').config();

export const config = {
   port: process.env.PORT1, 
   databaseUrl: process.env.MONGODB_URI,
   socketPort: process.env.PORT2
};