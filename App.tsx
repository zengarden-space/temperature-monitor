import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  RefreshControl, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { DataTable, Provider as PaperProvider, Appbar, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TemperatureMeasurement {
  node: string;
  minutely_temperature: number;
  hourly_temperature: number;
  daily_temperature: number;
}

interface TemperatureResponse {
  measurements: TemperatureMeasurement[];
}

export default function App() {
  const [measurements, setMeasurements] = useState<TemperatureMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemperatures = async () => {
    try {
      setError(null);
      const response = await fetch('/api/temperatures');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TemperatureResponse = await response.json();
      
      setMeasurements(data.measurements || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch temperature data';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTemperatures();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTemperatures();
  };

  const formatTemperature = (temp: number) => {
    return `${temp.toFixed(1)}°C`;
  };

  const renderTemperatureWithWarning = (temp: number, showWarning: boolean = false) => {
    return (
      <View style={styles.temperatureRow}>
        <Text style={[styles.temperatureText, showWarning && temp > 75 && styles.highTemperature]}>
          {formatTemperature(temp)}
        </Text>
        {showWarning && temp > 75 && (
          <MaterialCommunityIcons 
            name="fire" 
            size={16} 
            color="#ff4444" 
            style={styles.warningIcon}
          />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading temperature data...</Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Server Temperature Monitor" />
        </Appbar.Header>
        
        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Card style={styles.card}>
            <Card.Title title="Server Temperature Measurements" />
            <Card.Content>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : measurements.length === 0 ? (
                <Text style={styles.noDataText}>No temperature data available</Text>
              ) : (
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Node</DataTable.Title>
                    <DataTable.Title numeric>Minutely</DataTable.Title>
                    <DataTable.Title numeric>Hourly</DataTable.Title>
                    <DataTable.Title numeric>Daily</DataTable.Title>
                  </DataTable.Header>

                  {measurements.map((measurement, index) => (
                    <DataTable.Row key={measurement.node || index}>
                      <DataTable.Cell>{measurement.node}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {renderTemperatureWithWarning(measurement.minutely_temperature, true)}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>{formatTemperature(measurement.hourly_temperature)}</DataTable.Cell>
                      <DataTable.Cell numeric>{formatTemperature(measurement.daily_temperature)}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              )}
            </Card.Content>
          </Card>
          
          <Text style={styles.refreshHint}>Pull to refresh</Text>
        </ScrollView>
        
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
    color: '#666',
  },
  refreshHint: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  temperatureText: {
    fontSize: 14,
  },
  highTemperature: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  warningIcon: {
    marginLeft: 4,
  },
});
