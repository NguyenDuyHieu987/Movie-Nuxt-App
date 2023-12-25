<template>
  <div class="pin-otp">
    <input
      v-model="pin[0]"
      type="number"
      :maxlength="1"
      :index="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[1]"
      type="number"
      :maxlength="1"
      :index="2"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[2]"
      type="number"
      :maxlength="1"
      :index="3"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[3]"
      type="number"
      :maxlength="1"
      :index="4"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[4]"
      type="number"
      :maxlength="1"
      :index="5"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[5]"
      type="number"
      :maxlength="1"
      :index="6"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{}>();
const pin = defineModel('pin', {
  type: Array,
  default: [null, null, null, null, null, null]
});

onMounted(() => {});

const validateInput = () => {
  document.querySelectorAll('input[type="number"]').forEach((input: any) => {
    if (
      input.value.length > +input.getAttribute('maxlength') &&
      !isNaN(input.value)
    ) {
      // input.value = input.value.slice(0, +input.getAttribute('maxlength'));

      const index = +input.getAttribute('index') - 1;

      pin.value[index] = input.value.slice(0, +input.getAttribute('maxlength'));
    }
  });
};

const handleImputPin = (e: any) => {
  setTimeout(() => {
    validateInput();
  }, 1);

  e.target.addEventListener('keydown', (e1: any) => {
    setTimeout(() => {
      if (
        e1.keyCode == 8 &&
        e.target.value.length == 0 &&
        e.target.previousElementSibling
      ) {
        e.target.previousElementSibling.focus();
      }
    });
  });
};

const handleKeyDownPin = (e: any) => {
  setTimeout(() => {
    if (e.keyCode != 8) {
      validateInput();

      if (
        !isNaN(e.target.value) &&
        e.target.value.length > 0 &&
        e.target.nextElementSibling &&
        e.target.nextElementSibling.value.length == 0
      ) {
        setTimeout(() => {
          e.target.nextElementSibling.focus();
        });
      }
    }
  }, 10);
};

const handlePastePin = (e: any) => {
  setTimeout(() => {
    const index = +e.target.getAttribute('index') - 1;

    let k = 0;

    for (let i = index; i < pin.value.length; i++) {
      pin.value[i] = e.target.value[k++];
    }
  });
};
</script>

<style lang="scss" src="./PinOTP.scss"></style>
