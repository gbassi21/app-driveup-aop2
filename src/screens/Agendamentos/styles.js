import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 32, flexGrow: 1 },
  overline: { fontSize: 12, fontWeight: '700', letterSpacing: 2, color: colors.textMuted },
  titulo: { fontSize: 26, fontWeight: '700', color: colors.primary, marginTop: 6, marginBottom: 16 },
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
  picker: { flex: 1, color: colors.text, borderWidth: 0, backgroundColor: 'transparent', minHeight: 48, outlineStyle: 'none' },
  contador: { fontSize: 14, color: colors.textMuted, marginTop: 12, marginBottom: 12 },
  centro: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  centroTexto: { fontSize: 16, color: colors.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 24 },
  erroTitulo: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 12 },
  vazio: { alignItems: 'center', paddingVertical: 32 },
  vazioTitulo: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 12 },
  botaoLargura: { alignSelf: 'stretch', marginTop: 16 },
});
