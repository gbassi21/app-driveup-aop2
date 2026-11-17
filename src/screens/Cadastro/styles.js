import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 24, paddingBottom: 48 },
  overline: { fontSize: 12, fontWeight: '700', letterSpacing: 2, color: colors.textMuted },
  titulo: { fontSize: 28, fontWeight: '700', color: colors.primary, marginTop: 6 },
  subtitulo: { fontSize: 16, color: colors.textMuted, marginTop: 4, lineHeight: 24 },
  legenda: { fontSize: 13, color: colors.textMuted, marginTop: 12, marginBottom: 16 },
  asterisco: { color: colors.error, fontWeight: '700' },
  resumoErro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  resumoErroTexto: { color: colors.errorText, fontSize: 14, marginLeft: 8, flex: 1 },
  sucessoContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  sucessoIcone: { alignItems: 'center', marginBottom: 16 },
  sucessoTitulo: { fontSize: 28, fontWeight: '700', color: colors.primary, textAlign: 'center' },
  sucessoTexto: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 24,
  },
});
