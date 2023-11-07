import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthController from '../src/controllers/authController';
import UserRepository from '../src/repository/userRepository';
import ConflictError from '../src/error/conflict';
import BadRequestError from '../src/error/bad-request';






describe('code snippet', () => {

     // User is created successfully with valid input data
     it('should create user successfully when valid input data is provided', async () => {
       const req = {
         body: {
           first_name: 'John',
           last_name: 'Doe',
           email: 'john.doe@example.com',
           password: 'Password123',
           phone_number: '1234567890'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       await AuthController.createUser(req, res);
 
       expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
       expect(res.json).toHaveBeenCalledWith({
         message: 'User created successfully',
         data: {
           id: expect.any(String),
           first_name: 'John',
           last_name: 'Doe',
           email: 'john.doe@example.com',
           phone_number: '1234567890',
           type: expect.any(String),
           password: expect.any(String)
         }
       });
     });
 
     // User with unique email and phone number is created successfully
     it('should create user successfully when email and phone number are unique', async () => {
       const req = {
         body: {
           first_name: 'John',
           last_name: 'Doe',
           email: 'john.doe@example.com',
           password: 'Password123',
           phone_number: '1234567890'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       UserRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
 
       await AuthController.createUser(req, res);
 
       expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
       expect(res.json).toHaveBeenCalledWith({
         message: 'User created successfully',
         data: {
           id: expect.any(String),
           first_name: 'John',
           last_name: 'Doe',
           email: 'john.doe@example.com',
           phone_number: '1234567890',
           type: expect.any(String),
           password: expect.any(String)
         }
       });
     });
 
     // User is logged in successfully with valid email and password
     it('should log in user successfully when valid email and password are provided', async () => {
       const req = {
         body: {
           email: 'john.doe@example.com',
           password: 'Password123'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       const user = {
         _id: '1234567890',
         type: 'user',
         comparePassword: jest.fn().mockResolvedValue(true)
       };
 
       UserRepository.getUserByEmail = jest.fn().mockResolvedValue(user);
 
       await AuthController.login(req, res);
 
       expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
       expect(res.json).toHaveBeenCalledWith({
         user,
         token: expect.any(String)
       });
     });
 
     // User creation fails if email already exists
     it('should throw ConflictError when email already exists', async () => {
       const req = {
         body: {
           email: 'john.doe@example.com'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       const userExists = {
         email: 'john.doe@example.com',
         phone_number: '1234567890'
       };
 
       UserRepository.getUserByEmail = jest.fn().mockResolvedValue(userExists);
 
       try {
         await AuthController.createUser(req, res);
       } catch (error) {
         expect(error).toBeInstanceOf(ConflictError);
         expect(error.message).toBe('Email or phone number already exists');
         expect(res.status).not.toHaveBeenCalled();
         expect(res.json).not.toHaveBeenCalled();
       }
     });
 
     // User creation fails if phone number already exists
     it('should throw ConflictError when phone number already exists', async () => {
       const req = {
         body: {
           phone_number: '1234567890'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       const userExists = {
         email: 'john.doe@example.com',
         phone_number: '1234567890'
       };
 
       UserRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
       UserRepository.getUserBynumber = jest.fn().mockResolvedValue(userExists);
 
       try {
         await AuthController.createUser(req, res);
       } catch (error) {
         expect(error).toBeInstanceOf(ConflictError);
         expect(error.message).toBe('Email or phone number already exists');
         expect(res.status).not.toHaveBeenCalled();
         expect(res.json).not.toHaveBeenCalled();
       }
     });
 
     // User creation fails if password is invalid
     it('should throw BadRequestError when password is invalid', async () => {
       const req = {
         body: {
           password: 'password'
         }
       };
 
       const res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       };
 
       try {
         await AuthController.createUser(req, res);
       } catch (error) {
         expect(error).toBeInstanceOf(BadRequestError);
         expect(error.message).toBe('Password must contain a capital letter, number, special character & greater than 8 digits.');
         expect(res.status).not.toHaveBeenCalled();
         expect(res.json).not.toHaveBeenCalled();
       }
     });
 });
 