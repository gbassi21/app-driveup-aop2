import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import AgendamentoCard from '../../components/AgendamentoCard';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { listarAgendamentos } from '../../services/api';
import colors from '../../theme/colors';
import styles from './styles';

export default function Agendamentos({ navigation }) {
  const { usuario, agendamentos, setAgendamentos } = useApp();
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('meus');

  // GET na API
  const carregar = async (puxou = false) => {
    setErro('');
    puxou ? setAtualizando(true) : setCarregando(true);
    try {
      const dados = await listarAgendamentos();
      // mais recentes primeiro
      const ordenados = [...dados].sort((a, b) => Number(b.id) - Number(a.id));
      setAgendamentos(ordenados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  // Recarrega sempre que a tela recebe o foco
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  // Filtro: "meus" (e-mail do usuário logado) ou "todos"
  const listaFiltrada = useMemo(() => {
    if (filtro === 'todos' || !usuario) return agendamentos;
    return agendamentos.filter((a) => a.usuarioEmail === usuario.email);
  }, [agendamentos, filtro, usuario]);

  const Cabecalho = (
    <View>
      <Text style={styles.overline}>SUA AGENDA</Text>
      <Text style={styles.titulo}>Test drives marcados</Text>
      <Text style={styles.label}>Mostrar</Text>
      <View style={styles.pickerBox}>
        <Ionicons name="funnel-outline" size={20} color={colors.textMuted} style={styles.pickerIcone} />
        <Picker selectedValue={filtro} onValueChange={setFiltro} style={styles.picker} accessibilityLabel="Filtrar agendamentos">
          <Picker.Item label="Meus agendamentos" value="meus" />
          <Picker.Item label="Todos os agendamentos da loja" value="todos" />
        </Picker>
      </View>
      <Text style={styles.contador}>{listaFiltrada.length} agendamento(s)</Text>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.centroTexto}>Carregando agendamentos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Ionicons name="cloud-offline-outline" size={56} color={colors.error} />
        <Text style={styles.erroTitulo}>Não foi possível carregar</Text>
        <Text style={styles.centroTexto}>{erro}</Text>
        <View style={styles.botaoLargura}>
          <Button titulo="Tentar novamente" icone="refresh-outline" onPress={() => carregar()} />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      data={listaFiltrada}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={Cabecalho}
      renderItem={({ item }) => <AgendamentoCard agendamento={item} />}
      refreshControl={<RefreshControl refreshing={atualizando} onRefresh={() => carregar(true)} colors={[colors.primary]} tintColor={colors.primary} />}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="calendar-clear-outline" size={48} color={colors.textMuted} />
          <Text style={styles.vazioTitulo}>Nenhum agendamento ainda</Text>
          <Text style={styles.centroTexto}>Escolha um veículo no catálogo e agende seu test drive.</Text>
          <View style={styles.botaoLargura}>
            <Button titulo="Ver catálogo" icone="car-sport-outline" onPress={() => navigation.navigate('Catalogo')} />
          </View>
        </View>
      }
    />
  );
}
