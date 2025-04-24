import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Link, Chip, Card, CardContent, Typography } from "@mui/material";

interface Breach {
  Name: string;
  Title: string;
  BreachDate: string;
  AddedDate: string;
}
const DataBreachFeed = () => {
  const [breaches, setBreaches] = useState<Breach[]>([]);

  useEffect(() => {
    fetch("https://haveibeenpwned.com/api/v3/breaches")
      .then((res) => res.json())
      .then((data) => setBreaches(data.slice(0, 5)));
  }, []);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Recent Data Breaches
        </Typography>
        <List>
          {breaches.map((breach, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Link
                    href={`https://haveibeenpwned.com/PwnedWebsites#${breach.Name}`}
                    target="_blank"
                  >
                    {breach.Title}
                  </Link>
                }
                secondary={`Breach Date: ${breach.BreachDate}`}
              />
              <Chip label={breach.Name} variant="outlined" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DataBreachFeed;
