const z = require('zod');
module.exports = z.object({
    portNumber: z.string().min(1, { message: "Port Number field must not be empty!"}),
    patchPanelPortNumber: z.string().min(1, { message: "Patch Panel Port Number field must not be empty!"}),
    roomNumber: z.string().min(1, { message: "Room Number field must not be empty!"}),
    batchNumberOnWall: z.string().min(1, { message: "Batch Number field On Wall must not be empty!"}),
    })


    
    