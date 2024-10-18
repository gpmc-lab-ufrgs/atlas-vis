import {authAdapters} from './adapters';
import {authApi} from './api';
import {IChangePassword} from './types/IChangePassword';
import {IGetMe} from './types/IGetMe';
import {IResetPassword} from './types/IResetPassword';
import {IResetPasswordConfirmation} from './types/IResetPasswordConfirmation';
import {IRefreshToken, ISignIn} from './types/ISignIn';
import {ISignUp} from './types/ISignUp';
import {IUpdateUser} from './types/IUpdateUser';
import {IUpdateUserAvatar} from './types/IUpdateUserAvatar';
import {IValidateInviteCode} from './types/IValidateInviteCode';

async function refreshToken(
  payload: IRefreshToken['request']
): Promise<IRefreshToken['response']> {
  return await authApi.refreshToken(payload);
}

async function signIn(
  payload: ISignIn['request']
): Promise<ISignIn['response']> {
  const data = await authApi.signIn(payload);
  return data;
}

async function signUp(
  payload: ISignUp['request']
): Promise<ISignUp['response']> {
  const data = await authApi.signUp(payload);

  return data;
}

async function updateUserAvatar(
  payload: IUpdateUserAvatar['request']
): Promise<IUpdateUserAvatar['response']> {
  const data = await authApi.updateUserAvatar(payload);

  return data;
}

async function changePassword(
  payload: IChangePassword['request']
): Promise<IChangePassword['response']> {
  const data = await authApi.changePassword(payload);

  return data;
}

async function updateUser(
  query: IUpdateUser['request']['query'],
  variables: IUpdateUser['request']['variables']
): Promise<IUpdateUser['response']> {
  const data = await authApi.updateUser(query, variables);

  return data;
}

async function resetPassword(
  payload: IResetPassword['request']
): Promise<IResetPassword['response']> {
  const data = await authApi.resetPassword(payload);

  return data;
}

async function resetPasswordConfirmation(
  payload: IResetPasswordConfirmation['request']
): Promise<IResetPasswordConfirmation['response']> {
  const data = await authApi.resetPasswordConfirmation(payload);

  return data;
}

async function getMe(
  query: string,
  variables: IGetMe['request']['variables']
): Promise<IGetMe['response']> {
  const data = await authApi.getMe(query, variables);
  const response = authAdapters.getMeAdapter(data);
  return response;
}

async function validateInviteCode(
  payload: IValidateInviteCode['request']
): Promise<IValidateInviteCode['response']> {
  const data = await authApi.validateInviteCode(payload);

  return data;
}

export const authService = {
  signIn,
  updateUserAvatar,
  changePassword,
  signUp,
  updateUser,
  resetPassword,
  refreshToken,
  resetPasswordConfirmation,
  getMe,
  validateInviteCode,
};
