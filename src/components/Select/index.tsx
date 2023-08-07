import React, { useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';
import { Container, PickerContainer } from './style';
import { useField } from '@unform/core';

interface Tipo {
  id: string;
  value: string;
}

interface Props {
  name: string;
  arrayList: Tipo[];
}

const Select: React.FC<Props> = ({ name, arrayList }) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<{ value: string }>({ value: defaultValue });
  const [value, setValue] = useState();
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

    if (defaultValue) {
      inputValueRef.current.value = defaultValue;
    } else {
      if (arrayList.length > 0) {
        inputValueRef.current.value = arrayList[0].id;
      }
    }
  }, [defaultValue, fieldName]);

  const onValueChange = (itemValue: any) => {
    setValue(itemValue);
    inputValueRef.current.value = itemValue;
  }

  return (
    <Container backgroundColor={theme.colors.primary} error={error != null}>
      <PickerContainer selectedValue={value} onValueChange={(item) => onValueChange(item)}>
        {arrayList.map(({ value, id }) => (
          <Picker.Item
            key={id}
            label={value}
            value={id}
          />
        ))}
      </PickerContainer>
    </Container>
  );
}

export default Select;