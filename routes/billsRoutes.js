const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Bill = mongoose.model('bills');

module.exports = app => {
    app.post('/api/bills', requireLogin, async (req, res) => {
        const {title, amount, duedate} = req.body;
        
        const Bills = new Bill({
            title,
            amount,
            duedate,
            _user: req.user.id
        });

       
        try {
            await Bills.save();
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });

    app.get('/api/bills', async (req, res) => {
        const bills = await Bill.find({ _user: req.user.id });

        res.send(bills);
    });

    app.delete('/api/delete_bill', (req, res) => {
        res.send('bill deleted');
    });
};