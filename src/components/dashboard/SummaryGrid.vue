<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
    <!-- Spent this month card -->
    <Card>
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-start mb-2">
          <div class="flex flex-col">
            <span class="text-[14px] text-[#A3AED0]">Spent this month</span>
            <span class="text-[34px] text-[#2B3674] font-bold">
              $ {{ stats?.spentCurrentMonth ?? 0 }}
            </span>
          </div>
          <div
            class="flex items-center mt-2"
            :class="{
              'text-[#05cd99]':
                trendData.color === 'trend-up' || trendData.color === 'trend-stable',
              'text-[#d63031]': trendData.color === 'trend-down',
            }"
          >
            <Icon :name="trendData.icon" class="h-[20px] w-[20px] mr-[5px]" />
            <span>{{ trendData.percent }}%</span>
          </div>
        </div>
        <div
          class="flex items-center mt-2"
          :class="{
            'text-[#05cd99]': statusConfig.color === 'status-ok',
            'text-[#0984e3]': statusConfig.color === 'status-normal',
            'text-[#d63031]': statusConfig.color === 'status-danger',
          }"
        >
          <Icon :name="statusConfig.icon" class="h-[15px] w-[15px] mr-[5px]" />
          <span class="font-bold text-[16px]">{{ statusConfig.text }}</span>
        </div>
        <div
          class="flex justify-start w-full h-[160px] mt-2 overflow-x-auto"
          style="margin-top: auto"
        >
          <div class="flex h-full w-full gap-4 justify-between">
            <div
              v-for="(item, index) in chartDataMiniGraph"
              :key="index"
              class="relative flex-none h-full basis-[15px] max-w-[15px]"
            >
              <div class="absolute w-full h-full bg-[rgba(200,200,200,0.3)] rounded-[10px]"></div>
              <div
                class="absolute bottom-0 w-full rounded-[10px] transition-all duration-400 ease-out"
                :style="{
                  height: calculateHeight(item.y) + '%',
                  backgroundColor: filled ? '#ffffff' : '#4318FF',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Transactions card -->
    <Card>
      <div class="flex flex-col">
        <span class="text-[20px] font-bold mb-8 text-[#2B3674]">Your transactions</span>
        <div
          v-for="transaction in latestTransactions"
          :key="transaction.id"
          class="flex items-center mb-8"
        >
          <div class="w-[40px] h-[40px] mr-4">
            <Icon name="icon-placeholder" />
          </div>
          <div class="flex flex-col">
            <span class="font-bold mb-1 text-[#1b2559]">{{ transaction.name }}</span>
            <span class="text-[0.85rem] text-[#a3aed0] font-medium">
              {{ formatDate(transaction.date) }}
            </span>
          </div>
        </div>
        <div class="mt-auto text-right pt-4">
          <router-link
            to="/transactions"
            class="text-[#4318FF] inline-flex items-center no-underline font-bold text-[0.9rem] cursor-pointer hover:underline"
          >
            View all
            <Icon name="arrow-right" />
          </router-link>
        </div>
      </div>
    </Card>

    <!-- Schedule card -->
    <Card>
      <div class="flex flex-col h-full">
        <span class="mb-4 text-[34px] text-[#2B3674] font-bold">{{ formattedToday }}</span>
        <div v-for="task in todaySchedule" :key="task.id" class="flex items-center mb-8">
          <div class="w-[4px] h-[40px] bg-[#4318ff] mr-4 rounded-[2px]"></div>
          <div class="flex flex-col justify-center">
            <span class="font-bold mb-1 text-[#1b2559]">{{ task.task }}</span>
            <span class="text-[0.85rem] text-[#a3aed0] font-medium">
              {{ task.hours }}
            </span>
          </div>
        </div>
        <div class="mt-auto text-right pt-4">
          <router-link
            to="/schedule"
            class="text-[#4318FF] inline-flex items-center no-underline font-bold text-[0.9rem] cursor-pointer hover:underline"
          >
            View all Tasks
            <Icon name="arrow-right" />
          </router-link>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../../stores/appStore";
import Card from "../dashboard/Card.vue";
import Icon from "../Icon.vue";

const appStore = useAppStore();
const { getStats: stats, getTransactions, getSchedule, getSpending } = storeToRefs(appStore);

const filled = false;

// Calculate chart data
const chartDataMiniGraph = computed(() => {
  return getSpending.value.slice(-7).map((item) => ({
    label: item.month.slice(0, 3),
    y: item.amount,
  }));
});

const calculateHeight = (value: number) => {
  const max = Math.max(...chartDataMiniGraph.value.map((item) => item.y));
  return (value / max) * 100;
};

// Latest transactions
const latestTransactions = computed(() => {
  return getTransactions.value.slice(-3).reverse();
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Schedule for today
const today = new Date();
const todayString = today.toISOString().split("T")[0];
const formattedToday = today.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
});
const todaySchedule = computed(() => {
  return getSchedule.value.filter((item) => item.date === todayString).slice(0, 3);
});

// Trend data
const trendData = computed(() => {
  const current = stats.value?.spentCurrentMonth ?? 0;
  const previous = getSpending.value.slice(-2)[0]?.amount ?? 0;
  const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
  let trend = {
    percent: change.toFixed(2),
    icon: "arrow-green-up",
    color: "trend-up",
  };
  if (change < -5) {
    trend = {
      percent: change.toFixed(2),
      icon: "arrow-green-up",
      color: "trend-down",
    };
  } else if (change >= -5 && change <= 5) {
    trend = {
      percent: change.toFixed(2),
      icon: "arrow-green-up",
      color: "trend-stable",
    };
  }
  return trend;
});

// Status
const status = "ok";
const statusMap = {
  ok: { icon: "check-ok", text: "On track", color: "status-ok" },
  normal: { icon: "check-ok", text: "Normal", color: "status-normal" },
  danger: { icon: "check-ok", text: "Danger", color: "status-danger" },
};
const statusConfig = computed(() => statusMap[status] || statusMap.normal);
</script>
