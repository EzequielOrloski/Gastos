import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SelectProps, list } from '../../database/interfaces';
import { ListItem } from './styles';
import { useTheme } from 'react-native-paper';

interface Props {
  name: string;
}

interface PropsSelect extends SelectProps {
  selected: boolean;
}

const IconSelect: React.FC<Props> = ({ name }) => {
  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<{ value: string }>({ value: defaultValue });
  const [icon, setIcon] = useState<string>('');
  const [icones, setIcones] = useState<PropsSelect[]>([]);
  const theme = useTheme();

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
      },
      clearValue() {
        inputValueRef.current.value = '';
      },
    });

    const icon = list.map(item => {
      if (defaultValue == item.id) {
        return { id: item.id, value: item.value, selected: true };
      } else {
        return { id: item.id, value: item.value, selected: false };
      }
    });

    setIcones(icon);

    if (defaultValue) {
      inputValueRef.current.value = defaultValue;
      setIcon(defaultValue);
    }
  }, [defaultValue, fieldName]);

  const onPress = (selecionado: PropsSelect) => {
    setIcon(selecionado.id);
    inputValueRef.current.value = selecionado.id;

    const icon = list.map(item => {
      if (selecionado.id == item.id) {
        return { id: item.id, value: item.value, selected: true };
      } else {
        return { id: item.id, value: item.value, selected: false };
      }
    });

    setIcones(icon);
  }

  return (
    <FlatList
      data={icones}
      style={{ width: '100%', padding: 16 }}
      keyExtractor={item => item.id}
      numColumns={4}
      renderItem={({ item }) => {
        return (
          <ListItem backgroundColor={item.selected ? theme.colors.onPrimaryContainer : theme.colors.backdrop} onPress={() => onPress(item)}>
            <Icons name={item.value} size={24} color={item.selected ? theme.colors.primaryContainer : theme.colors.primary} />
          </ListItem>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default IconSelect;