import express from "express";
const router = express.Router();
export default router;

import { createTask, getTasks, getTask, deleteTask, updateTask } from "../db/queries/tasks.js"

router.route("/").get(async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});

router.route("/:id").get(async (req,res)=>{
  const {id} = req.params

  const task = await getTask(id)

  if (!task){
      return res.status(404).send({error: "ID does not exist."})
    }
    res.send(task)
})

router.route("/").post(async (req, res)=>{
    if(!req.body){
      return res.status(400).send({error: "Missing req. body"})
    }
    
    const {title, done, user_id} = req.body
    
    if(!title || !done || !user_id){
      return res.status(400).send({error: "Missing required params"})
    }

  const task = await createTask({title, done, user_id})

  res.status(201).send(task)
})

router.route("/:id").delete(async (req,res)=>{
  const {id} = req.params

  const deletes = await deleteTask(id)

  if (!deletes){
      return res.status(404).send({error: "That recipe does not exist."})
    }
    
    res.sendStatus(204)
})

router.route("/:id").put(async (req,res)=>{
    const {id} = req.params

    const {title, done, user_id} = req.body
    
    if( !title || !done || !user_id)
      return res.status(400).send({error: "Missing required fields."})

    const task = await getTask(id)
    if(!task){
      return res.status(404).send({error: "Task not found."})
    }

    const updated = await updateTask({id, title, done, user_id})
    res.send(updated)

})

