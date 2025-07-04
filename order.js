// import { loadCart} from './cart.js';
// import { saveOrder } from './orderStorage.js';
// import { renderCart } from './renderCart.js';

function checkout() {
  let cart = loadCart();//不要用const
  if (cart.length === 0) {
    alert('購物車是空的');
    return;
  }

  const order = {
    id: Date.now(),
    items: [...cart],
    totalQuantity :cart.reduce((sum,item )=> sum + item.quantity,0),
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString()
  };

  saveOrder(order);
//   localStorage.removeItem('cart');
cart = [];
saveCart(cart);

  renderCart();

  alert(`✅ 訂單成立！編號：${order.id}`);

}

document.getElementById('checkout-btn').addEventListener('click', checkout);