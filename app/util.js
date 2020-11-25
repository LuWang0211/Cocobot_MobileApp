import PushNotification from 'react-native-push-notification';

export const clearAllNotifications = () => {
  PushNotification.cancelLocalNotifications({id: '1'});
  PushNotification.cancelLocalNotifications({id: '2'});
  PushNotification.cancelLocalNotifications({id: '3'});
  PushNotification.removeAllDeliveredNotifications();
}
