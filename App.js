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
                        <Text>Province : {item.province}</Text>
                        <Text>New Case :{item.new_case}</Text>
                        <Text>New Case Exclude abroad :{item.new_case_excludeabroad}</Text>
                        <Text>New Deaths :{item.new_death}</Text>
                        <Text>Total Deaths :{item.total_death}</Text>
                        <Text>Total Case :{item.total_case}</Text>
                        <Text>Date : {item.update_date}</Text>
                        <Text>____________________________________________________</Text>
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
        backgroundColor: '#FFF5E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CovidData;
