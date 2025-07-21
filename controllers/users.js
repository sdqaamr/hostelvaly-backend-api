import Users from "../models/users.js";
import mongoose from 'mongoose';


let getUsers = async(req,res) => {
    try {
        const users = await Users.find().select(["fullName", "email", "role", "city", "hostels", "favorites"]).populate(["favorites", "hostels"]);
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: users,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

let getUser = async(req,res) => {
    try{
        let id = req.params.id;
        const user = await Users.findById(id).select(["fullName", "email", "role", "city", "hostels", "favorites"]).populate(["favorites", "hostels"]);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
                error: null, //execution is successfull
            });
        }
        res.status(200).json({
            success: true,
            id: id,
            message: "User data by ID is fetched successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status.apply(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

let putUser = async(req,res) => {
    try {
        const id = req.params.id;
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true }).populate(["favorites", "hostels"]);
        if(!user) {
            return res.status(404).json({
            success: false,
                message: "User not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};

let postUsers = async(req,res) => {
    try {
        let {
            fullName,
            role,
            phone,
            gender,
        } = req.body;
        let validationErrors = [];
        if(!fullName) {
            validationErrors.push("Full name is required");
        }
        if(!role) {
            validationErrors.push("Role is required");
        }
        if(!phone) {
            validationErrors.push("Phone number is required");
        }
        if(!gender) {
            validationErrors.push("Gender is required");
        }
        if(validationErrors.length > 0) {
            return res.status(400).json({
            success: false,
                message: "Validation errors",
                data: null,
                error: validationErrors,
            });
        }
        const user = new Users(req.body).populate(["favorites", "hostels"]);
        await user.save();
        res.status(201).json({
            success: true,
            message: "Data created successfully",
            data: user,
            error: null,
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};

let deleteUser = async(req,res) => {
    try {
        let id = req.params.id;
        const user = await Users.findByIdAndDelete(id).populate(["favorites", "hostels"]);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};

let deleteUsers = async(req,res) => {
    try {
        const users = await Users.find().populate(["favorites", "hostels"]);
        if(users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No more data to delete",
                data: null,
                error: null,
            });
        }
        await Users.deleteMany();
        res.status(200).json({
            success: true,
            message: "Users data deleted successfully",
            data: users,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};

export { getUsers, getUser, putUser, postUsers, deleteUser, deleteUsers };