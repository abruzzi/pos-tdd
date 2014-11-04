var items = [
        {
            barcode: "ITEM000000",
            name: "可口可乐",
            unit: "瓶",
            price: 3.00
        },
        {
            barcode: "ITEM000001",
            name: "雪碧",
            unit: "瓶",
            price: 3.00
        },
        {
            barcode: "ITEM000002",
            name: "苹果",
            unit: "斤",
            price: 5.50
        },
        {
            barcode: "ITEM000003",
            name: "荔枝",
            unit: "斤",
            price: 15.00
        },
        {
            barcode: "ITEM000004",
            name: "电池",
            unit: "个",
            price: 2.00
        },
        {
            barcode: "ITEM000005",
            name: "方便面",
            unit: "袋",
            price: 4.50
        }
    ];

function format(list) {
	var barcode = list[0];
	var item = {};
	for(var i = 0; i < items.length; i++) {
		if(barcode == items[i].barcode) {
			item = items[i];
			break;
		}
	}

	return "***<没钱赚商店>购物清单***\n" +
            "名称："+item.name+"，数量：1"+item.unit+"，单价："+item.price.toFixed(2)+"(元)，小计："+item.price.toFixed(2)+"(元)\n" +
            "----------------------\n" +
            "总计："+item.price.toFixed(2)+"(元)\n" +
            "**********************";
}