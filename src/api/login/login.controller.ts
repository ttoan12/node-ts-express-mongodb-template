import { Request, Response, NextFunction } from "express";
import { SuccessResponse, BadRequestResponse, NotFoundResponse } from "../../helpers/response";

import User from "../../models/User";
import { check } from "../../helpers/password";
import { createToken } from "../../helpers/jwt";

const loginController = {
    async post(req: Request, res: Response) {
        let body = req.body;
        if (!body.phone || !body.password) return BadRequestResponse(res, "Phone or Password is missing");

        let user = await User.findOne({ phone: body.phone }).lean();
        if (user) {
            let exists = await check(body.password, user.password!);

            if (exists) {
                delete user.password;
                let token = await createToken(user, process.env.SECRET_KEY!, "7d");
                return SuccessResponse(res, { token: token });
            } else {
                return NotFoundResponse(res, "Phone or Password is incorrect");
            }
        } else {
            return NotFoundResponse(res, "Phone or Password is incorrect");
        }
    },
};

export default loginController;
