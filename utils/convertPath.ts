const SEPARATE = '__';
export const SPACES_REGEX = /\s+/g;

export function toPath(name: string) {
  if (isStringEmpty(name)) {
    return '';
  }

  const path = removeVietnameseTones(name.toLowerCase()).replaceAll(
    SPACES_REGEX,
    '-'
  );

  return path;
}

export function toPathInfo_Play(name: string) {
  if (isStringEmpty(name)) {
    return '';
  }

  const path =
    SEPARATE +
    removeVietnameseTones(name.toLowerCase()).replaceAll(SPACES_REGEX, '-');

  return path;
}

export function parsePathInfo_Play(path: string) {
  if (isStringEmpty(path)) {
    return '';
  }

  const parsedPath = path.split(SEPARATE)[0];

  return parsedPath;
}
