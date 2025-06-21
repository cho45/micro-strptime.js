/**
 * Type definitions for micro-strptime.js
 * Project: https://github.com/cho45/micro-strptime.js
 */

/**
 * Parse a date string using a strptime-like format string.
 * @param str - The date string to parse.
 * @param format - The format string (strptime style).
 * @returns Date object (UTC)
 * @throws Error if parsing fails or format is missing/invalid
 */
export function strptime(str: string, format: string): Date;

export namespace strptime {
  /**
   * Format descriptor table. You can override or extend this at runtime.
   */
  let fd: Record<string, [string, (this: Date, matched: string) => void]>;
  /**
   * Month name to number mapping (Jan:0 ... Dec:11)
   */
  let B: Record<string, number>;
}
