const express = require('express');

const Drone = require('../models/Drone.js');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then((allDronesFromDB)=>{
      res.render('drones/list', {drones:allDronesFromDB});
    })
    .catch(err =>{
      console.log(err)
    });
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  let {name, propellers, maxSpeed} = req.body;
  Drone.create({
    name,
    propellers,
    maxSpeed
  }).then (()=>{
    res.redirect('/drones')
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  droneId= req.params.id;
  Drone.findById(droneId)
  .then((DroneFound)=>{
    res.render('drones/update-form', {drone: DroneFound})
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  let droneid= req.params.id; 
  let {name, propellers, maxSpeed} = req.body;
  Drone.findByIdAndUpdate(droneid,{
    name,
    propellers, 
    maxSpeed,
  }).then(()=>{
    res.redirect('/drones');
  })
  .catch(err =>{
    console.log(err)
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  let droneid= req.params.id; 
  Drone.findByIdAndDelete(droneid)
    .then(()=>{
      res.redirect('/drones');
    })
});

module.exports = router;
