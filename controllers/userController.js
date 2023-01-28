import Joi from "joi";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  console.log(req.body);
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
    const { name, email, address, phone, password } = req.body;
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
      });
    }
  } catch (error) {
    console.log("from catch", error);
  }
};
const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
