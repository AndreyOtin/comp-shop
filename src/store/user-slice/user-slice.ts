import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_NAME } from 'consts/app';
import { APIRoute, SliceNameSpace, Status, UserStatus } from 'consts/enum';
import api from 'services/api';
import { removeToken, setToken } from 'services/token';
import { RootState } from 'store';
import { Cart, PurchasedProducts } from 'types/cart';
import { UserAuthantication, UserLogin } from 'types/user';

type InitialState = {
  authStatus: UserStatus;
  uploadStatus: Status;
  cart: Cart | null;
  cartStatus: Status;
  orderStatus: Status;
  sessionId: string;
  purchasedProducts: PurchasedProducts;
};

const initialState: InitialState = {
  authStatus: UserStatus.Unknown,
  cart: null,
  cartStatus: Status.Idle,
  uploadStatus: Status.Idle,
  orderStatus: Status.Success,
  sessionId: '',
  purchasedProducts: []
};

export const checkAuth = createAsyncThunk<Cart>(
  `${SliceNameSpace.User}/checkAuth`,
  async (_, { dispatch }) => {
    const { data } = await api.post<Cart>(APIRoute.CheckAuth);

    dispatch(getPurchased());

    return data;
  }
);

export const logOut = createAsyncThunk<Cart>(`${SliceNameSpace.User}/logOut`, async () => {
  const { data } = await api.post(APIRoute.UserSignout);

  removeToken(TOKEN_NAME);

  return data;
});

export const registerUser = createAsyncThunk<Cart, UserAuthantication>(
  `${SliceNameSpace.User}/registerUser`,
  async (body) => {
    const { data } = await api.post<Cart>(APIRoute.Register, body);

    setToken(TOKEN_NAME, data.token);

    return data;
  }
);

export const loginUser = createAsyncThunk<Cart, UserLogin>(
  `${SliceNameSpace.User}/loginUser`,
  async (body, { dispatch }) => {
    const { data } = await api.post<Cart>(APIRoute.Login, body);

    dispatch(getPurchased());

    setToken(TOKEN_NAME, data.token);

    return data;
  }
);

export const addToCart = createAsyncThunk<Cart, { productId: number; count: number }>(
  `${SliceNameSpace.User}/addToCart`,
  async (body) => {
    const timer = Date.now();
    const { data } = await api.post<Cart>(APIRoute.Cart, body);
    const currentTime = Date.now();

    if (currentTime - timer > 1000) {
      return data;
    }

    await new Promise((res) => setTimeout(() => res(null), 1000 - (currentTime - timer)));

    return data;
  }
);

export const updateCart = createAsyncThunk<
  Cart,
  { transactionId: number; count: number; productId: number }
>(`${SliceNameSpace.User}/updateCart`, async (body) => {
  const timer = Date.now();
  const { data } = await api.patch<Cart>(APIRoute.Cart, body);
  const currentTime = Date.now();

  if (currentTime - timer > 1000) {
    return data;
  }

  await new Promise((res) => setTimeout(() => res(null), 1000 - (currentTime - timer)));

  return data;
});

export const deleteCart = createAsyncThunk<Cart, { transactionId: number }>(
  `${SliceNameSpace.User}/deleteCart`,
  async ({ transactionId }) => {
    const timer = Date.now();
    const { data } = await api.delete<Cart>(APIRoute.Cart, {
      params: { transactionId }
    });
    const currentTime = Date.now();

    if (currentTime - timer > 1000) {
      return data;
    }

    await new Promise((res) => setTimeout(() => res(null), 1000 - (currentTime - timer)));

    return data;
  }
);

export const makeOrder = createAsyncThunk<string>(`${SliceNameSpace.User}/makeOrder`, async () => {
  const { data } = await api.get<{ sessionId: string }>(APIRoute.Order);
  return data.sessionId;
});

export const getPurchased = createAsyncThunk(`${SliceNameSpace.User}/getPurchased`, async () => {
  const { data } = await api.get<{ products: PurchasedProducts }>(APIRoute.Purshased);
  return data.products;
});

export const finishOrder = createAsyncThunk<Cart, string>(
  `${SliceNameSpace.User}/finishOrder`,
  async (secret) => {
    const timer = Date.now();
    const { data } = await api.post<Cart>(APIRoute.Order, { secret });

    const currentTime = Date.now();

    if (currentTime - timer > 1000) {
      return data;
    }

    await new Promise((res) => setTimeout(() => res(null), 1000 - (currentTime - timer)));
    return data;
  }
);

const userSlice = createSlice({
  initialState,
  name: SliceNameSpace.User,
  reducers: {
    logUserOut() {
      removeToken(TOKEN_NAME);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.cart = action.payload;
        state.cartStatus = Status.Success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
        state.cartStatus = Status.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.cart = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.authStatus = UserStatus.NoAuth;
        state.cart = null;
        state.purchasedProducts = [];
      })
      .addCase(registerUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(addToCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(updateCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(deleteCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      })
      .addCase(makeOrder.pending, (state) => {
        state.orderStatus = Status.Loading;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.sessionId = action.payload;
      })
      .addCase(getPurchased.fulfilled, (state, action) => {
        state.purchasedProducts = action.payload;
      })
      .addCase(finishOrder.pending, (state) => {
        state.orderStatus = Status.Loading;
      })
      .addCase(finishOrder.fulfilled, (state, action) => {
        state.orderStatus = Status.Success;
        state.sessionId = '';
        state.cart = action.payload;
      });
  }
});

export const selectUserStatus = (state: RootState) => state[SliceNameSpace.User].authStatus;
export const selectOrderStatus = (state: RootState) => state[SliceNameSpace.User].orderStatus;
export const selectUploadStatus = (state: RootState) => state[SliceNameSpace.User].uploadStatus;
export const selectUserCart = (state: RootState) => state[SliceNameSpace.User].cart;
export const selectPurchasedProducts = (state: RootState) =>
  state[SliceNameSpace.User].purchasedProducts;
export const selectSessonId = (state: RootState) => state[SliceNameSpace.User].sessionId;
export const selectCartStatus = (state: RootState) => state[SliceNameSpace.User].cartStatus;

export default userSlice.reducer;
export const { logUserOut } = userSlice.actions;
