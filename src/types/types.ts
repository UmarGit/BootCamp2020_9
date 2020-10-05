export type matches = {
    history: object, 
    location: object, 
    match: object, 
    staticContext: undefined
}

export type IncomeTransaction = {
    id: number,
    name: string,
    amount: number
}

export type ExpenseTransaction = {
    id: number,
    name: string,
    amount: number
}

export type HybirdTransaction = {
    Income: IncomeTransaction[],
    Expense: ExpenseTransaction[]
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export enum ActionType {
    CreateINCOME = "CREATE_INCOME_Transaction",
    DeleteINCOME = "DELETE_INCOME_Transaction",
    CreateEXPENSE = "CREATE_EXPENSE_Transaction",
    DeleteEXPENSE = "DELETE_EXPENSE_Transaction"
}

type TransactionPayload = {
    [ActionType.CreateINCOME]: {
        id: number,
        name: string,
        amount: number
    };
    [ActionType.DeleteINCOME]: {
        id: number,
    };
    [ActionType.CreateEXPENSE]: {
        id: number,
        name: string,
        amount: number
    };
    [ActionType.DeleteEXPENSE]: {
        id: number,
    };
};

export type IncomeTransactionActions = ActionMap<TransactionPayload>[keyof ActionMap<TransactionPayload>];


export type ExpenseTransactionActions = ActionMap<TransactionPayload>[keyof ActionMap<TransactionPayload>];

export type Transactions= {
    IncomeName: string[],
    IncomeAmount: number[],
    ExpenseName: string[],
    ExpenseAmount: number[],
}