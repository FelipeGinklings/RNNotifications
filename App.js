import { Button, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowAlert: true,
		};
	},
});

const App = () => {
  useEffect(() => {
    Notifications.getExpoPushTokenAsync().then((pushTokenData) => {
      console.log('Expo push token: ', pushTokenData.data);
    })
  }, [])

	useEffect(() => {
		const subscription1 = Notifications.addNotificationReceivedListener(
			(notification) => {
				const userName = notification.request.content.data.userName;
				// console.log(
				// 	'Notification received!\n',
				// 	notification,
				// 	'\nUserName: ',
				// 	userName
				// );
			}
		);

		const subscription2 =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(
						'Response: ',
						response,
						'\nUserName: ',
						response.notification.request.content.data.userName
					);
				}
			);

		// Cleaner function
		return () => {
			subscription1.remove();
			subscription2.remove();
		};
	}, []);

	const scheduleNotificationHandler = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Test Title',
				body: 'This is the body of the notification',
				data: { userName: 'Max' },
			},
			trigger: {
				seconds: 5,
			},
		});
	};

	return (
		<View style={styles.container}>
			<Button
				title="Schedule local notification"
				onPress={scheduleNotificationHandler}
			/>
			<StatusBar style="auto" />
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
