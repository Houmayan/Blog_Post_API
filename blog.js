import express from "express";
import Joi from "joi";

const router = express.Router();

let blogPosts = [];
// let id = 1;
class Blog {
  constructor(title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
  }
}

// validation schema
const blogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),

  author: Joi.string().required(),
});

// routing
// Read operations

router.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  // const result = blogPosts.find((postId) => );
  const result = blogPosts.find((i) => i.id == postId);
  if (!result) {
    return res.status(404).json({
      error: `Blog Post with id ${postId} not found`,
    });
  }
  res.status(200).json(result);
});

//Write operations
router.post("/post", (req, res) => {
  const { error, value } = blogSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  function sanitizeHtmls(str) {
    if (typeof str !== "string") return str;
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  // const dirty =
  //   "<p>Hello <strong>world</strong>! Visit my <a href='http://example.com'>website</a>.</p>";
  // console.log(sanitizeHtmls(dirty));

  const senitizedTitle = sanitizeHtmls(value.title);
  const senitizedContent = sanitizeHtmls(value.content);
  const senitizedAuthor = sanitizeHtmls(value.author);
  // console.log(senitizedTitle);
  const data = new Blog(senitizedTitle, senitizedContent, senitizedAuthor);
  const newBlog = {
    id: blogPosts.length + 1,
    ...data,
  };

  blogPosts.push(newBlog);
  console.log("The result is :", blogPosts);

  res.status(201).json({
    message: "Blog post created successfully",
    post: newBlog,
  });
  //   res.send(`Post id is ${req.params.id}`);
});

export default router;
