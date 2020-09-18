try {
  const EventModel = require("../models/event");
  module.exports = {
    showEvents: (req, res) => {
      EventModel.find({}, (err, events) => {
        if (err) {
          res.status(404);
          res.send("No Event found");
        }

        res.render("pages/events", { events: events });
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

        res.render("pages/single", { event });
      });
    },
    createForm: (req, res) => {
      res.render("pages/form");
    },
    addEvent: (req, res) => {

      console.log(req.body);
      res.send(req.body);
        /*   const event=new EventModel({
            name:req.body.name,
            description:req.body.description
          });
 */
   /*        event.save((err)=>{
            if(err)
              throw err
          });

          res.render(`/events/${event.slug}`); */
    }
  };
} catch (err) {
  console.log(err);
}
