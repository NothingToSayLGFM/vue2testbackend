const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;

const products = [
  {
    name: "product1",
    category: "category1",
    id: 1,
    width: 1500,
    height: 300,
    img: `http://localhost:3000/images/1.png`,
  },
  {
    name: "product2",
    category: "category2",
    id: 2,
    width: 1500,
    height: 300,
    img: "http://localhost:3000/images/2.png",
  },
  {
    name: "product3",
    category: "category3",
    id: 3,
    width: 1500,
    height: 300,
    img: "http://localhost:3000/images/3.png",
  },
  {
    name: "product4",
    category: "category4",
    id: 4,
    width: 1500,
    height: 300,
    img: "http://localhost:3000/images/4.png",
  },
  {
    name: "product5",
    category: "category5",
    id: 5,
    width: 1500,
    height: 300,
    img: "http://localhost:3000/images/5.png",
  },
];

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());

app.get("/products", (req, res) => {
  const { categories } = req.query;

  if (categories) {
    const categoryArray = categories.split(',');
    const filteredProducts = products.filter(product => categoryArray.includes(product.category));

    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.get("/categories", (req, res) => {
  const categories = products.map((el) => el.category);
  res.json(categories);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
