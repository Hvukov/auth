const {Category} = require("../models/record")

const createCategory = async (req, res) => {
    try {
        const {name, subcategories} = req.body;

        const existingCategory = await Category.findOne({name})
        if(existingCategory) {
            res.status(409).json({message: "Category already exists"})
            return
        }
        if(!name){
            res.status(422).json({message: "Name is required"})
            return
        }
        
        if(!subcategories) {
            res.status(422).json({message: "Subcategories are required"})
            return
        }
        const newCategory = new Category({name, subcategories})
        await newCategory.save()
        res.status(201).json({
            message: `Category ${name} created`,
            data: newCategory
        })
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Category not created"})
    }
}

const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        if(!allCategories) throw new Error("Categories not found")
        res.status(200).json({data: allCategories})
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Categories not found"})
    }
}

module.exports = {
    getCategories,
    createCategory
}