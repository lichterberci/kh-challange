import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Home(){

    const getCurrentDate = () =>{
        var date = new Date().getDate();
        console.log(date)
    }

    getCurrentDate();

    return (
        <View>
            <Text>Faszomat megnyalhatod</Text>
        </View>
    )
}
