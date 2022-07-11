const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password:{
        type: String
    },
    username:{
        type: String
    }
}, {
    versionKey: false
});

module.exports = User = mongoose.model("User", UserSchema, 'user');