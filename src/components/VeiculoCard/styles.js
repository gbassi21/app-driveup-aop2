import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imagem: {
    height: 140,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeTexto: { color: colors.primary, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  corpo: { padding: 18 },
  modelo: { fontSize: 20, fontWeight: '700', color: colors.onDark },
  ano: { fontSize: 14, color: colors.onDarkMuted, marginTop: 3 },
  precoLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.onDarkMuted, marginTop: 14 },
  preco: { fontSize: 26, fontWeight: '700', color: colors.accent, marginBottom: 6 },
});
