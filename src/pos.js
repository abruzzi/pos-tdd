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

function Item(name, count, unit, price, barcode) {
	this.name = name;
	this.count = count;
	this.unit = unit;
	this.price = price;
	this.barcode = barcode;
}

Item.prototype.format = function() {
	return "名称："+this.name+"，数量："+this.count+this.unit+"，单价："+this.price.toFixed(2)+"(元)，小计："+(this.calcItemPrice()).toFixed(2)+"(元)\n";
}

Item.prototype.calcItemPrice = function() {
	return this.count * this.price;
}

function findByBarcode(barcode) {
	for(var i = 0; i < items.length; i++) {
		var current = items[i];
		if(barcode == current.barcode) {
			return new Item(current.name, 1, current.unit, current.price, current.barcode);
		}
	}

	return null;
}

function indexOf(items, barcode) {
	for(var i = 0; i < items.length; i++) {
		if(items[i].barcode == barcode) {
			return i;
		}
	}

	return -1;
}

function Barcode(code) {
	var pair = code.split('-');
	this.barcode = pair[0];
	this.count = pair[1] ? pair[1] : 1;
}

function normalize(barcodes) {
	var items = [];

	barcodes.forEach(function(barcode) {
		var code = new Barcode(barcode);
		var item = findByBarcode(code.barcode);

		if(code.count) {
			item.count = code.count;
		}

		var index = indexOf(items, code.barcode);
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
		result += item.format();
		sum += item.calcItemPrice();
	});
    
    result += "----------------------\n";
    result += "总计："+sum.toFixed(2)+"(元)\n" +
			"**********************";

	return result;
}