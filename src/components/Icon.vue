<template>
  <img :src="iconSrc" :alt="altText" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  name: string;
  alt?: string;
}>();

const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
});

const iconSrc = computed(() => {
  const found = Object.entries(images).find(([path]) =>
    path.includes(`/assets/images/${props.name}.`),
  );

  if (found) {
    return (found[1] as any).default;
  } else {
    return "";
  }
});

const altText = computed(() => props.alt || props.name);
</script>
