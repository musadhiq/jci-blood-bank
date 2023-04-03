const strings = require('node-strings');
const { token } = require("morgan");
const doner = require("../models/doner");
const president = require('../models/president');
const approval = require("../models/approval")
const admin = require("../models/admin")
const add = require("../models/add")
const advertisement = require("../models/adv")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { HOST } = require("../constants/index.js");
dotenv.config();
module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(password);
        try {
            const existingUser = await admin.findOne({ username: username });
            console.log(existingUser.password);
            if (!existingUser)
                return res.json({ status: "fail", message: "user not found " });
            if (existingUser.password != password)
                return res.json({ status: "fail", message: "incorrect password " });
            const token = jwt.sign(
                { userName: req.body.username, type: admin },
                process.env.TOKEN_SECRET,
                { expiresIn: "2h" }
            );
            res.cookie("cookie", token, {
                expires: new Date(Date.now() + 9999999),
            });
            res.json({
                status: "success",
                message: "logged in successfully",
                token: token,
                username: req.body.username,
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    bloodCategory: async (req, res) => {
        let blood = req.body.bloodGroup;
        let data = await doner.findOne({ bloodGroup: blood });
        console.log(data);
        res.json({
            status: "success",
            message: data,
        });
        if (!data) {
            res.json({ status: "fail", meassage: "not found" });
        }
    },
    totalSignUp: async (req, res) => {
        let data = await president.find();
        res.json({
            status: "success",
            message: data,
        });
        if (!data) {
            res.json({ status: "fail", meassage: "not found" });
        }
    },
    deletePresident: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            book = await president.findByIdAndRemove(id);
        } catch (err) {
            console.log(err);
        }
        if (!book) {
            return res.json({
                status: "fail",
                message: "Unable to Delete By this Id",
            });
        }
        return res.json({ status: "success", message: " Successfully Deleted!!" });
    },
    deletedoner: async (req, res) => {
        const id = req.params.id;
        try {
            var data = await doner.findByIdAndRemove(id);
        } catch (err) {
            console.log(err);
        }
        if (!data) {
            return res.json({
                status: "fail",
                message: "Unable to Delete By this Id",
            });
        }
        return res.json({ status: "success", message: " Successfully Deleted!!" });
    },
    approvalList: async (req, res) => {
        let data = await approval.find();
        console.log(data);
        res.json({
            status: "success",
            message: data,
        });
        if (!data) {
            res.json({ status: "fail", meassage: "not found" });
        }
    },
    approve: async (req, res) => {
        const { id } = req.params;
        try {
            var data = await approval.findById(id);

            const result = await president.create({
                name: data.name,
                place: data.place,
                email: data.email,
                phone: data.phone,
                nameOfOrganization: data.nameOfOrganization,
            });
            await approval.findByIdAndRemove(id);
            await result.save();
            res.json({
                status: "success",
                message: "approved",
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    deletelist: async (req, res) => {
        const id = req.params.id;
        try {
            var data = await approval.findByIdAndRemove(id);
        } catch (err) {
            console.log(err);
        }
        if (!data) {
            return res.json({
                status: "fail",
                message: "Unable to Delete By this Id",
            });
        }
        return res.json({ status: "success", message: " Successfully Deleted!!" });
    },
    searchDoner: async (req, res) => {
        const { name, place, email, phone, bloodGroup } = req.body;
        try {
            var data = await doner.find({
                $or: [{ name }, { place }, { email }, { phone }, { bloodGroup }],
            });
        } catch (err) {
            console.log(err);
        }
        if (!data) {
            return res.json({ status: "fail", message: "Oops! Not Found" });
        }
        return res.json({ status: "success", message: data });
    },
    searchpresident: async (req, res) => {
        const { name, phone, place, email, nameOfOrganization } = req.body;
        try {
            var data = await president.find({
                $or: [
                    { name },
                    { place },
                    { email },
                    { phone },
                    { nameOfOrganization },
                ],
            });
        } catch (err) {
            console.log(err);
        }
        if (!data) {
            return res.json({ status: "fail", message: "Oops! Not Found" });
        }
        return res.json({ status: "success", message: data });
    },
    searchapproval: async (req, res) => {
        const { name, place, email, phone, nameOfOrganization } = req.body;
        try {
            var data = await approval.find({
                $or: [
                    { name },
                    { place },
                    { email },
                    { phone },
                    { nameOfOrganization },
                ],
            });
        } catch (err) {
            console.log(err);
        }
        if (!data) {
            return res.json({ status: "fail", message: "Oops! Not Found" });
        }
        return res.json({ status: "success", message: data });
    },
    changePassword: async (req, res) => {
        const { oldpassword, newpassword, confirmpassword } = req.body;
        const existingUser = await admin.findOne({ password: oldpassword });
        if (!existingUser)
            return res.json({ status: "fail", message: "incorrect oldpassword" });
        else if (newpassword == confirmpassword)
            return res.json({
                status: "success",
                message: " password  changed succefully",
            });
    },
    addAd: async (req, res) => {
        if (req.file) {
            const result = await add.create({
                image: req.file.filename,
                link: req.body.link,
                path: HOST + req.file.path,
            });
            await result.save();
            res.json({
                status: "success",
                message: " Add added successfully",
            });
        }
    },
    addAdv: async (req, res) => {
        if (req.file) {
            const result = await advertisement.create({
                image: req.file.filename,
                link: req.body.link,
                path: req.file.path,
            });
            await result.save();
            res.json({
                status: "success",
                message: " Advertisement added successfully",
            });
        }
    },
};