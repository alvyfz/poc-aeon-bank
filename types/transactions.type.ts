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

export interface TransactionListFilters {
  query?: string;
  types?: TransactionType[];
}

export interface TransactionListState {
  filters: TransactionListFilters;
  items: Transaction[];
  hasResults: boolean;
}

export interface TransactionDetailRouteParams {
  id?: TransactionRefId | TransactionRefId[];
}

export interface TransactionDetailState {
  safeId: TransactionRefId | "-";
  transaction?: Transaction;
  hasTransaction: boolean;
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
