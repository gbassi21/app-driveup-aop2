import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { cadastrarUsuario } from '../../services/api';
import colors from '../../theme/colors';
import styles from './styles';

const formInicial = { nome: '', email: '', telefone: '', cidade: '', senha: '', confirmarSenha: '' };

// Formata o telefone enquanto digita: (27) 99999-9999
const mascaraTelefone = (valor) => {
  const n = valor.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

// Regras de validação dos campos obrigatórios
const validar = ({ nome, email, telefone, senha, confirmarSenha }) => {
  const erros = {};
  if (!nome.trim()) erros.nome = 'Informe seu nome completo.';
  else if (nome.trim().split(' ').length < 2) erros.nome = 'Digite nome e sobrenome.';

  if (!email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) erros.email = 'E-mail inválido. Ex.: nome@email.com';

  const digitos = telefone.replace(/\D/g, '');
  if (!digitos) erros.telefone = 'Informe seu telefone.';
  else if (digitos.length < 10) erros.telefone = 'Telefone incompleto. Use DDD + número.';

  if (!senha) erros.senha = 'Crie uma senha.';
  else if (senha.length < 6) erros.senha = 'A senha precisa ter pelo menos 6 caracteres.';

  if (!confirmarSenha) erros.confirmarSenha = 'Confirme sua senha.';
  else if (confirmarSenha !== senha) erros.confirmarSenha = 'As senhas não coincidem.';

  return erros;
};

export default function Cadastro({ navigation }) {
  const { usuario, setUsuario } = useApp();
  const [form, setForm] = useState(formInicial);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [erroApi, setErroApi] = useState('');

  const alterar = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
    if (erros[campo]) setErros({ ...erros, [campo]: undefined });
  };

  // Valida o campo quando o usuário sai dele (onBlur)
  const validarCampo = (campo) => {
    const resultado = validar(form);
    setErros({ ...erros, [campo]: resultado[campo] });
  };

  const handleCadastrar = async () => {
    setErroApi('');
    const resultado = validar(form);
    setErros(resultado);
    if (Object.keys(resultado).length > 0) return;

    setCarregando(true);
    try {
      const { nome, email, telefone, cidade } = form;
      // Por segurança, a senha NÃO é enviada para a API de teste
      const novoUsuario = await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone,
        cidade: cidade.trim(),
        criadoEm: new Date().toISOString(),
      });
      setUsuario(novoUsuario);
      setForm(formInicial);
    } catch (erro) {
      setErroApi(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  // Tela de sucesso quando já existe usuário cadastrado
  if (usuario) {
    return (
      <View style={styles.sucessoContainer}>
        <View style={styles.sucessoIcone}>
          <Ionicons name="checkmark-circle" size={64} color={colors.green} />
        </View>
        <Text style={styles.sucessoTitulo}>Cadastro realizado!</Text>
        <Text style={styles.sucessoTexto}>
          Olá, {usuario.nome.split(' ')[0]}! Agora você já pode escolher um veículo e agendar seu test drive.
        </Text>
        <Button titulo="Ver catálogo" icone="car-sport-outline" onPress={() => navigation.navigate('Catalogo')} />
      </View>
    );
  }

  const qtdErros = Object.values(erros).filter(Boolean).length;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.overline}>BEM-VINDO À DRIVEUP</Text>
        <Text style={styles.titulo}>Crie sua conta</Text>
        <Text style={styles.subtitulo}>Cadastre-se para agendar test drives.</Text>
        <Text style={styles.legenda}>
          <Text style={styles.asterisco}>*</Text> campos obrigatórios
        </Text>

        {qtdErros > 0 && (
          <View style={styles.resumoErro} accessibilityRole="alert">
            <Ionicons name="warning-outline" size={20} color={colors.error} />
            <Text style={styles.resumoErroTexto}>Corrija {qtdErros} campo(s) destacado(s) abaixo.</Text>
          </View>
        )}

        <Input
          label="Nome completo"
          obrigatorio
          icone="person-outline"
          placeholder="Ex.: Maria da Silva"
          value={form.nome}
          onChangeText={(v) => alterar('nome', v)}
          onBlur={() => validarCampo('nome')}
          erro={erros.nome}
          autoCapitalize="words"
        />
        <Input
          label="E-mail"
          obrigatorio
          icone="mail-outline"
          placeholder="nome@email.com"
          value={form.email}
          onChangeText={(v) => alterar('email', v)}
          onBlur={() => validarCampo('email')}
          erro={erros.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Telefone (WhatsApp)"
          obrigatorio
          icone="call-outline"
          placeholder="(27) 99999-9999"
          value={form.telefone}
          onChangeText={(v) => alterar('telefone', mascaraTelefone(v))}
          onBlur={() => validarCampo('telefone')}
          erro={erros.telefone}
          keyboardType="phone-pad"
        />
        <Input
          label="Cidade"
          icone="location-outline"
          placeholder="Ex.: Vitória - ES"
          value={form.cidade}
          onChangeText={(v) => alterar('cidade', v)}
        />
        <Input
          label="Senha"
          obrigatorio
          icone="lock-closed-outline"
          placeholder="Mínimo de 6 caracteres"
          value={form.senha}
          onChangeText={(v) => alterar('senha', v)}
          onBlur={() => validarCampo('senha')}
          erro={erros.senha}
          secureTextEntry
        />
        <Input
          label="Confirmar senha"
          obrigatorio
          icone="lock-closed-outline"
          placeholder="Repita a senha"
          value={form.confirmarSenha}
          onChangeText={(v) => alterar('confirmarSenha', v)}
          onBlur={() => validarCampo('confirmarSenha')}
          erro={erros.confirmarSenha}
          secureTextEntry
        />

        {erroApi ? (
          <View style={styles.resumoErro}>
            <Ionicons name="cloud-offline-outline" size={20} color={colors.error} />
            <Text style={styles.resumoErroTexto}>{erroApi}</Text>
          </View>
        ) : null}

        <Button titulo="Cadastrar" icone="checkmark-outline" onPress={handleCadastrar} carregando={carregando} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
