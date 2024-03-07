const z = require('zod');
module.exports = z.object({
    ipAddress: z.string().ip({version: 'v4'})
});