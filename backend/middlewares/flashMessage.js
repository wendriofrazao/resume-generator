
const flashMessageLocals = (req, res, next) => {
    res.locals.session = req.session;
    res.locals.success_msgs = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg');
    next()
}

export default flashMessageLocals;