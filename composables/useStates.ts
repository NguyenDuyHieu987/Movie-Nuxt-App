const utils = useUtils();

export const useStates = () => {
  // console.log(utils.localStorage.getWithExpiry('user_token'));

  return {
    isLogin: useState<boolean>('isLogin', () => !!utils.localStorage.getWithExpiry('user_token'))
      .value
  };
};
