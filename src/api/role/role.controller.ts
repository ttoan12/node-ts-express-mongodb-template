import { Request, Response } from "express";
import { SuccessResponse, CreatedResponse } from "../../helpers/response";

import Role from "../../models/Role";

const roleController = {
    async get(req: Request, res: Response) {
        let roles = await Role.find().lean();
        SuccessResponse(res, roles);
    },

    async post(req: Request, res: Response) {
        let body = req.body;

        let role = await Role.create({ ...body });

        return CreatedResponse(res, role);
    },
};

export default roleController;
