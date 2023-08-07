import React, { useEffect, useRef, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useField } from '@unform/core';

interface Props {
  name: string;
}

const InputText: React.FC<Props> = ({ name }) => {
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<{ value: string }>({ value: defaultValue });
  const [text, setText] = useState<string>(defaultValue);

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
      label="Descrição"
      value={text}
      style={{ marginBottom: 10, width: '90%', backgroundColor: theme.colors.primary }}
      error={error != null}
      onChangeText={text => {
        setText(text);
        inputValueRef.current.value = text;
      }}
      right={<TextInput.Icon icon="text-box-multiple-outline" />}
    />
  );
}

export default InputText;