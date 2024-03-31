import express from "express";
import env from "dotenv";
import mongoose from "mongoose";

env.config();
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || "local";
const service = process.env.SERVICE || "local";
const mongoUri = process.env.mongoUri;
if (!mongoUri || mongoUri == undefined) {
  throw new Error("mongoUri is not set in the envionment");
}
const app = express();

async function connectToDB(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri, {
      dbName: "hirestud",
    });
  } catch (err) {
    console.log("error in connecting to mongoDB", err);
  }
}
connectToDB(mongoUri);

app.get("/", (req, res) => {
  res.send({
    message: "Service running",
    dbConnected: mongoose.connection.readyState === 1,
  });
});
app.use("*", (req, res) => {
  res.status(404).send({
    error: "AUTH404: Could not find the page requested by you",
  });
});

app.listen(port, () => {
  console.log("App listening on port service is ", port, service);
});
