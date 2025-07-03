// 儲存一筆新訂單
 function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];//擷取localStorage中的orders陣列
  orders.push(order);//把order丟進去
  localStorage.setItem('orders', JSON.stringify(orders));//丟回localStorage
}

// 讀取所有訂單
function loadOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}
