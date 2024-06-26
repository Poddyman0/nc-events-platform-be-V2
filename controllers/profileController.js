const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

//TO DO:
// - signIn (inc errors)


/// PROFILE CONTROLLERS ///

/////
// POST request for creating a profile

exports.profile_create_post = [
    body("profilePassword", "profilePassword must contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profilePassword must contain at least 1 characters")
    .escape(),
  body("profileTelephone", "profileTelephone contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileTelephone must contain at least 1 characters")
    .escape(),
  body("profileEmail", "profileEmail must be a valid email")
    .trim()
    .isEmail()
    .withMessage("profileEmail must be a valid email")
    .escape(),
  body("profileFirstName", "profileFirstName contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileFirstName must contain at least 1 characters")
    .escape(),
  body("profileSecondName", "profileSecondName must contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileSecondName must contain at least 1 characters")
    .escape(),
    body("profileDOB", "profileDOB must be a valid date")
        .isISO8601()
        .toDate()
        .withMessage("profileDOB must be a valid ISO date")
        .escape(),
    body("profileRole", "profileRole  must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileRole  must contain at least 1 characters")
        .escape(),
    body("profileCardHolderName", "profileCardHolderName must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileCardHolderName must contain at least 1 characters")
        .escape(),
    body("profileBankName", "profileBankName must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileBankName must contain at least 1 characters")
        .escape(),
    body("profileCardNumber", "profileCardNumber must be a number.")
        .isNumeric()
        .withMessage("profileCardNumber must be a number")
        .escape(),
    body("profileExpireyDate", "profileExpireyDate must contain atleast 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileExpireyDate must contain atleast 1 characters")
        .escape(),
      body("profileCVV", "profileCVV be a number")
        .isNumeric()
        .withMessage("profileCVV be a number")
        .escape(),
      body("profilePostCode", "profilePostCode must atleast 1 character long")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profilePostCode must atleast 1 character long")
        .escape(),
      body("profileHouseNumber", "profileHouseNumber must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileHouseNumber must contain at least 1 characters")
        .escape(),
      body("profileStreet", "profileStreet must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileStreet must contain at least 1 characters")
        .escape(),
      body("profileCity", "profileCity profileStreet must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileCity must contain at least 1 characters")
        .escape(),
        body("profileCounty", "profileCounty must contain at least 1 characters")
          .trim()
          .isLength({ min: 1 })
          .withMessage("profileCounty must contain at least 1 characters")
          .escape(),
        body("profileCountry", "profileCountry must contain at least 1 characters")
            .trim()
            .isLength({ min: 1 })
            .withMessage("profileCountry must contain at least 1 characters")
            .escape(),
        body("profileSignedIn", "profileSignedIn must be a boolean of either true or false")
            .isBoolean()
            .withMessage("profileSignedIn must be a boolean of either true or false")
            .escape(),
    asyncHandler(async (req, res, next) => {     
            const errors = validationResult(req);
            console.log(req.body)
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
            if (!errors.isEmpty()) {
              res.json({
                  profile: aProfile,
                  errors: errors.array(),
                  msg: "errors",
              }) 
            } else {
              await aProfile.save();
              res.json({
                  profile: aProfile,
                  msg: "Profile Created Successfully",
              })
            } 
})
]


// POST request to delete a profile
exports.profile_delete_post = asyncHandler(async (req, res, next) => {
    const aProfileExists = await Profile.findById(req.params.id)
    let errors = []
    let profileIDToDelete = req.params.id
    if (profileIDToDelete === null) {
        errors.push("Profile ID does not exist")
        res.json({
            profile: aProfileExists,
            errors: errors,
            msg: "Error"
        })
    } else {
        const aProfile = await Profile.findByIdAndDelete(req.params.id).exec();
        res.json({
            profile: aProfile,
            msg: "Profile deleted successfully" 
        })
    }
})

// GET request to update Profile.



// POST request to update Profile.
exports.profile_update_post = [
    body("profilePassword", "profilePassword must contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profilePassword must contain at least 1 characters")
    .escape(),
  body("profileTelephone", "profileTelephone contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileTelephone must contain at least 1 characters")
    .escape(),
  body("profileEmail", "profileEmail must be a valid email")
    .trim()
    .isEmail()
    .withMessage("profileEmail must be a valid email")
    .escape(),
  body("profileFirstName", "profileFirstName contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileFirstName must contain at least 1 characters")
    .escape(),
  body("profileSecondName", "profileSecondName must contain at least 1 characters")
    .trim()
    .isLength({ min: 1 })
    .withMessage("profileSecondName must contain at least 1 characters")
    .escape(),
    body("profileDOB", "profileDOB must be a valid date")
        .isISO8601()
        .toDate()
        .withMessage("profileDOB must be a valid ISO date")
        .escape(),
    body("profileRole", "profileRole  must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profilePassword  must contain at least 1 characters")
        .escape(),
    body("profileCardHolderName", "profileCardHolderName must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileCardHolderName must contain at least 1 characters")
        .escape(),
    body("profileBankName", "profileBankName must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileBankName must contain at least 1 characters")
        .escape(),
    body("profileCardNumber", "profileCardNumber must be a number.")
        .isNumeric()
        .withMessage("profileCardNumber must be a number")
        .escape(),
    body("profileExpireyDate", "profileExpireyDate must contain atleast 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileExpireyDate must contain atleast 1 characters")
        .escape(),
      body("profileCVV", "profileCVV be a number")
        .isNumeric()
        .withMessage("profileCVV be a number")
        .escape(),
      body("profilePostCode", "profilePostCode must atleast 1 character long")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profilePostCode must atleast 1 character long")
        .escape(),
      body("profileHouseNumber", "profileHouseNumber must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileHouseNumber must contain at least 1 characters")
        .escape(),
      body("profileStreet", "profileStreet must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileStreet must contain at least 1 characters")
        .escape(),
      body("profileCity", "profileCity profileStreet must contain at least 1 characters")
        .trim()
        .isLength({ min: 1 })
        .withMessage("profileCity must contain at least 1 characters")
        .escape(),
        body("profileCounty", "profileCounty must contain at least 1 characters")
          .trim()
          .isLength({ min: 1 })
          .withMessage("profileCounty must contain at least 1 characters")
          .escape(),
        body("profileCountry", "profileCountry must contain at least 1 characters")
            .trim()
            .isLength({ min: 1 })
            .withMessage("profileCountry must contain at least 1 characters")
            .escape(),
        body("profileSignedIn", "profileSignedIn must be a boolean of either true or false")
            .isBoolean()
            .withMessage("profileSignedIn must be a boolean of either true or false")
            .escape(),
    asyncHandler(async (req, res, next) => {     
            const errors = validationResult(req);
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
                _id: req.params.id,
            });

            if (!errors.isEmpty()) {
              res.json({
                  profile: aProfile,
                  errors: errors.array(),
                  msg: "errors",
              }) 
            } else {
              await Profile.findByIdAndUpdate(req.params.id, aProfile, {});
              res.json({
                  profile: aProfile,
                  msg: "Profile Updated Successfully",
              })
            } 
})
]


// GET request to get a Profile.
exports.profile_get = asyncHandler(async (req, res, next) => {
    const aProfile = await Profile.find({ _id: req.params.id}).exec();
    console.log("aProfile", aProfile)
    if (!aProfile) {
        res.json({
            profile: aProfile,
            msg: "Profile get unsuccessfull as event does not exist"
        })
    } else {
        res.json({
            profile: aProfile,
            msg: "Profile get successfull"
        })
    }
})

// POST request to update and sign out of  a Profile.
exports.profile_sign_out_post = (req, res) => {
    if (res.locals.currentUser) {
        req.logout((err) => {
          if (err) {
            return next(err); // Passes any errors to the error handler
          }
          res.json("user_logout", { user: null }); // User is now logged out, so pass null
        });
      } else {
        res.json("user_logout", { user: null });
      }
}

  

// GET request to sign in to a profile.
////


// POST request to update and sign in to a profile
exports.profile_sign_in_post = asyncHandler(async (req, res, next) => {
    try {
        console.log("Login POST request received");
    
      const profileDB = await Profile.find({profileEmail: req.body.profileEmail}).exec()
      console.log("User found in database: ", profileDB);
    
      const userEmail = `${profileDB[0].profileEmail}`
      const reqUserEmail = `${req.body.profileEmail}`
      const userPassword = `${profileDB[0].profilePassword}`
      const reqUserPassword = `${req.body.profilePassword}`
      if (userEmail === reqUserEmail) {
        console.log("Email match")
        if (userPassword === reqUserPassword) {
          console.log("password match")
          const userDBID = profileDB[0]._id;
          const token = jwt.sign({userID: userDBID}, 'passwordKey')
          res.status(200).json({
            userIDSignInCreated: userDBID,
            userIsAuthor: profileDB[0].isAuthor,
            message: "JWT Auth Creation Passed",
            token: token
        })
        } else {
          console.log("Password not found");
          res.json({ message: "Incorrect password" });
        }
      } else {
        console.log("Email not found");
    
        res.json({ message: "Incorrect email" });
      }
    }
    catch (error) {
      console.log("Error in login POST: ", error);
    
      next(error);
    }
})

