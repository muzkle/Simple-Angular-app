import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "dev":
        path = `${__dirname}/../../.env.dev`;
        break;
    case "staging":
        path = `${__dirname}/../../.env.staging`;
        break;
    default:
        path = `${__dirname}/../../.env.production`;
}
dotenv.config({ path: path });