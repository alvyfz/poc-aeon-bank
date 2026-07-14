import React from "react";
import { Text } from "react-native";

import { useTranslation } from "@/i18n";

import type { createListTransactionStyles } from "./transaction-list.style";

interface TransactionSectionHeaderProps {
  title: string;
  styles: ReturnType<typeof createListTransactionStyles>;
}

function TransactionSectionHeader({
  title,
  styles,
}: TransactionSectionHeaderProps) {
  const { language, t } = useTranslation();

  return (
    <Text style={styles.sectionTitle}>
      {formatTransactionSectionTitle(title, language, t.common.unknownDate)}
    </Text>
  );
}

function formatTransactionSectionTitle(
  value: string,
  language: "en" | "ms",
  unknownDateLabel: string,
) {
  if (value === "UNKNOWN_DATE") {
    return unknownDateLabel.toUpperCase();
  }

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  if (Number.isNaN(date.getTime())) {
    return unknownDateLabel.toUpperCase();
  }

  return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-MY", {
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

export { TransactionSectionHeader };
