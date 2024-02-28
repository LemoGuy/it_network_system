const mongoose = require('mongoose');

const portSchema = new mongoose.Schema({
  portNumber: {
    type: Number,
    required: true,
  },
  patchPanelPortNumber: {
      type: String,
      required: true,
    },
  roomNumber: {
    type: String,
    required: true,
  },
  batchNumberOnWall: {
      type: String,
      required: true,
    },
});

const switchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uploadedBy: { type: mongoose.Types.ObjectId, required: true },
  // uploadDate: { type: Date, required: true, default: Date.now },
  building: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  shelfNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  macAddress: {
    type: String,
    required: true,
    unique: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ports: {
    type: [portSchema],
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  subnet: {
    type: String,
    required: true,
  },
  vlan: {
    type: String,
    required: true,
  },
  firmwareVersion: {
    type: String,
  },
  portType: {
    type: Number,
  }
});



const Switch = mongoose.model('Switch', switchSchema);

module.exports = Switch;
