import { loginUser, logout, registerUser } from './auth';
import { savePost } from './posts';


export const server = {
  savePost,
 // Auth
  loginUser,
  logout,
  registerUser
};
