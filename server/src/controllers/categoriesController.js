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
        if(!allCategories) {
            res.status(404).json({message: "Categories not found"})
        }
        res.status(200).json({data: allCategories})
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Categories not found"})
    }
}

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).exec()
        if(!category) {
            res.status(404).json({message: "Category not found"})
        }
        res.status(200).json({data: category})
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Category not found"})
    }
}

const updateCategory = async (req, res) => {
    const {name, subcategories} = req.body;
    const category = await Category.findById(req.params.id).exec()
         if(!category) {
            res.status(404).json({message: "Category not found"})
         }
    try {
       const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {name, subcategories}, {new: true}).exec()
         res.status(200).json({message: "Category updated", data: updatedCategory})
        
    } catch (error) {
        console.warn(error)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id).exec()
        if(!category) {
            res.status(404).json({message: "Category not found"})
        }
        res.status(200).json({message: "Category deleted"})
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Category not deleted"})
    }
}

const updateSubcategory = async (req, res) => {
  const {categoryId, subcategoryId} = req.params;
    const {name} = req.body;
    try {
        const category = await Category.findById(categoryId).exec()
        if(!category) {
            res.status(404).json({message: "Category not found"})

        }
        const subcategory = category.subcategories.id(subcategoryId)
        if(!subcategory) {
            res.status(404).json({message: "Subcategory not found"})
        }
        subcategory.name = name
        await category.save()
        res.status(200).json({message: "Subcategory updated",category:category, subcategory: subcategory})
    } catch (error) {
        console.warn(error)
        res.status(500).json({message: "Subcategory not updated"})  
    }
}


module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    getOneCategory,
    deleteCategory,
    updateSubcategory
}