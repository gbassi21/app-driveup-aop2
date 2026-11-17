import React, { useState, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import VeiculoCard from '../../components/VeiculoCard';
import { useApp } from '../../context/AppContext';
import veiculos, { categorias } from '../../data/veiculos';
import colors from '../../theme/colors';
import styles from './styles';

export default function Catalogo({ navigation }) {
  const { usuario, setVeiculoSelecionado } = useApp();
  const [categoria, setCategoria] = useState('Todas');

  // Filtro: o Picker define a categoria e a FlatList mostra só os veículos dela
  const listaFiltrada = useMemo(
    () => (categoria === 'Todas' ? veiculos : veiculos.filter((v) => v.categoria === categoria)),
    [categoria]
  );

  const handleAgendar = (veiculo) => {
    setVeiculoSelecionado(veiculo); // passa o veículo para a tela de agendamento via Context
    navigation.navigate('TestDrive');
  };

  const Cabecalho = (
    <View>
      <Text style={styles.overline}>CATÁLOGO 0 KM</Text>
      <Text style={styles.titulo}>
        {usuario ? `Olá, ${usuario.nome.split(' ')[0]}` : 'Bem-vindo'}
      </Text>
      <Text style={styles.subtitulo}>Escolha seu próximo carro e agende um test drive.</Text>

      <Text style={styles.label}>Filtrar por categoria</Text>
      <View style={styles.pickerBox}>
        <Ionicons name="funnel-outline" size={20} color={colors.textMuted} style={styles.pickerIcone} />
        <Picker
          selectedValue={categoria}
          onValueChange={(valor) => setCategoria(valor)}
          style={styles.picker}
          accessibilityLabel="Filtrar por categoria">
          {categorias.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <Text style={styles.contador}>
        {listaFiltrada.length} veículo(s) encontrado(s)
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      data={listaFiltrada}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={Cabecalho}
      renderItem={({ item }) => <VeiculoCard veiculo={item} onAgendar={() => handleAgendar(item)} />}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="search-outline" size={40} color={colors.textMuted} />
          <Text style={styles.vazioTexto}>Nenhum veículo nesta categoria.</Text>
        </View>
      }
    />
  );
}
