<template>
  <div
    :class="[
      filled ? 'bg-gradient-to-br from-[#868cff] to-[#4318ff] text-white' : 'bg-white',
      'flex items-center py-4 px-6 rounded-lg shadow-sm transition-colors duration-300 gap-4',
    ]"
  >
    <!-- Icon before -->
    <div v-if="iconBefore" class="flex items-center justify-center order-first">
      <Icon :name="iconBefore" alt="Icon Before" class="min-w-[56px] min-h-[56]" />
    </div>

    <div class="flex flex-col text-left min-w-[120px]">
      <span :class="[filled ? 'text-white' : 'text-[#A3AED0]', 'text-[14px]', 'font-bold']">
        {{ secondaryText }}</span
      >
      <span :class="[filled ? 'text-white' : 'text-[#2B3674]', 'text-2xl', 'font-bold']">
        {{ primaryText }}
      </span>
    </div>

    <!-- Graphs: Bar Chart -->
    <div v-if="chartType === 'bar'" class="flex justify-end w-full h-[48px] mt-2">
      <div class="flex h-full gap-[4px] md:gap-[7px] lg:gap-[10px]">
        <div v-for="(item, index) in chartData" :key="index" class="relative w-[4px] h-full">
          <div class="absolute inset-0 bg-[rgba(200,200,200,0.3)] rounded-[10px]"></div>
          <div
            class="absolute bottom-0 inset-x-0 rounded-[10px] transition-all duration-[400ms] ease-out"
            :style="{
              height: calculateHeight(item.y) + '%',
              backgroundColor: filled ? '#ffffff' : '#4318FF',
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Graphs: Line Chart -->
    <div v-if="chartType === 'line'" class="flex justify-end w-full h-12 mt-2">
      <svg class="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradientBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#4F2CFF" stop-opacity="1" />
            <stop offset="100%" stop-color="#4F2CFF00" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="lineGradientWhite" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="100%" stop-color="#ffffff00" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          :d="linePath"
          fill="none"
          :stroke="filled ? 'url(#lineGradientWhite)' : 'url(#lineGradientBlue)'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Icon after -->
    <div v-if="iconAfter" class="flex items-center justify-center order-last">
      <Icon :name="iconAfter" alt="Icon After" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "../Icon.vue";

const props = defineProps<{
  secondaryText: string | number;
  primaryText: string | number;
  filled?: boolean;
  iconBefore?: string;
  iconAfter?: string;
  chartData?: { amount: any; label: string; y: number }[];
  chartType?: "bar" | "line";
}>();

const calculateHeight = (value: number) => {
  const max = Math.max(...(props.chartData?.map((item) => item.y) || [1]));
  return (value / max) * 100;
};

const linePath = computed(() => {
  if (!props.chartData || props.chartData.length === 0) return "";
  const data = props.chartData;
  const maxY = Math.max(...data.map((item) => item.y));
  const minY = Math.min(...data.map((item) => item.y));
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 40 - ((point.y - minY) / (maxY - minY || 1)) * 40;
    return { x, y };
  });
  if (points.length < 2) return "";
  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const controlX = (curr.x + next.x) / 2;
    path += ` C ${controlX},${curr.y} ${controlX},${next.y} ${next.x},${next.y}`;
  }
  return path;
});
</script>
