
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState }  from "react";
import { Alert, View, StyleSheet, Text, SafeAreaView, TouchableOpacity, TextInput } from "react-native";

import WelcomePage from "./WelcomePage";

import { signInAsync } from "../../api.service";



const Stack = createNativeStackNavigator();

// Function to provide sleep of required time to the application..

function sleep(ms: number | undefined) {
    return new Promise((resolve) => {
       setTimeout(resolve, ms);
    });
 }

 interface LoginMainProps {
    navigation: any; 
  }

const LoginMain: React.FC<LoginMainProps> = ({ navigation }) => {
    const [username, onChangeText] = useState("");
    const [password, onChangePassword] = useState("");
    const [status, setStatus] = useState("");

    async function doLogin(){
    if(username.length<=0)
    {
        Alert.alert("Please enter a username");
        return;
    }
    if(password.length<=0)
    {
        Alert.alert("Please enter a password");
        return;
    }

    setStatus("Logging ..");

    signInAsync(username, password).then(() => {
        console.log("Login success!");
        navigation.reset({
            index:0,
            routes: [{name: 'WelcomePage'}],
        });
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
      
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      
        console.error(error);
        Alert.alert(`${error}`);
    });
}
    return(
        <SafeAreaView style={styles.wrapper}>   
        <View style={styles.topBox}>
           
        <View style={styles.inputBoxWrapper}>
        <Text>Please enter your login credentials </Text>
        </View>

                    <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
        placeholder="Username"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
      />
            <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
        <Text>{status}</Text>

            
        </View>
        <View style={styles.bottomBox}>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={()=>{
            // Function to do the login to the application
            doLogin();

        }}><Text>Login Here</Text></TouchableOpacity>
        </View>
        </SafeAreaView>
        )}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    topBox:{
        flex:3,
        justifyContent: 'space-evenly',
        alignItems:'center',
        backgroundColor:'orange'
    },
    bottomBox:{
        flexBasis:70, 
        justifyContent:'flex-end',
        padding:10
    },
    buttonStyle:{
        backgroundColor: 'yellow',
        color: '#000',
        padding: 10,
        alignItems: 'center',
        marginBottom: 2
    },
    input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: "80%",
        },
    inputBoxWrapper: {
            width: '100%',
            padding: 20,
            alignItems: 'center',
        }
   
});

const Login =() =>{
    return (
        <Stack.Navigator initialRouteName="Login Main">
            <Stack.Screen name="Login Main" component={LoginMain} options={{
                title:"Already a User"
            }}></Stack.Screen>
                 <Stack.Screen name="WelcomePage" component={WelcomePage} options={{
                headerShown:false, 
            }}></Stack.Screen>
        </Stack.Navigator>
    )    
}

export default Login;