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

function findByBarcode(barcode) {
	var item = {};
	for(var i = 0; i < items.length; i++) {
		if(barcode == items[i].barcode) {
			item = items[i];
			item.count = 1;
			break;
		}
	}
	return item;
}

function formatAnItem(item) {
	return "名称："+item.name+"，数量："+item.count+item.unit+"，单价："+item.price.toFixed(2)+"(元)，小计："+(calcItemPrice(item)).toFixed(2)+"(元)\n";
}

function indexOf(items, barcode) {
	for(var i = 0; i < items.length; i++) {
		if(items[i].barcode == barcode) {
			return i;
		}
	}

	return -1;
}

function calcItemPrice(item) {
	return item.count * item.price;
}

function normalize(barcodes) {
	var items = [];

	barcodes.forEach(function(barcode) {
		var item = findByBarcode(barcode);
		var index = indexOf(items, barcode);
		if(index >= 0) {
			items[index].count += 1;
		} else {
			items.push(item);	
		}
	});

	return items;
}

function format(barcodes) {
	var result = "";
	result += "***<没钱赚商店>购物清单***\n";

	var sum = 0;
	var items = normalize(barcodes);

	items.forEach(function(item) {
		result += formatAnItem(item);
		sum += calcItemPrice(item);
	})
    
    result += "----------------------\n";
    result += "总计："+sum.toFixed(2)+"(元)\n" +
			"**********************";

	return result;
}