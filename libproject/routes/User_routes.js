const express = require('express');
const cors = require('cors');
const routes = express.Router();
const app = express();
const User = require('../models/User_model');
const Book = require('../models/Book_model');
const History = require('../models/History_model');
const IssedBooks = require('../models/Issued_book_model');
const ReservedBooks = require('../models/Reserved_book_model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.env.SECRET_KEY = "secrret";
app.use(cors());

routes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
});
routes.route('/profile').post(function (req, res) {
    console.log('ok  '+req.body.token);
    if(req.body.token!=null){
        console.log(req.body.token);
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=>{
                if(user){
                    res.send(user);
                }
            })
            .catch(err=>{
                res.send(err);
            })
    }
});

routes.route('/check').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    console.log(decoded.user_id);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                res.send(true);
            }else{
                res.send(false);
            }
        })
        .catch(err=>{
            res.send(false);
        })
});

routes.route('/user_login').post(function (req,res) {
    User.findOne({
        user_id:req.body.user_id
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.user_password, user.user_password)){
                    const payload = {
                        _id: user._id,
                        user_id: user.user_id
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.send({token: token, role: user.user_role, id: user.user_id})
                } else {
                    res.send("Password does not match");
                }
            } else {
                res.send("User doesnot exist")
            }
        })
        .catch(err => {
            res.send('error ' + err)
        })
});
routes.route('/user_signup').post(function (req,res) {
    console.log('hello');
    User.findOne({
        user_id:req.body.user_id
    })
        .then(user => {
            if(!user){
                bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    let usr = new User({
                        user_id: req.body.user_id,
                        user_name: req.body.user_name,
                        user_email: req.body.user_email,
                        user_phone_number: req.body.user_phone_number,
                        user_password: hash,
                        user_role: 'student',
                        user_approved: false
                    });
                    usr.save()
                        .then(user => {
                            res.status(200).send('Student was registered successfully...');
                        })
                        .catch(err=>{
                            res.status(400).send('adding new Student failed...');
                        });
                })
            }else {
                res.send('The student is already exists...')
            }
        })
});

routes.route('/reserved_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    ReservedBooks.find({
        user_id: decoded.user_id
    }).then(books=>{
        if(books){
            res.json(books)
        }
    });
});
routes.route('/borrowed_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    IssedBooks.find({
        user_id: decoded.user_id
    }).then(books=>{
        if(books){
            res.json(books)
        }
    });
});

routes.route('/all_reserved_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                ReservedBooks.find(function (err, books) {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(books);
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
});

routes.route('/reserve').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            ReservedBooks.findOne({
                book_id: req.body.book_id
            }).then(book=>{
                if(!book){
                    var date = new Date();
                    //date.replace("IST", "SLST");
                    let b = new ReservedBooks({
                        book_id: req.body.book_id,
                        user_id: decoded.user_id,
                        ref_id: req.body.ref_id,
                        reserved_date: date
                    });
                    Book.findById(req.body.ref_id, function (err, bk) {
                        if (bk) {
                            bk.book_availability = false;
                            bk.save();
                        }
                    });
                    b.save()
                        .then(user => {
                            res.send('Reserved successfully...');
                        })
                        .catch(err=>{
                            res.send('Reserving failed...');
                        });
                }else {
                    res.send('The book is already reserved...');
                }
            });
        }
    })
});

routes.route('/issue').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            ReservedBooks.deleteOne({
                book_id: req.body.book_id
            },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        var date = new Date();
                        date.setDate(date.getDate() + 7);
                        let issue = new IssedBooks({
                            book_id: req.body.book_id,
                            user_id: req.body.user_id,
                            ref_id: req.body.ref_id,
                            expected_return_date: date
                        });
                        issue.save()
                            .then(user => {
                                res.send('Issued successfully...');
                            })
                            .catch(err=>{
                                res.send('Issuing failed...');
                            });
                    }
                })
        }
    })
});

routes.route('/cancel').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            ReservedBooks.deleteOne({
                    book_id: req.body.book_id
                },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        Book.findById(req.body.ref_id, function (err, bk) {
                            if (bk) {
                                bk.book_availability = true;
                                bk.save().then(()=>{
                                    res.send("Cancelled successfully..")
                                }).catch(err=>{
                                    res.send(err)
                                });
                            }else{
                                res.send('Book does not exist..')
                            }
                        });
                    }
                })
        }
    })
});

routes.route('/all_issued_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                IssedBooks.find(function (err, books) {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(books);
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
});

routes.route('/return').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            IssedBooks.deleteOne({
                    book_id: req.body.book_id
                },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        var time = new Date(req.body.expected_return_date) - new Date();
                        var days = time / (1000 * 3600 * 24);
                        var fines = days>0 ? Math.floor(days)*5 : 0;
                        var description = days>0 ? 'Late '+Math.floor(days)+' to return the book': '';
                        let his = new History({
                            user_id: req.body.user_id,
                            book_id: req.body.book_id,
                            borrowed_date: new Date(req.body.issued_date),
                            expected_return_date: new Date(req.body.expected_return_date),
                            returned_date: new Date(),
                            fines: fines,
                            description: description
                        });
                        his.save()
                            .then(() => {
                                Book.findById(req.body.ref_id, function (err, bk) {
                                    if (bk) {
                                        bk.book_availability = true;
                                        bk.save()
                                            .then(()=>{
                                                res.send('Returned successfully...');
                                            })
                                            .catch(err=>{
                                                res.send(err)
                                            });
                                    }
                                });
                            })
                            .catch(err=>{
                                res.send(err);
                            });
                    }
                })
        }else{
            res.send('You have not signed into the system..')
        }
    })
});

module.exports = routes;