import db from "../config/db.js";

// Controller functions
export const handleCreatBlog = (req, res) => {
  const { title, content } = req.body;
  const adminId = req.adminId;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  db.query(
    'INSERT INTO blog (admin_id, title, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [adminId, title, content],
    (error, result) => {
      if (error) {
        console.error('Create blog error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({
        message: "Created Successfully",
        blog: {
          id: result.insertId,
          admin_id: adminId,
          title,
          content
        }
      });
    }
  );
}

export const handleAllBlogs = (req, res) => {
  db.query(
    'SELECT * FROM blog',
    (error, results) => {
      if (error) {
        console.error('Get blogs error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({
        message: "Got All Blogs",
        blogs: results
      });
    }
  );
}

export const getParticularBlog = (req, res) => {
  const { blogId } = req.params;

  db.query(
    'SELECT * FROM blog WHERE id = ?',
    [blogId],
    (error, results) => {
      if (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json({ blog: results[0] });
    }
  );
}

export const updateBlogController = (req, res) => {
  const adminId = req.adminId;
  const { blogId } = req.params;
  const { title, content } = req.body;

  console.log("admin-id",adminId)
  

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  db.query(
    `UPDATE blog 
     SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ? AND admin_id = ?`,
    [title, content, blogId, adminId],
    (error, result) => {
      if (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog not found or not authorized' });
      }

      res.status(200).json({ message: 'Blog updated successfully' });
    }
  );
}

export const deleteBlogController = (req, res) => {
  const { blogId } = req.params;
  

  if (!blogId) {
    return res.status(400).json({ message: 'blogId  are required' });
  }

  db.query(
    'DELETE FROM blog WHERE id = ? ',
    [blogId],
    (error, result) => {
      if (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog not deleted' });
      }

      res.status(200).json({ message: 'Blog deleted successfully' });
    }
  );
}