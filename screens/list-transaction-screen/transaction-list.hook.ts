import { useMemo, useState } from "react";

import { mockTransactionsResponse } from "@/mock/transaction-mock";
import { useAppTheme } from "@/theme/use-app-theme";
import type {
  Transaction,
  TransactionListState,
} from "@/types/transactions.type";

import { createListTransactionStyles } from "./transaction-list.style";

const useTransactionList = () => {
  const [query, setQuery] = useState("");
  const { colors, typography } = useAppTheme();
  const styles = createListTransactionStyles(colors, typography);

  const data = useMemo<Transaction[]>(() => mockTransactionsResponse.data, []);

  const filtered = useMemo<Transaction[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => {
      const searchableText = [item.refId, item.recipientName, item.transferName]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [data, query]);

  const state = useMemo<TransactionListState>(
    () => ({
      filters: {
        query: query || undefined,
      },
      items: filtered,
      hasResults: filtered.length > 0,
    }),
    [filtered, query],
  );

  return {
    filtered: state.items,
    query,
    setQuery,
    styles,
    hasResults: state.hasResults,
  };
};

export { useTransactionList };
