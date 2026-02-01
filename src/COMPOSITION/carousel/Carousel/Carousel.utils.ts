/**
 * Carousel internal helpers
 */

/**
 * Next index (1-based total); respects loop
 */
export function getNextIndex(current: number, total: number, loop: boolean): number {
  if (total <= 0) return 0;
  if (current >= total - 1) return loop ? 0 : total - 1;
  return current + 1;
}

/**
 * Previous index; respects loop
 */
export function getPrevIndex(current: number, total: number, loop: boolean): number {
  if (total <= 0) return 0;
  if (current <= 0) return loop ? total - 1 : 0;
  return current - 1;
}
