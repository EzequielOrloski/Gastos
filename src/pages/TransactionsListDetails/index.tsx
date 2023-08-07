import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import dados from '../../database/data';
import { Container, ListContainer, ListItem, Text } from './styles';
import { TransactionWithCategory } from '../../database/interfaces';

interface RouteParams extends RouteProp<ParamListBase, string> {
  params: {
    date?: string;
  };
}
const TransactionsListDetails: React.FC = () => {
  const [transactions, settransactions] = useState<TransactionWithCategory[]>([])
  const [transaction, settransaction] = useState<TransactionWithCategory>()
  const { params } = useRoute<RouteParams>();
  const date = useMemo(() => params && params.date, [params]);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const getTransactionsByMonth = async () => {
    const trans = await dados.getTransactionsByMonth(date);
    if (trans.length == 0) {
      navigation.pop();
    } else {
      settransactions(trans);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getTransactionsByMonth();
    }
  }, [isFocused]);

  useEffect(() => {
    if (transaction) {
      openAlert();
    }
  }, [transaction]);

  const openAlert = useCallback(() => {
    if (transaction) {
      Alert.alert(
        '',
        `${transaction.description}`,
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Editar',
            onPress: async () => {
              navigation.navigate('Transaction-form', { transactionId: transaction.id });
            },
          },
          {
            text: 'Excluir',
            onPress: async () => {
              handleDeleteTransaction(transaction.description, transaction.id)
            },
          },
        ]
      );
    }
  }, [transaction, navigation]);

  const handleDeleteTransaction = useCallback((name: string, id: string) => {
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
            await dados.deleteTransactionById(id);
            await getTransactionsByMonth();
          },
        },
      ]);
  }, []);

  const onPress = (item: TransactionWithCategory) => {
    settransaction(item);
  }

  return (
    <Container backgroundColor={theme.colors.background}>
      <FlatList
        testID="flatlist"
        data={transactions}
        style={{ width: '100%' }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <ListItem backgroundColor={theme.colors.backdrop} onPress={() => onPress(item)}>
              <Icons name={item.icon} size={24} color={theme.colors.primary} />
              <ListContainer>
                <Text color={theme.colors.primary} size={16} style={{ marginBottom: 10 }} numberOfLines={1}>{item.description}</Text>
                <Text color={theme.colors.primary} size={13}>{item.index}</Text>
              </ListContainer>
              <ListContainer style={{ alignItems: 'flex-end' }}>
                <Text color={theme.colors.primary} size={16} style={{ marginBottom: 10 }}>{item.date}</Text>
                <Text color={(item.type == 'despesa') ? theme.colors.error : theme.colors.primary} size={13}>{dados.formatValue(item.amount)}</Text>
              </ListContainer>
            </ListItem>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

export default TransactionsListDetails;