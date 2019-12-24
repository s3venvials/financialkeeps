const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');
const Bill = mongoose.model('bills');

module.exports = app => {
    app.get('/api/user/profile', requireLogin, (req, res) => {
        res.send(req.user);
    });

    app.post('/api/delete/user', async (req, res) => {
        let id = req.body;

        let error = "";

        await User.deleteOne({ _id: id.id }, (err) => {
            if (err) {
                error = err;
            }
        });

        await Bill.deleteMany({ _user: id.id }, (err) => {
            if (err) {
                console.log(err);
                error = err;
            }
        });

        if (error !== "") {
            res.send({ "error": error });
        } else {
            res.send({ "success": "User was deleted successfully!" });
        }
    });

    app.post("/api/update/user", (req, res) => {
        let { grosspay, netpay, frequencyofpay, newuser, id } = req.body;
        let error = "";

        User.findByIdAndUpdate({ _id: id }, {
            $set: {
                grosspay,
                netpay,
                frequencyofpay,
                newuser
            }
        }, (err) => {
            if (err) {
                error = err;
            }
        });

        if (error !== "") {
            res.send({ "error": error });
        } else {
            res.send(req.user);
        }
    });

    app.post("/api/user/optout", requireLogin, (req, res) => {
        let { newuser } = req.body;
        let error = "";

        User.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                newuser
            }
        }, (err) => {
            if (err) {
                error = err;
            }
        });

        if (error !== "") {
            res.send({ "error": error });
        } else {
            res.end();
        }
    });

    app.post("/api/user/new/profile", requireLogin, (req, res) => {
        let { grosspay, netpay, frequencyofpay, newuser } = req.body;
        let error = "";

        User.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                grosspay,
                netpay,
                frequencyofpay,
                newuser
            }
        }, (err) => {
            if (err) {
                error = err;
            }
        });

        if (error !== "") {
            res.send({ "error": error });
        } else {
            res.end();
        }
    });
};