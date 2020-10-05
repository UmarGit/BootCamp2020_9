import React from 'react';
import {motion} from "framer-motion";
import {Button} from "@material-ui/core";
import  NavigationBar from '../../components/Navigation/Navigation'
import BarChart from './BarChart/BarChart'
import DoughnutChart from './DoughnutChart/DoughnutChart'
import {AppContext} from '../../services/context'
import {Transactions} from '../../types/types'

function REPORT_MAIN() {
    let [toggle, setToggle] = React.useState(true)
    let [transactions, settransactions] = React.useState<Transactions>({
        IncomeName: [],
        IncomeAmount: [],
        ExpenseName: [],
        ExpenseAmount: []
    })
    let [totalIncome, setIncome] = React.useState<number>(0)
    let [totalExpense, setExpense] = React.useState<number>(0)
    
    const transaction = React.useContext(AppContext)
    
    React.useEffect(()=>{
        let in_name: string[] = []
        let in_amount: number[] = []
        transaction.state.Income.map((data)=>{
            return(
                in_name.push(data.name),
                in_amount.push(data.amount)
            )
        })
        let ex_name: string[] = []
        let ex_amount: number[] = []
        transaction.state.Expense.map((data)=>{
            return(
                ex_name.push(data.name),
                ex_amount.push(data.amount)
            )
        })

        settransactions({
            IncomeName: [...in_name],
            IncomeAmount: [...in_amount],
            ExpenseName: [...ex_name],
            ExpenseAmount: [...ex_amount]
        })
        let in_total = 0
        in_total = in_amount.reduce((a: number, b: number)=> { return a + b; }, 0)

        let ex_total = 0
        ex_total = ex_amount.reduce((a: number, b: number)=> { return a + b; }, 0)
        
        setIncome(in_total)
        setExpense(ex_total)
        
    },[transaction.state.Income, transaction.state.Expense])
    

    var transitionWay: number = window.innerHeight

    var dataGlobal = {
        income: {
            label: 'Income',
            data: transactions.IncomeAmount,
            backgroundColor: 'rgba(0, 211, 132, 0.2)',
            borderColor: 'rgba(0, 211, 132)',
            borderWidth: 1,
        },
        expense: {
            label: 'Income',
            data: transactions.ExpenseAmount,
            backgroundColor: 'rgba(255, 0, 97, 0.2)',
            borderColor: 'rgba(255, 0, 97)',
            borderWidth: 1,
        }
    }

    const data = {
        labels: toggle ? transactions.IncomeName : transactions.ExpenseName,
        datasets: [toggle ? dataGlobal.income : dataGlobal.expense]
    }

    const data2 = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Income',
                data: [totalIncome, totalExpense],
                backgroundColor: ['rgba(0, 211, 132, 0.2)', 'rgba(255, 0, 97, 0.2)'],
                borderColor: ['rgba(0, 211, 132)', 'rgba(255, 0, 97)'],
                borderWidth: 1,
            },
        ]
    }

    const side_animate = {
        open: {
            y: [transitionWay, 0],
            opacity: [0, 1],
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                delay: 0.8
            }
        },
        closed: {
            y: -transitionWay,
            opacity: 0,
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    }


    return (
        <motion.div className="Report"
                    variants={side_animate}
                    initial={"closed"}
                    animate={"open"}
        >
            <div className='Report-Display'>
                <div className='Report-Display-Nav'>
                    <NavigationBar goto='/' add={true}/>
                </div>
                <div className='Report-Display-Box'>
                    <div className='Report-Display-Heading'>
                        Current Balance
                    </div>
                    <div className='Report-Display-Balance'>
                        ${totalIncome + totalExpense}
                    </div>
                </div>
            </div>
            <div className="Report-Chart">
                <div className='Report-Chart-Tab-View'>
                    <Button className={`Report-Chart-Tab-View-Inner IN ${ toggle ? 'Report-Chart-Tab-View-Current-Tab' : null}`} onClick={()=>{setToggle(true)}}>INCOME</Button>
                    <Button className={`Report-Chart-Tab-View-Inner EX ${ !toggle ? 'Report-Chart-Tab-View-Current-Tab' : null}`} onClick={()=>{setToggle(false)}}>EXPENSE</Button>
                </div>
                <div className='Report-Chart-Bar-View'>
                    <BarChart chartData={data}/>
                </div>
                <div className='Report-Chart-Doughnut'>
                    <div className='Report-Chart-Doughnut-Opener'>
                        <hr/>
                    </div>
                    <h2>EXPENSE LIMIT</h2>
                    <div className='Report-Chart-Doughnut-Viewer'>
                        <div className='Report-Chart-Doughnut-Viewer-Container'>
                            <DoughnutChart chartData={data2} />
                        </div>
                        <div className='Report-Chart-Doughnut-Viewer-Text'>
                            <i>Your Expense Limit</i>
                            <b>${totalIncome + totalExpense} of {totalIncome}</b>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default REPORT_MAIN;
