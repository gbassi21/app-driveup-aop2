import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../../context/AppContext';
import colors from '../../theme/colors';
import styles from './styles';

// Menu lateral customizado do Drawer Navigator
export default function CustomDrawer(props) {
  const { navigation } = props;
  const { usuario, agendamentos, sair } = useApp();

  const handleSair = () => {
    sair();
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="car-sport" size={30} color={colors.primary} />
          </View>
          <Text style={styles.marca}>DRIVEUP</Text>
          <Text style={styles.subtitulo}>CONCESSIONÁRIA</Text>

          <View style={styles.usuarioBox}>
            <Ionicons name="person-circle-outline" size={28} color={colors.onDark} />
            <View style={styles.usuarioTextos}>
              <Text style={styles.usuarioNome} numberOfLines={1}>
                {usuario ? usuario.nome : 'Visitante'}
              </Text>
              <Text style={styles.usuarioInfo}>
                {usuario
                  ? `${agendamentos.length} agendamento(s) nesta sessão`
                  : 'Faça seu cadastro para agendar'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.itens}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {usuario && (
        <TouchableOpacity style={styles.sair} onPress={handleSair} accessibilityRole="button">
          <Ionicons name="log-out-outline" size={22} color={colors.onDarkMuted} />
          <Text style={styles.sairTexto}>Sair</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.rodape}>DriveUp v1.0 • AOP2</Text>
    </View>
  );
}
