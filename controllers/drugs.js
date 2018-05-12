const mongoose = require("mongoose");

const Drug = require("../models/Drug");
const Group = require("../models/Group");

exports.drugs_get_all = (req, res, next) => {
  Drug.find()
    .select()
    .populate("group", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        drugs: docs.map(doc => {
          return {
            _id: doc._id,
            drug: doc.name,
            group: doc.group,
            request: {
              type: "GET",
              url: "http://localhost:5000/drugs/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}; // DONE !!!


exports.drugs_create_drug = (req, res, next) => {
  console.log(req.body);
  Group.findById(req.body.groupId)
    .then(group => {
      if (!group) {
        return res.status(404).json({
          message: "Group not found"
        });
      } // if group not found
      const drug = new Drug({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        group: req.body.groupId
      });
      return drug.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Drug created",
        createdDrug: {
          _id: result._id,
          group: result.group,
          name: result.name
        },
        request: {
          type: "POST",
          url: "http://localhost:5000/drugs/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}; // DONE !!!


exports.drugs_get_drug = (req, res, next) => {
  Drug.findById(req.params.drugId)
    .populate()
    .exec()
    .then(drug => {
      if (!drug) {
        return res.status(404).json({
          message: "drug not found"
        });
      }
      res.status(200).json({
        drug,
        // request: {
        //   type: "GET",
        //   url: "http://localhost:5000/drugs"
        // }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}; // DONE !!!

exports.drugs_delete_drug = (req, res, next) => {
  Drug.remove({ _id: req.params.drugId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Drug deleted",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}; // DONE !!!