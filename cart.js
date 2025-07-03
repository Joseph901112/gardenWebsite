function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));//把cart丟入localStorage並取名為cart
}

function loadCart() {
  const data = localStorage.getItem('cart');//建立data從localStorage 拉出cart
  return data ? JSON.parse(data) : [];//把字串還原為陣列
  
}