function POS(items) {
	this.items = items;
	this.result = "";
	this.messages = [];
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


POS.prototype.prepareItems = function() {
	var that = this;
	this.items.forEach(function(item) {
		that.messages.push(item.format());
	});
}

POS.prototype.prepareSummary = function() {
	var sum = 0;
	
	this.items.forEach(function(item) {
		sum += item.calcItemPrice();
	});

	this.messages.push("----------------------\n");
	this.messages.push("总计："+sum.toFixed(2)+"(元)\n");
}


POS.prototype.prepareDiscount = function() {
	if(this.shouldDisplayDiscount()) {
		this.messages.push("----------------------\n");
		this.messages.push("挥泪赠送商品：\n");
		var that = this;
		this.items.forEach(function(item) {
			that.messages.push(item.formatDiscount());
		});
	}
}

POS.prototype.prepareDiscountSummary = function() {
	if(this.shouldDisplayDiscount()) {
		this.messages.push("节省："+this.discountAll().toFixed(2)+"(元)\n")
	}
}

POS.prototype.shouldDisplayDiscount = function() {
	var discount = false;
	this.items.forEach(function(item) {
		if(item.hasDiscount()) {
    		discount = true;
    	}
	});

	return discount;
}

POS.prototype.discountAll = function() {
	var discountAll = 0;
	this.items.forEach(function(item) {
		if(item.hasDiscount()) {
    		discountAll += item.getDiscount();
    	}
	});
	return discountAll;
}

POS.prototype.scan = function(barcodes) {
	this.barcodes = barcodes;
	this.items = this.normalize();
}

POS.prototype.prepareHeader = function() {
	this.messages.push("***<没钱赚商店>购物清单***\n");
}

POS.prototype.prepareFooter = function() {
	this.messages.push("**********************");
}

POS.prototype.print = function() {
	this.prepareHeader();
	this.prepareItems();
	this.prepareDiscount();
	this.prepareSummary();
	this.prepareDiscountSummary();
	this.prepareFooter();
	
	return this.messages.join("");
}

function format(barcodes) {
	var pos = new POS(items);
	pos.scan(barcodes);
	return pos.print();
}