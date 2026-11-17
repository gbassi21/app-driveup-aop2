import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  botao: {
    minHeight: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  secundario: { borderWidth: 2, borderColor: colors.primary },
  desabilitado: { opacity: 0.5 },
  conteudo: { flexDirection: 'row', alignItems: 'center' },
  texto: { fontSize: 15, fontWeight: '700', letterSpacing: 1.5, marginLeft: 8 },
});
