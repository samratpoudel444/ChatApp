const express= require("express");
const dotenv= require("dotenv");
const authRouter = require("./server/routes/authRoute");
const sequelize = require("./server/database/config/dbConnection");
const { errorHandler } = require("./server/middleware/errorMiddleware");

dotenv.config();


const app= express();
const PORT= 3000

app.use(express.json())

app.use('/api/v1', authRouter);
app.use(errorHandler)

sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
});