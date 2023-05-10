const express = require('express');
const router = express.Router();

const { getRecords, getRecord, addRecord, deleteRecord, updateRecord } = require('../controllers/recordsController');

router.post("/records", addRecord);

router.get("/records", getRecords);

router.get("/records/:id", getRecord);

router.patch("/records/:id", updateRecord);

router.delete("/records/:id", deleteRecord);

module.exports = router;