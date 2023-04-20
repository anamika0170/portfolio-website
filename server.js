import express  from "express";
import bodyParser  from "body-parser";
import cors  from "cors";
import dotenv  from "dotenv";
import connectDB  from "./db.js";
import router  from "./routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
