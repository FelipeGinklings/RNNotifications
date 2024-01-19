import { Button, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';

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
