const express = require("express");
const MainController=require("./controllers/main.controller");
const EventsController=require("./controllers/events.controller");
const router = express.Router();
module.exports = router;

router.get("/", MainController.showHome);
router.get("/events", EventsController.showEvents)
router.get("/events/seed", EventsController.seedEvents);
router.get("/events/create", EventsController.createForm);
router.post("/events/addEvent", EventsController.addEvent);

router.get("/events/:slug/edit",EventsController.showEdit);
router.post("/events/:slug",EventsController.processEdit);
router.get("/events/:slug/delete",EventsController.deleteEvent);

router.get("/events/:slug", EventsController.singleSingle);

