import { sendErrorResponse } from '../helpers/errorResponse.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils/utils.js';


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;


  if (!name?.firstName || !name?.lastName || !email || !password) {
    return sendErrorResponse(res, 400, 'All fields are required: first name, last name, email, and password.');
  }

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendErrorResponse(res, 400, 'User already exists');
    }

    const user = new User({ name: { firstName: name.firstName, lastName: name.lastName }, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.log(error, 'error')
    sendErrorResponse(res, 500, 'Internal server error');
  }
};


export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return sendErrorResponse(res, 400, 'Invalid credentials');
    }

    const token = generateToken(user)
    res.json({ token });

  } catch (error) {
    console.log(error, 'error')
    sendErrorResponse(res, 500, 'Internal server error');
  }
};


export const getProfile = async (req, res) => {


  try {

    const user = await User.findById(req.user.id).select('-password');

    res.json({ user });

  } catch (error) {
     console.log(error)
    sendErrorResponse(res, 500, 'Internal server error');
  }

}
const validateField = (field, value, fieldName) => {
  if (value && !value.trim()) {
    return `${fieldName} cannot be empty.`;
  }
  return null;
};

const updateFields = (user, fields) => {
  const { firstName, lastName, email, password } = fields;

  if (firstName) user.name.firstName = firstName;
  if (lastName) user.name.lastName = lastName;
  if (email) user.email = email;
  if (password) {
    user.password = password;
    user.hashPassword();
  }
};

export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }


    const errors = [
      validateField(firstName, firstName, 'First name'),
      validateField(lastName, lastName, 'Last name'),
      validateField(email, email, 'Email'),
      validateField(password, password, 'Password'),
    ].filter(Boolean);

    if (errors.length) {
      return sendErrorResponse(res, 400, errors.join(' '));
    }


    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return sendErrorResponse(res, 400, 'Email is already in use by another account.');
      }
    }


    updateFields(user, { firstName, lastName, email, password });

    await user.save();


    res.json({
      message: 'Profile updated successfully',
    });

  } catch (error) {

    sendErrorResponse(res, 500, 'Internal server error');
  }
};

