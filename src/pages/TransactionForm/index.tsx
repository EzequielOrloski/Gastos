import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { ValidationError, object, string } from 'yup';

import InputNumber from '../../components/inputNumber';
import InputText from '../../components/inputText';
import InputDate from '../../components/InputDate';
import PaperSelect from '../../components/Select';
import dados from '../../database/data';
import Button from '../../components/Button';
import { SelectProps, TransactionsProps, transactionType } from '../../database/interfaces';
import { Container } from './styles';

interface RouteParams extends RouteProp<ParamListBase, string> {
  params: {
    transactionId?: string;
  };
}

const TransactionForm: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [categorias, setCategorias] = useState<SelectProps[]>([]);
  const [initialData, setInitialData] = useState({});

  const { params } = useRoute<RouteParams>();
  const transactionId = useMemo(() => params && params.transactionId, [params]);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation<any>();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      if (transactionId) {
        const trans = await dados.getTransactionsById(transactionId);
        if (trans) {
          setInitialData({
            description: trans.description,
            amount: trans.amount.toString(),
            type: trans.type,
            category: trans.categoria_id,
            date: trans.date
          })
        }
      }
    })();
  }, [transactionId]);

  useEffect(() => {
    (async () => {
      const categorias = await dados.getAllCategories();
      const categoriasMap = categorias.map(item => ({ id: item.id, value: item.name }));
      setCategorias(categoriasMap);
    })()
  }, []);

  const handleSignIn = useCallback(async (data: TransactionsProps) => {
    try {
      setShowLoading(true);
      formRef.current?.setErrors({});
      const schema = object().shape({
        type: string(),
        name: string(),
        category: string().required('Categoria é obrigatório.'),
        date: string(),
        description: string().required('Descrição é obrigatório.'),
        amount: string().required('Valor é Obrigatório.'),
      });

      await schema.validate(data, { abortEarly: false });

      if (transactionId) {
        await dados.updateTransaction(data, transactionId);
      } else {
        await dados.saveTransaction(data);
      }
      navigation.pop();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = dados.getValidationErros(error);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setShowLoading(false);
    }
  }, []);

  return (
    <Container backgroundColor={theme.colors.background}>
      <Form ref={formRef} onSubmit={handleSignIn} initialData={initialData} style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
        <InputText name='description' />
        <InputNumber name='amount' description='Valor' icon='currency-usd' />
        <PaperSelect name='type' arrayList={transactionType} />
        <PaperSelect name='category' arrayList={categorias} />
        <InputDate name='date' />
        {!transactionId && <InputNumber name='repetir' description='Repetir?' icon='repeat' />}

        <Button onPress={() => formRef.current?.submitForm()} />
      </Form>
    </Container>
  );
};

export default TransactionForm;