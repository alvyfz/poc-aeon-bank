import { useTranslation } from "@/i18n";
import { useAppTheme } from "@/theme/useAppTheme";
import { useMemo, useState } from "react";
import { createListTransactionStyles } from "./transaction-list.style";

type ListItem = {
  id: string;
  title: string;
  subtitle: string;
};

const useTransactionList = () => {
  const [query, setQuery] = useState("");
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const styles = createListTransactionStyles(colors, typography);

  const data = useMemo<ListItem[]>(
    () => [
      { id: "1", title: "Item 1", subtitle: t.common.amount },
      { id: "2", title: "Item 2", subtitle: t.common.amount },
      { id: "3", title: "Item 3", subtitle: t.common.amount },
    ],
    [t.common.amount],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => item.title.toLowerCase().includes(q));
  }, [data, query]);

  return { filtered, data, styles, query, setQuery };
};

export { useTransactionList };
