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
} from "@/types/transactions.type";

import { createListTransactionStyles } from "./transaction-list.style";

const useTransactionList = () => {
  const [query, setQuery] = useState("");
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

  const filtered = useMemo<Transaction[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((item) => {
      const searchableText = [item.refId, item.recipientName, item.transferName]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [query, transactions]);

  const filteredSections = useMemo<TransactionSection[]>(() => {
    if (!query.trim()) {
      return transactionSections;
    }

    return groupTransactionsByDate(filtered);
  }, [filtered, query, transactionSections]);

  const state = useMemo<TransactionListState>(
    () => ({
      filters: {
        query: query || undefined,
      },
      items: filtered,
      sections: filteredSections,
      hasResults: filtered.length > 0,
      isLoading,
      error: error ?? undefined,
    }),
    [error, filtered, filteredSections, isLoading, query],
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
    query,
    retry,
    setQuery,
    styles,
    hasResults: state.hasResults,
  };
};

export { useTransactionList };
