import PushNotification from 'react-native-push-notification';

export const sendLocalNotification = ({title, message}) => {
  PushNotification.localNotification({
    channelId: '123',
    title,
    message,
    actions: ['Dismiss', 'Yes'],
  });
};

export const sendScheduledNotification = ({title, message, date}) => {
  PushNotification.localNotificationSchedule({
    channelId: '123',
    title,
    message,
    date,
  });
};

export const cancelAllLocalNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const subscribeTo = topic => {
  PushNotification.subscribeToTopic(topic);
};

export const unsubscribeFrom = topic => {
  PushNotification.unsubscribeFromTopic(topic);
};
