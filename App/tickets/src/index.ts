import { app } from "./providers/app";

const port: number = 8000;

// Start server
app.listen(port, () => {
    console.log(`Ticket Server is live on port ${port}`);
});
