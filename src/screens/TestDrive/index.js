import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { criarAgendamento } from '../../services/api';
import veiculos, { horarios, formatarPreco } from '../../data/veiculos';
import colors from '../../theme/colors';
import styles from './styles';

// Formata a data enquanto digita: DD/MM/AAAA
const mascaraData = (valor) => {
  const n = valor.replace(/\D/g, '').slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
};

// Valida a data: formato, data real, não pode ser passada nem domingo
const validarData = (texto) => {
  if (!texto) return 'Informe a data do test drive.';
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return 'Use o formato DD/MM/AAAA.';
  const [dia, mes, ano] = texto.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);
  if (data.getDate() !== dia || data.getMonth() !== mes - 1) return 'Essa data não existe.';
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  if (data < hoje) return 'Escolha uma data a partir de hoje.';
  if (data.getDay() === 0) return 'Não abrimos aos domingos. Escolha outro dia.';
  return undefined;
};

export default function TestDrive({ navigation }) {
  const { usuario, veiculoSelecionado, setVeiculoSelecionado, adicionarAgendamento } = useApp();
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [erroApi, setErroApi] = useState('');

  // Tratamento de erro: sem cadastro não é possível agendar
  if (!usuario) {
    return (
      <View style={styles.bloqueio}>
        <Ionicons name="person-circle-outline" size={64} color={colors.textMuted} />
        <Text style={styles.bloqueioTitulo}>Cadastro necessário</Text>
        <Text style={styles.bloqueioTexto}>
          Para agendar um test drive, primeiro faça seu cadastro. Leva menos de 1 minuto.
        </Text>
        <Button titulo="Fazer cadastro" icone="person-add-outline" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    );
  }

  const selecionarVeiculo = (id) => {
    const veiculo = veiculos.find((v) => v.id === id) || null;
    setVeiculoSelecionado(veiculo);
    if (erros.veiculo) setErros({ ...erros, veiculo: undefined });
  };

  const handleAgendar = async () => {
    setErroApi('');
    const novosErros = {
      veiculo: veiculoSelecionado ? undefined : 'Escolha um veículo.',
      data: validarData(data),
      horario: horario ? undefined : 'Escolha um horário.',
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    setCarregando(true);
    try {
      const novo = await criarAgendamento({
        usuarioNome: usuario.nome,
        usuarioEmail: usuario.email,
        veiculoId: veiculoSelecionado.id,
        veiculo: veiculoSelecionado.modelo,
        data,
        horario,
        observacoes: observacoes.trim(),
        status: 'Confirmado',
        criadoEm: new Date().toISOString(),
      });
      adicionarAgendamento(novo);
      setData('');
      setHorario('');
      setObservacoes('');
      setVeiculoSelecionado(null);
      navigation.navigate('Agendamentos');
    } catch (erro) {
      setErroApi(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.overline}>TEST DRIVE</Text>
        <Text style={styles.titulo}>Agende sua experiência</Text>
        <Text style={styles.subtitulo}>Escolha o veículo, o dia e o horário. Nós confirmamos tudo para você.</Text>

        {/* Veículo */}
        <Text style={styles.label}>
          Veículo <Text style={styles.asterisco}>*</Text>
        </Text>
        <View style={[styles.pickerBox, erros.veiculo && styles.pickerErro]}>
          <Picker
            selectedValue={veiculoSelecionado ? veiculoSelecionado.id : ''}
            onValueChange={selecionarVeiculo}
            style={styles.picker}
            accessibilityLabel="Escolha o veículo">
            <Picker.Item label="Selecione um veículo..." value="" />
            {veiculos.map((v) => (
              <Picker.Item key={v.id} label={`${v.modelo} (${v.categoria})`} value={v.id} />
            ))}
          </Picker>
        </View>
        {erros.veiculo && <ErroCampo texto={erros.veiculo} />}

        {veiculoSelecionado && (
          <View style={styles.resumoVeiculo}>
            <Ionicons name="car-sport" size={28} color={colors.onDark} />
            <View style={styles.resumoTextos}>
              <Text style={styles.resumoModelo}>{veiculoSelecionado.modelo}</Text>
              <Text style={styles.resumoPreco}>A partir de {formatarPreco(veiculoSelecionado.preco)}</Text>
            </View>
          </View>
        )}

        {/* Data */}
        <View style={styles.espaco} />
        <Input
          label="Data"
          obrigatorio
          icone="calendar-outline"
          placeholder="DD/MM/AAAA"
          value={data}
          onChangeText={(v) => {
            setData(mascaraData(v));
            if (erros.data) setErros({ ...erros, data: undefined });
          }}
          onBlur={() => data && setErros({ ...erros, data: validarData(data) })}
          erro={erros.data}
          keyboardType="number-pad"
        />

        {/* Horário */}
        <Text style={styles.label}>
          Horário <Text style={styles.asterisco}>*</Text>
        </Text>
        <View style={[styles.pickerBox, erros.horario && styles.pickerErro]}>
          <Picker
            selectedValue={horario}
            onValueChange={(v) => {
              setHorario(v);
              if (erros.horario) setErros({ ...erros, horario: undefined });
            }}
            style={styles.picker}
            accessibilityLabel="Escolha o horário">
            <Picker.Item label="Selecione um horário..." value="" />
            {horarios.map((h) => (
              <Picker.Item key={h} label={h} value={h} />
            ))}
          </Picker>
        </View>
        {erros.horario && <ErroCampo texto={erros.horario} />}

        <View style={styles.espaco} />
        <Input
          label="Observações"
          icone="chatbox-ellipses-outline"
          placeholder="Ex.: quero testar na estrada, tenho carro na troca..."
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        {erroApi ? (
          <View style={styles.erroApi}>
            <Ionicons name="cloud-offline-outline" size={20} color={colors.error} />
            <Text style={styles.erroApiTexto}>{erroApi}</Text>
          </View>
        ) : null}

        <Button titulo="Confirmar agendamento" icone="checkmark-outline" onPress={handleAgendar} carregando={carregando} />
        <Button titulo="Voltar ao catálogo" variante="secundario" onPress={() => navigation.navigate('Catalogo')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Componente pequeno de erro reutilizado nos Pickers
function ErroCampo({ texto }) {
  return (
    <View style={styles.erroLinha}>
      <Ionicons name="alert-circle" size={16} color={colors.error} />
      <Text style={styles.erroTexto}>{texto}</Text>
    </View>
  );
}
