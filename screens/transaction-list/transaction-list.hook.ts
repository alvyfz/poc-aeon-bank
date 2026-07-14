import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import {
  groupTransactionsByDate,
  useTransactionStore,
} from "@/store/transaction-store";
import { useAppTheme } from "@/theme/use-app-theme";
import type {
  Transaction,
  TransactionListState,
  TransactionSection,
  TransactionTypeFilter,
} from "@/types/transactions.type";

import { createListTransactionStyles } from "./transaction-list.style";

const useTransactionList = () => {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<TransactionTypeFilter>("all");
  const { colors, typography } = useAppTheme();
  const styles = createListTransactionStyles(colors, typography);
  const {
    clearErrors,
    error,
    fetchTransactions,
    isLoading,
    transactionSections,
    transactions,
  } = useTransactionStore(
    useShallow((state) => ({
      clearErrors: state.clearErrors,
      error: state.transactionListError,
      fetchTransactions: state.fetchTransactions,
      isLoading: state.isTransactionListLoading,
      transactionSections: state.transactionSections,
      transactions: state.transactions,
    })),
  );

  const groupedTransactions = useMemo<TransactionSection[]>(() => {
    if (transactionSections.length > 0) {
      return transactionSections;
    }

    return groupTransactionsByDate(transactions);
  }, [transactionSections, transactions]);

  const filtered = useMemo<Transaction[]>(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((item) => {
      const matchesType =
        selectedFilter === "all"
          ? true
          : selectedFilter === "incoming"
            ? item.amount >= 0
            : item.amount < 0;

      const searchableText = [item.refId, item.recipientName, item.transferName]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !q || searchableText.includes(q);

      return matchesType && matchesQuery;
    });
  }, [query, selectedFilter, transactions]);

  const filteredSections = useMemo<TransactionSection[]>(() => {
    if (!query.trim() && selectedFilter === "all") {
      return groupedTransactions;
    }

    return groupTransactionsByDate(filtered);
  }, [filtered, groupedTransactions, query, selectedFilter]);

  const state = useMemo<TransactionListState>(
    () => ({
      filters: {
        query: query || undefined,
        types: selectedFilter === "all" ? undefined : [selectedFilter],
      },
      items: filtered,
      sections: filteredSections,
      hasResults: filtered.length > 0,
      isLoading,
      error: error ?? undefined,
    }),
    [error, filtered, filteredSections, isLoading, query, selectedFilter],
  );

  const retry = useCallback(async () => {
    clearErrors();
    await fetchTransactions();
  }, [clearErrors, fetchTransactions]);

  useEffect(() => {
    if (transactions.length === 0) {
      void fetchTransactions();
    }
  }, [fetchTransactions, transactions.length]);

  return {
    error: state.error,
    filtered: state.items,
    grouped: state.sections,
    isLoading: state.isLoading,
    selectedFilter,
    query,
    retry,
    setSelectedFilter,
    setQuery,
    styles,
    hasResults: state.hasResults,
  };
};

export { useTransactionList };
