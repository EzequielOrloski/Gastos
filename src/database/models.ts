import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Categorias extends Model {
  static table = 'categorias';

  @field('type')
  type!: string;

  @field('name')
  name!: string;

  @field('icon')
  icon!: string;

  @field('color')
  color!: string;
}

class Transaction extends Model {
  static table = 'transaction';

  @field('type')
  type!: string;

  @field('name')
  name!: string;

  @field('date')
  date!: string;

  @field('amount')
  amount!: number;

  @field('description')
  description!: string;

  @field('index')
  index!: string;

  @field('categoria_id')
  categoria_id!: string;
}

export {
  Transaction,
  Categorias
}