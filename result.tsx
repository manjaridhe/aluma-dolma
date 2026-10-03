import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ResultScreen() {
  const params = useLocalSearchParams();

  if (!params.data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No data received yet</Text>
      </View>
    );
  }

  const data = JSON.parse(params.data as string);

  return (
    <View style={{ padding: 20 }}>
      <Text>🍎 {data.food}</Text>
      <Text>Calories: {data.calories}</Text>
      <Text>Sugar: {data.sugar}</Text>
    </View>
  );
}