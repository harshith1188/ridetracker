import { Stack } from 'expo-router';


export default function RootLayout() {

  return (
      <Stack initialRouteName='index' screenOptions={{headerShown:false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{headerShown: false }} />
        <Stack.Screen name="entryScreen" options={{headerShown: false }} />
        <Stack.Screen name="addRideScreen" options={{headerShown: false }} />
        <Stack.Screen name="addFuel" options={{headerShown: false }} />
        <Stack.Screen name="editScreen" options={{headerShown: false }} />
        <Stack.Screen name="statsScreen" options={{headerShown: false }} />
      </Stack>
  );
}
