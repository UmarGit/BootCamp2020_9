import {IncomeTransactionActions, ExpenseTransactionActions, IncomeTransaction, ExpenseTransaction, ActionType} from '../types/types'


export const IncomeTransactionReducer = (
    state: IncomeTransaction[],
    action: IncomeTransactionActions
) => {
    switch (action.type) {
        case ActionType.CreateINCOME:
            return [...state, action.payload];
        case ActionType.DeleteINCOME:
            return [...state.filter(({id}: IncomeTransaction)=>{ return id !== action.payload.id})]
        default:
            return state;
    }
};

export const ExpenseTransactionReducer = (
    state: ExpenseTransaction[],
    action: ExpenseTransactionActions
) => {
    switch (action.type) {
        case ActionType.CreateEXPENSE:
            return [...state, action.payload];
        case ActionType.DeleteEXPENSE:
            return [...state.filter(({id}: IncomeTransaction)=>{ return id !== action.payload.id})]
        default:
            return state;
    }
};