import express from "express";
import userRoutes from "./routes/v1/userRoute";
import webRoutes from "./routes/v1/webRoute";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/betteruptime', userRoutes);
app.use('/betteruptime', webRoutes);

app.listen(port, () => {
    console.log(`${port}`);
})