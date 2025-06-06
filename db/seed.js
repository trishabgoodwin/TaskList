import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seedUsers();
await seedTasks();
await db.end();
console.log("🌱 Database seeded.");

async function seedUsers() {
  await createUser({username:"user", password:"pas"})
  await createUser({username:"userr", password:"pass"})
  await createUser({username:"userrr", password:"passs"})
}

async function seedTasks() {
  await createTask({title:"wash dishes", done:true, user_id:1})
  await createTask({title:"wash dog", done:true, user_id:2})
  await createTask({title:"take out trash", done:false, user_id:3})

}
