import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidators = [
  body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("password should contain atleast 6 characters"),
];

export const signUpValidators = [
  body("username").notEmpty().withMessage("Username is required"),
  ...loginValidators,
];
