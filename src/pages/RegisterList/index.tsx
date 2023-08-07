import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { Alert, FlatList } from 'react-native';
import { Categorias } from '../../database/models';
import dados from '../../database/data';
import RoundedButton from '../../components/RoundedButton';
import { Container, ContainerIcon, ListItem, Text } from './style';

const RegisterList: React.FC = () => {
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const theme = useTheme();

  const getAllCategories = async () => {
    const category = await dados.getAllCategories();
    setCategorias(category);
  };

  useEffect(() => {
    if (isFocused) {
      getAllCategories();
    }
  }, [isFocused])

  const handleSelectRegister = useCallback((id: string) => {
    navigation.navigate('Register-form', { id });
  }, [navigation]);

  const handleDeleteRegister = useCallback((id: string, name: string) => {
    Alert.alert(
      'Atenção',
      `Deseja deletar o registro ${name}`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await dados.deleteCategoryById(id);
            await getAllCategories();
          },
        },
      ]
    );
  }, []);

  return (
    <Container>
      <FlatList
        data={categorias}
        style={{ flex: 1 }}
        keyExtractor={item => item.id}
        extraData={categorias}
        renderItem={({ item }) => {
          return (
            <ListItem backgroundColor={theme.colors.backdrop}>
              <Text color={theme.colors.primary}>{item.name}</Text>
              <ContainerIcon onPress={() => handleSelectRegister(item.id)}>
                <Icons name="square-edit-outline" size={24} color={theme.colors.primary} />
              </ContainerIcon>
              <ContainerIcon onPress={() => handleDeleteRegister(item.id, item.name)}>
                <Icons name="trash-can" size={24} color={theme.colors.primary} />
              </ContainerIcon>
            </ListItem>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
      <RoundedButton onPress={() => navigation.navigate('Register-form')} />
    </Container>
  );
};

export default RegisterList;