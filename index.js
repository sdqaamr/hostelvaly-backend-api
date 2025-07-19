import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
dotenv.config();
app.use(cors());

function dbConnect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch(() => {
        console.log("MongoDB Connection failed!")
    });
};
dbConnect();

const hostelsSchema = mongoose.Schema({
    name: String,
    city: String,
    area: String,
    address: String,
    contact: String,
    isAvailable: Boolean
});
const Hostels = new mongoose.model("Hostels", hostelsSchema);

app.get("/hostels", async(req,res) => {
    try {
        const hostels = await Hostels.find();
        res.status(200).json({
            message: "Hostels data fetched successfully",
            data: hostels,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
});

app.get("/hostels/:id", async(req,res) => {
    try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid hostel ID",
                data: null, 
                error: null,
            });
        }
        const hostel = await Hostels.findById(id);
        if(!hostel) {
            return res.status(404).json({
                message: "Hostel not found",
                data: null,
                error: null, //execution is successfull
            });
        }
        res.status(200).json({
            id: id,
            message: "Hostel data by ID is fetched successfully",
            data: hostel,
            error: null,
        });
    }
    catch(error) {
        res.status.apply(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
});

app.put("/hostels/:id", async(req,res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid hostel ID",
                data: null,
                error: null,
            });
        }
        const hostel = await Hostels.findByIdAndUpdate(id, req.body, { new: true });
        if(!hostel) {
            return res.status(404).json({
                message: "Hostel not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            message: "Hostel data updated successfully",
            data: hostel,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.post("/hostels", async(req,res) => {
    try {
        let {
            name,
            city,
            isAvailable
        } = req.body;
        let validationErrors = [];
        if(!name) {
            validationErrors.push("Hostel name is required");
        }
        if(!city) {
            validationErrors.push("City is required");
        }
        if(!isAvailable) {
            validationErrors.push("isAvailable field is required");
        }
        if(validationErrors.length > 0) {
            return res.status(400).json({
                message: "Validation errors",
                data: null,
                error: validationErrors,
            });
        }
        const hostel = new Hostels(req.body);
        await hostel.save();
        res.status(201).json({
            message: "Data is created successfully",
            data: hostel,
            error: null,
        })
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.delete("/hostels/:id", async(req,res) => {
    try {
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid hostel ID",
                data: null,
                error: null,
            });
        }
        const hostel = await Hostels.findByIdAndDelete(id);
        if(!hostel) {
            return res.status(404).json({
                message: "Hostel not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            message: "Data deleted successfully",
            data: hostel,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.delete("/hostels", async(req,res) => {
    try {
        const hostels = await Hostels.find();
        if(hostels.length === 0) {
            return res.status(404).json({
                message: "No more data to delete",
                data: null,
                error: null,
            });
        }
        await Hostels.deleteMany();
        res.status(200).json({
            message: "All hostels data is deleted successfully",
            data: hostels,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});


// Users

const usersSchema = mongoose.Schema({
    rating: Number,
    comment: String,
    postedAt: Date,
    isVerified: Boolean,
});
const Users = new mongoose.model("Users", usersSchema);

app.get("/users", async(req,res) => {
    try {
        const users = await Users.find();
        res.status(200).json({
            message: "Users data fetched successfully",
            data: users,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
});

app.get("/users/:id", async(req,res) => {
    try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID",
                data: null, 
                error: null,
            });
        }
        const user = await Users.findById(id);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
                error: null, //execution is successfull
            });
        }
        res.status(200).json({
            id: id,
            message: "User data by ID is fetched successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status.apply(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
});

app.put("/users/:id", async(req,res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID",
                data: null,
                error: null,
            });
        }
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            message: "User data updated successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.post("/users", async(req,res) => {
    try {
        let {
            rating,
            comment
        } = req.body;
        let validationErrors = [];
        if(!rating) {
            validationErrors.push("Rating is required");
        }
        if(!comment) {
            validationErrors.push("Comment is required");
        }
        if(validationErrors.length > 0) {
            return res.status(400).json({
                message: "Validation errors",
                data: null,
                error: validationErrors,
            });
        }
        const user = new Users(req.body);
        await user.save();
        res.status(201).json({
            message: "Data is created successfully",
            data: user,
            error: null,
        })
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.delete("/users/:id", async(req,res) => {
    try {
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID",
                data: null,
                error: null,
            });
        }
        const user = await Users.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
                error: null,
            });
        }
        res.status(200).json({
            message: "Data deleted successfully",
            data: user,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

app.delete("/users", async(req,res) => {
    try {
        const users = await Users.find();
        if(users.length === 0) {
            return res.status(404).json({
                message: "No more data to delete",
                data: null,
                error: null,
            });
        }
        await users.deleteMany();
        res.status(200).json({
            message: "All users data is deleted successfully",
            data: users,
            error: null,
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
app.listen(port, host, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
});