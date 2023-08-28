import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,FlatList} from 'react-native';
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
        <View>
      {provinceData.length > 0 ? (
        <View>
          {provinceData.map((province, index) => (
            <View key={index}>
              <Text>Province: {province.province}</Text>
              <Text>New cases today: {province.new_case}</Text>
              <Text>Total cases: {province.total_case}</Text>
              <Text>Deaths today: {province.new_death}</Text>
              <Text>Total deaths: {province.total_death}</Text>
              <Text>Update date: {province.update_date}</Text>
              <Text>______________________________</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
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
