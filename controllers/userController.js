import Joi from "joi";

const register = async (req, res) => {
    try {
        const JoiSchema = Joi.object({
            name: Joi.string().min(3).max(250).required(),
            email: Joi.string().required(),
            address: Joi.string(),
            phone: Joi.string().min(11).max(11).required(),
            password:Joi.string().min(2).required()
        })
        const validation = JoiSchema.validate(req.body);
        console.log(validation);
    } catch (error) {
        console.log(error);
    }
}
const login = async (req, res) => {
  try {
  } catch (error) {
      console.log(error)
  }
};


export default { register };