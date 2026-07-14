import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import { mockTransactionsResponse } from "@/mock/transaction-mock";
import type {
  Transaction,
  TransactionDetailRouteParams,
  TransactionDetailState,
} from "@/types/transactions.type";

const useTransactionDetail = () => {
  const params = useLocalSearchParams();
  const id = params.id as TransactionDetailRouteParams["id"];

  const safeId = useMemo<TransactionDetailState["safeId"]>(
    () => (Array.isArray(id) ? id[0] : id) ?? "-",
    [id],
  );

  const transaction = useMemo<Transaction | undefined>(
    () => mockTransactionsResponse.data.find((item) => item.refId === safeId),
    [safeId],
  );

  return {
    hasTransaction: Boolean(transaction),
    safeId,
    transaction,
  };
};

export { useTransactionDetail };
