import app from "#app";
import db from "#db/client";
import express from "express";

import usersRouter from "./api/users.js"
import tasksRouter from "./api/tasks.js"

const PORT = process.env.PORT ?? 3000;

await db.connect();

app.use(express.json());

app.use("/users", usersRouter);

app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
