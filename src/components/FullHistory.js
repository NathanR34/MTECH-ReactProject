import { CardContent, Card, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


export default function FullHistory ({historyArr}) {

    console.log('historyArr', historyArr)
    const addCommaToNumbers = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

    return(
        <div>
            <h1>Full History</h1>
            <div> {historyArr.map((tran, index) => (
            <ListItem key={index * 2} className="flex-col hListItem" component="div">
                <Card key={index * 3} className="historyCard">
                <CardContent key={index * 4 }>
                    <ListItemText key={index} className={tran.type}>
                    {" "}
                    {tran.title}: {addCommaToNumbers(tran.amount)} {tran.date}
                    </ListItemText>
                </CardContent>
                </Card>
            </ListItem>
            ))}</div>
        </div>
    )
}