import { z } from "zod";

export const signUpSchema = z
  .object({
    firstname: z.string({
        required_error: "Firstname is required"
    }),
    lastname:z.string({
        required_error: "Lastname is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email address"
    }),
    password: z.string({required_error:"Password is required"}).min(6, {message:"Password must be at least 6 characters long"}),
    confirmpassword: z
      .string({required_error:"Confirmpassword is required"})
      .min(6, {message: "Confirm Password must be at least 6 characters long"}),
    profilepic: z.string().optional(),
  })
 

  export const signInSchema = z
  .object({
    
    email: z.string().email(),
    password: z.string().min(6),
   
  })
