<template>
  <div class="flex w-full min-h-screen">
    <Sidebar :is-sidebar-open="isSidebarOpen" @close="isSidebarOpen = false" />
    <div class="flex-grow w-full p-8 ml-0 md:ml-[290px] mb-20">
      <!-- Toggle Button (only visible when sidebar is closed and on smaller screens) -->
      <div>
        <button
          v-if="!isSidebarOpen"
          @click="isSidebarOpen = true"
          class="fixed top-4 left-4 z-[1100] flex lg:hidden items-center bg-transparent cursor-pointer"
        >
          <Icon name="burger-bar" alt="Menu" class="mr-[10px] w-[30px] h-[30px]" />
        </button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
import Icon from "./components/Icon.vue";
import { ref } from "vue";

const isSidebarOpen = ref(false);
</script>
