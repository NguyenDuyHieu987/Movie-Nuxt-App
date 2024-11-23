import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(), // Cho phép sử dụng các thuộc tính như `bg="red-500"`
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  rules: [
    // [/^p-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    // [/^m-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })]
  ]
});
