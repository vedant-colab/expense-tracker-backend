export interface IExpense {
    title : string;
    amount : number;
    category : string;
    note ?: string;
    type : 'income' | 'expense'
    date : Date,
    userID : string
}