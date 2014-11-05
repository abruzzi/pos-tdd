function ReportGenerator(items) {
	this.items = items;
	this.messages = [];
}

ReportGenerator.prototype.prepareItems = function() {
	var that = this;
	this.items.forEach(function(item) {
		that.messages.push(item.format());
	});
}

ReportGenerator.prototype.prepareSummary = function() {
	var sum = 0;
	
	this.items.forEach(function(item) {
		sum += item.calcItemPrice();
	});

	this.messages.push("----------------------\n");
	this.messages.push("总计："+sum.toFixed(2)+"(元)\n");
}


ReportGenerator.prototype.prepareDiscount = function() {
	if(this.shouldDisplayDiscount()) {
		this.messages.push("----------------------\n");
		this.messages.push("挥泪赠送商品：\n");
		var that = this;
		this.items.forEach(function(item) {
			that.messages.push(item.formatDiscount());
		});
	}
}

ReportGenerator.prototype.prepareDiscountSummary = function() {
	if(this.shouldDisplayDiscount()) {
		this.messages.push("节省："+this.discountAll().toFixed(2)+"(元)\n")
	}
}

ReportGenerator.prototype.shouldDisplayDiscount = function() {
	var discount = false;
	this.items.forEach(function(item) {
		if(item.hasDiscount()) {
    		discount = true;
    	}
	});

	return discount;
}

ReportGenerator.prototype.discountAll = function() {
	var discountAll = 0;
	this.items.forEach(function(item) {
		if(item.hasDiscount()) {
    		discountAll += item.getDiscount();
    	}
	});
	return discountAll;
}

ReportGenerator.prototype.prepareHeader = function() {
	this.messages.push("***<没钱赚商店>购物清单***\n");
}

ReportGenerator.prototype.prepareFooter = function() {
	this.messages.push("**********************");
}

ReportGenerator.prototype.generate = function() {
	this.prepareHeader();
	this.prepareItems();
	this.prepareDiscount();
	this.prepareSummary();
	this.prepareDiscountSummary();
	this.prepareFooter();

	return this.messages.join("");
}