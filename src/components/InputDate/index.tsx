import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { TextInput, useTheme } from 'react-native-paper';
import { useField } from '@unform/core';
import dados from '../../database/data';

interface Props {
  name: string;
}

const InputDate: React.FC<Props> = ({ name }) => {
  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<{ value: string }>({ value: defaultValue });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePicker, setDatePicker] = useState<Date>(new Date());

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
      setDatePicker(dados.getData(defaultValue));
    }
  }, [defaultValue, fieldName]);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker((status) => !status);
  }, []);

  const selectedDate = useMemo(() => {
    const localDate = datePicker || new Date();
    inputValueRef.current.value = format(localDate, 'dd/MM/yyyy');
    return {
      string: format(localDate, 'dd/MM/yyyy'),
      date: localDate,
    };
  }, [datePicker]);

  return (
    <>
      <TextInput
        label='Data'
        value={selectedDate.string}
        editable={false}
        style={{ marginBottom: 10, width: '90%', backgroundColor: theme.colors.primary }}
        right={<TextInput.Icon icon='calendar' onPress={handleOpenDatePicker} />}
      />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          onChange={(e: any, date?: Date) => {
            if (date) {
              setDatePicker(date);
            }
            setShowDatePicker(false);
          }}
          display='calendar'
          value={selectedDate.date}
        />
      )}
    </>
  );
}

export default InputDate;