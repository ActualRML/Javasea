const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan atau sudah dihapus" });
    }

    if (!user.is_active && req.path !== "/users/activate") {
      return res.status(403).json({ message: "Akun Anda telah dinonaktifkan" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token tidak valid atau sudah expired" });
  }
};

module.exports = authenticate;
