import { create } from "zustand";
import { ProductStoreType } from "../types/Products.type";

const useProduct = create<ProductStoreType>((set) => ({
  loading: false,
  students: [],
  error: null,
  getProducts: async () => {
    try {
      set(() => ({
        loading: true,
      }));
      const res = await fetch(
        "https://65bb677f52189914b5bc02b7.mockapi.io/teachers"
      );
      const data = await res.json();
      set(() => ({
        loading: false,
        students: data,
        error: null,
      }));
    } catch (err: any) {
      set(() => ({
        loading: false,
        error: err.message,
      }));
    }
  },
}));

export default useProduct;
