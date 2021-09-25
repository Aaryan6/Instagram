const router = require("express").Router()
const Post = require("../model/Post")
const User = require("../model/User")
const bcrypt = require("bcrypt")

// update user
router.put("/:username", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.params.username }, {
            $set: req.body
        },{new:true})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
});

// follow user
router.put("/:id/follow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(currentUser._id)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.json("user has been followed")
            } else {
                res.json("you already follow this user")
            }
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json("you can't follow yourself")
    }
})

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.json("user has been unfollowed")
            } else {
                res.json("you not followed this user")
            }
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json("you can't unfollow yourself")
    }
})

// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username })
        const { password, ...other } = user._doc
        res.json(other)
    } catch (error) {
        res.json(error)
    }
})

// get all user
router.get("/all", async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

// get followings
router.get("/followings/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const followings = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let followingList = []
        followings.map(friend => {
            const { _id, username, profilePicture } = friend
            followingList.push({ _id, username, profilePicture })
        })
        res.json(followingList)
    } catch (error) {
        res.json(error)
    }
})

// get followers
router.get("/followers/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const followers = await Promise.all(
            user.followers.map(followerId => {
                return User.findById(followerId)
            })
        )
        let followerList = []
        followers.map(user => {
            const { _id, username, profilePicture } = user
            followerList.push({ _id, username, profilePicture })
        })
        res.json(followerList)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router