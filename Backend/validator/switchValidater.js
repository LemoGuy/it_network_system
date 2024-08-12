const z = require("zod");
const portValidator = require("../validator/portValidater.js");

module.exports = z.object({
  name: z
    .string({ message: "Switch name is required" })
    .min(1, { message: "Switch Name field must not be empty" }),

  building: z.enum(
    [
      "Main Building",
      "Dentistry Building",
      "Education Building",
      "Research Center",
      "New Dentistry Building",
    ],
    { message: "Building field is invalid" }
  ),

  floor: z.enum(
    [
      "First Floor",
      "Second Floor",
      "Third Floor",
      "Forth Floor",
      "Fifth Floor",
      "Ground Floor",
    ],
    { message: "Floor field is invalid" }
  ),

  room: z
    .string({ message: "Room is required" })
    .min(1, { message: "Room field must not be empty" }),
  shelfNumber: z
    .string({ message: "Shelf Number is required" })
    .min(1, { message: "Shelf Number field must not be empty" }),
  model: z
    .string({ message: "Model is required" })
    .min(1, { message: "Invalid model" }),

  brand: z.enum(["Juniper", "Huawei", "Cisco"], { message: "Invalid brand" }),

  macAddress: z
    .string({ message: "MAC Address is required" })
    .min(17, {
      message: "MAC Address is invalid",
    })
    .max(17, {
      message: "MAC Address is invalid",
    }),
  serialNumber: z
    .string({ message: "Serial Number is required" })
    .min(11, { message: "Invalid serial number" })
    .max(11, { message: "Invalid serial number" }),

  ports: z
    .array(portValidator)
    .optional()
    .transform((a) => []),

  ipAddress: z
    .string({ message: "IP Address is required" })
    .ip({ version: "v4" }, { message: "Invalid ip address" }),

  subnet: z
    .string({ message: "Subnet is required" })
    .min(1, { message: "Invalid subnet" }),

  vlan: z.enum(["Student", "Security", "Camera"], {
    message: "VLAN is invalid",
  }),

  firmwareVersion: z
    .string({ message: "Firmware version is required" })
    .min(1, { message: "Firmware Version is invalid" }),

  portType: z
    .number({ message: "Port type is required" })
    .refine((v) => !!v && [24, 48].includes(v), {
      message: "Invalid port type",
    }),
});
