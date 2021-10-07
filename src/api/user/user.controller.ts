import { Request, Response } from "express";
import { SuccessResponse, CreatedResponse } from "../../helpers/response";
import User from "../../models/User";
import { hash } from "../../helpers/password";

const userController = {
    async get(req: Request, res: Response) {
        let users = await User.find().select("-password").lean();

        return SuccessResponse(res, users);
    },

    async post(req: Request, res: Response) {
        let body = req.body;
        body.password = await hash(body.password);

        let user = await User.create({ ...body });
        delete user.password;

        return CreatedResponse(res, user);
    },
};

export default userController;
