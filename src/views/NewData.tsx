import React from 'react';
import {motion} from "framer-motion";
import  NavigationBar from '../components/Navigation/Navigation'
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {AppContext} from '../services/context'
import {IncomeTransaction, ExpenseTransaction, ActionType} from '../types/types'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewData() {
    const [open, setOpen] = React.useState(false);
    const [close, setClose] = React.useState(false);
    let [ToggleExpense, setToggleExpense] = React.useState(true)
    let [TransactionName, setTransactionName] = React.useState<string>('')
    let [TransactionAmount, setTransactionAmount] = React.useState<number>(0)
    let [incometransactions, setincometransactions] = React.useState<IncomeTransaction[]>([])
    let [expensetransactions, setexpensetransactions] = React.useState<ExpenseTransaction[]>([])
    const transaction = React.useContext(AppContext)
    
    React.useEffect(()=>{
        setincometransactions(transaction.state.Income)
        setexpensetransactions(transaction.state.Expense)
    },[transaction.state.Income, transaction.state.Expense])

    var transitionWay: number = window.innerWidth
    
    const side_animate = {
        open: {
            x: [transitionWay, 0],
            scale: [0, 1],
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                duration: 0.4,
            }
        },
        closed: {
            x: -transitionWay,
            scale: 0,
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.4,
            }
        }
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseOpen = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false)
    }

    const handleClickClose = () => {
        setClose(true);
    };
    
    const handleCloseClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
          return;
      }
      setClose(false)
    }
    const handleChange = () => {
        setToggleExpense(!ToggleExpense)
        setTransactionName('')
        setTransactionAmount(0)
    };
    const handeladdIncome = (name: string, amount: number) => {
        transaction.dispatch({
            type: ActionType.CreateINCOME,
            payload: {
                id: Math.round(Math.random() * 10000),
                name,
                amount
            }
        })
        handleClickOpen()
    }

    const handeladdExpense = (name: string, amount: number) => {
        transaction.dispatch({
            type: ActionType.CreateEXPENSE,
            payload: {
                id: Math.round(Math.random() * 10000),
                name,
                amount
            }
        })
        handleClickOpen()
    }
    const handledeleteIncome = (id: number) => {
        transaction.dispatch({
            type: ActionType.DeleteINCOME,
            payload: {
                id
            }
        })    
        handleClickClose()  
    };
    const handledeleteExpense = (id: number) => {
        transaction.dispatch({
            type: ActionType.DeleteEXPENSE,
            payload: {
                id
            }
        })  
        handleClickClose()   
    };

    return (
        <motion.div className="NewData"
                    variants={side_animate}
                    initial={"closed"}
                    animate={"open"}
        >
            <div className="NewData-Nav">
                <NavigationBar add={false} goto='/reports-back'/>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseOpen}>
                <Alert onClose={handleCloseOpen} severity="success">
                    {ToggleExpense ? 'Income Added' : 'Expense Added'}
                </Alert>
            </Snackbar>
            <Snackbar open={close} autoHideDuration={6000} onClose={handleCloseClose}>
                <Alert onClose={handleCloseClose} severity="warning">
                    {ToggleExpense ? 'Income Deleted' : 'Expense Deleted'}
                </Alert>
            </Snackbar>
            <div className="NewData-Add-Tab">
                <Paper elevation={12} className="NewData-Add-Tab-Center">
                    <Grid container className="NewData-Add-Tab-Center-Details">
                        <Grid item xs={6} sm={12}>
                            <h1>
                                Master Payment System&nbsp;
                                <span className="NewData-Add-Toggle">
                                    <Switch
                                        onChange={handleChange}
                                        name="toggleExpense"
                                        inputProps={{ 'aria-label': 'toggleExpense' }}
                                    />
                                </span>
                            </h1>
                        </Grid>
                        <Grid item xs={6} sm={12}>
                        <Grid className="NewData-Add-Tab-Center-Details-TF" item xs={12}>
                            <TextField
                            id="outlined-full-width"
                            value={TransactionName}
                            autoComplete='off'
                            placeholder={ToggleExpense ? 'Income Deposit' : 'Expense Spent'}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                setTransactionName(event.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            size="small"
                            />
                        </Grid>
                        <Grid className="NewData-Add-Tab-Center-Details-TF" item xs={12}>
                            <TextField
                            id="outlined-full-width"
                            value={TransactionAmount}
                            autoComplete='off'
                            placeholder={ToggleExpense ? '200$' : '-2000$'}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                setTransactionAmount(Number(event.target.value))
                            }}
                            type="number"
                            variant="outlined"
                            size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button fullWidth variant="contained" color="primary" onClick={()=>{
                                ToggleExpense ? handeladdIncome(TransactionName, TransactionAmount) : handeladdExpense(TransactionName, -(TransactionAmount))
                            }}>
                                {ToggleExpense ? 'Add Income' : 'Add Expense'}
                            </Button>
                        </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <div className="NewData-View-Tab">
                <div className='NewData-View-Tab-Opener'>
                    <hr/>
                </div>
                <div className="NewData-View-Tab-Main-Head">
                    Transactions
                </div>
                <div className="NewData-View-Tab-Main">
                    {
                        incometransactions.map((data, index)=>{
                            return(
                                <Grid key={index} container className="NewData-View-Tab-Main-List">
                                    <Grid item xs={3} className="NewData-View-Tab-Main-List-Item-Center">
                                    <Avatar variant="rounded" style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>{data.name.slice(0,1).toUpperCase()}</Avatar>
                                    </Grid>
                                    <Grid item xs={6} className="NewData-View-Tab-Main-List-Item-Center">
                                        <label id={data.name}>
                                            {data.name}
                                        </label>
                                        <Chip className="NewData-View-Tab-Main-List-Item-Center-Chip-IN"
                                            size="small"
                                            label={data.name + ' Deposit'}
                                            onDelete={()=>{
                                                handledeleteIncome(data.id)
                                            }}
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={3} id={data.amount.toString()} className="NewData-View-Tab-Main-List-Item-Center">
                                        ${data.amount}
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                    {
                        expensetransactions.map((data, index)=>{
                            return(
                                <Grid key={index} container className="NewData-View-Tab-Main-List">
                                    <Grid item xs={3} className="NewData-View-Tab-Main-List-Item-Center">
                                    <Avatar variant="rounded" style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>{data.name.slice(0,1).toUpperCase()}</Avatar>
                                    </Grid>
                                    <Grid item xs={6} className="NewData-View-Tab-Main-List-Item-Center">
                                        <label>
                                            {data.name}
                                        </label>
                                        <Chip className="NewData-View-Tab-Main-List-Item-Center-Chip-EX"
                                            size="small"
                                            label={data.name + ' Spent'}
                                            onDelete={()=>{
                                                handledeleteExpense(data.id)
                                            }}
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={3} className="NewData-View-Tab-Main-List-Item-Center">
                                        ${data.amount}
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </div>
            </div>
        </motion.div>
    );
}

export default NewData;
