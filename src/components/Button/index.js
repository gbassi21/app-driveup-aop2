import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../theme/colors';
import styles from './styles';

// Botão reutilizável
// variante "primario": preto com texto champanhe (sobre o fundo bege)
// variante "destaque": champanhe com texto preto (dentro dos cards escuros)
// variante "secundario": contorno preto
const temas = {
  primario: { fundo: colors.primary, conteudo: colors.accent },
  destaque: { fundo: colors.accent, conteudo: colors.primary },
  secundario: { fundo: 'transparent', conteudo: colors.primary },
};

export default function Button({ titulo, onPress, icone, carregando, disabled, variante = 'primario' }) {
  const { fundo, conteudo } = temas[variante] || temas.primario;
  const bloqueado = disabled || carregando;

  return (
    <TouchableOpacity
      style={[
        styles.botao,
        { backgroundColor: fundo },
        variante === 'secundario' && styles.secundario,
        bloqueado && styles.desabilitado,
      ]}
      onPress={onPress}
      disabled={bloqueado}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled: bloqueado }}>
      {carregando ? (
        <ActivityIndicator color={conteudo} />
      ) : (
        <View style={styles.conteudo}>
          {icone && <Ionicons name={icone} size={18} color={conteudo} />}
          <Text style={[styles.texto, { color: conteudo }]}>{titulo.toUpperCase()}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
