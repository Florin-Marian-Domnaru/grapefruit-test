<template>
  <div class="flex flex-row items-start justify-between text-left">
    <div class="flex flex-col text-left">
      <span class="text-[14px] font-bold leading-[24px] tracking-[-0.02em] text-[#A3AED0]"
        >Total Spent</span
      >
      <span class="text-[34px] font-bold leading-[42px] tracking-[-0.02em] text-[#2B3674]">
        {{ `$${totalSpent}` }}
      </span>
    </div>
    <div>
      <Icon name="icon-graph" />
    </div>
  </div>

  <div
    class="relative grid grid-cols-[repeat(auto-fit,minmax(12px,1fr))] items-end h-[230px] w-full mt-auto pt-[30px] pr-[20px] gap-[16px]"
  >
    <div
      v-if="selectedBar !== null"
      class="absolute left-0 right-0 h-0 border-t-2 border-dashed border-[#4318ff] z-[1] flex justify-end items-center"
      :style="{ top: selectedBarTop + 'px' }"
    >
      <span class="relative bg-white px-[4px] py-[2px] text-xs text-[#4318ff] font-bold">
        ${{ chartData[selectedBar]?.amount ?? 7 }}
      </span>
    </div>

    <div
      v-for="(item, index) in chartData"
      :key="index"
      class="flex flex-col-reverse items-center h-full cursor-pointer relative z-[2]"
      @click="selectBar(index)"
      ref="barRefs"
    >
      <div class="mt-[6px] text-[0.7rem] text-[#999]">
        {{ item.month.slice(0, 3) }}
      </div>
      <div
        class="bar-wrapper relative w-full h-full md:max-w-[35px] max-w-[12px] overflow-hidden rounded-[4px]"
        :class="selectedBar === index ? 'bg-[#4318ff]' : 'bg-[rgba(200,200,200,0.3)]'"
        :style="{ height: getBarHeight(item.amount) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from "vue";
import Icon from "../Icon.vue";

const props = defineProps<{
  chartData: { month: string; amount: number }[];
}>();

const totalSpent = computed(() => {
  return props.chartData.reduce((sum, item) => sum + item.amount, 0);
});

const maxAmount = computed(() => {
  return Math.max(...props.chartData.map((item) => item.amount), 1);
});

const getBarHeight = (amount: number) => {
  return (amount / maxAmount.value) * 100;
};

const selectedBar = ref<number | null>(null);
const barRefs = ref<HTMLElement[]>([]);
const selectedBarTop = ref(0);

const selectBar = async (index: number) => {
  selectedBar.value = index;
  await nextTick();
  const barElement = barRefs.value[index]?.querySelector(".bar-wrapper") as HTMLElement;
  if (barElement) {
    const { top } = barElement.getBoundingClientRect();
    const containerTop = barElement.parentElement?.parentElement?.getBoundingClientRect().top || 0;
    selectedBarTop.value = top - containerTop;
  }
};

onMounted(() => {
  barRefs.value = [];
});
</script>
