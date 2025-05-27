let itemsDatabase = [];

// 加载 JSON 文件
fetch('items.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("无法加载 items.json");
        }
        return response.json();
    })
    .then(data => {
        itemsDatabase = data;
        const itemId = getUrlParameter('id') || 'nfc'; // 默认值根据实际 id 设置
        displayItem(itemId);
    })
    .catch(error => {
        console.error("加载物品数据时出错:", error);
        document.getElementById('item-card').innerHTML = `
            <div class="card-content">
                <h1 class="card-title">加载失败</h1>
                <p class="card-description">无法加载物品数据，请检查网络连接或文件路径。</p>
            </div>
        `;
    });

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[$$$$]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 显示物品卡片
function displayItem(itemId) {
    const item = itemsDatabase.find(i => i.id === itemId); // 根据 id 查找
    const cardElement = document.getElementById('item-card');

    if (item) {
        // 更新页面标题
        document.title = `${item.name}`;

        // 渲染卡片内容
        cardElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <div class="card-content">
                <h1 class="card-title">${item.name}</h1>
                <p class="card-description">${item.description}</p>
            </div>
        `;
    } else {
        // 物品不存在时的处理
        cardElement.innerHTML = `
            <div class="card-content">
                <h1 class="card-title">物品未找到</h1>
                <p class="card-description">请求的物品ID不存在或已失效</br>ID：${itemId}</p>
            </div>
        `;
    }
}