const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    topic : {
        type : String,
    },
    description : {
        type : String,
    },
    dateCreated : {
        type: Date,
    },
    severity : {
        type : String,
    },
    type : {
        type : String,
    },
    assignedTo : {
        type : String,
    },
    status : {
        type : String,
    },
    resolvedOn : {
        type : Date,
    }
})

const Ticket = mongoose.model('ticket', TicketSchema)

module.exports = Ticket