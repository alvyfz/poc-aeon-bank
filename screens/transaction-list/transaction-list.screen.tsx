import React from "react";
import { ActivityIndicator, SectionList, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { EmptyState } from "@/components/empty-state";
import { FilterGroup } from "@/components/filter-group";
import { SearchInput } from "@/components/search-input";
import { useTranslation } from "@/i18n";
import type {
  Transaction,
  TransactionTypeFilter,
} from "@/types/transactions.type";

import { useAppTheme } from "@/hooks/use-app-theme";
import { TransactionListItem } from "./transaction-list-item";
import { useTransactionList } from "./transaction-list.hook";
import { createListTransactionStyles } from "./transaction-list.style";
import { TransactionSectionHeader } from "./transaction-section-header";

function ListScreen() {
  const { t } = useTranslation();
  const typeOptions: { label: string; value: TransactionTypeFilter }[] = [
    { label: t.list.all, value: "all" },
    { label: t.transactionType.incoming, value: "incoming" },
    { label: t.transactionType.outgoing, value: "outgoing" },
  ];
  const {
    error,
    grouped,
    hasResults,
    isLoading,
    query,
    retry,
    selectedFilter,
    setSelectedFilter,
    setQuery,
  } = useTransactionList();

  const { colors, typography } = useAppTheme();
  const styles = createListTransactionStyles(colors, typography);

  return (
    <View style={styles.container}>
      <SearchInput
        testID="search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      <FilterGroup
        contentContainerStyle={styles.filterContent}
        onChange={setSelectedFilter}
        options={typeOptions}
        style={styles.filterScroller}
        value={selectedFilter}
      />

      {isLoading ? (
        <View style={styles.centeredState}>
          <ActivityIndicator />
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
            <TransactionSectionHeader styles={styles} title={section.title} />
          )}
          sections={grouped}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <TransactionListItem item={item} styles={styles} />
          )}
        />
      )}
    </View>
  );
}

export { ListScreen };

