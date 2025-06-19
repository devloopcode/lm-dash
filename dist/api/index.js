"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const app_module_1 = require("../src/app.module");
const server = express();
let appInitialized = false;
async function handler(req, res) {
    try {
        if (!appInitialized) {
            const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
            await app.init();
            appInitialized = true;
        }
        server(req, res);
    }
    catch (err) {
        console.error("NestJS app crash:", err);
        res.status(500).send("Server crashed: " + err.message);
    }
}
//# sourceMappingURL=index.js.map