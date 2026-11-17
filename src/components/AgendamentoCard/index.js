import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../theme/colors';
import styles from './styles';

// Card de um agendamento de test drive
export default function AgendamentoCard({ agendamento }) {
  const { veiculo, data, horario, usuarioNome, status = 'Confirmado', observacoes } = agendamento;

  return (
    <View style={styles.card}>
      <View style={styles.icone}>
        <Ionicons name="car-sport-outline" size={28} color={colors.onDark} />
      </View>

      <View style={styles.info}>
        <Text style={styles.veiculo}>{veiculo}</Text>

        <View style={styles.linha}>
          <Ionicons name="time-outline" size={15} color={colors.accent} />
          <Text style={styles.destaque}>
            {data}  •  {horario}
          </Text>
        </View>

        <Text style={styles.texto}>{usuarioNome}</Text>
        {observacoes ? <Text style={styles.obs}>“{observacoes}”</Text> : null}

        <View style={styles.status}>
          <Ionicons name="checkmark" size={13} color={colors.onDark} />
          <Text style={styles.statusTexto}>{String(status).toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}
