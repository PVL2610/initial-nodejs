const sayHello = (req, res) => {
    res.send(req.t('hello'));
};
module.exports = { sayHello };