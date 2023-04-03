
var strings = require('node-strings');
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
var strings = require('node-strings');
const doner = require("../models/doner");
const president = require('../models/president');
const approval = require('../models/approval');
const add = require('../models/add')
module.exports = {
    createDoner: async (req, res) => {
        const { name,
            place,
            email,
            phone,
            bloodGroup
        } = req.body;
        try {
            const existingUser = await doner.findOne({ $or: [{ email }, { phone }] });
            if (!name || !place || !email || !phone || !bloodGroup) {
                return res.json({ status: "fail", message: 'Please enter all fields' });
            }
            if (existingUser)
                return res.json({ status: "fail", message: "Email or phone already registerd " });
            if (phone.toString().length != 10) {
                return res.json({ status: "fail", message: 'mobile no must be  10 digit' });
            }
            else {
                const result = await doner.create({
                    name,
                    place,
                    phone,
                    email,
                    bloodGroup
                });
                await result.save();
                res.json({
                    status: "success",
                    message: "register successfully ,thank you!"
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    createapproval: async (req, res) => {
        const { name, phone, place, email, nameOfOrganization } = req.body;
        const existingUser = await president.findOne({
            $or: [{ email }, { phone }],
        });
        if (!name || !place || !email || !phone || !nameOfOrganization) {
            return res.json({
                status: "fail",
                message: "Please enter all fields",
            });
        }
        if (existingUser)
            return res.json({
                status: "fail",
                message: "Email or phone already registerd ",
            });
        if (phone.toString().length != 10) {
            return res.json({
                status: "fail",
                message: "mobile no must be  10 digit",
            });
        } else {
            const result = await approval.create({
                name,
                phone,
                place,
                email,
                nameOfOrganization,
            });
            console.log(result);
            await result.save();
            res.json({
                status: "success",
                message: "Request sent for Varification,thank you!",
            });
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const existingUser = await president.findOne({ email: username });
        if (!existingUser)
            return res.json({ status: "fail", message: "user not found " });
        const isPasswordCorrect = await president.findOne({ phone: password });
        if (!isPasswordCorrect)
            return res.json({ status: "fail", message: "incorrect password " });
        const token = jwt.sign(
            { userName: req.body.username },
            process.env.TOKEN_SECRET,
            { expiresIn: "2h" }
        );
        res.cookie('cookie', token, { expires: new Date(Date.now() + 9999999) });
        res.json({ status: "success", message: "login successfully" });
    },
    searchBlood: async (req, res) => {
        let blood = req.body.bloodGroup
        console.log(blood)
        let data = await doner.findOne({ bloodGroup: blood }, 'name place phone')
        console.log(data)
        res.json({
            status: "success",
            message: data
        })
        if (!data) {
            res.json({ status: "fail", meassage: "not found" })
        }
    },
    searchPlace: async (req, res) => {
        let place = req.body.place
        let data = await doner.findOne({ place: place }, 'name bloodGroup phone')
        console.log(data)
        res.json({
            status: "success",
            message: data
        })
        if (!data) {
            res.json({ status: "fail", meassage: "not found" })
        }
    },
    searchPresident: async (req, res) => {
        let place = req.body.place
        let data = await president.find({ place: place })
        res.json({
            status: "success",
            message: data
        })
        if (!data) {
            res.json({ status: "fail", meassage: "not found" })
        }
    }, getAdd: async (req, res) => {
        let data = await add.find()
        res.json({
            status: "success",
            message: data
        })

    }
}