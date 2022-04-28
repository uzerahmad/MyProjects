const express = require('express');
const router = express.Router();

const allControler = require("../controller/allController")



router.post("/createAuthor", allControler.createAuthor)

router.post("/createBlogs", allControler.createBlogs)
router.get("/get/blogs",allControler.getBlogs)
router.put("/blogs/:blogId",allControler.updateblogs)
router.delete("/blogs/:Id",allControler.deletById)
router.delete("/blogs",allControler.deletByProperty)




module.exports = router;