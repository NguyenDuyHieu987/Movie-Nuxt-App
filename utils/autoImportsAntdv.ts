import { addComponent } from '@nuxt/kit';
import * as AntDV from 'ant-design-vue';
import type { NuxtApp } from 'nuxt/schema';

export async function resolveAntDVComponents(options: any, nuxt: NuxtApp) {
  for (const component in AntDV) {
    if (['version', 'install'].includes(component)) continue;
    if (typeof component === 'string') {
      await addComponent({
        filePath: 'ant-design-vue/es',
        name: `A${component}`,
        export: component,
        prefetch: true,
        preload: true
      });
    } else if (Array.isArray(component)) {
      await addComponent({
        filePath: 'ant-design-vue/es',
        name: `A${component[0]}`,
        export: component[0],
        prefetch: true,
        preload: true
      });
    }
  }
}
