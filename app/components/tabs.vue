<template>
  <button
    v-for="tab in tabs"
    :key="tab.value"
    class="mr-4 px-2 pb-1 text-13"
    :class="
      vModel === tab.value
        ? 'border-b-2 border-binance-yellow text-white'
        : 'text-gray-400'
    "
    @click="vModel = tab.value"
  >
    {{ tab.title }}
  </button>
</template>

<script setup>
  const vModel = defineModel({
    type: [String, Number],
    required: true,
  });

  defineProps({
    tabs: {
      type: Array,
      required: true,
    },
  });
</script>
