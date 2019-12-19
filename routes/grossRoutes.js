const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const GrossPay = mongoose.model('grosspays');

module.exports = app => {
    app.post('/api/grosspay', requireLogin, async (req, res) => {
        const { amount } = req.body;
        
        const _GrossPay = new GrossPay({
            amount,
            _user: req.user.id
        });

       
        try {
            await _GrossPay.save();
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });

    app.get('/api/grosspay', async (req, res) => {
        const grosspay = await GrossPay.find({ _user: req.user.id });

        res.send(grosspay);
    });

    app.post('/api/grossedit', async (req, res) => {
        let { amount } = req.body;

        const updateUser = await GrossPay.find({ _user: req.user.id });

        GrossPay.updateOne({ _id: updateUser[0]._id }, {
            $Set: {
                amount
            }
        });
        res.send(updateUser);
    });
};