import { Router } from "express";
import { handleCreateBook, handleDeleteBook, handleGetAllBooks, handleGetBookById, handleUpdateBook } from "../../controller/book.js";
import { handleCreatBlog,handleAllBlogs, getParticularBlog, updateBlogController,deleteBlogController } from "../../controller/blog.js";
import upload from "../../middleware/multer-config.js";
import { authenticateAdmin } from "../../middleware/authmiddleware.js";
import { addYoutubeHandler,deleteYoutubeVideoHandler,getYoutubeVideosHandler } from "../../controller/youtube.js";
import { addTestimonialHandler,getTestimonialsHandler } from "../../controller/testimonial.js";
import { addReviewHandler, getReviewsHandler } from "../../controller/review.js";

const router = Router();


router.post("/uploadImage", authenticateAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    
   
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    
    return res.status(200).json({ 
      success: true, 
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
});


router.post("/addBook",upload.array('images',5),handleCreateBook)
router.get("/getBooks",handleGetAllBooks)
router.put("/updateBook/:id",upload.array('images',5),handleUpdateBook)
router.delete("/deleteBook/:id",handleDeleteBook)
router.get("/getBookById/:id",handleGetBookById)



router.post("/addBlog",authenticateAdmin,handleCreatBlog)
router.get("/blogs",handleAllBlogs)
router.get("/blog/:blogId",getParticularBlog)
router.delete("/blog/:blogId",deleteBlogController)
router.put("/blog/:blogId",authenticateAdmin,updateBlogController)


router.post("/testimonial",authenticateAdmin,addTestimonialHandler)
router.get("/testimonial",getTestimonialsHandler)

router.post("/reviews",authenticateAdmin,addReviewHandler)
router.get("/reviews/:bookId",getReviewsHandler)


router.post("/addYoutubeVideo",authenticateAdmin,addYoutubeHandler)
router.get("/getYoutubeVideo",getYoutubeVideosHandler)
router.delete("/deleteYoutubeVideo/:youtubeId",authenticateAdmin,deleteYoutubeVideoHandler)

export default router