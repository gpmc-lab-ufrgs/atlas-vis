// import {AuthenticationResult, UserDetails} from '../../domain/auth/types/ISignIn';

// type SetLoginParams = {
//   user: UserDetails;
//   authenticationResult: AuthenticationResult;
// };

export type UseAuthStoreType = {
  user: any /*UserDetails*/;
  Session: string;
  // authenticationResult: AuthenticationResult;
  isLoggedIn: boolean;
  expiresWhen: Date;
  isRefreshingToken: boolean;
  // setUser(user: UserDetails): void;
  // setAuthenticationResult(authenticationResult: AuthenticationResult): void;
  // setLogin(data: any/*SetLoginParams*/): void;
  setSession(session: string): void;
  setLogout(): void;
  getLogin(): {
    user: any /*UserDetails*/;
    authenticationResult: any /*AuthenticationResult*/;
    isLoggedIn: boolean;
  };
  isTokenExpired(): boolean;
  getAccessToken(): string;
  getRefreshToken(): string | undefined;
  setRefreshingToken(isRefreshingToken: boolean): void;
};
