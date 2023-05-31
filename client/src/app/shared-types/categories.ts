export interface IIncomeCategory {
  _id: string;
  name: string;
}

export interface IExpenseCategory {
  _id: string;
  name: string;
  subcategories: string[];
}
