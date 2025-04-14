<template>
  <div
    class="relative flex items-center w-full max-w-[341px] bg-white border border-[#e0e0e0] rounded-[6px] py-2 px-4"
  >
    <Icon name="search" alt="Search" class="w-[11px] h-[11px] mr-2 flex-shrink-0" />
    <input
      type="text"
      placeholder="Search..."
      class="border-0 outline-none text-black flex-grow text-[12px] bg-transparent font-normal"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from "../Icon.vue";
</script>
