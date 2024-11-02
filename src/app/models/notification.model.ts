export type NotificationType = 'info' | 'success' | 'warning' | 'danger';

export interface Notification<T extends NotificationType = NotificationType> {
  readonly type: T;
  readonly message: string;
}
