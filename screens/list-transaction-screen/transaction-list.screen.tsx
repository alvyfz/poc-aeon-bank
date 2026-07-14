import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { AmountText } from "@/components/ammount-text";
import { EmptyState } from "@/components/empty-state";
import { SearchInput } from "@/components/search-input";
import { useTranslation } from "@/i18n";
import type { Transaction } from "@/types/transactions.type";

import { useTransactionList } from "./transaction-list.hook";

function ListScreen() {
  const { t } = useTranslation();
  const { filtered, styles, query, setQuery, hasResults } =
    useTransactionList();

  if (!hasResults) {
    return (
      <View style={styles.container}>
        <EmptyState
          description={query}
          style={styles.emptyState}
          title={t.common.noTransactionsFound}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput
        testID="search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      <FlatList<Transaction>
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.refId}
        renderItem={({ item }) => (
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
            <View style={styles.rowText}>
              <Text style={styles.title}>{item.transferName}</Text>
              <Text style={styles.subtitle}>{item.recipientName}</Text>
            </View>
            <AmountText amount={item.amount} />
          </Pressable>
        )}
      />
    </View>
  );
}
export { ListScreen };
