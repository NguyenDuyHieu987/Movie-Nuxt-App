import { extractStyle } from 'ant-design-vue/es/_util/static-style-extract';
import fsExtra from 'fs-extra';
import { isProduction } from 'std-env';

export const genAntdStyle = async () => {
  const css = extractStyle();

  if (isProduction) {
    await fsExtra.outputFile('public/css/antdv4.css', css, 'utf8');
  } else {
    await fsExtra.outputFile('public/css/antdv4.dev.css', css, 'utf8');
  }
};

genAntdStyle();
