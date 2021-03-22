const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = required('../../models/User')


// get request api/profile/me
// get current users profile
// private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await (await Profile.findOne({ user: req.user.id })).populated('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile)
    } catch(error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;