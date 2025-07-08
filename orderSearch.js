 // 你的 searchOrders 函式
    function searchOrders(orderID) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      return orders.find(order => order.id === Number(orderID));
    }

    // 🎯 點擊查詢邏輯
    document.getElementById("search-btn").addEventListener("click", () => {//事件監聽搜尋按鈕
      const inputID = document.getElementById("order-search").value.trim();//.value 取得input 內數字 trim() 刪除無視前後空白
      const resultBox = document.getElementById("result");//擷取結果div

      if (!inputID) {
        resultBox.innerHTML = `<div class="text-danger">❗ 請輸入訂單編號</div>`;
        return;
      }

      const order = searchOrders(inputID);

      if (!order) {
        resultBox.innerHTML = `<div class="text-warning">🚫 查無此訂單（編號：${inputID}）</div>`;
        return;
      }

      // ✅ 顯示訂單內容
      resultBox.innerHTML = `
        <h5> 訂單成立</h5>
        <p> 編號：${order.id}</p>
        <p> 總金額：NT$${order.totalPrice}</p>
        <p> 商品清單：</p>
        <ul>
          ${order.items.map(i => `<li>${i.name} × ${i.quantity}</li>`).join("")}
        </ul>
      `;
    });