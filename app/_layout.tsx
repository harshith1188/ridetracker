import { Stack } from 'expo-router';


export default function RootLayout() {

  return (
      <Stack initialRouteName='splashScreen'>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splashScreen" options={{headerShown: false }} />
        <Stack.Screen name="entryScreen" options={{headerShown: false }} />
        <Stack.Screen name="addRideScreen" options={{headerShown: false }} />
        <Stack.Screen name="addFuel" options={{headerShown: false }} />
        <Stack.Screen name="editScreen" options={{headerShown: false }} />
        <Stack.Screen name="statsScreen" options={{headerShown: false }} />
      </Stack>
  );
}
