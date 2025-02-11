const { Product } = require("../models"); 

exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Ambil data dari body request dan file
    const { name, description, price, stock, weight, categoryId } = req.body;

    // Validasi jika data penting tidak ada
    if (!name || !description || !price || !stock || !weight || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file.filename; // Ambil nama file gambar yang sudah disimpan

    // Buat produk baru
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      weight,
      categoryId,
      image,
    });

    // Kirim respons berhasil
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error while creating product:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      message: "Products fetched successfully",
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByPk(categoryId, {
      include: { model: Product, as: "products" } 
    });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, stock, weight, categoryId, image } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.weight = weight || product.weight;
    product.categoryId = categoryId || product.categoryId;
    product.image = image || product.image;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.activateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'product not found'})
    }
    product.is_active = true;
    await product.save();

    return res.status(200).json({
      message: 'Product is now active'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'product not found'})
    }
    product.is_active = false;
    await product.save();

    return res.status(200).json({
      message: 'Product is now inactive'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


