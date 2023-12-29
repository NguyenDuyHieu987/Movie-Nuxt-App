export const useUtils = () => {
  return {
    SPACES_REGEX,
    EMAIL_REGEX,
    CHARACTERS_REGEX,
    convertPath: { toPath, toPathInfo_Play, parsePathInfo_Play },
    isNull,
    isString,
    isNumber,
    isStringNumber,
    isStringEmpty,
    isArrayEmpty,
    isEmailValid,
    isSpecialCharacters,
    isVietnameseTones,
    handleAddItemToList,
    viewFormatter,
    encryptPassword,
    handleRemoveItemFromList,
    handleRemoveAllitemFromList,
    handleRemoveItemFromHistory,
    handleRemoveAllitemFromHistory,
    initFacebookSdk,
    initGoogleGSIClient,
    cookie: customCookie(),
    localStorage: customLocalStorage(),
    dateTimeFormater: dateTimeFormater(),
    conrfirmMessageModal,
    removeVietnameseTones,
    wait
  };
};

export const NUMBER_REGEX = /^\d+$/g;
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/im;
export const CHARACTERS_REGEX = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/gim;
export const VIETNAMESE_REGEX =
  /Â|Ã|È|É|Ê|Ì|Í|Ò|Ó|Ô|Õ|Ù|Ú|Ă|Đ|Ĩ|Ũ|Ơ|à|á|â|ã|è|é|ê|ì|í|ò|ó|ô|õ|ù|ú|ă|đ|ĩ|ũ|ơ|Ư|Ă|Ạ|Ả|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ắ|Ằ|Ẳ|Ẵ|Ặ|Ẹ|Ẻ|Ẽ|Ề|Ề|Ể|Ế|ư|ă|ạ|ả|ấ|ầ|ẩ|ẫ|ậ|ắ|ằ|ẳ|ẵ|ặ|ẹ|ẻ|ẽ|ề|ề|ể|ế|Ễ|Ệ|Ỉ|Ị|Ọ|Ỏ|Ố|Ồ|Ổ|Ỗ|Ộ|Ớ|Ờ|Ở|Ỡ|Ợ|Ụ|Ủ|Ứ|Ừ|ễ|ệ|ỉ|ị|ọ|ỏ|ố|ồ|ổ|ỗ|ộ|ớ|ờ|ở|ỡ|ợ|ụ|ủ|ứ|ừ|Ử|Ữ|Ự|Ỳ|Ỵ|Ý|Ỷ|Ỹ|ử|ữ|ự|ỳ|ỵ|ỷ|ỹ/gim;

export function isNull(obj: any): boolean {
  return obj === undefined || obj === null;
}

export function isString(obj: any): boolean {
  return typeof obj === 'string' || obj instanceof String;
}

export function isNumber(obj: any): boolean {
  return (
    typeof obj === 'number' || obj instanceof Number || isStringNumber(obj)
  );
}

export function isStringNumber(str: string): boolean {
  return typeof str === 'string' && NUMBER_REGEX.test(str);
}

export function isStringEmpty(str: string): boolean {
  return isNull(str) || str === '';
}

export function isArrayEmpty(obj: any[]): boolean {
  return isNull(obj) || obj.length === 0;
}

export function isEmailValid(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isSpecialCharacters(str: string): boolean {
  return CHARACTERS_REGEX.test(str);
}

export function isVietnameseTones(str: string): boolean {
  return VIETNAMESE_REGEX.test(str);
}

export * from './convertPath';
export * from './convertViews';
export * from './customCookie';
export * from './customLocalStorage';
export * from './dateTimeFormater';
export * from './encryptPassword';
export * from './facebookService';
export * from './handleAddRemoveItemList_History';
export * from './initFacebookSDK';
export * from './initGoogleGSIClient';
export * from './messageModal';
export * from './removeVietnameseTones';
export * from './wait';
