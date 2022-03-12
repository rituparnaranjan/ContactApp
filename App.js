import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./components/HomeScreen";
import ContactScreen from "./components/ContactScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./components/SignUpScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const Stack = createNativeStackNavigator();
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        AsyncStorage.clear();
        const token = AsyncStorage.getItem("token");
        // console.log(token);
        if (!token || token == null) {
            setLogged({
                logged: false,
            });
        } else {
            setLogged({
                logged: true,
            });
        }
    }, []);

    // function Main() {
    //     return (
    //         <Stack.Navigator>
    //             <Stack.Screen
    //                 name="Home"
    //                 component={HomeScreen}
    //                 options={{ headerShown: false }}
    //             />
    //             <Stack.Screen
    //                 name="SignUp"
    //                 component={SignUpScreen}
    //                 options={{ headerShown: false }}
    //             />
    //         </Stack.Navigator>
    //     );
    // }

    // function Secondary() {
    //     return (
    //         <Stack.Navigator>
    //             <Stack.Screen
    //                 name="Contact"
    //                 component={ContactScreen}
    //                 options={{ headerShown: false }}
    //             ></Stack.Screen>
    //         </Stack.Navigator>
    //     );
    // }

    return (
        <>
            <NavigationContainer>
                <SafeAreaProvider>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Contact"
                            component={ContactScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </SafeAreaProvider>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
