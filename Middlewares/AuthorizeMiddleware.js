export const AuthorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.admin.adminPostion; // assuming JWT decoded into req.user

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Because ${userRole}s are not Authorized`,
      });
    }

    next();
  };
};
