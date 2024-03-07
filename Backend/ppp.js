import switchValidater from "./validator/switchValidater.js";

const data = {
    ipAddress: "1192.168.1.1"
}

console.log(switchValidater.safeParse(data).error);