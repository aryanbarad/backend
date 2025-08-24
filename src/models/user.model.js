import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudnary url 
        required: true
    },
    coverImage: {
        type: String, // cloudnary url
        required: true
    },
    watchHistory: [
        {
            type: Schema.types.objectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModifide("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generatAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {expiresIn:ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generatRefrenshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRECT,
        {expiresIn:REFRESH_TOKEN_EXPTRY}
    )
}

export const User = mongoose.model("User", userSchema)