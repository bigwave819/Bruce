const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required:true
    }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", userSchema);