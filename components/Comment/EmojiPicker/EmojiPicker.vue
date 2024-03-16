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
    @select="onSelectEmoji"
  />
</template>

<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const props = withDefaults(
  defineProps<{
    isShow: boolean;
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
