var onyxia_drops = [
	{
		boss:"奥妮克希亚",
		num_drops: 5, 
		items:[
			{
                name: '<div><a class="q2" href="">奥妮克希亚皮袋</a></div>',
                drop_rate: 152
            },
			{
                name: '<div><a class="q4" href="">奥妮克希亚的头颅</a></div>',
                drop_rate: 101
            },
			{
                name: '<div><a class="q4" href="">成年黑龙的肌腱</a></div>',
                drop_rate: 65
            },
			{
                name: '<div><a class="q4" href="">禁锢之戒</a></div>',
                drop_rate: 35
            },
			{
                name: '<div><a class="q4" href="">上古角石魔典</a></div>',
                drop_rate: 34
            },
			{
                name: '<div><a class="q4" href="">复仇骨帽</a></div>',
                drop_rate: 31
            },
			{
                name: '<div><a class="q4" href="">萨菲隆斗篷</a></div>',
                drop_rate: 31
            },
			{
                name: '<div><a class="q4" href="">怒风头巾</a></div>', 
                drop_rate: 30
            },
			{
                name: '<div><a class="q4" href="">灵风头冠</a></div>',
                drop_rate: 30
            },
			{
                name: '<div><a class="q4" href="">愤怒头盔</a></div>',
                drop_rate: 30
            },
            {
                name: '<div><a class="q4" href="">审判头冠/无尽风暴头盔</a></div>',
                drop_rate: 16
            },
            {
                name: '<div><a class="q4" href="">艾斯卡达尔的项圈</a></div>',
                drop_rate: 29
            },
			{
                name: '<div><a class="q4" href="">血牙头巾</a></div>',
                drop_rate: 29
            },
			{
                name: '<div><a class="q4" href="">卓越之环</a></div>',
                drop_rate: 28
            },
			{
                name: '<div><a class="q4" href="">巨龙追猎者头盔</a></div>',
                drop_rate: 28
            },
			{
                name: '<div><a class="q4" href="">放血者维斯卡格</a></div>',
                drop_rate: 8
            },
			{
                name: '<div><a class="q4" href="">死亡召唤者</a></div>',
                drop_rate: 8
            },
			{
                name: '<div><a class="q4" href="">龙鳞碎片</a></div>',
                drop_rate: 8
            }
    ]}
]

function extract_boss(bosses) {
    var boss_drops = []
    for (let i = 0; i < bosses.length; i++) {
        const boss = bosses[i];
        boss_drops.push({"name": boss.boss, "items": boss_item_with_weight(boss)});
    }
    return boss_drops
}

function boss_item_with_weight(boss) {
    var total_items = []

    // 根据权重, 算出总共有多少数量, 并计算每个item在哪个区间
    for (let i = 0; i < boss.items.length; i++) {
        const item = boss.items[i];
        total_items = add_item_to_drop(total_items, item)
    }
    // 随机区间
    var results = []
    for( let i = 0; i < boss.num_drops; i++) [
        results.push(random_pick(total_items))
    ]
    return results
}

function add_item_to_drop(arr, item) {
    for (let i = 0; i < item.drop_rate; i++) {
        arr.push(item)      
    }
    return arr
}

function random_pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}