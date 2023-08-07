import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, useTheme } from 'react-native-paper';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}
      style={{
        width: '90%',
        height: 55,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        borderRadius: 5
      }}>
      <Material name='content-save' color='white' size={20} />
      <Text style={{ fontSize: 20 }}>   Salvar</Text>
    </TouchableOpacity>
  );
};

export default Button;