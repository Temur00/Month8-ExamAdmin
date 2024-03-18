export type ProductType = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
};

export type ProductStoreType = {
  loading: boolean;
  students: ProductType[];
  error: any;
  getProducts: () => void;
};

export type Item = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
};
