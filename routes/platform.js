const express = require('express');
const router = express.Router();
const jwtAuth = require('../jwtAuth')
const event_controller = require("../controllers/eventController");
const profile_controller = require("../controllers/profileController");

/// PROFILE ROUTES ///


//
// POST request for creating profile
router.post("/profile/post", 
profile_controller.profile_create_post
)
//
// GET request to get a Profile.
router.get("/profile/get/:id/aprofile", jwtAuth, 
profile_controller.profile_get
)
//
// POST request to update Profile.
router.post("/profile/put/:id/profileupdate", jwtAuth,
profile_controller.profile_update_post
);
//
// POST request to delete a profile
router.post("/profile/delete/:id", jwtAuth,
profile_controller.profile_delete_post
)
//
// POST request to login user and return token
router.post("/profile/put/signin", 
profile_controller.profile_sign_in_post
);
//
// POST request to update and sign out of  a Profile.
router.get("/profile/put/signout",
profile_controller.profile_sign_out_post
)

/// EVENT ROUTES ///
//
// POST request to create a event.
router.post("/event/post", jwtAuth, event_controller.event_create_post
)


// POST request to delete a event.
router.post("/event/delete/:id", jwtAuth, 
event_controller.event_delete_post
)

//
// GET request to get all events
router.get("/events/get", jwtAuth,
event_controller.events_get
)
//
// GET request to get a event.
router.get("/event/get/:id/aevent",  jwtAuth,
event_controller.event_get
)
//
// POST request to update a event.
router.post("/event/put/:id/eventupdate", jwtAuth,
event_controller.event_update_post
)

//test below.
//
// GET a atendee for a event.
router.get("/event/get/:eventID/atendee/:atendeeID", jwtAuth, event_controller.getAAtendeeForAEvent)
//
// POST create a atendee for a event.
router.post("/event/create/:eventID/atendee/:atendeeID", jwtAuth,
event_controller.createAAtendeeForAEvent
)
//
// POST delete a atendee for a event.
router.post("/event/delete/:eventID/atendee/:atendeeID", jwtAuth, 
event_controller.deleteAAtendeeForAEvent
)



module.exports = router;
