export const products = [
  {
    isFeatured: true,
    id: "haojin-125",
    name: "Haojin 125 Motor",
    image: "/images/haojin-125.png",
    price: 13450.0,
    isFavorite: false,
  },
  {
    isFeatured: true,
    id: "apsonic-oil",
    name: "Apsonic Oil",
    image: "/images/haojin-125.png",
    price: 13450.0,
    isFavorite: false,
  },
  {
    id: "valve",
    name: "Valve",
    isFeatured: false,
    image: "/images/haojin-125.png",
    price: 13450.0,
    isFavorite: false,
  },
  {
    id: "axil",
    name: "Axil (Haojin) Back",
    isFeatured: true,
    image: "/images/haojin-125.png",
    price: 13450.0,
    isFavorite: false,
  },
];

export const getProductById = (productId) => {
  const product = products.filter((product) => product.id === productId);
  return product;
};

export const getProductBySearch = (searchId) => {
  if (searchId === undefined) {
    return "";
  } else {
    const searchedProduct = products.filter(
      (product) =>
        product.name.split(" ")[0].toUpperCase() ===
        searchId.split(" ")[0].toUpperCase()
    );
    return searchedProduct;
  }
};

export const getFeaturedProduct = () => {
  return products.filter((product) => product.isFeatured);
};

export const sendCartData = async (cartData) => {
  const { id, data } = cartData;

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "applicaton/json",
    },
    body: JSON.stringify({
      id,
      data,
    }),
  });

  const result = await response.json();
  console.log(result);
};

// occq yniy tmxv rrry

export const fetchData = async () => {
  try {
    const response = await fetch("/api/cart");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Failed to fetch");
  }
};

export const sendCartForm = async () => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    body: JSON.stringify({
      to: "whyworryacademy@gmail.com",
      subject: "Test Email",
      text: "This is a test email",
      html: "<h1>Test title</h1><p>Some body text</p>",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result);
};
