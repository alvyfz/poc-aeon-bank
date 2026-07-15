import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { AmountText } from "@/components/amount-text";
import { useTranslation } from "@/i18n";
import type { Transaction } from "@/types/transactions.type";

import type { createListTransactionStyles } from "./transaction-list.style";

interface TransactionListItemProps {
  item: Transaction;
  styles: ReturnType<typeof createListTransactionStyles>;
}

function TransactionListItem({ item, styles }: TransactionListItemProps) {
  const { language, t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: { id: item.refId },
        })
      }
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconWrapper}>
        <MaterialIcons
          color={
            item.amount < 0
              ? styles.outgoingIcon.color
              : styles.incomingIcon.color
          }
          name={item.amount < 0 ? "arrow-upward" : "arrow-downward"}
          size={18}
        />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.title}>{item.transferName}</Text>
        <Text style={styles.subtitle}>
          {item.recipientName} {" - "}
          {formatTransactionItemDate(
            item.transferDate,
            language,
            t.common.unknownDate,
          )}
        </Text>
      </View>
      <AmountText amount={item.amount} />
    </Pressable>
  );
}

function formatTransactionItemDate(
  value: string,
  language: "en" | "ms",
  unknownDateLabel: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return unknownDateLabel;
  }

  return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-MY", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export { TransactionListItem };
