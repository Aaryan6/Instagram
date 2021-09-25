const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    const { name, username, email, password, cpassword } = req.body
    try {
        if (password === cpassword) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const user = await new User({ name, username, email, password: hashPassword })
            const newUser = await user.save()
            res.json(newUser)
        } else {
            res.json("password Not match")
        }
    } catch (error) {
        res.json(error)
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email })
        if (!checkUser) {
            res.json("user not exist")
        }
        else {
            const validPassword = await bcrypt.compare(req.body.password, checkUser.password)
            if (validPassword) {
                res.json(checkUser)
            } else {
                res.json("password Not match")
            }
        }
    } catch (error) {
        res.json(error)
    }
})

module.exports = router