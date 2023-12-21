import Joi from "joi";

// Define a custom messages object
const customMessages = {
  "any.required": "{#label} is required",
  "string.email": "{#label} must be a valid email",
  "string.min": "{#label} must be at least {#limit} characters long",
};

// Schema: Create User Schema
export const CreateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages(customMessages);

export interface CreateUserSchemaType {
  username: string;
  email: string;
  password: string;
}
// Schema: Login User Schema
export const LoginUserSchema = Joi.object({
  login: Joi.alternatives().try(Joi.string().email(), Joi.string()).required(),
  password: Joi.string().min(6).required(),
})?.messages(customMessages);

export interface LoginUserSchemaType {
  login: string;
  password: string;
}
