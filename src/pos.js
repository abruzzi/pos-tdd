function POS(items) {
	this.items = items;
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
	this.items = this.normalize();
}

POS.prototype.print = function() {
	var reportGenerator = new ReportGenerator(this.items);
	return reportGenerator.generate();
}

function format(barcodes) {
	var pos = new POS(items);
	pos.scan(barcodes);
	return pos.print();
}