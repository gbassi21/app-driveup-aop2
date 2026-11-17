import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  scroll: { paddingTop: 0 },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: colors.card,
    borderBottomWidth: 3,
    borderBottomColor: colors.green,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  marca: { color: colors.onDark, fontSize: 22, fontWeight: '700', letterSpacing: 4 },
  subtitulo: { color: colors.onDarkMuted, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginTop: 2, marginBottom: 16 },
  usuarioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(242,238,228,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(242,238,228,0.12)',
    borderRadius: 12,
    padding: 12,
  },
  usuarioTextos: { marginLeft: 10, flex: 1 },
  usuarioNome: { color: colors.onDark, fontSize: 16, fontWeight: '600' },
  usuarioInfo: { color: colors.onDarkMuted, fontSize: 12, marginTop: 2 },
  itens: { paddingTop: 12 },
  sair: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(242,238,228,0.12)',
  },
  sairTexto: { color: colors.onDarkMuted, fontSize: 16, marginLeft: 12, fontWeight: '600' },
  rodape: { color: colors.onDarkMuted, fontSize: 12, textAlign: 'center', paddingVertical: 12 },
});
