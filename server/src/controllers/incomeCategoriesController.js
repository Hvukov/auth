const { IncomeCategory } =  require("../models/income");

const createCategory = async (req, res) => {
    try {
       const {name} = req.body;
       const newCategory = new IncomeCategory({name});
         await newCategory.save();
            res.status(201).json({
                message: `Category ${name} created`,
                data: newCategory
            })
    } catch (error) {
        res.status(500).json({message: "Category not created"})
    }
}

const getCategories = async (req, res) => {
    try {
        const allCategories = await IncomeCategory.find();
        if(!allCategories) throw new Error("Categories not found")
        res.status(200).json({data: allCategories})
        
    } catch (error) {
        res.status(500).json({message: "Categories not found"})
    }
}

const getOneCategory = async (req, res) => {
    try {
        const category = await IncomeCategory.findById(req.params.id).exec();
        if(!category) {
            res.status(404).json({message: "Category not found"})
        }
        res.status(200).json({data: category})
    } catch (error) {
        res.status(500).json({message: "Category not found"})
    }
}

const updateCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = await IncomeCategory.findById(req.params.id).exec();
        if(!category) {
            res.status(404).json({message: "Category not found"})
        }
        const updatedCategory = await IncomeCategory.findByIdAndUpdate(req.params.id, {name}, {new: true}).exec();
        res.status(200).json({message: "Category updated", data: updatedCategory})
        
    } catch (error) {
        res.status(500).json({message: "Category not updated"})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await IncomeCategory.findById(req.params.id).exec();
        if(!category) {
            res.status(404).json({message: "Category not found"})
        }
        await IncomeCategory.findByIdAndDelete(req.params.id).exec();
        res.status(200).json({message: "Category deleted"})
        
    } catch (error) {
        res.status(500).json({message: "Category not deleted"})
    }
}

module.exports = {
    createCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
}