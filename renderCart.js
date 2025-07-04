let cart = loadCart(); // 載入購物車?為了讀取購物車資料並渲染到html上
//選染購物車
function renderCart() {
cart = loadCart(); // 載入購物車?為了讀取購物車資料並渲染到html上

  const cartList = document.getElementById('cart-list');//擷取card-list 也就是購物車內的東西
  const totalPriceEl = document.getElementById('total-price');//擷取總價格
cartList.innerHTML = '';//每輪都要淨空購物車，以確保刪除時不會出現重複項
  let total = 0;//總價也要歸0

cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add(
      'd-flex',           // 🆕 水平排版
      'align-items-center', // 🆕 垂直置中
      'justify-content-between', // 🆕 左右兩端對齊
      'border',           // 🆕 加上 Bootstrap 邊框
      'rounded',          // 🆕 圓角
      'p-3',              // 🆕 內距 padding
      'mb-2',             // 🆕 每個 li 間距
      'bg-light' ,         // 🆕 淺色底
      'w-100'
    ); // 🟨🟨🟨 🆕 加入 Bootstrap 樣式讓 li 有長方形框框

    const subtotal = item.price * item.quantity;
    total += subtotal;

    // 🆕 建立產品資訊部分（左側）
    const info = document.createElement('div');
    info.classList.add(
      'd-flex',
      'flex-row',
      'justify-content-between', // 🆕 左右兩端對齊
      'flex-grow-1',
      'me-3'
    )
    const name = document.createElement('h3'); // 🆕 使用 h3
    name.classList.add('mb-1'); // 微調間距
    name.textContent = item.name;

    const price = document.createElement('h3'); // 🆕 使用 h3
    price.classList.add('text-muted', 'mb-0'); // 淡灰顏色 & 去除下邊距
    debugger
    price.textContent = ``;
    
    price.textContent = `數量${item.quantity}件`+`    `+`NT$${subtotal}`;//子總價

    info.appendChild(name);
    info.appendChild(price);

    // 🆕 建立按鈕區域（右側）
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');

    // 加數量
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '＋';
    plusBtn.dataset.id = item.id;
    plusBtn.classList.add('btn', 'btn-outline-success', 'increase-btn'); // 🆕 美化按鈕

    // 減數量
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '－';
    minusBtn.dataset.id = item.id;
    minusBtn.classList.add('btn', 'btn-outline-warning', 'decrease-btn'); // 🆕 美化按鈕

    // 刪除
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '刪除';
    deleteBtn.dataset.id = item.id;
    deleteBtn.classList.add('btn', 'btn-outline-danger', 'delete-btn'); // 🆕 美化按鈕

    // 加入按鈕們
    btnGroup.appendChild(plusBtn);
    btnGroup.appendChild(minusBtn);
    btnGroup.appendChild(deleteBtn);

    // 加入 info 和按鈕到 li
    li.appendChild(info);    // 🆕 左側為產品資訊
    li.appendChild(btnGroup); // 🆕 右側為按鈕群組
    cartList.appendChild(li);
  });

  totalPriceEl.textContent = `總金額：NT$${total}`;
}


renderCart();

// 綁定按鈕事件（事件委派）
document.getElementById('cart-list').addEventListener('click', (e) => {
  
    const id = parseInt(e.target.dataset.id);//存放事件觸發物件的id，+-刪除都有建立屬於那個商品的id
  if (!id) return;//如果沒有id 則終止 防呆機制

  if (e.target.classList.contains('increase-btn')) {//如果觸發事件的物件類別為 特定class 
    const item = cart.find(p => p.id === id);//從cart 裡面挖出跟這個觸發事件按鈕相同id的產品卡，建立為一個item 
    if (item) item.quantity += 1;//對item 數量進行控制
  }

  if (e.target.classList.contains('decrease-btn')) {
    const item = cart.find(p => p.id === id);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);//如果item數量小於0就代表需要刪除，篩出所有id非該item的商品 ，並重新指派給cart
      }
    }
  }

  if (e.target.classList.contains('delete-btn')) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart(cart);
  renderCart();//重新渲染
});
//  如果你要跨分頁同步，也可以放這裡
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    cart = loadCart();
    renderCart();
  }
});
