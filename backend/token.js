function authenticateToken(req, res, next) {
    const token = req.header("Authorization");

    console.log("Token received:", token);  // Verificar si el token está llegando

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        console.log("Verified user:", verified);  // Verificar si el token es válido
        req.user = verified; // Attach user info to request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.log("Error verifying token:", error);  // Verificar el error
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}
