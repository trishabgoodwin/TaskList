import express from "express";
const app = express();
export default app;

app.use(express.json());

app.get("/", (req,res) => {
  res.send(`Welcome to our home page.`);
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
