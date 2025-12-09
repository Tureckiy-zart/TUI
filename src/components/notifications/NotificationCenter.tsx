/**
 * NotificationCenter Compound Component
 *
 * Compound component structure for Notification Center.
 * Provides all subcomponents through a single export.
 */

export { NotificationCenterDismissAll } from "./NotificationCenter.DismissAll";
export { NotificationCenterGroupHeader } from "./NotificationCenter.GroupHeader";
export { NotificationCenterItem } from "./NotificationCenter.Item";
export { NotificationCenterList } from "./NotificationCenter.List";
export { NotificationCenterPanel } from "./NotificationCenter.Panel";
export {
  NotificationCenterProvider,
  useNotificationCenterContext,
} from "./NotificationCenter.Provider";
export { NotificationCenterTrigger } from "./NotificationCenter.Trigger";
export { useNotificationCenter } from "./useNotificationCenter";

import { NotificationCenterDismissAll } from "./NotificationCenter.DismissAll";
import { NotificationCenterGroupHeader } from "./NotificationCenter.GroupHeader";
import { NotificationCenterItem } from "./NotificationCenter.Item";
import { NotificationCenterList } from "./NotificationCenter.List";
import { NotificationCenterPanel } from "./NotificationCenter.Panel";
import { NotificationCenterProvider } from "./NotificationCenter.Provider";
import { NotificationCenterTrigger } from "./NotificationCenter.Trigger";

/**
 * NotificationCenter compound component
 */
export const NotificationCenter = {
  Provider: NotificationCenterProvider,
  Panel: NotificationCenterPanel,
  Trigger: NotificationCenterTrigger,
  List: NotificationCenterList,
  Item: NotificationCenterItem,
  GroupHeader: NotificationCenterGroupHeader,
  DismissAll: NotificationCenterDismissAll,
};
