import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIRoute, SliceNameSpace, Status } from 'consts/enum';
import api from 'services/api';
import { RootState } from 'store';
import { Categories, Product, Products, ProductsQuery, Range, Types } from 'types/product';

type InitialState = {
  productsForSearch: Product[];
  ranges: Range;
  paginationLength: number;
  products: Products;
  product: Product | null;
  laptops: Products;
  desktops: Products;
  types: Types[];
  categories: Categories[];
  productsStatus: Status;
  laptopStatus: Status;
  desktopsStatus: Status;
  productStatus: Status;
  categoriesStatus: Status;
  typesStatus: Status;
};

const initialState: InitialState = {
  productsForSearch: [],
  product: null,
  productStatus: Status.Idle,
  ranges: {
    totalMax: 0,
    totalMin: 0,
    rangedProducts: {
      range: []
    }
  },
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

  categories: [],
  types: [],
  productsStatus: Status.Idle,
  laptopStatus: Status.Idle,
  desktopsStatus: Status.Idle,
  categoriesStatus: Status.Idle,
  typesStatus: Status.Idle,
  paginationLength: 0
};

export const getCategories = createAsyncThunk<Categories[], { isProducts?: boolean }>(
  `${SliceNameSpace.Products}/getCategories`,
  async (params) => {
    const { data } = await api.get<Categories[]>(APIRoute.Categories, {
      params
    });

    return data;
  }
);

export const getRanges = createAsyncThunk<Range, ProductsQuery>(
  `${SliceNameSpace.Products}/getRanges`,
  async (params) => {
    const { data } = await api.get<Range>(APIRoute.Range, { params });

    return data;
  }
);

export const getTypes = createAsyncThunk<Types[], ProductsQuery>(
  `${SliceNameSpace.Products}/getTypes`,
  async (params) => {
    const { data } = await api.get<Types[]>(APIRoute.Types, {
      params
    });

    return data;
  }
);

export const getProducts = createAsyncThunk<Products, ProductsQuery>(
  `${SliceNameSpace.Products}/getProducts`,
  async (params) => {
    const { data } = await api.get<Products>(APIRoute.Products, {
      params
    });

    return data;
  }
);

export const getProduct = createAsyncThunk<Product, { id: string }>(
  `${SliceNameSpace.Products}/getProduct`,
  async ({ id }) => {
    const { data } = await api.get<Product>(`${APIRoute.Product}/${id}`);

    return data;
  }
);

export const getHomePageProducts = createAsyncThunk(
  `${SliceNameSpace.Products}/getHomePageProducts`,
  async () => {
    const [desktops, laptops, all] = await Promise.all([
      api.get<Products>(APIRoute.Products, {
        params: {
          category: [1]
        }
      }),
      api.get<Products>(APIRoute.Products, {
        params: {
          category: [2]
        }
      }),
      api.get<Products>(APIRoute.Products)
    ]);

    return {
      products: all.data,
      laptops: laptops.data,
      desktops: desktops.data
    };
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
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productStatus = Status.Success;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.productStatus = Status.Error;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.productStatus = Status.Loading;
      })
      .addCase(getHomePageProducts.fulfilled, (state, action) => {
        state.productsStatus = Status.Success;
        state.laptops = action.payload.laptops;
        state.desktops = action.payload.desktops;
        state.products = action.payload.products;
        state.productsForSearch = action.payload.products.products;
      })
      .addCase(getHomePageProducts.rejected, (state) => {
        state.productsStatus = Status.Error;
      })
      .addCase(getHomePageProducts.pending, (state) => {
        state.productsStatus = Status.Loading;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload;
        state.typesStatus = Status.Success;
      })
      .addCase(getTypes.rejected, (state) => {
        state.typesStatus = Status.Error;
      })
      .addCase(getTypes.pending, (state) => {
        state.typesStatus = Status.Loading;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = Status.Success;
      })
      .addCase(getCategories.rejected, (state) => {
        state.typesStatus = Status.Error;
      })
      .addCase(getCategories.pending, (state) => {
        state.typesStatus = Status.Loading;
      })
      .addCase(getRanges.fulfilled, (state, action) => {
        state.ranges = action.payload;
      });
  }
});

export const selectProductsStatus = (state: RootState) =>
  state[SliceNameSpace.Products].productsStatus;
export const selectProductStatus = (state: RootState) =>
  state[SliceNameSpace.Products].productStatus;
export const selectTypesStatus = (state: RootState) => state[SliceNameSpace.Products].typesStatus;
export const selectCategoriesStatus = (state: RootState) =>
  state[SliceNameSpace.Products].categoriesStatus;
export const selectProducts = (state: RootState) => state[SliceNameSpace.Products].products;
export const selectProductsForSearch = (state: RootState) =>
  state[SliceNameSpace.Products].productsForSearch;
export const selectProduct = (state: RootState) => state[SliceNameSpace.Products].product;
export const selectLaptops = (state: RootState) => state[SliceNameSpace.Products].laptops;
export const selectDesktops = (state: RootState) => state[SliceNameSpace.Products].desktops;
export const selectTypes = (state: RootState) => state[SliceNameSpace.Products].types;
export const selectCategories = (state: RootState) => state[SliceNameSpace.Products].categories;
export const selectRanges = (state: RootState) => state[SliceNameSpace.Products].ranges;
export const selectPaginationLength = (state: RootState) =>
  state[SliceNameSpace.Products].paginationLength;

export default productSlice.reducer;
