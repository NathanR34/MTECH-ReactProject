import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {getDate} from '../App'


export default function History({ historyArr }) {

  console.log(getDate())

  const historyOverview = historyArr.slice(-4);
  const addCommaToNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  console.log();
  return (
    <div className="spending-history w-1/2 flex flex-col">
      <h2>History:</h2>
      <ListItem className="flex-col" component="div" disablePadding>
        {historyOverview.map((tran, index) => (
          <ListItemText key={index}>
            {" "}
            {tran.title}: {addCommaToNumbers(tran.amount)}  {tran.date}
          </ListItemText>
        ))}
      </ListItem>
    </div>
  );
}
