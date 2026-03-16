const requireAdmin = (req, res, next) => {
    const user = req.user;

    if (user.role = 'admin') {
        next();
    } else {
        res.status(403).json({ error: "Forbidden: Admins only" });
    }
};
