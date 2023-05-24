"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../../database/models/Users"));
class UserRepository {
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield Users_1.default.findAll();
            return users;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.findOne({
                where: {
                    username,
                },
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.findOne({
                where: {
                    id,
                },
            });
            return user;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRow = yield Users_1.default.destroy({
                where: {
                    id,
                },
            });
            return deletedRow;
        });
    }
    updateById(id, fullName, avatar, email, phoneNumber, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.findOne({ where: { id } });
            const fields = [];
            if (fullName !== null)
                fields === null || fields === void 0 ? void 0 : fields.push('fullName');
            if (avatar !== null)
                fields === null || fields === void 0 ? void 0 : fields.push('avatar');
            if (email !== null)
                fields === null || fields === void 0 ? void 0 : fields.push('email');
            if (phoneNumber !== null)
                fields === null || fields === void 0 ? void 0 : fields.push('phoneNumber');
            if (address !== null)
                fields === null || fields === void 0 ? void 0 : fields.push('address');
            const updatedUser = yield (user === null || user === void 0 ? void 0 : user.update({
                fullName,
                avatar,
                email,
                phoneNumber,
                address,
            }, {
                fields,
            }));
            return updatedUser;
        });
    }
}
exports.default = new UserRepository();
