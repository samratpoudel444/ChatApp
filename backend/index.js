const express= require("express");
const dotenv= require("dotenv");
const authRouter = require("./server/routes/authRoute");
const sequelize = require("./server/database/config/dbConnection");
const { errorHandler } = require("./server/middleware/errorMiddleware");
const cors= require("cors")
dotenv.config();


const app= express();
const PORT= 3000

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())

app.use('/api/v1', authRouter);
app.use(errorHandler)

sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
});