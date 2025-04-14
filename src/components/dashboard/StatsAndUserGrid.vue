<template>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] gap-4 md:gap-8 mt-8">
    <!-- Graph card -->
    <Card>
      <AnnualSpendingGraph :chartData="spending" />
    </Card>

    <!-- User card -->
    <Card>
      <div class="flex flex-col items-center">
        <div class="relative w-[125px] h-[125px]">
          <div
            class="absolute top-1/2 left-1/2 w-full h-full bg-[#f4f7fe] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0"
          ></div>
          <img
            v-if="user?.profilePicture"
            :src="user.profilePicture"
            alt="User Avatar"
            class="relative z-10 w-full h-full rounded-full object-cover"
          />
        </div>
        <div class="text-center mt-4">
          <h3 class="text-[#2B3674] text-2xl font-bold mb-0">
            {{ user?.firstName }} {{ user?.lastName }}
          </h3>
          <div class="flex flex-row justify-center">
            <Icon name="location-icon" />
            <p class="text-[#A3AED0] text-sm ml-[5px] m-0">
              {{ user?.location }}
            </p>
          </div>
        </div>
        <div class="flex justify-between gap-8 mt-6 w-full px-4">
          <div class="flex flex-col items-center">
            <span class="text-[#A3AED0] text-xs">Projects</span>
            <span class="text-[#2B3674] text-2xl font-bold">{{ user?.projects }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[#A3AED0] text-xs">Followers</span>
            <span class="text-[#2B3674] text-2xl font-bold">{{ user?.followers }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[#A3AED0] text-xs">Following</span>
            <span class="text-[#2B3674] text-2xl font-bold">{{ user?.following }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../../stores/appStore";
import Card from "../dashboard/Card.vue";
import AnnualSpendingGraph from "../dashboard/AnnualSpendingGraph.vue";
import Icon from "../Icon.vue";

const appStore = useAppStore();
const { getUser: user, getSpending: spending } = storeToRefs(appStore);
</script>
