import { Auth } from '../auth.model';
import { UsernameResponse } from './username-response.model';
export interface LoginResponse {
  user: UsernameResponse;
  auth: Auth;
}
