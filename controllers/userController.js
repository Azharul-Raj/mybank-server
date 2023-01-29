import Joi from "joi";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const JoiSchema = Joi.object({
      name: Joi.string().min(3).max(250).required(),
      email: Joi.string().required(),
      address: Joi.string(),
      phone: Joi.string().min(11).max(11).required(),
      password: Joi.string().min(2).required(),
    });
    const validation = JoiSchema.validate(req.body);
    if (validation.error) {
      return res.send({
        success: false,
        error: validation.error.details[0].message,
      });
    }
    // mongo data storing
    let { name, email, address, phone, password } = req.body;
    const salt =await bcrypt.genSalt(10);
    password=await bcrypt.hash(password,salt)
    const isExist = await User.findOne({ phone: phone });
    if (isExist) {
      res.send({
        success: false,
        message: "User already exist",
      });
    } else {
      const user = new User({ name, email, address, phone, password });
      await user.save();
      res.send({
        success: true,
          message: "User save successfully",
        // password:password
      });
    }
  } catch (error) {
    console.log("from catch", error);
  }
};
// login method
export const login = async (req, res) => {
  try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) {
            res.status(404).send("Account not found")
        }
    const verifyPassword =await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          res.status(406).send({
            success: false,
            message: "INVALID PIN",
            error:verifyPassword
            })
    }
    else{
        // token generation part
        const tokenCredential = {
            name: user.name,
            phone:user.phone
        }
        const token = jsonwebtoken.sign(tokenCredential, process.env.TOKEN_SECRET, { expiresIn: '1m' });
        res.send({
            success: true,
            accessToken:token
        })
      }
  } catch (error) {
    console.log(error);
  }
};
