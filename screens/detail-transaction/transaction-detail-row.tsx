import React from "react";
import { Text, View } from "react-native";

import type { Transaction } from "@/types/transactions.type";

import type { createTransactionDetailStyles } from "./transaction-detail.style";

interface TransactionDetailRowProps {
  label: string;
  value:
    | Transaction["transferName"]
    | Transaction["recipientName"]
    | Transaction["transferDate"]
    | Transaction["refId"];
  secondaryValue?: string;
  endContent?: React.ReactNode;
  styles: ReturnType<typeof createTransactionDetailStyles>;
}

function TransactionDetailRow({
  label,
  value,
  secondaryValue,
  endContent,
  styles,
}: TransactionDetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailValueGroup}>
        <View style={styles.detailValueRow}>
          <Text style={styles.detailValue}>{value}</Text>
          {endContent ? (
            <View style={styles.detailEndContent}>{endContent}</View>
          ) : null}
        </View>
        {secondaryValue ? (
          <Text style={styles.detailSecondaryValue}>{secondaryValue}</Text>
        ) : null}
      </View>
    </View>
  );
}

export { TransactionDetailRow };
