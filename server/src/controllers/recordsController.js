const Record = require("../models/record")

const getRecords = async (req, res) => {
   try {
    const allRecords = await Record.find();
    res.status(200).json({data: allRecords})
   } catch (error) {
    res.status(500).json({message: "Records not found"})
   }
}

const getRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        res.status(200).json({data: record, message:`Record with id ${req.params.id} found`})
    } catch (error) {
        res.status(500).json({message: "Record not found"})
    }
}

const addRecord = async (req, res) => {
    try {
        const record = new Record({
            date: req.body.date,
            category: req.body.category,
            subcategory: req.body.subcategory,
            amount: req.body.amount,
            user: req.body.user
        })
        await record.save();
        res.status(200).json({data: record, message: "Record created successfully"})
    } catch (error) {
        res.status(500).json({message: "Record not created"})
    }
}

const deleteRecord = async (req, res) => {
    try {
        const deleteRecors = await Record.findByIdAndDelete(req.params.id);
        res.status(200).json({data: deleteRecors, message: `Record with id ${req.params.id} deleted successfully`})
    } catch (error) {
        res.status(500).json({message: "Record not deleted"})
    }
}

const updateRecord = async (req, res) => {
try {
        const {date, category, subcategory, amount, user} = req.body;
        const recordToUpdate = {
            date,
            category,
            subcategory,
            amount,
            user
        }
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id, recordToUpdate, {new: true});
        res.status(200).json({data: updatedRecord, message: `Record with id ${req.params.id} updated successfully. old record: ${recordToUpdate}, new record: ${updatedRecord}`})

} catch (error) {
    res.status(500).json({message: "Record not updated"})
}

}

module.exports = {
    getRecords,
    getRecord,
    addRecord,
    deleteRecord,
    updateRecord
}