const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const axios = require('axios');

//TO DO:
// - signIn (inc errors)


/// PROFILE CONTROLLERS ///

/////
// POST request for creating a profile
exports.profile_create_post = asyncHandler(async (req, res, next) => {
        const aProfile = new Profile({
            profilePassword: req.body.profilePassword,
            profileTelephone: req.body.profileTelephone,
            profileEmail: req.body.profileEmail,
            profileFirstName: req.body.profileFirstName,
            profileSecondName: req.body.profileSecondName,
            profileDOB: req.body.profileDOB,
            profileRole: req.body.profileRole,
            profileCardHolderName: req.body.profileCardHolderName,
            profileBankName: req.body.profileBankName,
            profileCardNumber: req.body.profileCardNumber,
            profileExpireyDate: req.body.profileExpireyDate,
            profileCVV: req.body.profileCVV,
            profilePostCode: req.body.profilePostCode,
            profileHouseNumber: req.body.profileHouseNumber,
            profileStreet: req.body.profileStreet,
            profileCity: req.body.profileCity,
            profileCounty: req.body.profileCounty,
            profileCountry: req.body.profileCountry,
            profileSignedIn: req.body.profileSignedIn,
        });

        await aProfile.save();

        // Make a POST request to another server
        const response = await axios.post('https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/post', req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Success:', response.data, response);

        res.status(200).send('Profile created successfully.');
});

// POST request to delete a profile
exports.profile_delete_post = asyncHandler(async (req, res, next) => {
    const aProfile = await Profile.findByIdAndDelete(req.params.id).exec();
})

// GET request to update Profile.
exports.profile_update_get = asyncHandler(async (req, res, next) => {
    const aProfile = await Profile.findById(req.params.id).exec()
    if (aProfile === null) {
        const err = new Error("Profile not found");
        err.status = 404
        return next(err)
    }
    res.send(aProfile)
})


// POST request to update Profile.
exports.profile_update_post = asyncHandler(async (req, res, next) => {
    const aProfile = new Profile({
        profilePassword: req.body.profilePassword,
        profileTelephone: req.body.profileTelephone,
        profileEmail: req.body.profileEmail,
        profileFirstName: req.body.profileFirstName,
        profileSecondName: req.body.profileSecondName,
        profileDOB: req.body.profileDOB,
        profileRole: req.body.profileRole,
        profileCardHolderName: req.body.profileCardHolderName,
        profileBankName: req.body.profileBankName,
        profileCardNumber: req.body.profileCardNumber,
        profileExpireyDate: req.body.profileExpireyDate,
        profileCVV: req.body.profileCVV,
        profilePostCode: req.body.profilePostCode,
        profileHouseNumber: req.body.profileHouseNumber,
        profileStreet: req.body.profileStreet,
        profileCity: req.body.profileCity,
        profileCounty: req.body.profileCounty, 
        profileSignedIn: req.body.profileSignedIn,
        _id: req.params.id, // This is required, or a new ID will be assigned!
    });
    const consoleLogRes = await Profile.findByIdAndUpdate(req.params.id, aProfile, {});
    
})

// GET request to get a Profile.
exports.profile_get = asyncHandler(async (req, res, next) => {
    const aProfile = await Profile.findById(req.params.id).exec();
    if (aProfile === null) {
        const err = new Error("Profile not found");
        err.status = 404
        return next(err)
    }
    res.send(aProfile)
})

// POST request to update and sign out of  a Profile.
exports.profile_sign_out_post = asyncHandler(async (req, res, next) => {
    const aProfile = new Profile({
        profilePassword: req.body.profilePassword,
        profileTelephone: req.body.profileTelephone,
        profileEmail: req.body.profileEmail,
        profileFirstName: req.body.profileFirstName,
        profileSecondName: req.body.profileSecondName,
        profileDOB: req.body.profileDOB,
        profileRole: req.body.profileRole,
        profileCardHolderName: req.body.profileCardHolderName,
        profileBankName: req.body.profileBankName,
        profileCardNumber: req.body.profileCardNumber,
        profileExpireyDate: req.body.profileExpireyDate,
        profileCVV: req.body.profileCVV,
        profilePostCode: req.body.profilePostCode,
        profileHouseNumber: req.body.profileHouseNumber,
        profileStreet: req.body.profileStreet,
        profileCity: req.body.profileCity,
        profileCounty: req.body.profileCounty,
        profileCountry: req.body.profileCountry,  
        profileSignedIn: false,
        _id: req.params.id, // This is required, or a new ID will be assigned!
    });
    const consoleLogRes = await Profile.findByIdAndUpdate(req.params.id, aProfile, {});

})

// GET request to sign in to a profile.

exports.profile_sign_in_get = asyncHandler(async (req, res, next) => {
    const profileEmailPassword = await Profile.findOne({ profileEmail: req.params.email, profilePassword: req.params.password }).exec();
    if (!profileEmailPassword) {
        const err = new Error("Email does not match password or email is incorrect or password is incorrect.");
        err.status = 404;
        return next(err);
    }
    res.send(profileEmailPassword);
})

// POST request to update and sign in to a profile
exports.profile_sign_in_post = asyncHandler(async (req, res, next) => {
    const aProfile = new Profile({
        profilePassword: req.body.profilePassword,
        profileTelephone: req.body.profileTelephone,
        profileEmail: req.body.profileEmail,
        profileFirstName: req.body.profileFirstName,
        profileSecondName: req.body.profileSecondName,
        profileDOB: req.body.profileDOB,
        profileRole: req.body.profileRole,
        profileCardHolderName: req.body.profileCardHolderName,
        profileBankName: req.body.profileBankName,
        profileCardNumber: req.body.profileCardNumber,
        profileExpireyDate: req.body.profileExpireyDate,
        profileCVV: req.body.profileCVV,
        profilePostCode: req.body.profilePostCode,
        profileHouseNumber: req.body.profileHouseNumber,
        profileStreet: req.body.profileStreet,
        profileCity: req.body.profileCity,
        profileCounty: req.body.profileCounty,
        profileCountry: req.body.profileCountry,   
        profileSignedIn: true,
        _id: req.params.id, // This is required, or a new ID will be assigned!
    });
    const consoleLogRes = await Profile.findByIdAndUpdate(req.params.id, aProfile, {});

})

