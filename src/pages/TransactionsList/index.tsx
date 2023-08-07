import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import dados from '../../database/data';
import RoundedButton from '../../components/RoundedButton';
import { Picker } from '@react-native-picker/picker';
import { Dashboard, months, years } from '../../database/interfaces';
import { Container, ContainerFilter, ContainerSelect, ListContainer, ListItem, PickerContainer, Text } from './styles';

const TransactionsList: React.FC = () => {
  const [transactions, settransactions] = useState<Dashboard[]>([]);
  const [mes, setMes] = useState<string>('0');
  const [ano, setAno] = useState<string>(`${new Date().getFullYear()}`);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const theme = useTheme();

  const getAllTransactions = async (date: string | null) => {
    const all = await dados.getAllTransactions(date);
    settransactions(all);
  };

  useEffect(() => {
    if (isFocused) {
      getAllTransactions(null);
      setMes('0');
      setAno(`${new Date().getFullYear()}`);
    }
  }, [isFocused])

  const filterData = useCallback((item: any, isYear: boolean) => {
    if (isYear) {
      setAno(`${item}`);
      getAllTransactions(`${mes}/${item}`);
    } else {
      setMes(`${item}`);
      getAllTransactions(`${item}/${ano}`);
    }
  }, [ano, mes]);

  const hanldeListDetails = (data: string) => {
    navigation.navigate('List', { date: data })
  }

  return (
    <Container backgroundColor={theme.colors.background}>
      <ContainerFilter>
        <ContainerSelect style={{ backgroundColor: theme.colors.primary }}>
          <PickerContainer selectedValue={mes} onValueChange={(item) => filterData(item, false)}>
            {months.map(({ value, id }) => (
              <Picker.Item
                key={id}
                label={value}
                value={id}
              />
            ))}
          </PickerContainer>
        </ContainerSelect>
        <ContainerSelect style={{ backgroundColor: theme.colors.primary, marginLeft: 10 }}>
          <PickerContainer selectedValue={ano} onValueChange={(item) => filterData(item, true)}>
            {years.map(({ value, id }) => (
              <Picker.Item
                key={id}
                label={value}
                value={id}
              />
            ))}
          </PickerContainer>
        </ContainerSelect>
      </ContainerFilter>
      <FlatList
        testID="flatlist"
        data={transactions}
        style={{ width: '100%' }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <ListItem backgroundColor={theme.colors.backdrop} onPress={() => hanldeListDetails(item.data)}>
              <Text color={theme.colors.primary} size={20}>{item.mes}</Text>
              <ListContainer style={{ marginTop: 20 }}>
                <Text color={theme.colors.primary} size={17}>Receita:</Text>
                <Text color={theme.colors.primary} size={17}>{item.receitas}</Text>
              </ListContainer>
              <ListContainer>
                <Text color={theme.colors.primary} size={17}>Despesa:</Text>
                <Text color={theme.colors.primary} size={17}>{item.despesas}</Text>
              </ListContainer>
              <ListContainer>
                <Text color={theme.colors.primary} size={17}>Total:</Text>
                <Text color={theme.colors.primary} size={17}>{item.total}</Text>
              </ListContainer>
            </ListItem>
          );
        }}
        showsVerticalScrollIndicator={false}
      // ListEmptyComponent={NoDataIndicator}
      />
      <RoundedButton onPress={() => navigation.navigate('Transaction-form')} />
    </Container>
  );
};

export default TransactionsList;