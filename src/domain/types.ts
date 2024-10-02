// import {AxiosError} from 'axios';

type CustomMutationOptions<T, TRequest> = {
  onSuccess?: (data: T, variables: TRequest) => void;
  onError?: (error: any, variables: TRequest) => void;
  disabledAutomaticFetch?: boolean;
};

type PageParams = {
  first: number;
  after: string;
};
export type {CustomMutationOptions, PageParams};
