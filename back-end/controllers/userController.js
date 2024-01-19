const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const bcrypt = require("bcrypt");

module.exports.userUpdate = async (req, res, next) => {
    const userCreation = new User(req.body)
    try{
        await userCreation.save()
        res.status(200).json({
            status: 'Success',
            data : {
                userCreation
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
};
module.exports.assignedUser = async (req, res, next) => {
    try {
        // const firstActiveUser = await User.findOne({ active: true });
        const firstActiveUser = await User.find({active: true});
        const firstUser = await getNextSupportAgent(firstActiveUser);
        if (!firstUser) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No active users found.',
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                user: firstUser,
            },
        });
    } catch (error) {
        console.error('Error fetching first active user:', error.message);
        res.status(500).json({
            status: 'Failed',
            message: 'Internal Server Error',
        });
    }
}
function getNextSupportAgent(supportAgents) {
    let counter = 0;

    return function () {
        const agent = supportAgents[counter];
        counter = (counter + 1) % supportAgents.length;
        return agent;
    }();
}