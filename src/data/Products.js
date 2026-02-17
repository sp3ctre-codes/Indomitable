const sizePresets = {
  shirt: ["S", "M", "L", "XL", "2XL"],
  trouser: ["30", "32", "34", "36", "38"],
  shoe: ["40", "41", "42", "43", "44"],
  dress: ["30", "32", "34", "36", "38"],
  none: [],
};

const colorPresets = {
  shirt: ["Black", "White", "Gray", "Navy"],
  trouser: ["Blue", "Black", "Gray"],
  shoe: ["White", "Black"],
  dress: ["Red", "Black", "Pink"],
  none: [],
};

export const menProducts = [
  {
    id: 1,
    title: "Yarission Cotton Vest (3pcs)",
    image: "/yarrison.jpeg",
    price: 1480,
    category: "Vest",
    sizes: sizePresets.shirt,
    colors: colorPresets.shirt,
  },
  {
    id: 2,
    title: "V9 Jeans for Men",
    image: "/v9jeans.jpg",
    price: 499,
    category: "Jeans",
    sizes: sizePresets.trouser,
    colors: colorPresets.trouser,
  },
  {
    id: 3,
    title: "Nike Airforce White",
    image: "/Nike-Airforce.jpg",
    price: 1299,
    category: "Airforce",
    sizes: sizePresets.shoe,
    colors: colorPresets.shoe,
  },
  {
    id: 4,
    title: "Flannel Shirts",
    image: "/Flannels.jpg",
    price: 1480,
    category: "Flannels",
    sizes: sizePresets.shirt,
    colors: colorPresets.shirt,
  },

  // Repeat pattern properly
  ...Array.from({ length: 14 }, (_, i) => {
    const baseId = 5 + i;
    const type = baseId % 3;

    if (type === 1) {
      return {
        id: baseId,
        title: "Yarission Cotton Vest (3pcs)",
        image: "/yarrison.jpeg",
        price: 1480,
        category: "Tops",
        sizes: sizePresets.shirt,
        colors: colorPresets.shirt,
      };
    }

    if (type === 2) {
      return {
        id: baseId,
        title: "V9 Jeans for Men",
        image: "/v9jeans.jpg",
        price: 499,
        category: "Bottoms",
        sizes: sizePresets.trouser,
        colors: colorPresets.trouser,
      };
    }

    return {
      id: baseId,
      title: "Nike Airforce White",
      image: "/Nike-Airforce.jpg",
      price: 1299,
      category: "Footwear",
      sizes: sizePresets.shoe,
      colors: colorPresets.shoe,
    };
  }),
];

export const womenProducts = Array.from({ length: 18 }, (_, i) => {
  const id = 19 + i;
  const type = id % 3;

  if (type === 1) {
    return {
      id,
      title: "Women's Cotton Top",
      image: "/yarrison.jpeg",
      price: 1480,
      category: "Tops",
      sizes: sizePresets.shirt,
      colors: colorPresets.shirt,
    };
  }

  if (type === 2) {
    return {
      id,
      title: "Women's Jeans",
      image: "/v9jeans.jpg",
      price: 499,
      category: "Bottoms",
      sizes: sizePresets.trouser,
      colors: colorPresets.trouser,
    };
  }

  return {
    id,
    title: "Women's Sneakers",
    image: "/Nike-Airforce.jpg",
    price: 1299,
    category: "Footwear",
    sizes: sizePresets.shoe,
    colors: colorPresets.shoe,
  };
});

export const unisexProducts = Array.from({ length: 18 }, (_, i) => {
  const id = 37 + i;
  const type = id % 3;

  if (type === 1) {
    return {
      id,
      title: "Unisex Cotton Top",
      image: "/yarrison.jpeg",
      price: 1480,
      category: "Tops",
      sizes: sizePresets.shirt,
      colors: colorPresets.shirt,
    };
  }

  if (type === 2) {
    return {
      id,
      title: "Unisex Jeans",
      image: "/v9jeans.jpg",
      price: 499,
      category: "Bottoms",
      sizes: sizePresets.trouser,
      colors: colorPresets.trouser,
    };
  }

  return {
    id,
    title: "Unisex Sneakers",
    image: "/Nike-Airforce.jpg",
    price: 1299,
    category: "Footwear",
    sizes: sizePresets.shoe,
    colors: colorPresets.shoe,
  };
});
