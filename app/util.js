import PushNotification from 'react-native-push-notification';

export const clearAllNotifications = () => {
  PushNotification.cancelLocalNotifications({id: '1'});
  PushNotification.cancelLocalNotifications({id: '2'});
  PushNotification.cancelLocalNotifications({id: '3'});
  PushNotification.removeAllDeliveredNotifications();
}

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}
