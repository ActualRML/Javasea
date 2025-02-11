const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const sendEmail = require("../lib/mailer"); 
const { User } = require("../models");

exports.registerUser = async (req, res) => {
  const { username, email, password, name, phone, address, role } = req.body;

  // Validasi input
  if (!username || !email || !password || !name || !phone || !address || !role) {
    return res.status(400).json({
      ok: false,
      message: "Please provide all required fields: username, email, password, name, phone, address, role",
    });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat user baru di database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      phone,
      address,
      role,
      created_at: new Date(), 
    });

    res.status(201).json({
      ok: true,
      message: "Registration successful!",
      data: {
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      message: "Registration failed!",
      error: error.message,  
    });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({
        where: { email} });
  
      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "Pengguna tidak ditemukan",
        });
      } else if (!user.is_active) {
        return res.status(403).json({ message: "Akun Anda telah dinonaktifkan" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          ok: false,
          message: "Kredensial tidak valid",
        });
      }
  
      const token = jwt.sign(
        { 
            id: user.user_id,
            email: user.email,
            name: user.name,
            role: user.role 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } 
      );
  
      res.status(200).json({
        ok: true,
        message: "Login berhasil!",
        data: {
          id: user.user_id,
          email: user.email,
          name: user.name,
          role: user.role,
          token, 
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Terjadi kesalahan di server",
      });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
      const userId = req.user.user_id;
      console.log("User ID dari token: ", userId);
      const user = await User.findByPk(userId); 
  
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
  
      res.status(200).json({
        message: 'Data profil berhasil diambil!',
        data: {
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.user_id;
      const { name, email, password, phone, address } = req.body;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }
      // Update user data
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      // Hash password baru jika diubah
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
      res.json({ message: "Profile updated successfully", user });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
      // Pastikan admin tidak menonaktifkan dirinya sendiri
      if (req.user.role === 'admin' && req.user.user_id === parseInt(req.params.id)) {
        return res.status(400).json({ message: "Admin tidak dapat menonaktifkan dirinya sendiri" });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      user.is_active = false;
      await user.save();
  
      return res.status(200).json({ message: "Akun berhasil dinonaktifkan" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

exports.activateUser = async (req, res) => {
    try {
      const { user_id } = req.user;
      // Cek jika yang mencoba mengaktifkan adalah admin dan ID-nya adalah miliknya sendiri
      if (req.user.role === 'admin' && req.user.user_id === parseInt(req.params.id)) {
        return res.status(400).json({ message: "Admin tidak dapat mengaktifkan akun mereka sendiri" });
      }
  
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      if (user.is_active) {
        return res.status(400).json({ message: "Akun sudah aktif" });
      }
  
      user.is_active = true;
      await user.save();
  
      res.json({ message: "Akun berhasil diaktifkan kembali" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Buat token reset password
    const resetToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } 
    );
    console.log("Reset Token: ", resetToken);

    // Kirim response dengan token ke Postman
    return res.json({
      message: "Password reset token has been generated",
      resetToken, 
    });

  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query; 
    const { newPassword } = req.body; 

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token tidak valid atau sudah expired" });
  }
};




  