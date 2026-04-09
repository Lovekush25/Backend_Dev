import express from "express";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
