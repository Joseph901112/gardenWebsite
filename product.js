const products = [
  { id: 1, name: '龜背芋', price: 500 },
  { id: 2, name: '虎尾蘭', price: 300 },
  { id: 3, name: '波斯頓腎蕨', price: 420 },
    { id: 4, name: '火鶴花', price: 500 },
  { id: 5, name: '空氣鳳梨', price: 300 },
  { id: 6, name: '薰衣草', price: 420 },
    { id: 7, name: '九重葛', price: 470 },
  { id: 8, name: '自動澆水器', price: 1000 },
  { id: 9, name: '園藝剪刀', price: 200 },

];

document.querySelectorAll('.add-to-cart').forEach(button/*代稱*/ => {//選取文件中所有add-to-cart 類別 每一個都執行一輪
  button.addEventListener('click', (e) => {//button 事件監聽 當發生click事件 匯入e(事件資訊)
    const card = e.target.closest('.product-card');//建立卡片 存放事件點擊目標 button這個物件 往上找最近(closet) 類別為product-card 的物件
    const id = parseInt(card.id.replace('product-', ''));//建立id 存放上面找到的card的id 因為有前綴product- 所以要刪掉 並轉換成整數單位才能進行比較
    const product = products.find(p => p.id === id);//建立product 找出products 內產品id與卡片id相同的物件，通過這層關係，將物件與卡片進行連結
    if (!product) return;//如果prodcut是undefined 則代表 並沒有與卡片相符合的產品

    let cart = loadCart(); // 載入購物車
    const existing = cart.find(item => item.id === id);//確認cart物件內是否有item的id 與加入購物車觸發的商品卡片與產品id相同 為了確保不會多加

    if (existing) {//如果existing 存在 
      existing.quantity += 1;//則existing 也就是購物車內 item 中的quantity 屬性 加一 也就是該產品在購物車內的總數
    } else {
      cart.push({ ...product, quantity: 1 });//沒有的話 則需要往購物車內加入一個item ...product為複製並展開product 內的屬性，後面的quantity 為再加入的屬性，因為他本身沒有 
    }

    saveCart(cart); // 儲存購物車
    alert(`${product.name} 已加入購物車！`);
  });
});