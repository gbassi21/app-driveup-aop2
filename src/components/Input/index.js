import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../theme/colors';
import styles from './styles';

// Campo de texto reutilizável com label, indicação de obrigatório e erro
// Comunicação DIRETA: recebe props do componente pai (desestruturação)
export default function Input({ label, obrigatorio, erro, icone, multiline, onFocus, onBlur, ...rest }) {
  // Controla o foco para destacar a borda do campo ativo
  const [focado, setFocado] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {obrigatorio && <Text style={styles.obrigatorio}> *</Text>}
      </Text>

      <View style={[styles.campo, multiline && styles.campoMultilinha, focado && styles.campoFocado, erro && styles.campoErro]}>
        {icone && <Ionicons name={icone} size={20} color={colors.textMuted} />}
        <TextInput
          style={[styles.input, multiline && styles.inputMultilinha]}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          accessibilityLabel={label}
          onFocus={(e) => {
            setFocado(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setFocado(false);
            if (onBlur) onBlur(e);
          }}
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
