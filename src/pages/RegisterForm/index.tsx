import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { ValidationError, object, string } from 'yup';

import InputText from '../../components/inputText';
import Button from '../../components/Button';
import dados from '../../database/data';
import { Container } from './styles';
import IconSelect from '../../components/IconSelect';

interface RouteParams extends RouteProp<ParamListBase, string> {
  params: {
    id?: string;
  };
}

const RegisterForm: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const { params } = useRoute<RouteParams>();
  const registerId = useMemo(() => params && params.id, [params]);
  const navigation = useNavigation<any>();
  const formRef = useRef<FormHandles>(null);
  const theme = useTheme();

  const getCategorie = async () => {
    if (registerId) {
      const categoria = await dados.getCategoryById(registerId);
      if (categoria) {
        setInitialData({
          name: categoria.name,
          icon: categoria.icon
        })
      }
    }
  }

  useEffect(() => {
    getCategorie()
  }, [registerId]);

  const handleSignIn = useCallback(async (data: any) => {
    try {
      setShowLoading(true);
      formRef.current?.setErrors({});

      const schema = object().shape({
        name: string().required('Nome deve ser preenchido.'),
        icon: string(),
        type: string(),
        color: string()
      });

      await schema.validate(data, { abortEarly: false });
      await dados.saveCategory(data, registerId);
      navigation.pop();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = dados.getValidationErros(error);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setShowLoading(false);
    }
  }, [registerId]);

  return (
    <Container backgroundColor={theme.colors.background} style={{ padding: 16 }}>
      <Form ref={formRef} onSubmit={handleSignIn} initialData={initialData} style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
        <InputText name='name' />
        <IconSelect name='icon' />
        <Button onPress={() => formRef.current?.submitForm()}></Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;