import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { SearchInput } from "@/components/search-input";

import { useTransactionList } from "./transaction-list.hook";

export default function ListScreen() {
  const { filtered, styles, query, setQuery } = useTransactionList();

  return (
    <View style={styles.container}>
      <SearchInput
        testID="search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: { id: item.id },
              })
            }
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.rowText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
