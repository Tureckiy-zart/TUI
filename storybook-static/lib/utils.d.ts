import { ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export declare function formatDate(date: Date | string | number): string;
export declare function formatTime(date: Date | string | number): string;
export declare function formatDateTime(date: Date | string | number): string;
export declare function generateId(): string;
export declare function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void;
export declare function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void;
//# sourceMappingURL=utils.d.ts.map
