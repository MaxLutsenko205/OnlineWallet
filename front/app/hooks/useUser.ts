import type { User } from '~/types/User';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { logout, setUser, updateBudget } from '~/features/user/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const loginUser = (token: string, budget: number) => {
    dispatch(setUser({ token, budget }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const setUserBudget = (newBudget: number) => {
    dispatch(updateBudget(newBudget));
  };

  return {
    user,
    loginUser,
    logoutUser,
    setUserBudget,
  };
};
