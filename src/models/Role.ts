import { Schema, model } from "mongoose";

interface IRole {
    code: string;
    name: string;
}

const schema = new Schema<IRole>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const Role = model<IRole>("Role", schema);
export default Role;
