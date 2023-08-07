import { Transaction } from "./models";

export interface CategoryProps {
  type: string;
  name: string;
  icon: string;
  color: string;
  id: string;
};

export interface SelectProps {
  id: string;
  value: string;
};

export interface TransactionsProps {
  type: string;
  name: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  repetir: number;
  id: string;
};

export interface Group {
  [chave: string]: Transaction[]
};

export interface Dashboard {
  mes: string;
  data: string;
  despesas: string;
  receitas: string;
  total: string;
  id: string;
}

export interface TransactionWithCategory {
  type: string;
  name: string;
  icon: string;
  color: string;
  date: string;
  amount: number;
  description: string;
  index: string;
  id: string;
}

export const list: SelectProps[] = [
  {
    id: 'currency-usd',
    value: 'currency-usd'
  },
  {
    id: 'cash-100',
    value: 'cash-100'
  },
  {
    id: 'bank',
    value: 'bank'
  },
  {
    id: 'piggy-bank',
    value: 'piggy-bank'
  },
  {
    id: 'home',
    value: 'home'
  },
  {
    id: 'airplane',
    value: 'airplane'
  },
  {
    id: 'wifi',
    value: 'wifi'
  },
  {
    id: 'shopping-outline',
    value: 'shopping-outline'
  },
  {
    id: 'store',
    value: 'store'
  },
  {
    id: 'credit-card-chip',
    value: 'credit-card-chip'
  },
  {
    id: 'car-back',
    value: 'car-back'
  },
  {
    id: 'baby-carriage',
    value: 'baby-carriage'
  },  
];

export const transactionType: SelectProps[] = [
  {
    id: 'despesa',
    value: 'Despesa'
  },
  {
    id: 'receita',
    value: 'Receita'
  }
];

export const months: SelectProps[] = [
  { id: '0', value: 'Todos' },
  { id: '1', value: 'Janeiro' },
  { id: '2', value: 'Fevereiro' },
  { id: '3', value: 'Março' },
  { id: '4', value: 'Abril' },
  { id: '5', value: 'Maio' },
  { id: '6', value: 'Junho' },
  { id: '7', value: 'Julho' },
  { id: '8', value: 'Agosto' },
  { id: '9', value: 'Setembro' },
  { id: '10', value: 'Outubro' },
  { id: '11', value: 'Novembro' },
  { id: '12', value: 'Dezembro' },
];

export const years: SelectProps[] = [
  { id: '2023', value: '2023' },
  { id: '2024', value: '2024' },
  { id: '2025', value: '2025' },
  { id: '2026', value: '2026' },
  { id: '2027', value: '2027' },
  { id: '2028', value: '2028' },
  { id: '2029', value: '2029' },
  { id: '2030', value: '2030' }
];