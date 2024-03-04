import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname);

const app = express();

let data = "Initial Data";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  res.send({
    data,
  });
});

//use put/post to update
app.get("/updateData", (req, res) => {
  data = "Updated Data";
  res.send({
    data,
  });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
