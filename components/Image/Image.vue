<template>
  <img
    v-if="defaultEl"
    ref="imageRef"
    class="p247-image"
    :src="src"
    :data-loading="imageStates.loaded ? 'loaded' : 'loading'"
    :loading="loading"
    :alt="alt"
    @load="handleLoadedImage"
    @error="handleErrorImage"
  />

  <NuxtImg
    v-else
    ref="imageRef"
    class="p247-image"
    :src="src"
    :data-loading="imageStates.loaded ? 'loaded' : 'loading'"
    :placeholder="placeholder"
    :format="format"
    :loading="loading"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :quality="quality"
    @load="handleLoadedImage"
    @error="handleErrorImage"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    defaultEl: boolean;
    type: string | 'vertical' | 'horizontal' | 'cast' | undefined;
    placeholder?: string | boolean;
    loading: 'lazy' | 'eager';
    format?: string;
    alt: string;
    width: string | number | undefined;
    height: string | number | undefined;
    sizes: string | Record<string, any> | undefined;
    quality: string | number | undefined;
  }>(),
  {
    defaultEl: true,
    type: undefined,
    placeholder: false,
    format: 'avif',
    alt: '',
    width: undefined,
    height: undefined,
    sizes: undefined,
    quality: undefined
  }
);

const utils = useUtils();
const imageStates = reactive({
  loaded: false,
  error: true
});

const emits = defineEmits<{
  (e: 'load', event: any): void;
  (e: 'error', event: any): void;
}>();

const imageRef = ref<HTMLImageElement>();

const handleLoadedImage = (e: any) => {
  emits('load', e);

  // imageRef.value!.src = props.src;

  imageStates.loaded = true;
  imageStates.error = false;
};

const handleErrorImage = (e: any) => {
  emits('error', e);

  if (utils.isString(props.placeholder)) {
    imageRef.value!.src = props.placeholder as string;
  }

  imageStates.loaded = false;
  imageStates.error = true;
};

// watch(imageStates, () => {}, { deep: true, immediate: true });
</script>

<style lang="scss" src="./Image.scss"></style>
