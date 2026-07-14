import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const useTransactionDetail = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const safeId = useMemo(() => (Array.isArray(id) ? id[0] : id) ?? "-", [id]);

  return { safeId };
};

export { useTransactionDetail };
