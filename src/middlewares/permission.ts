import { Request, Response, NextFunction } from "express";
import { ErrorResponse, ForbiddenResponse, UnauthorizedResponse } from "../helpers/response";
import Role from "../models/Role";

export const hasRole = (code: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return UnauthorizedResponse(res);
    if (!code || code.trim().length <= 0) return ForbiddenResponse(res);

    Role.findOne({ code: code }, (err: any, role: any) => {
        if (err || !role) return ErrorResponse(res, "Role not found!");

        let user: any = req.user;
        if (user.role == role._id.toString()) {
            return next();
        } else {
            return ForbiddenResponse(res);
        }
    });
};
