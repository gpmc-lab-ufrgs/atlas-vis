import {ISignIn, IRefreshToken} from './types/ISignIn';
import request from 'graphql-request';
import axiosApiInstance from '~/utils/api/axios';
import {IUpdateUserAvatar} from './types/IUpdateUserAvatar';
import {IChangePassword} from './types/IChangePassword';
import {ISignUp} from './types/ISignUp';
import {IUpdateUser} from './types/IUpdateUser';
import {useAuthStore} from '~/store/useAuthStore';
import {CONSTANTS} from '~/configs/constants';
import graphqLInstance from '~/utils/api/graphql';
import {IResetPassword} from './types/IResetPassword';
import {IResetPasswordConfirmation} from './types/IResetPasswordConfirmation';
import {IGetMe} from './types/IGetMe';
import {IValidateInviteCode} from './types/IValidateInviteCode';

async function refreshToken(
  payload: IRefreshToken['request']
): Promise<IRefreshToken['response']> {
  const response = await axiosApiInstance.post<IRefreshToken>(
    `/auth/refresh-token`,
    {
      token: payload.token,
    }
  );
  // TODO: validate if the user got removed meanwhile
  return response.data.response;
}

async function signIn(
  payload: ISignIn['request']
): Promise<ISignIn['response']> {
  const response = await axiosApiInstance.post<ISignIn>(
    `/auth/user-login`,
    payload
  );

  if (response.data.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
    return response.data as unknown as ISignIn['response'];
  }

  return response.data.response;
}

async function signUp(
  payload: ISignUp['request']
): Promise<ISignUp['response']> {
  const response = await axiosApiInstance.post<ISignUp>(
    `/auth/add-user`,
    payload
  );

  return response.data.response;
}

async function updateUserAvatar(
  payload: IUpdateUserAvatar['request']
): Promise<IUpdateUserAvatar['response']> {
  const form = new FormData();
  form.append('uploaded_file', payload.file);

  const response = await axiosApiInstance.post<IUpdateUserAvatar>(
    `/user/upload`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.response;
}

async function changePassword(
  payload: IChangePassword['request']
): Promise<IChangePassword['response']> {
  const response = await axiosApiInstance.post<IChangePassword>(
    `/auth/new-password-for-login`,
    payload,
    {}
  );

  return response.data.response;
}

async function updateUser(
  query: IUpdateUser['request']['query'],
  variables: IUpdateUser['request']['variables']
): Promise<IUpdateUser['response']> {
  const response = await graphqLInstance.request<IUpdateUser['response']>(
    query,
    variables
  );

  return response;
}

async function resetPassword(
  payload: IResetPassword['request']
): Promise<IResetPassword['response']> {
  const response = await axiosApiInstance.post<IResetPassword>(
    `/auth/recovery-password`,
    payload,
    {}
  );

  return response.data.response;
}

async function resetPasswordConfirmation(
  payload: IResetPasswordConfirmation['request']
): Promise<IResetPasswordConfirmation['response']> {
  const response = await axiosApiInstance.post<IResetPasswordConfirmation>(
    `/auth/confirm-password-code`,
    payload,
    {}
  );

  return response.data.response;
}

async function getMe(
  query: IGetMe['request']['query'],
  variables: IGetMe['request']['variables']
): Promise<IGetMe['graphQLResponse']> {
  const response = await graphqLInstance.request<IGetMe['graphQLResponse']>(
    query,
    variables
  );

  return response;
}

async function validateInviteCode(
  payload: IValidateInviteCode['request']
): Promise<IValidateInviteCode['response']> {
  const response = await axiosApiInstance.post<IValidateInviteCode['response']>(
    `/auth/validate-ivc`,
    payload
  );

  return response.data;
}

export const authApi = {
  signIn,
  signUp,
  updateUserAvatar,
  updateUser,
  changePassword,
  resetPassword,
  refreshToken,
  resetPasswordConfirmation,
  getMe,
  validateInviteCode,
};
