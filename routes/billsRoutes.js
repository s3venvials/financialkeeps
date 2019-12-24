const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Bill = mongoose.model('bills');

module.exports = app => {
    app.post('/api/new/bill', requireLogin, async (req, res) => {
        let { title, amount, duedate, isRecurring, transactiontype, paymentperiod, frequencyofpay } = req.body;

        if (duedate === "") {
            duedate = Date.now();
        }

        if (transactiontype === "") {
            transactiontype = "Manual";
        }

        if (paymentperiod === "" && frequencyofpay === 1) {
            paymentperiod = "Monthly PayDay1";
        }

        if (paymentperiod === "" && frequencyofpay === 2) {
            paymentperiod = "Bi - Weekly PayDay1";
        }

        if (paymentperiod === "" && frequencyofpay === 4) {
            paymentperiod = "Weekly PayDay1";
        }

        const Bills = new Bill({
            title,
            amount,
            duedate,
            isRecurring,
            transactiontype,
            paymentperiod,
            _user: req.user.id
        });


        try {
            await Bills.save();
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            console.log(err);
            res.status(422).send(err);
        }

    });

    app.get('/api/bills', (req, res) => {
        Bill.find({ _user: req.user.id }, (err, bills) => {
            if (err) {
                console.log(err);
            } else {
                res.send(bills);
            }
        });
    });

    app.post('/api/delete', async (req, res) => {
        let bills = req.body;

        let error = "";

        for (var i = 0; i < bills.data.length; i++) {
            Bill.deleteOne({ _id: bills.data[i]._id }, (err) => {
                if (err) {
                    error = err;
                }
            });
        }

        if (error !== "") {
            res.send({ "error": error });
        } else {
            const bills = await Bill.find({ _user: req.user.id });
            res.send({ "success": "Bills were deleted successfully!", bills });
        }
    });

    app.get("/edit/bill/:id", (req, res) => {
        let id = req.params.id;

        Bill.findById({ _id: id }, (err, foundBill) => {
            if (err) {
                res.send({ "error": err });
            } else {
                res.send(foundBill);
            }
        });
    });

    app.post("/edit/bill/update", (req, res) => {
        let { title, amount, duedate, id, isRecurring, transactiontype, paymentperiod } = req.body;

        Bill.findByIdAndUpdate({ _id: id }, {
            $set: {
                title,
                amount,
                duedate,
                isRecurring,
                transactiontype,
                paymentperiod
            }
        }, (err, updatedBill) => {
            if (err) {
                res.send({ error: err });
            } else {
                res.send({ "success": `The bill ${updatedBill.title} was updated successfully!` });
            }
        });
    });

    app.post("/api/update/paid", async (req, res) => {
        let { data } = req.body;

        let error = "";

        Bill.findByIdAndUpdate({ _id: data._id },
            {
                $set: {
                    paid: data.paid
                }
            }, (err) => {
                if (err) {
                    error = err;
                }
            });

        if (error !== "") {
            res.send({ "error": error });
        } else {
            const bills = await Bill.find({ _user: req.user.id });
            res.send({ "success": "Bills were deleted successfully!", bills });
        }
    });
};