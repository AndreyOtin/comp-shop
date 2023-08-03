import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIRoute, SliceNameSpace, Status } from 'consts/enum';
import api from 'services/api';
import { RootState } from 'store';
import { Product, Products, ProductsQuery } from 'types/product';

type InitialState = {
  paginationLength: number;
  products: Products;
  laptops: Products;
  desktops: Products;
  productsStatus: Status;
  laptopStatus: Status;
  desktopsStatus: Status;
};

const initialState: InitialState = {
  products: {
    count: 0,
    products: []
  },
  desktops: {
    count: 0,
    products: []
  },
  laptops: {
    count: 0,
    products: []
  },

  productsStatus: Status.Idle,
  laptopStatus: Status.Idle,
  desktopsStatus: Status.Idle,
  paginationLength: 0
};

export const getProducts = createAsyncThunk<Products, ProductsQuery>(
  `${SliceNameSpace.Products}/getProducts`,
  async (params) => {
    const { data } = await api.get<Products>(APIRoute.Products, {
      params
    });
    await new Promise((res) => setTimeout(res, 1000));
    return data;
  }
);

export const getLaptops = createAsyncThunk<Products, ProductsQuery>(
  `${SliceNameSpace.Products}/getLaptops`,
  async (params) => {
    const { data } = await api.get<Products>(APIRoute.Products, {
      params: { category: 1, ...params }
    });
    await new Promise((res) => setTimeout(res, 1000));
    return data;
  }
);

export const getDesktops = createAsyncThunk<Products, ProductsQuery>(
  `${SliceNameSpace.Products}/getDesktops`,
  async (params) => {
    const { data } = await api.get<Products>(APIRoute.Products, {
      params: { category: 2, ...params }
    });
    await new Promise((res) => setTimeout(res, 1000));
    return data;
  }
);

const productSlice = createSlice({
  initialState,
  name: SliceNameSpace.Products,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsStatus = Status.Success;
        state.products = action.payload;
        state.paginationLength = action.payload.count;
      })
      .addCase(getProducts.rejected, (state) => {
        state.productsStatus = Status.Error;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.productsStatus = Status.Loading;
      })
      .addCase(getLaptops.fulfilled, (state, action) => {
        state.laptopStatus = Status.Success;
        state.laptops = action.payload;
        state.paginationLength = action.payload.count;
      })
      .addCase(getLaptops.rejected, (state) => {
        state.laptopStatus = Status.Error;
      })
      .addCase(getLaptops.pending, (state, action) => {
        state.laptopStatus = Status.Loading;
      })
      .addCase(getDesktops.fulfilled, (state, action) => {
        state.desktopsStatus = Status.Success;
        state.desktops = action.payload;
        state.paginationLength = action.payload.count;
      })
      .addCase(getDesktops.rejected, (state) => {
        state.desktopsStatus = Status.Error;
      })
      .addCase(getDesktops.pending, (state, action) => {
        state.desktopsStatus = Status.Loading;
      });
  }
});

export const selectProductStatus = (state: RootState) =>
  state[SliceNameSpace.Products].productsStatus;
export const selectProducts = (state: RootState) => state[SliceNameSpace.Products].products;
export const selectLaptops = (state: RootState) => state[SliceNameSpace.Products].laptops;
export const selectDesktops = (state: RootState) => state[SliceNameSpace.Products].desktops;
export const selectPaginationLength = (state: RootState) =>
  state[SliceNameSpace.Products].paginationLength;
export const selectLaptopsStatus = (state: RootState) =>
  state[SliceNameSpace.Products].laptopStatus;
export const selectDesktopsStatus = (state: RootState) =>
  state[SliceNameSpace.Products].desktopsStatus;

export default productSlice.reducer;
