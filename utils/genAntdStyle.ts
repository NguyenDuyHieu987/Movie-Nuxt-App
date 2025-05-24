import { h } from 'vue';
import { extractStyle } from 'ant-design-vue/es/_util/static-style-extract';
import { ConfigProvider, theme } from 'ant-design-vue/lib';
import fsExtra from 'fs-extra';

export const genAntdStyle = async () => {
  const css = extractStyle();

  if (import.meta.env.PROD) {
    await fsExtra.outputFile('public/css/antdv4.css', css, 'utf8');
  } else {
    await fsExtra.outputFile('public/css/antdv4.dev.css', css, 'utf8');
  }
};

export const genAntdStyleDarkMode = async () => {
  const css = extractStyle((node) => {
    return h(
      ConfigProvider,
      {
        theme: {
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#008ddf',
            fontFamily: 'Roboto Flex, sans-serif',
            fontSize: 15,
            lineHeight: 1.5,
            borderRadius: 2,
            borderRadiusLG: 5
          }
        }
      },
      {
        default: () => node
      }
    );
  });

  if (import.meta.env.PROD) {
    await fsExtra.outputFile('public/css/antdv4.css', css, 'utf8');
  } else {
    await fsExtra.outputFile('public/css/antdv4.dev.css', css, 'utf8');
  }
};

genAntdStyleDarkMode();
