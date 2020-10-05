import React from 'react'
import { HybirdTransaction, IncomeTransactionActions, ExpenseTransactionActions } from '../types/types'
import { IncomeTransactionReducer, ExpenseTransactionReducer } from './reducer'

const initialTransaction: HybirdTransaction = {
    Income: [
        {
            id: 223,
            name: 'Cash',
            amount: 2799
        },
        {
            id: 313,
            name: 'Cash',
            amount: 69
        }
    ],
    Expense: [
        {
            id: 123,
            name: 'Cash',
            amount: -2399
        },
        {
            id: 113,
            name: 'Cash',
            amount: -99
        }
    ]
}

export const AppContext = React.createContext<{
    state: HybirdTransaction;
    dispatch: React.Dispatch<IncomeTransactionActions | ExpenseTransactionActions>;
  }>({
    state: initialTransaction,
    dispatch: () => null
  });

const mainReducer = ({ Income, Expense }: HybirdTransaction, action: IncomeTransactionActions | ExpenseTransactionActions) => ({
    Income: IncomeTransactionReducer(Income, action),
    Expense: ExpenseTransactionReducer(Expense, action),
});

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(mainReducer, initialTransaction)

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}