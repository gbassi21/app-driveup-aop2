import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  icone: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  info: { flex: 1 },
  veiculo: { fontSize: 18, fontWeight: '700', color: colors.onDark, marginBottom: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  destaque: { fontSize: 14, color: colors.accent, marginLeft: 6 },
  texto: { fontSize: 14, color: colors.onDarkMuted },
  obs: { fontSize: 14, color: colors.onDarkMuted, fontStyle: 'italic', marginTop: 2 },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.green,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
  },
  statusTexto: { color: colors.onDark, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginLeft: 4 },
});
