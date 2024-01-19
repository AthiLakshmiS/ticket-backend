const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

module.exports.ticketUpdate = async (req, res, next) => {
    const {assignedTo} = req.body
    const ticketCreation = new Ticket(req.body)
    console.log(req.body, ticketCreation);
    try {
        // Fetch the list of support agents from the User model
        // Create a new ticket with the assigned support agent
        
        await ticketCreation.save();
        await User.findOneAndUpdate({ name: assignedTo }, { $set: { active: false } });
        res.status(200).json({
            status: 'Success',
            data: {
                ticketCreation,
            },
        });
    } catch (err) {
        console.error('Error updating ticket:', err);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
module.exports.taskAll = async (req, res, next) => {
    try {
        const { filterField, filterValue, sortField, sortOrder, page, pageSize } = req.query;

        // Build the query object based on filter criteria
        const query = {};
        if (filterField && filterValue) {
            query[filterField] = filterValue;
        }

        // Build the sort object based on sorting criteria
        const sort = {};
        if (sortField && sortOrder) {
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }

        // Perform pagination
        const skip = (page - 1) * pageSize;
        const limit = parseInt(pageSize);

        // Execute the query
        const tasks = await Ticket.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No tasks found.',
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                tasks: tasks,
            },
        });
    } catch (error) {
        console.error('Error fetching Tasks:', error.message);
        res.status(500).json({
            status: 'Failed',
            message: 'Internal Server Error',
        });
    }
}
