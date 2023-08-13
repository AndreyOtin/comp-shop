import Image from 'common-ui/image/image';
import { Item } from 'types/cart';
import { useState } from 'react';
import InputCounter from 'common-ui/input-counter/input-counter';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { deleteCart, selectCartStatus, updateCart } from 'store/user-slice/user-slice';
import styles from './cart-card.module.scss';
import { CircularProgress } from '@mui/material';
import { Status } from 'consts/enum';

function CartCard({ cartItem }: { cartItem: Item }) {
  const dispatch = useAppDispatch();
  const cartStatus = useAppSelector(selectCartStatus);
  const inputProps = InputCounter.useInputNumberChange(cartItem.count);

  return (
    <tr key={cartItem.transactionId} className={styles.row}>
      <td className={styles.item}>
        <Image
          className={styles.image}
          img={cartItem.product.image}
          alt={cartItem.product.details.cpu}
        />
        <p className={styles.description}>{cartItem.product.name}</p>
      </td>
      <td className={styles.price}>
        <h3>Price</h3>${' '}
        {cartItem.product.newPrice ? cartItem.product.newPrice : cartItem.product.price}
      </td>
      <td className={styles.qnty}>
        <h3>Qty</h3>
        <InputCounter {...inputProps} type="number" />
      </td>
      <td className={styles.total}>
        <h3>Subtotal</h3>$ {cartItem.totalSum}
      </td>
      <td className={styles.controls}>
        <button
          style={{ color: 'blue' }}
          onClick={() => dispatch(deleteCart({ transactionId: cartItem.transactionId }))}
          className={styles.deleteBtn}
        >
          {cartStatus === Status.Loading ? (
            <CircularProgress style={{ width: '1.6875rem', height: '1.6875rem' }} color="inherit" />
          ) : (
            <DeleteIcon />
          )}
        </button>
        <button
          style={{ color: 'blue' }}
          onClick={() =>
            dispatch(
              updateCart({
                count: +inputProps.value,
                transactionId: cartItem.transactionId,
                productId: cartItem.product.id
              })
            )
          }
          className={styles.updateButton}
        >
          {cartStatus === Status.Loading ? (
            <CircularProgress style={{ width: '1.6875rem', height: '1.6875rem' }} color="inherit" />
          ) : (
            <EditIcon />
          )}
        </button>
      </td>
    </tr>
  );
}

export default CartCard;
