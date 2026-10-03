import { View, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  if (!permission) return <Text>Loading...</Text>;

  if (!permission.granted) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No camera permission</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({
      base64: true,
    });

    const res = await fetch('http://10.0.2.2:5000/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: `data:image/jpg;base64,${photo.base64}`,
      }),
    });

    const data = await res.json();

    router.push({
      pathname: '/result',
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} ref={cameraRef} />
      <Button title="Scan Fruit 🍎" onPress={takePicture} />
    </View>
  );
}