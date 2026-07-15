import { Share } from "react-native";

interface ShareContentOptions {
  message: string;
  title?: string;
}

export async function shareContent({
  message,
  title,
}: ShareContentOptions) {
  await Share.share({
    message,
    title,
  });
}

export function buildShareMessage(
  lines: Array<string | number | null | undefined>,
) {
  return lines
    .filter((line): line is string | number => line !== null && line !== undefined)
    .map((line) => String(line).trim())
    .filter(Boolean)
    .join("\n");
}
