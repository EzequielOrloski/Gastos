import { ValidationError } from "yup";
import database from ".";
import { CategoryProps, Group, Dashboard, TransactionsProps, TransactionWithCategory } from "./interfaces";
import { Categorias, Transaction } from "./models";

interface Erros {
  [key: string]: string;
}

const getAllCategories = async (): Promise<Categorias[]> => {
  const data = database.collections.get<Categorias>('categorias');
  const categoria = await data.query().fetch();
  return categoria;
}

const getCategoryById = async (id: string): Promise<Categorias | null> => {
  try {
    const data = database.collections.get<Categorias>('categorias');
    const categoria = await data.find(id);
    return categoria;
  } catch (err) { }

  return null;
}

const saveCategory = async (params: CategoryProps, id: string | undefined) => {
  const data = database.collections.get<Categorias>('categorias');
  if (id) {
    const categoria = await getCategoryById(id);
    if (categoria) {
      await database.write(async () => {
        await categoria.update(item => {
          item.type = params.type;
          item.name = params.name;
          item.icon = params.icon;
          item.color = params.color;
        });
      });
    }
  } else {
    await database.write(async () => {
      await data.create(item => {
        item.type = params.type;
        item.name = params.name;
        item.icon = params.icon;
        item.color = params.color;
      });
    });
  }
};

const deleteCategoryById = async (id: string) => {
  const categoria = await getCategoryById(id);
  if (categoria) {
    await database.write(async () => {
      await categoria.destroyPermanently();
    });
  }
};

const getValidationErros = (err: ValidationError): Erros => {
  const validationErros: Erros = {};

  err.inner.forEach(error => {
    validationErros[error.path as string] = error.message;
  });

  return validationErros;
};

const formatValue = (value: number): string => {
  let [integer, decimal] = String(value).split('.');

  if (!decimal) decimal = '00';
  else if (decimal.length === 1) decimal += '0';

  return `R$ ${integer},${decimal}`;
};

const getData = (data: string): Date => {
  const dataArray = data.split('/').map(item => Number(item));
  return new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
};

const updateTransaction = async (params: TransactionsProps, id: string): Promise<void> => {
  const data = database.collections.get<Transaction>('transaction');
  try {
    const trans = await data.find(id);
    if (trans) {
      await database.write(async () => {
        await trans.update(item => {
          item.type = params.type;
          item.name = params.name;
          item.categoria_id = params.category;
          item.date = params.date;
          item.description = params.description;
          item.amount = Number(params.amount);
        });
      });
    }
  } catch (err) { }
};

const saveTransaction = async (params: TransactionsProps): Promise<void> => {
  const data = database.collections.get<Transaction>('transaction');
  if (Number(params.repetir || 0) > 1) {
    let create: Transaction[] = [];
    const dataConvertida = getData(params.date);
    for (let index = 0; index < params.repetir; index++) {
      create.push(
        data.prepareCreate(item => {
          item.type = params.type;
          item.name = params.name;
          item.categoria_id = params.category;
          item.date = dataConvertida.toLocaleDateString();
          item.description = params.description;
          item.amount = Number(params.amount);
          item.index = `[${index + 1}/${params.repetir}]`
        })
      );
      dataConvertida.setMonth(dataConvertida.getMonth() + 1);
    }
    await database.write(async () => {
      await database.batch([...create]);
    });
  } else {
    await database.write(async () => {
      await data.create(item => {
        item.type = params.type;
        item.name = params.name;
        item.categoria_id = params.category;
        item.date = params.date;
        item.description = params.description;
        item.amount = params.amount;
        item.index = '[1/1]'
      });
    });
  }
};

const agruparPorMesAno = (array: Transaction[]): Group => {
  return array.reduce((agrupado, item) => {
    const data = item.date.split('/');
    const chave = `${data[1]}/${data[2]}`.padStart(7, '0');
    if (!agrupado[chave]) {
      agrupado[chave] = [];
    }

    agrupado[chave].push(item);
    return agrupado;
  }, {} as Group);
};

const nomeDoMes = (numeroMes: number): string => {
  if (numeroMes < 1 || numeroMes > 12) {
    return '';
  }

  const data = new Date();
  data.setMonth(numeroMes - 1);
  const nomeMes = data.toLocaleString(undefined, { month: 'long' });
  return nomeMes;
}

const getTotal = (array: Transaction[], type: string): number => {
  return array.reduce((soma, item) => {
    if (item.type == type) {
      return soma + item.amount;
    } else {
      return soma;
    }
  }, 0);
}

const getAllTransactions = async (date: string | null): Promise<Dashboard[]> => {
  const data = database.collections.get<Transaction>('transaction');
  var despesas = await data.query().fetch();

  if (date) {
    if (!date.startsWith('0')) {
      despesas = despesas.filter(item => item.date.substring(3) == date.padStart(7, '0'));
    }
  }

  let result: Dashboard[] = [];

  if (despesas.length > 0) {
    const novas = agruparPorMesAno(despesas);
    const keys = Object.keys(novas);
    const datasOrdenadas: string[] = keys.sort((dataA: string, dataB: string) => {
      return new Date(dataA).getTime() - new Date(dataB).getTime();
    });
    datasOrdenadas.forEach(item => {
      const despesa = getTotal(novas[item], 'despesa');
      const receita = getTotal(novas[item], 'receita');
      const mes = `${nomeDoMes(Number(item.split('/')[0]))} - ${item.split('/')[1]}`;

      result.push({
        mes: `${mes[0].toUpperCase()}${mes.substring(1)}`,
        despesas: formatValue(despesa),
        receitas: formatValue(receita),
        total: formatValue(receita - despesa),
        id: item,
        data: item,
      })
    });
  }
  return result;
}

const getCategoria = (categorias: Categorias[], id: string): { icon: string; color: string; } => {
  const categoria = categorias.find(item => item.id == id);
  return categoria || { icon: 'bank', color: 'white' };
}

const getTransactionsByMonth = async (date: string | undefined): Promise<TransactionWithCategory[]> => {
  const dataT = database.collections.get<Transaction>('transaction');
  const dataC = database.collections.get<Categorias>('categorias');

  const categorias = await dataC.query().fetch();
  var transaction = await dataT.query().fetch();

  if (date) {
    transaction = transaction.filter(item => item.date.substring(3) == date.padStart(7, '0'));
  }

  return transaction.map(item => {
    return {
      type: item.type,
      name: item.name,
      icon: getCategoria(categorias, item.categoria_id).icon,
      color: getCategoria(categorias, item.categoria_id).color,
      date: item.date,
      amount: item.amount,
      description: item.description,
      index: item.index,
      id: item.id
    }
  })
};

const getTransactionsById = async (id: string): Promise<Transaction | null> => {
  try {
    const data = database.collections.get<Transaction>('transaction');
    const categoria = await data.find(id);
    return categoria;
  } catch (err) { }
  return null;
};

const deleteTransactionById = async (id: string) => {
  const transaction = await getTransactionsById(id);
  if (transaction) {
    await database.write(async () => {
      await transaction.destroyPermanently();
    });
  }
};

export default {
  getData,
  formatValue,
  saveCategory,
  getCategoryById,
  saveTransaction,
  getAllCategories,
  updateTransaction,
  deleteCategoryById,
  getAllTransactions,
  getValidationErros,
  getTransactionsById,
  deleteTransactionById,
  getTransactionsByMonth,
}