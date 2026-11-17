import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  obrigatorio: { color: colors.error },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  campoMultilinha: { alignItems: 'flex-start', paddingVertical: 8 },
  campoErro: { borderColor: colors.error, borderWidth: 2 },
  input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 10, marginLeft: 8 },
  inputMultilinha: { minHeight: 80, textAlignVertical: 'top' },
  erroLinha: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  erroTexto: { color: colors.error, fontSize: 13, marginLeft: 4, flex: 1 },
});
