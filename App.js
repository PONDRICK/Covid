import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';

const FetchCovid = async () => {
    const apiUrl = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces';
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error Fetching Covid Data", error);
        throw error;
    }
}

const CovidData = () => {
    const [provinceData, setProvinceData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCovid = async () => {
            try {
                const newCovidData = await FetchCovid();
                setProvinceData(newCovidData);
            } catch (error) {
                setError(error.message);
                throw error;
            }
        }
        loadCovid();
    }, []);

    console.log(provinceData);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
            <FlatList
                data={provinceData}
                keyExtractor={(item) => item.province}
                renderItem={({ item }) => (
                    <View>
                        <Text style={{fontSize:18,fontWeight:"bold",backgroundColor:"#252B48",padding:10,color:"#fff"}}>Province : {item.province}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#75C2F6"}}></Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>New Case : {item.new_case}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>New Case Exclude abroad : {item.new_case_excludeabroad}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>New Deaths : {item.new_death}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>Total Deaths : {item.total_death}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>Total Case : {item.total_case}</Text>
                        <Text style={{fontStyle:"italic",fontWeight:"bold",backgroundColor:"#F7E987",padding:5}}>Date : {item.update_date}</Text>
                        <Text></Text>
                    </View>
                )}
            />
            <StatusBar style="auto" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B9A8B',
        //alignItems: 'center',
        //justifyContent: 'center',
        padding : 10,
    },
});

export default CovidData;