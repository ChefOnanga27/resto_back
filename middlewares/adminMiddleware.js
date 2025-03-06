const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous devez être administrateur." });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  