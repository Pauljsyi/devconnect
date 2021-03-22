const express = require('express');
const { errorFromList } = require('verror');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')


// get request api/profile/me
// get current users profile
// private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile)
    } catch(error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// post request api/profile/me
// create or update user profile
// private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(), 
    check('skills', 'Skills is required').not().isEmpty()
]],
async (req, res) => {
    const error = validationResult(req);
    if(!errorFromList.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location
});

module.exports = router;