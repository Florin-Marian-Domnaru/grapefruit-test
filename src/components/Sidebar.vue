<template>
  <div
    :class="[
      'fixed top-0 left-0 w-[290px] h-screen bg-white text-black p-8 z-[1000] flex flex-col transition-transform duration-300 ease-in-out',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0',
    ]"
  >
    <!-- Close Button (only visible on mobile) -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 text-black bg-transparent border-0 text-[1.5rem] cursor-pointer z-[1200] block md:hidden"
    >
      <Icon name="burger-bar" alt="Logout" class="mr-[10px] h-[30px] w-[30px]" />
    </button>

    <!-- Brand Section -->
    <div class="flex items-center font-poppins -mx-8 mt-0 mb-8 border-b border-[#F4F7FE] px-8 pb-4">
      <Icon name="venus-logo" alt="Venus logo" class="w-[44px] h-[44px]" />
      <div class="flex flex-col text-[#4318FF] ml-[20px] items-start">
        <span class="font-bold text-[26px] leading-none">VENUS</span>
        <span class="font-medium text-[12px] leading-none">DASHBOARD</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-px flex-grow">
      <div v-for="item in navItems" :key="item.name" class="p-[10px]">
        <router-link
          :to="item.path"
          :class="[
            'flex items-center justify-start mb-[15px] text-[#A3AED0]',
            isActive(item.path) ? 'bg-[#4318FF] rounded-[5px] text-white p-[10px]' : '',
          ]"
        >
          <Icon :name="item.icon" :alt="item.label" class="mr-[10px]" />
          {{ item.label }}
        </router-link>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="mt-auto flex mb-10">
      <button
        class="flex items-center justify-end bg-transparent border-0 p-0 text-[#A3AED0] cursor-pointer font-inherit text-left"
      >
        <Icon name="menu-logout" alt="Logout" class="mr-[10px]" />
        Log Out
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";
import { useRoute } from "vue-router";

const { isSidebarOpen } = defineProps<{ isSidebarOpen: boolean }>();

const navItems = [
  { name: "Dashboard", label: "Dashboard", icon: "menu-dashboard", path: "/" },
  {
    name: "Activity",
    label: "Activity",
    icon: "menu-activity",
    path: "/activity",
  },
  { name: "Library", label: "Library", icon: "menu-library", path: "/library" },
  {
    name: "Security",
    label: "Security",
    icon: "menu-security",
    path: "/security",
  },
  {
    name: "Schedules",
    label: "Schedules",
    icon: "menu-schedules",
    path: "/schedules",
  },
  { name: "Payouts", label: "Payouts", icon: "menu-payouts", path: "/payouts" },
  {
    name: "Settings",
    label: "Settings",
    icon: "menu-settings",
    path: "/settings",
  },
];

const route = useRoute();

function isActive(path: string): boolean {
  return route.path === path;
}
</script>
