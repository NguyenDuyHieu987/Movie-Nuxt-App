<template>
  <EmojiPicker
    class="emoji-picker"
    :native="true"
    :display-recent="true"
    :static-texts="{
      placeholder: 'Tìm kiếm biểu tượng cảm xúc'
    }"
    :hide-group-names="true"
    :disable-sticky-group-names="true"
    :disable-skin-tones="true"
    theme="auto"
    @select="onSelectEmoji"
  />
</template>

<script setup lang="ts">
import 'vue3-emoji-picker/css';
import EmojiPicker from 'vue3-emoji-picker';

const props = withDefaults(
  defineProps<{
    isShow?: boolean;
  }>(),
  {
    isShow: false
  }
);

const emits = defineEmits<{
  onSelectEmoji: [emoji: any];
}>();

const onSelectEmoji = (emoji: any) => {
  emits('onSelectEmoji', emoji);
};
</script>
