import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useNavigation, StackActions } from "@react-navigation/native";

const SignUpScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const handleSubmit = () => {
        setEmail({
            email: "",
        });
        setPassword({
            password: "",
        });
        setSecretKey({
            secretKey: "",
        });
        fetch("http://10.0.2.2:3001/api/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                secretKey: secretKey,
            }),
        })
            // .then((res) => res.json())
            .then((data) => {
                try {
                    // console.log(data);
                    navigation.replace("Home");
                } catch (e) {
                    console.log("login error", e);
                    Alert(e);
                }
            });
    };

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Text
                style={tw`text-black text-4xl mt-10 p-5 text-center mb-15 font-bold`}
            >
                Sign Up
            </Text>
            <Text style={tw`text-center text-xl`}>
                Already have an account?{" "}
                <Text
                    style={tw`text-blue-500`}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    Sign In
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
                    value={email}
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
                    value={password}
                ></TextInput>
            </View>
            <View style={tw`mx-10 mt-5`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Secret</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2`}
                    placeholder="Enter your secret key"
                    secureTextEntry={true}
                    onChangeText={(val) => {
                        setSecretKey({
                            secretKey: val,
                        });
                    }}
                    value={secretKey}
                ></TextInput>
            </View>
            <View style={tw`mt-10 mx-10`}>
                <Button
                    style={tw`bg-blue-500 text-xl h-10`}
                    title="Sign Up"
                    onPress={() => handleSubmit()}
                >
                    Sign Up
                </Button>
            </View>
            <Text style={tw`text-center text-slate-500 mx-10 mt-5`}>
                By clicking the "Sign Up" button, you are creating an account,
                and you agree to the Terms of use.
            </Text>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
