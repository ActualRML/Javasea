const { Category } = require("../models"); 

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
  
    try {
      const category = await Category.create({ name, description });
      res.status(201).json({ message: "Category created successfully", category });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating category" });
    }
  };
  
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching categories" });
    }
  };

exports.getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching category" });
    }
  };

exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
  
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      category.name = name || category.name;
      category.description = description || category.description;
      await category.save();
  
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating category" });
    }
  };

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting category" });
    }
  };
  
  
  
  