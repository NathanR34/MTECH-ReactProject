import { CardContent, Card, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function History({ historyArr }) {
  const historyOverview = historyArr.slice(-4);
  const addCommaToNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="spending-history">
      <h2>History:</h2>
      <List className="historyList">
        {historyOverview.map((tran, index) => (
          <ListItem className="flex-col hListItem" component="div">
            <Card className="historyCard">
              <CardContent>
                <ListItemText key={index} className={tran.type}>
                  {" "}
                  {tran.title}: {addCommaToNumbers(tran.amount)} {tran.date}
                </ListItemText>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
