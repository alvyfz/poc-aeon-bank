import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getTransactionDetail,
  getTransactionList,
} from "@/services/transaction.service";
import type {
  Transaction,
  TransactionRefId,
  TransactionSection,
  TransactionServiceError,
} from "@/types/transactions.type";

interface TransactionState {
  transactions: Transaction[];
  transactionSections: TransactionSection[];
  transactionDetail: Transaction | undefined;
  isTransactionListLoading: boolean;
  isTransactionDetailLoading: boolean;
  transactionListError: TransactionServiceError | null;
  transactionDetailError: TransactionServiceError | null;
  fetchTransactions: () => Promise<void>;
  fetchTransactionDetail: (refId: TransactionRefId) => Promise<void>;
  clearTransactionDetail: () => void;
  clearErrors: () => void;
}

type TransactionStoreMetaState = Pick<
  TransactionState,
  | "isTransactionDetailLoading"
  | "isTransactionListLoading"
  | "transactionDetailError"
  | "transactionListError"
>;

type TransactionStoreStatePatch = Partial<TransactionState>;

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      transactionSections: [],
      transactionDetail: undefined,
      isTransactionListLoading: false,
      isTransactionDetailLoading: false,
      transactionListError: null,
      transactionDetailError: null,
      async fetchTransactions() {
        set((state) =>
          createStorePatch(state, {
            isTransactionListLoading: true,
            transactionListError: null,
          }),
        );

        try {
          const transactions = await getTransactionList();

          set((state) =>
            createStorePatch(state, {
              transactions: sortTransactionsByLatest(transactions),
              transactionSections: groupTransactionsByDate(transactions),
              isTransactionListLoading: false,
              transactionListError: null,
            }),
          );
        } catch {
          set((state) =>
            createStorePatch(state, {
              isTransactionListLoading: false,
              transactionListError: "LOAD_TRANSACTIONS_FAILED",
            }),
          );
        }
      },
      async fetchTransactionDetail(refId: TransactionRefId) {
        const normalizedRefId = refId.trim();

        if (!normalizedRefId) {
          set((state) =>
            createStorePatch(state, {
              transactionDetail: undefined,
              transactionDetailError: "INVALID_TRANSACTION_REF_ID",
              isTransactionDetailLoading: false,
            }),
          );
          return;
        }

        set((state) =>
          createStorePatch(state, {
            isTransactionDetailLoading: true,
            transactionDetailError: null,
          }),
        );

        try {
          const transaction = await getTransactionDetail(normalizedRefId);

          if (!transaction) {
            set((state) =>
              createStorePatch(state, {
                transactionDetail: undefined,
                transactionDetailError: "TRANSACTION_NOT_FOUND",
                isTransactionDetailLoading: false,
              }),
            );
            return;
          }

          set((state) =>
            createStorePatch(state, {
              transactionDetail: transaction,
              isTransactionDetailLoading: false,
              transactionDetailError: null,
            }),
          );
        } catch {
          set((state) =>
            createStorePatch(state, {
              transactionDetail: undefined,
              isTransactionDetailLoading: false,
              transactionDetailError: "FETCH_TRANSACTION_DETAIL_FAILED",
            }),
          );
        }
      },
      clearTransactionDetail() {
        set((state) =>
          createStorePatch(state, {
            transactionDetail: undefined,
            transactionDetailError: null,
            isTransactionDetailLoading: false,
          }),
        );
      },
      clearErrors() {
        set((state) =>
          createStorePatch(state, {
            transactionListError: null,
            transactionDetailError: null,
          }),
        );
      },
    }),
    {
      name: "aeon-bank-transactions",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    },
  ),
);

function sortTransactionsByLatest(transactions: Transaction[]) {
  return [...transactions].sort((left, right) => {
    return (
      getSafeTimestamp(right.transferDate) - getSafeTimestamp(left.transferDate)
    );
  });
}

export function groupTransactionsByDate(
  transactions: Transaction[],
): TransactionSection[] {
  const groupedTransactions = sortTransactionsByLatest(transactions).reduce<
    Record<string, Transaction[]>
  >((groups, transaction) => {
    const transactionDate = new Date(transaction.transferDate);
    const groupKey = Number.isNaN(transactionDate.getTime())
      ? "UNKNOWN_DATE"
      : `${transactionDate.getFullYear()}-${String(
          transactionDate.getMonth() + 1,
        ).padStart(2, "0")}`;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(transaction);

    return groups;
  }, {});

  return Object.entries(groupedTransactions)
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([key, items]) => ({
      key,
      title: key,
      data: items,
    }));
}

function getSafeTimestamp(value: string) {
  const timestamp = new Date(value).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

// Explicitly merge meta-state values to preserve Zustand's shallow comparison behavior:
// Always carry over existing values from the current state if they are not explicitly updated in the patch.
// This prevents unintended resets of loading/error states and ensures only the explicitly patched properties change
function createStorePatch(
  currentState: TransactionState,
  patch: TransactionStoreStatePatch,
): TransactionStoreStatePatch & TransactionStoreMetaState {
  const nextListError =
    patch.transactionListError !== undefined
      ? patch.transactionListError
      : currentState.transactionListError;
  const nextDetailError =
    patch.transactionDetailError !== undefined
      ? patch.transactionDetailError
      : currentState.transactionDetailError;
  const nextIsTransactionListLoading =
    patch.isTransactionListLoading !== undefined
      ? patch.isTransactionListLoading
      : currentState.isTransactionListLoading;
  const nextIsTransactionDetailLoading =
    patch.isTransactionDetailLoading !== undefined
      ? patch.isTransactionDetailLoading
      : currentState.isTransactionDetailLoading;

  return {
    ...patch,
    isTransactionDetailLoading: nextIsTransactionDetailLoading,
    isTransactionListLoading: nextIsTransactionListLoading,
    transactionDetailError: nextDetailError,
    transactionListError: nextListError,
  };
}
