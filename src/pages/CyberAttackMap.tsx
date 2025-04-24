import { Card, CardContent, Typography } from "@mui/material";

const AttackMap = () => (
  <Card sx={{ mt: 4, height: 500 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Live Cyber Attack Map
      </Typography>
      <iframe
        src="https://threatmap.checkpoint.com/"
        style={{ width: "100%", height: "400px", border: "none" }}
        title="Live Cyber Attack Map"
      />
    </CardContent>
  </Card>
);

export default AttackMap;