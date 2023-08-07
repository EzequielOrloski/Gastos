import 'react-native-gesture-handler';
import React from 'react';
import { Provider, useTheme } from 'react-native-paper';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import TransactionForm from './pages/TransactionForm';
import TransactionsList from './pages/TransactionsList';
import RegisterForm from './pages/RegisterForm';
import RegisterList from './pages/RegisterList';
import database from './database';
import TransactionsListDetails from './pages/TransactionsListDetails';

const App = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const theme = useTheme();

  const NavigatorRegisters = () => (
    <App.Navigator initialRouteName={'Register-list'} screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.background,
      }
    }}>
      <App.Screen
        key={4}
        options={{ headerTitle: 'Lista' }}
        name={'Register-list'}
        component={RegisterList}
      />
      <App.Screen
        key={5}
        options={{ headerTitle: 'Cadastro' }}
        name={'Register-form'}
        component={RegisterForm}
      />
    </App.Navigator >
  );

  const NavigatorTransactions = () => (
    <App.Navigator initialRouteName='Transactions' screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      cardStyle: {
        backgroundColor: theme.colors.background
      },
    }}>
      <App.Screen
        key={1}
        options={{ headerTitle: 'Transações' }}
        name={'Transactions'}
        component={TransactionsList}
      />
      <App.Screen
        key={2}
        options={{ headerTitle: 'Transações' }}
        name={'Transaction-form'}
        component={TransactionForm}
      />
      <App.Screen
        key={2}
        options={{ headerTitle: 'Detalhes' }}
        name={'List'}
        component={TransactionsListDetails}
      />
    </App.Navigator>
  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="List-Transactions"
        component={NavigatorTransactions}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <MaterialCommunityIcons name="clipboard-list-outline" size={24} />
        }}
      />
      <Tab.Screen
        name="Registers"
        component={NavigatorRegisters}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <MaterialCommunityIcons name="shape-plus" size={24} />
        }}
      />
    </Tab.Navigator>
  );
};

const Apps: React.FC = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Provider>
        <DatabaseProvider database={database}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.background} />
            <AppRoutes />
          </View>
        </DatabaseProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default Apps;