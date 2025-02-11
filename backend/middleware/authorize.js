const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Akses ditolak. Anda bukan admin." });
    }
    next();
  };
  
  module.exports = adminOnly;
  