import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Touchable,
    Alert,
    TextInput,
    Button,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        fetch("http://10.0.2.2:3001/api/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                try {
                    await AsyncStorage.setItem("token", data.token);
                    navigation.replace("Contact");
                } catch (e) {
                    console.log("login error", e);
                    Alert(e);
                }
            });
    };

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Text
                style={tw`text-black text-4xl mt-10 p-5 text-center mb-20 font-bold`}
            >
                Sign In
            </Text>
            <Text style={tw`text-center text-xl`}>
                Don't have an account?{" "}
                <Text
                    style={tw`text-blue-500`}
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    Sign up
                </Text>
            </Text>
            <View style={tw`mx-10 mt-8`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Email</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2`}
                    placeholder="Enter your email"
                    onChangeText={(val) => {
                        setEmail({
                            email: val,
                        });
                    }}
                ></TextInput>
            </View>
            <View style={tw`mx-10 mt-5`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Password</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2`}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    onChangeText={(val) => {
                        setPassword({
                            password: val,
                        });
                    }}
                ></TextInput>
            </View>
            <Text style={tw`text-blue-500 text-right mt-5 mr-10 text-lg`}>
                Forgot your password?
            </Text>
            <View style={tw`mt-10 mx-10`}>
                <Button
                    style={tw`bg-blue-500 text-xl h-10`}
                    title="Sign In"
                    onPress={() => handleSubmit()}
                >
                    Sign In
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
