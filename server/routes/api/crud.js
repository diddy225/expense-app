const ObjectId = require('mongoose').Types.ObjectId; 
const User = require('../../models/User')
const express = require('express')
const router = express.Router()

  router.get('/expenses', function(req, res) {
    if(req.user) {
      User.find({googleID: req.user.googleID})
      .then(function(data) {
        res.json(data);
      })
    } else {
      res.send('PLEASE LOGIN')
    }
  })

  router.post('/add', function(req, res) {
    if(req.user) {
      User.findOneAndUpdate(
        {googleID:req.user.googleID},
        {"$addToSet": {"expenses": 
        { business: req.body.business, 
          amount: req.body.amount, 
          due:req.body.due
        }}}
      )
      .then(function (data) {
        res.json(data);
      })
    } else {
      res.send('PLEASE LOGIN')
    }
  });

  router.put('/update/:id', function(req,res) {
    if(req.user) {
      User.updateOne(
        {"googleID": req.user.googleID, "expenses._id": ObjectId(req.params.id)},
        {"$set": {"expenses.$.paid": true}},
        function(err, user){
          if(err) {
            console.log(err)
          }
        }
      )
      .then(function(response) {
        res.json(response)
      })
    } else {
      res.send('PLEASE LOGIN')
    }
  })

  router.put('/delete/:id', function(req, res) {
    if(req.user) {
      User.findOneAndUpdate(
        {"googleID": req.user.googleID},
        { "$pull": {"expenses": {"_id": ObjectId(req.params.id)}}},
        {"new": true},
        function(err, user) {
          if(err){
            console.log(err)
          }
          res.json(user)
        }
      )
    } else {
      res.send('PLEASE LOGIN')
    }
  })


  module.exports = router