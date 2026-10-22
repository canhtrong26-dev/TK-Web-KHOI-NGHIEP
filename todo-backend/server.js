const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log(' Database kết nối thành công');
    app.listen(PORT, () => {
      console.log(` Server chạy ở cổng ${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Lỗi kết nối database:', err);
  });