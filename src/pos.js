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

	var sum = 0;
	var items = this.normalize();

	var that = this;
	items.forEach(function(item) {
		that.result += item.format();
		sum += item.calcItemPrice();
	});
    
    var discount = 
    "----------------------\n" +
	"挥泪赠送商品：\n";

    var discountAll = 0;
    var did = false;
    items.forEach(function(item) {
    	if(item.hasDiscount()) {
    		did = true;
    		discountAll += item.getDiscount();
    	}
    	discount += item.formatDiscount();
    });

    if(did) {
    	this.result += discount;
    }

    this.result += "----------------------\n";
    this.result += "总计："+sum.toFixed(2)+"(元)\n";
    if(did) {
    	this.result += "节省："+discountAll.toFixed(2)+"(元)\n";
    }
}

POS.prototype.print = function() {
	this.result = 
		"***<没钱赚商店>购物清单***\n" + 
		this.result + 
		"**********************";

	return this.result;
}

function format(barcodes) {
	var pos = new POS(items);
	pos.scan(barcodes);
	return pos.print();
}