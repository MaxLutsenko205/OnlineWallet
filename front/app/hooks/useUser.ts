import type { User } from '~/types/User';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { logout, setUser } from '~/features/user/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const loginUser = (userData: User) => dispatch(setUser(userData));
  const logoutUser = () => dispatch(logout());

  return {
    user,
    loginUser,
    logoutUser,
  };
};
