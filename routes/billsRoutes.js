const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Bills = mongoose.model('bills');

module.exports = app => {
    app.post('/api/bills', requireLogin, (req, res) => {
        const {title, amount, duedate} = req.body;
        
        const Bills = new Bills({
            title,
            amount,
            duedate,
            _user: req.user.id
        });

        Bills.save();
    });
};