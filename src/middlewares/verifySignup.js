import Role from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})

    if(user) return res.status(400).json({message: 'The user already exits'})

    const email = await User.findOne({email: req.body.email})

    if(email) return res.status(400).json({message: 'The email already exits'})

    next();
}

export const checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          
            const roleFound = await Role.findOne({ name: req.body.roles[i] });
            //res.json(roleFound);
            if (!roleFound) {
            
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exits`
                })
            }
        }
    }

    next();
}