const utils = useUtils();

export const useStates = () => {
  // console.log(utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN));

  return {
    isLogin: useState<boolean>(
      'isLogin',
      () => !!utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)
    ).value
  };
};
