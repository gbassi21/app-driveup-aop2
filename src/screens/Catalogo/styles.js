import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 32 },
  overline: { fontSize: 12, fontWeight: '700', letterSpacing: 2, color: colors.textMuted },
  titulo: { fontSize: 26, fontWeight: '700', color: colors.primary, marginTop: 6 },
  subtitulo: { fontSize: 16, color: colors.textMuted, marginTop: 4, marginBottom: 16, lineHeight: 24 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  pickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    minHeight: 48,
    paddingLeft: 12,
    overflow: 'hidden',
  },
  pickerIcone: { marginRight: 4 },
  picker: { flex: 1, color: colors.text, borderWidth: 0, backgroundColor: 'transparent', minHeight: 48 },
  contador: { fontSize: 14, color: colors.textMuted, marginTop: 12, marginBottom: 12 },
  vazio: { alignItems: 'center', padding: 32 },
  vazioTexto: { fontSize: 16, color: colors.textMuted, marginTop: 8 },
});
