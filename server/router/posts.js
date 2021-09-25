const router = require("express").Router()
const Post = require("../model/Post")
const User = require("../model/User")

// create post
router.post("/", async (req, res) => {
    try {
        const newPost = await new Post(req.body)
        await newPost.save()
        res.json(newPost)
    } catch (error) {
        res.json(error)
    }
})

// get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.json(error)
    }
})

// get user's posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({username : req.params.username})
        const posts = await Post.find({ userId: user._id })
        res.json(posts)
    } catch (error) {
        res.json(error)
    }
})

// delete post
router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.json("post deleted successful")
            } catch (error) {
                res.json(error)
            }
    } else {
        res.json("You already deleted this post")
    }
})

// like & dislike
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("Post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("Post has been disliked")
        }
    } catch (error) {
        res.json(error)
    }
})

// timeline post
router.get("/all/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userPosts = await Post.find({userId: user._id})
        const friendsPosts = await Promise.all(
            user.followings.map(friendId=>{
                return Post.find({userId: friendId})
            })
        )
        res.json(userPosts.concat(...friendsPosts))
    } catch (error) {
        res.json(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router