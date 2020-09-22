try {
  const EventModel = require("../models/event");
  module.exports = {
    showEvents: (req, res) => {
      EventModel.find({}, (err, events) => {
        if (err) {
          res.status(404);
          res.send("No Event found");
        }

        res.render("pages/events", {
          events: events,
          success: req.flash("success"),
        });
      });
    },
    seedEvents: (req, res) => {
      const events = [
        {
          name: "Cricket",
          description: "11 players each side",
        },
        {
          name: "Basketball",
          description: "5 players each side",
        },
        {
          name: "Football",
          description: "11 players each side",
        },
        {
          name: "kho1-kho1",
          description: "9 players each side",
        },
      ];
      EventModel.remove({}, () => {
        for (event of events) {
          var newEvent = new EventModel(event);
          newEvent.save();
        }
      });

      res.send("Database seeded");
    },

    singleSingle: (req, res) => {
      EventModel.findOne({ slug: req.params.slug }, (err, event) => {
        if (err) {
          res.status(404);
          res.send("No Event found");
        }

        res.render("pages/single", { event, success: req.flash("success") });
      });
    },
    createForm: (req, res) => {
      res.render("pages/form", { errors: req.flash("errors") });
    },
    addEvent: (req, res) => {
      req.checkBody("name", "Name Cant be blank").notEmpty();
      req.checkBody("description", "Description Cant be blank").notEmpty();

      const event = new EventModel({
        name: req.body.name,
        description: req.body.description,
      });
      const errors = req.validationErrors();
      if (errors) {
        req.flash(
          "errors",
          errors.map((err) => err.msg)
        );
        return res.redirect("/events/create");
      }
      event.save((err) => {
        if (err) throw err;
        req.flash("success", "Successfully Created!");
        res.redirect(`/events/${event.slug}`);
      });
    },
    showEdit: (req, res) => {
      EventModel.findOne({ slug: req.params.slug }, (err, event) => {
        res.render("pages/edit", {
          event: event,
          errors: req.flash("errors"),
        });
      });
    },
    processEdit: (req, res) => {
      req.checkBody("name", "Name Cant be blank").notEmpty();
      req.checkBody("description", "Description Cant be blank").notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        req.flash(
          "errors",
          errors.map((err) => err.msg)
        );

        return res.redirect(`/events/${req.params.slug}/edit`);
      }
      EventModel.findOne({ slug: req.params.slug }, (err, event) => {
        event.name = req.body.name;
        event.description = req.body.description;
        event.save((err) => {
          if (err) throw err;
          req.flash("success", "Successfully Created");
          res.redirect("/events");
        });
      });
    },
    deleteEvent: (req, res) => {
      var slug = req.params.slug;
      EventModel.remove({ slug: slug }, (err) => {
        req.flash("success", "Successfully Deleted the event" + slug);
        res.redirect("/events")
      });
    },
  };
} catch (err) {
  console.log(err);
}
