import Image from 'common-ui/image/image';
import { Item } from 'types/cart';
import { useState } from 'react';
import InputCounter from 'common-ui/input-counter/input-counter';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { useAppDispatch } from 'hooks/hooks';
import { deleteCart, updateCart } from 'store/user-slice/user-slice';
import styles from './cart-card.module.scss';

function CartCard({ cartItem }: { cartItem: Item }) {
  const [count, setCount] = useState(cartItem.count);
  const dispatch = useAppDispatch();

  const handleCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setCount(+value < 1 ? 1 : +value);
  };

  return (
    <tr key={cartItem.transactionId} className={styles.row}>
      <td className={styles.item}>
        <Image
          className={styles.image}
          img={cartItem.product.image}
          alt={cartItem.product.details.cpu}
        />
        <p>{cartItem.product.name}</p>
      </td>
      <td className={styles.price}>
        <h3>Price</h3>${' '}
        {cartItem.product.newPrice ? cartItem.product.newPrice : cartItem.product.price}
      </td>
      <td className={styles.qnty}>
        <h3>Qty</h3>
        <InputCounter value={count} onChange={(evt) => handleCountChange(evt)} type="number" />
      </td>
      <td className={styles.total}>
        <h3>Subtotal</h3>$ {cartItem.totalSum}
      </td>
      <td className={styles.controls}>
        <button
          onClick={() => dispatch(deleteCart({ transactionId: cartItem.transactionId }))}
          className={styles.deleteBtn}
        >
          <DeleteIcon />
        </button>
        <button
          onClick={() =>
            dispatch(
              updateCart({
                count: count,
                transactionId: cartItem.transactionId,
                productId: cartItem.product.id
              })
            )
          }
          className={styles.updateButton}
        >
          <EditIcon />
        </button>
      </td>
    </tr>
  );
}

export default CartCard;
