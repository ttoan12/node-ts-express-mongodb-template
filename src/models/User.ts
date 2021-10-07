import { Schema, model } from "mongoose";
import { hash } from "../helpers/password";

interface IUser {
    phone: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    gender: string;
    dateOfBirth?: Date;
    role: Schema.Types.ObjectId;
}

const schema = new Schema<IUser>(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/).test(value),
                message: (props) => `${props.value} is not a valid phone number`,
            },
        },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String },
        gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
        dateOfBirth: { type: Date },
        role: { type: Schema.Types.ObjectId, ref: "Role" },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", schema);
export default User;
