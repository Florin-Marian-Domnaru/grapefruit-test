import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "../services/api";

import type { Stats } from "../types/stats";
import type { User } from "../types/user";
import type { Transaction } from "../types/transaction";
import type { ScheduleItem } from "../types/scheduleItem";
import type { Spending } from "../types/spending";

export const useAppStore = defineStore("app", () => {
  // State
  const stats = ref<Stats | null>(null);
  const user = ref<User | null>(null);
  const transactions = ref<Transaction[]>([]);
  const schedule = ref<ScheduleItem[]>([]);
  const spending = ref<Spending[]>([]);

  const loading = ref(false);

  const fetchStats = async () => {
    loading.value = true;
    try {
      stats.value = await api.getStats();
    } finally {
      loading.value = false;
    }
  };

  const fetchUser = async () => {
    loading.value = true;
    try {
      const response = await api.getUser();
      user.value = response;
    } finally {
      loading.value = false;
    }
  };

  const fetchTransactions = async () => {
    loading.value = true;
    try {
      transactions.value = await api.getTransactions();
    } finally {
      loading.value = false;
    }
  };

  const fetchSchedule = async () => {
    loading.value = true;
    try {
      schedule.value = await api.getSchedule();
    } finally {
      loading.value = false;
    }
  };

  const fetchSpending = async () => {
    loading.value = true;
    try {
      spending.value = await api.getAnnualSpending();
    } finally {
      loading.value = false;
    }
  };

  // Getters

  const getStats = computed(() => stats.value);
  const getUser = computed(() => user.value);
  const getTransactions = computed(() => transactions.value);
  const getSchedule = computed(() => schedule.value);
  const getSpending = computed(() => spending.value);

  const normalizeSpendingData = (data: Spending[]) => {
    return data.map((item) => ({
      label: item.month.slice(0, 3),
      y: item.amount,
      amount: item.amount,
    }));
  };

  const mappedAnnualSpending = computed(() => normalizeSpendingData(spending.value));

  const last7Months = computed(() => normalizeSpendingData(spending.value.slice(-7)));

  return {
    stats,
    user,
    transactions,
    schedule,
    spending,
    loading,

    fetchStats,
    fetchUser,
    fetchTransactions,
    fetchSchedule,
    fetchSpending,

    getStats,
    getUser,
    getTransactions,
    getSchedule,
    getSpending,

    mappedAnnualSpending,
    last7Months,
  };
});
