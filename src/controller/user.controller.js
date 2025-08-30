import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOncloudinary} from  "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, userName, password } = req.body
    console.log("Email:", email)


   // if (fullName === "") {
   //     throw ApiError(400, "fullName is required")
   // }

    if ([fullName,email,userName,password].some((field)=>field?.trim() === ""))
         {
        throw new ApiError(400, "all fields are required ")
         }

         //User.findOne({email})

         const existedUser = User.findOne({
            $or:[{userName},{email}]
         })

         if(existedUser){
            throw new ApiError(409,"user with email or username already exists")
         }
        const avatarLocalPath =  req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

       if (!avatarLocalPath) {
         throw new ApiError(400,"avatar file is required")
       }

     const avatar =  await uploadOncloudinary(avatarLocalPath)
     const coverImage = await uploadOncloudinary(coverImageLocalPath)

     if (!avatar) {
      throw new ApiError(400,"avatar file is required")
     }

  const user =  await  User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase()
     })
       
      const createUser = await User.findById(user._id).select(
         "-password -refreshToken"
      )

      if(!createUser){
         throw new ApiError(500,"somthing went wrong while registering the user")
      }

      return res.status(201).json(
         new ApiResponse(200, createUser,"user register succesfully")
      )

})

export { registerUser }