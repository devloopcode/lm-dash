"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const shared_1 = require("../shared");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies[shared_1.ACCESS_TOKEN_NAME];
        if (!token)
            throw new common_1.UnauthorizedException('Token not found');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (typeof decoded !== 'object' || decoded === null) {
                throw new common_1.UnauthorizedException('Invalid token payload');
            }
            req['user'] = decoded;
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map