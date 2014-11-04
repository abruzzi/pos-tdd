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

function Barcode(code) {
	var pair = code.split('-');
	this.barcode = pair[0];
	this.count = pair[1] ? pair[1] : 1;
}

function POS(items) {
	this.items = items;
	this.result = "";
}

POS.prototype.findByBarcode = function(barcode) {
	for(var i = 0; i < this.items.length; i++) {
		var current = this.items[i];
		if(barcode == current.barcode) {
			return new Item(current.name, 1, current.unit, current.price, current.barcode);
		}
	}

	return null;
}

POS.indexOf = function(items, barcode) {
	for(var i = 0; i < items.length; i++) {
		if(items[i].barcode == barcode) {
			return i;
		}
	}

	return -1;
}

POS.prototype.normalize = function() {
	var items = [];

	var that = this;
	this.barcodes.forEach(function(barcode) {
		var code = new Barcode(barcode);
		var item = that.findByBarcode(code.barcode);

		if(code.count) {
			item.count = code.count;
		}

		var index = POS.indexOf(items, code.barcode);
		if(index >= 0) {
			items[index].count += 1;
		} else {
			items.push(item);
		}
	});

	return items;
}

POS.prototype.scan = function(barcodes) {
	this.barcodes = barcodes;
	this.result += "***<没钱赚商店>购物清单***\n";

	var sum = 0;
	var items = this.normalize();

	var that = this;
	items.forEach(function(item) {
		that.result += item.format();
		sum += item.calcItemPrice();
	});
    
    this.result += "----------------------\n";
    this.result += "总计："+sum.toFixed(2)+"(元)\n" +
			"**********************";
}

POS.prototype.print = function() {
	return this.result;
}

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

function format(barcodes) {
	var pos = new POS(items);
	pos.scan(barcodes);
	return pos.print();
}