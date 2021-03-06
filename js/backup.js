/*
 * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
 */
function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

var weeks = ["日","一","二","三","四","五","六"];
var directions = ["北方","东北方","东方","东南方","南方","西南方","西方","西北方"];
var direction_actions = ["/跳舞", "/大笑"]
var activities = [
	{name:"上AB站", good:"还需要理由吗？",bad:"满屏兄贵亮瞎你的眼", weekend: true},
	{name:"玩FlappyBird", good:"今天破纪录的几率很高",bad:"除非你想玩到把手机砸了", weekend: true},
	{name:"熔火之心MC", good:"左右脸+眼, 碧空, 统御不能少",bad:"皮甲锁甲奶装一箩筐."},
	{name:"黑龙公主", good:"黑龙包roll100",bad:"黑龙包roll99都被100日."},
	{name:"黑翼之巢", good:"一趟T2全都拿.",bad:"怀揣10万金, 一件都不出."},
];

var specials = [
	{date:20210214, type:'bad', name:'待在男（女）友身边', description:'脱团火葬场，入团保平安。'}
];

var tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];

var varNames = ["jieguo", "huodong", "pay", "expire", "zhangdan", "every", "free", "i1", "a", "virtual", "ad", "spider", "mima", "pass", "ui"];

var drinks = ["水","茶","红茶","绿茶","咖啡","奶茶","可乐","鲜奶","豆奶","果汁","果味汽水","苏打水","运动饮料","酸奶","酒"];

function is_someday() {
	return today.getMonth() == 5 && today.getDate() == 4;
}

function getTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

function star(num) {
	var result = "";
	var i = 0;
	while (i < num) {
		result += "★";
		i++;
	}
	while(i < 5) {
		result += "☆";
		i++;
	}
	return result;
} 

// 生成今日运势
function pickTodaysLuck() {
  var _activities = filter(activities);
    
	var numGood = random(iday, 98) % 3 + 1;
	var numBad = random(iday, 87) % 3 + 1;
	var eventArr = pickRandomActivity(_activities, numGood + numBad);
	var mc_bosses_drops = pickRandomItemsFromBosses(mc_drops)

	
	var specialSize = pickSpecials();
	
	// for (var i = 0; i < numGood; i++) {
	// 	addToGood(eventArr[i]);
	// }

	for (let i = 0; i < mc_bosses_drops.length; i++) {
		const boss_drops = mc_bosses_drops[i];
		addToDrops(boss_drops)
	}
	
	for (var i = 0; i < numBad; i++) {
		addToBad(eventArr[numGood + i]);
	}
}

// 去掉一些不合今日的事件
function filter(activities) {
    var result = [];
    
    // 周末的话，只留下 weekend = true 的事件
    if (isWeekend()) {
        
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].weekend) {
                result.push(activities[i]);
            }
        }
        
        return result;
    }
    
    return activities;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < specials.length; i++) {
		var special = specials[i];
		
		if (iday == special.date) {
			if (special.type == 'good') {
				specialSize[0]++;
				addToGood({name: special.name, good: special.description});
			} else {
				specialSize[1]++;
				addToBad({name: special.name, bad: special.description});
			}
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}


// 从掉落中随机选取装备
function pickRandomItemsFromBosses(bosses) {
	var picked_items = Array()
	for (var i = 0; i < bosses.length; i ++) {
		var picked = pickRandomItems(bosses[i])
		picked_items.push({name: bosses[i].boss, picked})
	}
	return picked_items
}

// 从掉落中随机选取装备
function pickRandomItems(boss) {
	var picked_items = pickRandom(boss.items, boss.num_drops)
	return picked_items
}


// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
	}
	
	if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
	}
	
	return result;
}

// 添加到“宜”
function addToGood(event) {
	$('.good .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.good + '</div></li>');
}

// 添加到“不宜”
function addToBad(event) {
	$('.bad .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.bad + '</div></li>');
}

// 添加到“今日必掉”
function addToDrops(boss) {
	$('.good .content ul').append('<li><div id=' + boss.name + ' class="name">' + boss.name + '</div></li>');
	for (let i = 0; i < boss.picked.length; i++) {
		const pick = boss.picked[i];
		$("#"+boss.name).append('<div class="description">' + pick.name + '</div></li>')
	}
}

// 添加到“今日不掉”
function addToNotDrop(event) {
	$('.bad .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.bad + '</div></li>');
}

$(function(){
	if (is_someday()) {document.body.className = 'someday'};
	$('.date').html(getTodayString());
	$('.direction_value').html(directions[random(iday, 2) % directions.length]);
	$('.direction_action_value').html(direction_actions[random(iday, 3) % direction_actions.length]);
	$('.drink_value').html(pickRandom(drinks,2).join('，'));
	$('.goddes_value').html(star(random(iday, 6) % 5 + 1));
	pickTodaysLuck();
});
