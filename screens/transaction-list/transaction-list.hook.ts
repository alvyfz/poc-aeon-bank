import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useDebounce } from "@/hooks/use-debounce";
import {
  groupTransactionsByDate,
  useTransactionStore,
} from "@/store/transaction-store";
import type {
  Transaction,
  TransactionListState,
  TransactionSection,
  TransactionTypeFilter,
} from "@/types/transactions.type";

const useTransactionList = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [selectedFilter, setSelectedFilter] =
    useState<TransactionTypeFilter>("all");

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
    const q = debouncedQuery.trim().toLowerCase();
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
  }, [debouncedQuery, selectedFilter, transactions]);

  const filteredSections = useMemo<TransactionSection[]>(() => {
    if (!debouncedQuery.trim() && selectedFilter === "all") {
      return groupedTransactions;
    }

    return groupTransactionsByDate(filtered);
  }, [debouncedQuery, filtered, groupedTransactions, selectedFilter]);

  const state = useMemo<TransactionListState>(
    () => ({
      filters: {
        query: debouncedQuery || undefined,
        types: selectedFilter === "all" ? undefined : [selectedFilter],
      },
      items: filtered,
      sections: filteredSections,
      hasResults: filtered.length > 0,
      isLoading,
      error: error ?? undefined,
    }),
    [
      debouncedQuery,
      error,
      filtered,
      filteredSections,
      isLoading,
      selectedFilter,
    ],
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
    hasResults: state.hasResults,
  };
};

export { useTransactionList };
