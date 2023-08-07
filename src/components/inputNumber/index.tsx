import React, { useEffect, useRef } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useField } from '@unform/core';

interface Props {
  name: string;
  icon: string;
  description: string;
}

const InputNumber: React.FC<Props> = ({ name, icon, description }) => {
  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<{ value: string }>({ value: defaultValue });
  const [text, setText] = React.useState('');

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
      setText(defaultValue);
    }
  }, [defaultValue, fieldName]);

  return (
    <TextInput
      label={description}
      value={text}
      keyboardType='numeric'
      style={{ marginBottom: 10, width: '90%', backgroundColor: theme.colors.primary }}
      onChangeText={text => {
        setText(text);
        inputValueRef.current.value = text;
      }}
      right={<TextInput.Icon icon={icon} />}
    />
  );
}

export default InputNumber;