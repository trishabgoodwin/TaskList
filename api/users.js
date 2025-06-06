import express from "express";
const router = express.Router();
export default router;

import { createUser, getUser, getUsers } from "../db/queries/users.js"

router.route("/").get(async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.route("/:id").get(async (req,res)=>{
  const {id} = req.params

  const user = await getUser(id)

  if (!user){
      return res.status(404).send({error: "ID does not exist."})
    }
    res.send(user)
})

router.route("/").post(async (req, res)=>{
    if(!req.body){
      return res.status(400).send({error: "Missing req. body"})
    }
    
    const {username, password} = req.body
    
    if(!username || !password){
      return res.status(400).send({error: "Missing required params"})
    }

  const user = await createUser({username, password})

  res.status(201).send(user)
})



