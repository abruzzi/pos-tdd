describe("POS", function() {
	it("should scan an item", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：可口可乐，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n" +
            "----------------------\n" +
            "总计：3.00(元)\n" +
            "**********************";

		var result = format(["ITEM000000"]);

		expect(result).toBe(expected);
	});

	it("should scan multiple items at one time", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：可口可乐，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n" +
            "名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n" +
            "----------------------\n" +
            "总计：6.00(元)\n" +
            "**********************";

        var result = format(["ITEM000000", "ITEM000001"]);

		expect(result).toBe(expected);
	});

	it("should scan one item multiple times", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：可口可乐，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n" +
    		"----------------------\n" +
            "总计：6.00(元)\n" +
            "**********************";
		
		var result = format(["ITEM000000", "ITEM000000"]);

		expect(result).toBe(expected);            
	});

	it("should scan items by units", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)\n" +
    		"----------------------\n" +
            "总计：16.50(元)\n" +
            "**********************";

		var result = format(["ITEM000002-3"]);

		expect(result).toBe(expected);            
	});

	it("should scan items mixed together", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)\n" +
            "名称：可口可乐，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n" +
    		"----------------------\n" +
            "总计：22.50(元)\n" +
            "**********************";

		var result = format(["ITEM000002-3", "ITEM000000", "ITEM000000"]);

		expect(result).toBe(expected);            
	});
})