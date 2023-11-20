import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function History({ historyArr }) {

  const historyOverview = historyArr.slice(-4);
<<<<<<< Updated upstream
=======
  const addCommaToNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
>>>>>>> Stashed changes
  console.log();
  return (
    <div className="spending-history w-1/2 flex flex-col">
      <h2>History:</h2>
      <ListItem className="flex-col" component="div">
        {historyOverview.map((tran, index) => (
          <ListItemText key={index}>
<<<<<<< Updated upstream
            {" "}
            {tran.title}: {tran.amount}
=======
            {tran.title}: {addCommaToNumbers(tran.amount)}
>>>>>>> Stashed changes
          </ListItemText>
        ))}
      </ListItem>
    </div>
  );
}
