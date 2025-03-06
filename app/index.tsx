import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ViewStyle,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';
import { PermissionStatus } from 'expo-modules-core';

const backgroundStyle = {
  backgroundColor: Colors.lighter,
  height: '100%',
};

export const uri = 'https://mic-test.onrender.com';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    (async () => {
      const response = await requestPermission();
      if (response.status !== PermissionStatus.GRANTED) {
        Alert.alert('Permission to access microphone was denied');
      }
    })();
  }, []);

  const hideSpinner = () => {
    setIsLoading(false);
  };

  if (permissionResponse?.status !== PermissionStatus.GRANTED) {
    return (
      <View style={backgroundStyle as ViewStyle}>
        <Text>Permission to access microphone was denied</Text>
      </View>
    );
  }

  return (
    <View style={backgroundStyle as ViewStyle}>  
      <Text>Uri: {uri}</Text>
      <Text>Permission: {permissionResponse?.status}</Text>
      <Text>branch: expo-av</Text>
      <WebView source={{ uri }} onLoadEnd={hideSpinner} />
      {isLoading && (
        <ActivityIndicator
          style={{ position: "absolute", top: 100, left: 100 }}
          size="large"
        />
      )}
    </View>
  );
}

export default App;
