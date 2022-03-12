import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContactScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [contactData, setData] = useState(null);

    useEffect(() => {
        fetch("http://10.0.2.2:3001/api/saveContact", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData({
                    contactData: data,
                });
            })
            .catch((err) => {
                console.log("Error in fetching");
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        AsyncStorage.clear();
        navigation.replace("Home");
        console.log("Logout called");
    };

    const handleSubmit = () => {
        fetch("http://10.0.2.2:3001/api/saveContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                phone,
                email,
            }),
        })
            // .then((res) => res.json())
            .then((data) => {
                try {
                    // console.log(data);
                } catch (e) {
                    console.log("Error while saving", e);
                    Alert(e);
                }
            });
    };

    const ContactDetails = () => {
        const Contact = ({ contact }) => {
            console.log(contact);
            return (
                <View style={tw`flex flex-row`}>
                    <Text style={tw`text-lg text-red-200`}>{contact.name}</Text>
                    <Text style={tw`text-lg text-red-200`}>
                        {contact.number}
                    </Text>
                    <Text style={tw`text-lg text-red-200`}>
                        {contact.email}
                    </Text>
                </View>
            );
        };

        return (
            <FlatList
                data={contactData}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={({ item }) => {
                    return <Contact contact={item} />;
                }}
            />
        );
    };

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Text
                style={tw`text-black text-4xl mt-10 p-5 text-center mb-7 font-bold`}
            >
                Contact Form and Contact List Page
            </Text>
            <Text style={tw`text-center text-xl`}>Add Contacts</Text>
            <View style={tw`mx-5 mt-8 flex flex-row justify-around`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Name</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2 w-60`}
                    onChangeText={(val) => {
                        setName({
                            name: val,
                        });
                    }}
                ></TextInput>
            </View>
            <View style={tw`mx-5 mt-5 flex flex-row justify-around`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Phone</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2 w-60`}
                    onChangeText={(val) => {
                        setPhone({
                            phone: val,
                        });
                    }}
                ></TextInput>
            </View>
            <View style={tw`mx-5 mt-5 flex flex-row justify-around`}>
                <Text style={tw`text-xl text-slate-500 mb-2`}>Email</Text>
                <TextInput
                    style={tw`bg-violet-50 h-10 rounded border border-gray-500 p-2 w-60`}
                    onChangeText={(val) => {
                        setEmail({
                            email: val,
                        });
                    }}
                ></TextInput>
            </View>
            <View style={tw`mt-10 flex flex-row justify-around`}>
                <TouchableOpacity
                    style={tw`bg-red-500 h-10 w-30 items-center justify-center`}
                    onPress={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                >
                    <Text style={[{ color: "white" }, tw`text-xl`]}>
                        Logout
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-blue-500 h-10 w-30 items-center justify-center`}
                    onPress={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Text style={[{ color: "white" }, tw`text-xl`]}>Save</Text>
                </TouchableOpacity>
            </View>
            <ContactDetails />
        </SafeAreaView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({});
