const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const climateChangeRoutes = require('./routes/climateChangeRoutes');

dotenv.config();

const app = express();
const client_base_url = process.env.CLIENT_BASE_URL;
//app.use(cors());
console.log(`Client base URL: ${client_base_url}`);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

app.use('/api/climate-changes', climateChangeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
