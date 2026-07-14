import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  SectionList,
  Text,
  View,
} from "react-native";

import { AmountText } from "@/components/ammount-text";
import { AppButton } from "@/components/app-button";
import { EmptyState } from "@/components/empty-state";
import { SearchInput } from "@/components/search-input";
import { useTranslation } from "@/i18n";
import type { Transaction } from "@/types/transactions.type";

import { useTransactionList } from "./transaction-list.hook";

function ListScreen() {
  const { t } = useTranslation();
  const {
    error,
    grouped,
    hasResults,
    isLoading,
    query,
    retry,
    setQuery,
    styles,
  } = useTransactionList();

  return (
    <View style={styles.container}>
      <SearchInput
        testID="search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      {isLoading ? (
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.centeredState}>
          <EmptyState title={t.common.somethingWentWrong} />
          <AppButton
            fullWidth
            label={t.common.tryAgain}
            onPress={() => void retry()}
            style={styles.emptyState}
          />
        </View>
      ) : !hasResults ? (
        <EmptyState
          description={query}
          style={styles.emptyState}
          title={t.common.noTransactionsFound}
        />
      ) : (
        <SectionList<Transaction>
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.refId}
          onRefresh={retry}
          refreshing={isLoading}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          sections={grouped}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: { id: item.refId },
                })
              }
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
              ]}
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
                  {formatTransactionItemDate(item.transferDate)}
                </Text>
              </View>
              <AmountText amount={item.amount} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

function formatTransactionItemDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-MY", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export { ListScreen };
