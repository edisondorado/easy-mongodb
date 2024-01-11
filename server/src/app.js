require("dotenv").config()

const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3002;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

app.post('/connect-to-mongodb', async (req, res) => {
    const mongoDBUri = req.body.mongoDBUri;
  
    if (!mongoDBUri) {
      return res.status(400).json({ error: 'Не указана ссылка на MongoDB' });
    }
  
    try {
      await mongoose.connect(mongoDBUri);
      const adminDb = mongoose.connection.getClient().db('admin');
    
      const databaseNames = await adminDb.admin().listDatabases();
      const databases = {};
    
      for (const dbInfo of databaseNames.databases) {
        await mongoose.connect(mongoDBUri);
        const dbName = dbInfo.name;
    
        if (dbName !== 'admin' && dbName !== 'local') {
          
          const db = mongoose.connection.client.db(dbName);

          const collections = await db.listCollections().toArray();
          const collectionNames = collections.map(collection => collection.name);

          databases[dbName] = collectionNames;
        }
      }
  
      res.status(200).json({ message: 'Успешное подключение к MongoDB', databases });
    } catch (error) {
      console.error('Ошибка при подключении к MongoDB:', error);
      res.status(500).json({ error: 'Ошибка при подключении к MongoDB' });
    }
});
  
app.post('/get-data/:database/:collection', async (req, res) => {
    const databaseName = req.params.database;
    const collectionName = req.params.collection;
    const mongoDBUri = req.body.mongoDBUri;
  
    if (!databaseName || !collectionName) {
      return res.status(400).json({ error: 'Не указано название базы данных или коллекции' });
    }
  
    try {
      const connection = await mongoose.createConnection(mongoDBUri + '/' + databaseName);
  
      const dynamicModel = connection.model(collectionName, new mongoose.Schema({}, { strict: false }));
  
      const data = await dynamicModel.find({});
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при получении данных из коллекции' });
    }
});

app.listen(PORT, () => {
    console.log(`Now listening to requests on port ${PORT}`)
})