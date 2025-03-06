import React, { useEffect, useState } from 'react';
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
import { AudioModule } from 'expo-audio';

const backgroundStyle = {
  backgroundColor: Colors.lighter,
  height: '100%',
};

export const uri = 'https://mic-test.onrender.com';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [granted, setGranted] = useState(false);
  const hideSpinner = () => {
    setIsLoading(false);
  }
  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        setGranted(false);
        Alert.alert('Permission to access microphone was denied');
      } else {
        setGranted(true);
      }
    })();
  }, []);

  if (!granted) {
    return (
      <View style={backgroundStyle as ViewStyle}>
        <Text>Permission to access microphone was denied</Text>
      </View>
    );
  }

  return (
    <View style={backgroundStyle as ViewStyle}>  
      <Text>Uri: {uri}</Text>
      <Text>branch: expo-audio</Text>
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