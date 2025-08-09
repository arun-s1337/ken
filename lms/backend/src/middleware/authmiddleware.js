import jwt from "jsonwebtoken"


const JWT_SECRET ='your_jwt_secret';

export async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token missing' });

     jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; 
    next();
  });
}

export function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id; 

    console.log(req.adminId)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}