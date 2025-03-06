import React, { useState } from 'react';
import {
  View,
  Text,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const backgroundStyle = {
  backgroundColor: Colors.lighter,
  height: '100%',
};

export const uri = 'https://mic-test.onrender.com';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const hideSpinner = () => {
    setIsLoading(false);
  }
  return (
    <View style={backgroundStyle as ViewStyle}>  
      <Text>Uri: {uri}</Text>
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
