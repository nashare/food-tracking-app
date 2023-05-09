module.exports = {
    create
};

function create(req, res) {
    res.json({
        name: req.body.name,
        email: req.body.email
    });
}
