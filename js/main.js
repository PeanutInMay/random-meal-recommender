// 定义餐点数据
const meals = {
    breakfast: [
        { name: "豆浆油条", emoji: "🥖" },
        { name: "小米粥配咸菜", emoji: "🥣" },
        { name: "三明治", emoji: "🥪" },
        { name: "煎蛋", emoji: "🍳" },
        { name: "牛奶麦片", emoji: "🥛" },
        { name: "包子", emoji: "🥙" },
        { name: "鸡蛋", emoji: "🥚" },
        { name: "肉夹馍", emoji: "🌮" },
        { name: "水果沙拉", emoji: "🥗" },
        { name: "煎饼果子", emoji: "🌯" },
        { name: "汤面", emoji: "🍜" },
        { name: "面包", emoji: "🍞" },
    ],
    lunch: [
        { name: "肉筋饭", emoji: "🍖" },
        { name: "豆花里脊", emoji: "🍲" },
        { name: "黄焖鸡米饭", emoji: "🍗" },
        { name: "鸡公煲", emoji: "🍗" },
        { name: "大盘鸡面", emoji: "🍜" },
        { name: "兰州拉面", emoji: "🍜" },
        { name: "麻辣香锅", emoji: "🌶️" },
        { name: "沙拉", emoji: "🥗" },
        { name: "意大利面", emoji: "🍝" },
        { name: "披萨", emoji: "🍕" },
        { name: "炒饭", emoji: "🍚" },
        { name: "麻辣烫", emoji: "🍲" },
        { name: "煲仔饭", emoji: "🍚" },
        { name: "烧腊", emoji: "🍚" },
        { name: "水饺", emoji: "🥟" },
        { name: "沙县小吃", emoji: "🥡" },
        { name: "米线", emoji: "🍜"},
        { name: "芝士焗饭", emoji: "🍛"},
        { name: "鸡柳豆角", emoji: "🍛"}
    ],
    dinner: [
        { name: "肉筋饭", emoji: "🍖" },
        { name: "豆花里脊", emoji: "🍲" },
        { name: "黄焖鸡米饭", emoji: "🍗" },
        { name: "鸡公煲", emoji: "🍗" },
        { name: "大盘鸡面", emoji: "🍜" },
        { name: "兰州拉面", emoji: "🍜" },
        { name: "麻辣香锅", emoji: "🌶️" },
        { name: "沙拉", emoji: "🥗" },
        { name: "意大利面", emoji: "🍝" },
        { name: "披萨", emoji: "🍕" },
        { name: "炒饭", emoji: "🍚" },
        { name: "麻辣烫", emoji: "🍲" },
        { name: "煲仔饭", emoji: "🍚" },
        { name: "烧腊", emoji: "🍚" },
        { name: "水饺", emoji: "🥟" },
        { name: "火锅", emoji: "🍲" },
        { name: "烤鱼", emoji: "🐟" },
        { name: "沙县小吃", emoji: "🥡" },
        { name: "烧烤", emoji: "🍢" },
        { name: "寿司", emoji: "🍣" },
        { name: "汉堡薯条", emoji: "🍔" },
        { name: "减脂餐", emoji: "🥣" }
    ]
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadHistory();
    
    // 初始化当前餐点类型
    const currentType = getCurrentMealType();
    const tabs = document.querySelectorAll('.meal-tab');
    tabs.forEach(tab => {
        if(tab.dataset.meal === 'auto') {
            tab.classList.add('active');
        }
        
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// 更新日期时间显示
function updateDateTime() {
    const now = new Date();
    
    const timeElem = document.getElementById('current-time');
    const dateElem = document.getElementById('current-date');
    
    timeElem.textContent = now.toLocaleTimeString('zh-CN');
    dateElem.textContent = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// 获取当前时间，判断是早餐、午餐还是晚餐时段
function getCurrentMealType() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 10) {
        return "breakfast";
    } else if (hour >= 10 && hour < 15) {
        return "lunch";
    } else {
        return "dinner";
    }
}

// 根据时段获取对应的餐点类型名称
function getMealTypeName(type) {
    const typeNames = {
        breakfast: "早餐",
        lunch: "午餐",
        dinner: "晚餐"
    };
    return typeNames[type] || "餐点";
}

// 随机选择一个餐点
function getRandomMeal(type) {
    const mealArray = meals[type];
    const randomIndex = Math.floor(Math.random() * mealArray.length);
    return mealArray[randomIndex];
}

// 保存历史记录
function saveToHistory(mealType, meal) {
    let history = JSON.parse(localStorage.getItem('mealHistory')) || [];
    
    // 限制历史记录最多5条
    if(history.length >= 5) {
        history.pop();
    }
    
    history.unshift({
        type: mealType,
        name: meal.name,
        emoji: meal.emoji,
        time: new Date().toLocaleString('zh-CN')
    });
    
    localStorage.setItem('mealHistory', JSON.stringify(history));
    loadHistory();
}

// 加载历史记录
function loadHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('mealHistory')) || [];
    
    if(history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">暂无历史记录</p>';
        return;
    }
    
    historyList.innerHTML = '';
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <span>${item.emoji}</span>
                <span class="history-meal-type">${getMealTypeName(item.type)}: </span>
                <strong>${item.name}</strong>
            </div>
            <div class="history-time">${item.time}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// 显示加载动画
function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    document.getElementById('meal-content').innerHTML = '';
    
    const mealDisplay = document.querySelector('.meal-result');
    mealDisplay.classList.remove('visible');
    mealDisplay.style.display = 'block';
    
    setTimeout(() => {
        mealDisplay.classList.add('visible');
    }, 10);
}

// 隐藏加载动画
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// 显示餐点结果
function showMealResult(mealType, mealItem) {
    const mealContent = document.getElementById('meal-content');
    
    mealContent.innerHTML = `
        <div class="meal-emoji">${mealItem.emoji}</div>
        <p>为您精心推荐：</p>
        <p class="meal-type">${getMealTypeName(mealType)}</p>
        <p class="meal-item">${mealItem.name}</p>
        <p>祝您用餐愉快！</p>
    `;
}

// 点击按钮时的处理函数
document.getElementById("recommend-btn").addEventListener("click", function() {
    const mealDisplay = document.querySelector('.meal-result');
    mealDisplay.style.opacity = '0';
    mealDisplay.style.transform = 'translateY(20px)';
    
    // 显示加载动画
    showLoader();
    
    setTimeout(() => {
        // 获取当前选中的餐点类型
        const activeTab = document.querySelector('.meal-tab.active');
        let mealType = activeTab.dataset.meal;
        
        if(mealType === 'auto') {
            mealType = getCurrentMealType();
        }
        
        const randomMeal = getRandomMeal(mealType);
        
        // 隐藏加载动画，显示结果
        hideLoader();
        showMealResult(mealType, randomMeal);
        
        // 保存到历史记录
        saveToHistory(mealType, randomMeal);
        
        // 显示结果容器并添加动画
        mealDisplay.style.opacity = '1';
        mealDisplay.style.transform = 'translateY(0)';
    }, 800); // 延迟，模拟加载
});