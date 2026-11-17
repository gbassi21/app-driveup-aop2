import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Button from '../Button';
import { formatarPreco } from '../../data/veiculos';
import colors from '../../theme/colors';
import styles from './styles';

// Card de um veículo do catálogo (dados recebidos por props com desestruturação)
export default function VeiculoCard({ veiculo, onAgendar }) {
  const { modelo, categoria, ano, preco, combustivel, cambio } = veiculo;

  return (
    <View style={styles.card}>
      <View style={styles.imagem}>
        <Ionicons name="car-sport-outline" size={60} color={colors.onDark} />
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{categoria.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.modelo}>{modelo}</Text>
        <Text style={styles.ano}>
          {ano} • 0 km • {combustivel} • {cambio}
        </Text>

        <Text style={styles.precoLabel}>A PARTIR DE</Text>
        <Text style={styles.preco}>{formatarPreco(preco)}</Text>

        <Button titulo="Agendar test drive" icone="calendar-outline" variante="destaque" onPress={onAgendar} />
      </View>
    </View>
  );
}
