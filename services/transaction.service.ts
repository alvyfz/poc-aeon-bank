import { mockTransactionsResponse } from "@/mock/transaction-mock";
import type { Transaction, TransactionRefId } from "@/types/transactions.type";

const SIMULATED_API_DELAY_MS = 800;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getTransactionList(): Promise<Transaction[]> {
  await wait(SIMULATED_API_DELAY_MS);

  return mockTransactionsResponse.data;
}

export async function getTransactionDetail(
  refId: TransactionRefId,
): Promise<Transaction | undefined> {
  await wait(SIMULATED_API_DELAY_MS);

  return mockTransactionsResponse.data.find((item) => item.refId === refId);
}
