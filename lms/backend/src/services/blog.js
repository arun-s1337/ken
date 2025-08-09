import db from "../config/db.js";

export const createBlog = async (adminId, title, content) => {
  const [result] = await db.execute(
    'INSERT INTO blog (admin_id, title, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [adminId, title, content]
  );

  return {
    id: result.insertId,
    admin_id: adminId,
    title,
    content
  };
};


export const getBlogs = async() => {
  const [result] = await db.execute(
    `SELECT * FROM blog`,
  )
  
  return result
}

export const getBlog = async (blogId) => {
  const [result] = await db.execute(
    `SELECT * FROM blog WHERE id = ?`,
    [blogId]
  );
  return result[0]; 
};

export const updateBlog = async (adminId, blogId, { title, content }) => {
  const [result] = await db.execute(
    `UPDATE blog 
     SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ? AND admin_id = ?`,
    [title, content, blogId, adminId]
  );
  return result.affectedRows > 0; // returns true if update succeeded
};

export const deleteBlog = async({ blogId,adminId}) =>{
  const [ result ] = await db.execute(
    `DELETE FROM blog where id = ? AND admin_id = ?`,
    [blogId,adminId]
  )

  return result.affectedRows > 0
}