import statsData from "../mocks/statistics.json";
import userData from "../mocks/user.json";
import transactionsData from "../mocks/transactions.json";
import scheduleData from "../mocks/schedule.json";
import annualSpending from "../mocks/annualSpending.json";

import type { Stats } from "../types/stats";
import type { User } from "../types/user";
import type { Transaction } from "../types/transaction";
import type { ScheduleItem } from "../types/scheduleItem";
import type { Spending } from "../types/spending";
import profilePicture from "../assets/images/avatar.png";

export const api = {
  async getStats(): Promise<Stats> {
    return statsData;
  },

  async getUser(): Promise<User> {
    return {
      ...userData,
      profilePicture,
    };
  },

  async getTransactions(): Promise<Transaction[]> {
    return transactionsData;
  },

  async getSchedule(): Promise<ScheduleItem[]> {
    return scheduleData;
  },

  async getAnnualSpending(): Promise<Spending[]> {
    return annualSpending;
  },
};
