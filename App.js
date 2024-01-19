import { Alert, Button, StyleSheet, View, Platform } from 'react-native';
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
		const configurePushNotifications = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;
			if (status !== 'granted') {
				const { status } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				Alert.alert('Failed to get push token for push notification!');
				return;
			}

			const pushTokenData = await Notifications.getExpoPushTokenAsync();
			console.log(pushTokenData);

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.DEFAULT,
				});
			}
		};

		configurePushNotifications();
	}, []);

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
