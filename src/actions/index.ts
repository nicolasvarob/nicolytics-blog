import { loginUser, logout, registerUser } from './auth';
import { createPost } from './posts';


export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,
  createPost
};
