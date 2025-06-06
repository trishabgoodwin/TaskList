import db from "#db/client"

export async function createUser( {username, password} ) {
  const sql = `
    INSERT INTO users (username, password) 
    VALUES ($1, $2) 
    RETURNING *;
    `
  const {rows: user} = await db.query(sql, [username, password])
  return user[0]
}

export async function getUsers() {
  const sql = `
  SELECT * 
  FROM users;
  `;
  const { rows: users } = await db.query(sql);
  return users;
}

export async function getUser(id) {
  const sql = `
  SELECT * 
  FROM users
  WHERE id = $1;
  `;
  const { rows: user } = await db.query(sql, [id]);
  return user;
}
