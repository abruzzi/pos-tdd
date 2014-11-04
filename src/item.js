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