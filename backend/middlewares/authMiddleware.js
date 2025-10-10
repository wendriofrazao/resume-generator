// middlewares/authMiddleware.js
export async function checkAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } 
  console.log("Você precisa estar logado para acessar essa página.");
  res.json({ success: false, msg: "Você precisa estar logado para acessar essa página."})
}


