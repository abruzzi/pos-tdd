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

Item.prototype.hasDiscount = function() {
	return this.count > 2 && promotions.indexOf(this.barcode) >= 0
}

Item.prototype.getDiscount = function() {
	if(this.hasDiscount()) {
		return this.price;
	} else {
		return 0;
	}
}

Item.prototype.formatDiscount = function() {
	return "名称："+this.name+"，数量：1"+this.unit+"\n";
}

Item.prototype.calcItemPrice = function() {
	if(this.hasDiscount()) {
		return (this.count -1) * this.price;
	} else {
		return this.count * this.price;		
	}
}