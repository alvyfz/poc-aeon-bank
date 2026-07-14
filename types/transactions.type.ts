import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TransactionType = "incoming" | "outgoing";

export interface Transaction {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
}

export type TransactionRefId = Transaction["refId"];

export interface TransactionResponse {
  data: Transaction[];
}

export interface TransactionSection {
  key: string;
  title: string;
  data: Transaction[];
}

export type TransactionServiceError =
  | "LOAD_TRANSACTIONS_FAILED"
  | "FETCH_TRANSACTION_LIST_FAILED"
  | "FETCH_TRANSACTION_DETAIL_FAILED"
  | "TRANSACTION_NOT_FOUND"
  | "INVALID_TRANSACTION_REF_ID";

export interface TransactionListFilters {
  query?: string;
  types?: TransactionType[];
}

export interface TransactionListState {
  filters: TransactionListFilters;
  items: Transaction[];
  sections: TransactionSection[];
  hasResults: boolean;
  isLoading: boolean;
  error?: TransactionServiceError;
}

export interface TransactionDetailRouteParams {
  id?: TransactionRefId | TransactionRefId[];
}

export interface TransactionDetailState {
  safeId: TransactionRefId | "-";
  transaction?: Transaction;
  hasTransaction: boolean;
  isLoading: boolean;
  error?: TransactionServiceError;
}

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: {
    refId: TransactionRefId;
  };
};

export type TransactionListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "TransactionList"
>;

export type TransactionDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "TransactionDetail"
>;
