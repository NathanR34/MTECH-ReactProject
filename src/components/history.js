import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { historyArr } from "../ExpenseTracker";

export default function History({ historyArr }) {
  const historyOverview = historyArr.slice(-4);
  console.log();
  return (
    <div className="spending-history w-1/2 flex flex-col">
      <h2>History:</h2>
      <ListItem className="flex-col" component="div" disablePadding>
        {historyOverview.map((tran, index) => (
          <ListItemText key={index}>
            {" "}
            {tran.title}: {tran.amount}
          </ListItemText>
        ))}
      </ListItem>
    </div>
  );
}
/*
// import {historyArr} from "../ExpenseTracker"


export default function History({historyArr}){
    
    // if(historyArr !== []){
    //     return(
    //         <div>No history yet, please add some transactions to see it here.</div>
    //     )
    // }

    const historyOverview = historyArr.slice(-4)

    console.log()

    // console.log(historyArr[historyArr.length - 1])
    // historyArr = ([historyArr[historyArr.length - 1]])
    

    return (
        <div className='spending-history'>
        <h2>History:</h2>
        <ul>
            {historyOverview.map((tran, index) => (
                <li key={index} >{tran.title}: {tran.amount}</li>
            ))}
        </ul>
    </div>
    )
}
*/
