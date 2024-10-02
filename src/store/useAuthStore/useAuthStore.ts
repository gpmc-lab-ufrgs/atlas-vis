import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {UseAuthStoreType} from './types';
// import {AuthenticationResult, UserDetails} from '../domain/auth/types/ISignIn';
import {queryClient} from '../../utils/apollo';

const initialState = {
  user: {} as any/*UserDetails*/,
  isLoggedIn: false,
  authenticationResult: {} as any/*AuthenticationResult*/,
  Session: '',
  expiresWhen: new Date(),
  isRefreshingToken: false,
};

export const useAuthStore = create<UseAuthStoreType>()(
  persist(
    (set, get) => ({
      ...initialState,
      // setLogin: ({authenticationResult, user}) => {
        // const now = new Date();
        // const expiresInMs = authenticationResult.ExpiresIn * 1000; // Convert seconds to milliseconds
        // const expiresWhen = new Date(now.getTime() + expiresInMs);
        // set({authenticationResult, user, isLoggedIn: true, expiresWhen});
      // },
      setSession: (Session: string) => {
        set({Session});
      },
      // setAuthenticationResult: (authenticationResult: any /*AuthenticationResult*/ ) => {
      //   set({authenticationResult});
      // },
      // setUser: (user: any /*UserDetails*/ ) => {
      //   set({user});
      // },
      // setUserPicture: (image_url: string) => {
      //   set({user: {...get().user, image_url}});
      // },
      setLogout: () => {
        queryClient.removeQueries();
        set(initialState);
      },
      setExpiresWhen: (expiresWhen: Date) => {
        set({expiresWhen});
      },
      setRefreshingToken: (isRefreshingToken: boolean): void => {
        set({isRefreshingToken});
      },
      isTokenExpired: () => {
        const {expiresWhen} = get();
        return expiresWhen < new Date();
      },
      getLogin: () : any => {
        // const {authenticationResult, user, isLoggedIn} = get();
        // return {authenticationResult, user, isLoggedIn};
        return {};
      },
      getAccessToken: (): string => {
        // const {authenticationResult} = get();
        // return authenticationResult.AccessToken;
        return "";
      },
      getRefreshToken: (): string | undefined => {
        // const {authenticationResult} = get();
        // return authenticationResult.RefreshToken;
        return "";
      },

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
