import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../theme/colors';
import styles from './styles';

// Campo de texto reutilizável com label, indicação de obrigatório e erro
// Comunicação DIRETA: recebe props do componente pai (desestruturação)
export default function Input({ label, obrigatorio, erro, icone, multiline, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {obrigatorio && <Text style={styles.obrigatorio}> *</Text>}
      </Text>

      <View style={[styles.campo, multiline && styles.campoMultilinha, erro && styles.campoErro]}>
        {icone && <Ionicons name={icone} size={20} color={colors.textMuted} />}
        <TextInput
          style={[styles.input, multiline && styles.inputMultilinha]}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          accessibilityLabel={label}
          {...rest}
        />
      </View>

      {erro ? (
        <View style={styles.erroLinha}>
          <Ionicons name="alert-circle" size={16} color={colors.error} />
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}
    </View>
  );
}
