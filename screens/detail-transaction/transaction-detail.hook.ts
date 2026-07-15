import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTransactionStore } from "@/store/transaction-store";
import type {
  TransactionDetailRouteParams,
  TransactionDetailState,
} from "@/types/transactions.type";

const useTransactionDetail = () => {
  const params = useLocalSearchParams();
  const id = params.id as TransactionDetailRouteParams["id"];
  const {
    clearErrors,
    clearTransactionDetail,
    error,
    fetchTransactionDetail,
    isLoading,
    transaction,
  } = useTransactionStore(
    useShallow((state) => ({
      clearErrors: state.clearErrors,
      clearTransactionDetail: state.clearTransactionDetail,
      error: state.transactionDetailError,
      fetchTransactionDetail: state.fetchTransactionDetail,
      isLoading: state.isTransactionDetailLoading,
      transaction: state.transactionDetail,
    })),
  );

  const transactionDate = transaction
    ? formatTransactionDateTime(transaction.transferDate)
    : undefined;

  const safeId = useMemo<TransactionDetailState["safeId"]>(
    () => (Array.isArray(id) ? id[0] : id) ?? "-",
    [id],
  );

  function formatTransactionDateTime(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return undefined;
    }

    return {
      date: new Intl.DateTimeFormat("en-MY", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date),
      time: new Intl.DateTimeFormat("en-MY", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date),
    };
  }

  const fetchTransaction = useCallback(async () => {
    clearErrors();

    if (safeId === "-") {
      await fetchTransactionDetail(" ");
      return;
    }

    await fetchTransactionDetail(safeId);
  }, [clearErrors, fetchTransactionDetail, safeId]);

  useEffect(() => {
    void fetchTransaction();
  }, [fetchTransaction]);

  useEffect(() => {
    return () => {
      clearTransactionDetail();
    };
  }, [clearTransactionDetail]);

  return {
    error,
    hasTransaction: Boolean(transaction),
    isLoading,
    retry: fetchTransaction,
    safeId,
    transaction,
    transactionDate,
  };
};

export { useTransactionDetail };
