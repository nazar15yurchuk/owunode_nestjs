import { registerDecorator, ValidationOptions } from "class-validator";

export const IsValidDays = (validationOption?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: "CountOffDays",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: "Incorrect count of days !!!!!!",
        ...validationOption,
      },
      validator: {
        validate(value: any) {
          // regex day - maximum 365
          const regex =
            /^(?:\d\d?|[12]\d{2}|3[0-5]\d|36[0-6])\/(?:\d\d?|[12]\d{2}|3[0-5]\d|36[0-6])$/;
          return typeof value === "string" && regex.test(value);
        },
      },
    });
  };
};
