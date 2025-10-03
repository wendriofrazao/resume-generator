

const setSession = (req, res, next) => {
    if (req.session.userId) {
        res.locals.session = req.session;
    }
    next();
}

export default setSession;