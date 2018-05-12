const mongoose = require("mongoose");
const Group = require("../models/Group");

exports.groups_get_all = (req, res, next) => {
  Group
    .find()
    .select("-__v -mechanismOfAction") // exclude
    .exec()
    .then(docs => {
      console.log(docs);
      const response = {
        count: docs.length,
        groups: docs.map(doc => {
          return {
            name: doc.name,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/groups/" + doc._id
            }
          };
        })
      };
      res
        .status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({error: err});
    });
}; // DONE !!!

exports.groups_create_group = (req, res, next) => {
  console.log(req.body)
  const group = new Group({
    _id: new mongoose
      .Types
      .ObjectId(),
    name: req.body.name
  });
  group
    .save()
    .then(result => {
      console.log(result);
      res
        .status(201)
        .json({
          message: "Group created successfully",
          createdGroup: {
            name: result.name,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/groups/" + result._id
            }
          }
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({error: err});
    });
}; // DONE !!!

exports.groups_get_group = (req, res, next) => {
  const id = req.params.productId;
  Group
    .findById(id)
    .select("-__v -mechanismOfAction")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res
          .status(200)
          .json({
            group: doc,
            request: {
              type: "GET",
              url: "http://localhost:5000/groups"
            }
          });
      } else {
        res
          .status(404)
          .json({message: "No valid entry found for provided ID"});
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({error: err});
    });
}; // DONE !!!

exports.groups_update_group = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {

    updateOps[Object.keys(ops)[0]] = Object.values(ops)[0];

  }
  Group.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result);
      res
        .status(200)
        .json({
          message: "Product updated",
          request: {
            type: "PATCH",
            url: "http://localhost:5000/groups/" + id
          }
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({error: err});
    });
}; // DONE !!!

exports.groups_delete = (req, res, next) => {
  const id = req.params.productId;
  Group
    .remove({_id: id})
    .exec()
    .then(result => {
      res
        .status(200)
        .json({
          message: "Group deleted",
          request: {
            type: "POST",
            url: "http://localhost:5000/groups"
          }
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({error: err});
    });
}; // DONE !!!