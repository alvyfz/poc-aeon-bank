import React from "react";
import { Text, View } from "react-native";

import type { Transaction } from "@/types/transactions.type";

import type { createTransactionDetailStyles } from "./transaction-detail.style";

interface TransactionDetailRowProps {
  label: string;
  value:
    | Transaction["transferName"]
    | Transaction["recipientName"]
    | Transaction["transferDate"];
  styles: ReturnType<typeof createTransactionDetailStyles>;
}

function TransactionDetailRow({
  label,
  value,
  styles,
}: TransactionDetailRowProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.description}>{value}</Text>
    </View>
  );
}

export { TransactionDetailRow };
