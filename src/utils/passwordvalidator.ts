import BadRequestError from "../error/bad-request";

export const validatePasswordString = (password:string) => {
     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
   
     if (!password.match(regex)) {
       throw new BadRequestError(
         'Password must contain a capital letter, number, special character & greater than 8 digits.',
       );
     }
   }