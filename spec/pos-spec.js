describe("POS", function() {
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

	it("should scan another item", function() {
		var expected = 
			"***<没钱赚商店>购物清单***\n" +
            "名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n" +
            "----------------------\n" +
            "总计：3.00(元)\n" +
            "**********************";

		var result = format(["ITEM000001"]);

		expect(result).toBe(expected);
	});
})