<template>
  <div>
    <!-- Header -->

    <div
      class="flex flex-col md:flex-row flex-wrap md:justify-between items-start md:items-center gap-4 md:mt-0 mt-[30px] mb-4"
    >
      <!-- Header text -->
      <div class="flex flex-col">
        <span class="text-[#A3AED0] text-[14px] font-bold leading-[24px] tracking-[-0.02em]">
          Hi {{ user?.firstName }},
        </span>

        <span class="text-[#2B3674] text-[34px] font-bold leading-[42px] tracking-[-0.02em]">
          Welcome to Venus!
        </span>
      </div>

      <!-- Header search -->

      <div class="mr-0 pr-[30px] max-w-full md:max-w-none">
        <Search />
      </div>
    </div>

    <!-- Info Cards -->

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
      <InfoCard
        secondaryText="Spent this Month"
        :primaryText="`$${stats?.spentCurrentMonth ?? 0}`"
        :chartData="last7Months"
        chartType="bar"
      />
      <InfoCard
        secondaryText="New clients"
        :primaryText="`${stats?.newClients ?? 0}`"
        iconBefore="card-clients"
        :chartData="mappedAnnualSpending"
        chartType="line"
      />
      <InfoCard
        secondaryText="Earnings"
        :primaryText="`$${stats?.earnings ?? 0}`"
        iconBefore="earnings-icon"
      />
      <InfoCard
        secondaryText="Activity"
        :primaryText="`$${stats?.activity ?? 0}`"
        :chartData="mappedAnnualSpending"
        chartType="line"
        :filled="true"
      />
    </div>

    <!-- Grid 2 cards -->

    <div class="grid xl:grid-cols-1 gap-8">
      <StatsAndUserGrid :user="user" :stats="stats" :annualSpending="spending" />
    </div>

    <!-- Grid 3 cards -->
    <div class="gap-8 mt-8">
      <SummaryGrid />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "../stores/appStore";
import { storeToRefs } from "pinia";

import Search from "../components/dashboard/Search.vue";
import InfoCard from "../components/dashboard/InfoCard.vue";
import SummaryGrid from "../components/dashboard/SummaryGrid.vue";
import StatsAndUserGrid from "../components/dashboard/StatsAndUserGrid.vue";

const appStore = useAppStore();

const {
  getUser: user,
  getStats: stats,
  getSpending: spending,
  mappedAnnualSpending,
  last7Months,
} = storeToRefs(appStore);

onMounted(async () => {
  await Promise.all([
    appStore.fetchStats(),
    appStore.fetchUser(),
    appStore.fetchSpending(),
    appStore.fetchTransactions(),
    appStore.fetchSchedule(),
  ]);
});
</script>
