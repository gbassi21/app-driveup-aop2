import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider } from './src/context/AppContext';
import CustomDrawer from './src/components/CustomDrawer';
import Cadastro from './src/screens/Cadastro';
import Catalogo from './src/screens/Catalogo';
import TestDrive from './src/screens/TestDrive';
import Agendamentos from './src/screens/Agendamentos';
import colors from './src/theme/colors';

const Drawer = createDrawerNavigator();

// Função auxiliar: cria o ícone de cada item do menu (desestruturação de props)
const icone = (nome) => ({ color, size }) => (
  <Ionicons name={nome} color={color} size={size} />
);

export default function App() {
  return (
    // O Provider deixa os dados globais (usuário, veículo, agendamentos)
    // disponíveis para todas as telas via useContext
    <AppProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Cadastro"
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.onDark,
            headerTitleStyle: { fontWeight: '700', fontSize: 15, letterSpacing: 2 },
            headerShadowVisible: false,
            drawerActiveBackgroundColor: colors.accent,
            drawerActiveTintColor: colors.primary,
            drawerInactiveTintColor: colors.onDarkMuted,
            drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
            drawerItemStyle: { borderRadius: 10 },
          }}>
          <Drawer.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ title: 'CADASTRO DE CLIENTE', drawerLabel: 'Cadastro de Cliente', drawerIcon: icone('person-add-outline') }}
          />
          <Drawer.Screen
            name="Catalogo"
            component={Catalogo}
            options={{ title: 'CATÁLOGO DE VEÍCULOS', drawerLabel: 'Catálogo de Veículos', drawerIcon: icone('car-sport-outline') }}
          />
          <Drawer.Screen
            name="TestDrive"
            component={TestDrive}
            options={{ title: 'AGENDAR TEST DRIVE', drawerLabel: 'Agendar Test Drive', drawerIcon: icone('calendar-outline') }}
          />
          <Drawer.Screen
            name="Agendamentos"
            component={Agendamentos}
            options={{ title: 'MEUS AGENDAMENTOS', drawerLabel: 'Meus Agendamentos', drawerIcon: icone('list-outline') }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
