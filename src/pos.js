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
			break;
		}
	}
	return item;
}

function format(barcodes) {
	var barcode = barcodes[0];
	var item = findByBarcode(barcode);

	var result = "";
	result += "***<没钱赚商店>购物清单***\n";

	var sum = 0;
	barcodes.forEach(function(barcode) {
		var item = findByBarcode(barcode);
		result += "名称："+item.name+"，数量：1"+item.unit+"，单价："+item.price.toFixed(2)+"(元)，小计："+item.price.toFixed(2)+"(元)\n";
		sum += item.price;		
	});
    
    result += "----------------------\n";
    result += "总计："+sum.toFixed(2)+"(元)\n" +
			"**********************";

	return result;
}