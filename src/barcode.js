function Barcode(code) {
	var pair = code.split('-');
	this.barcode = pair[0];
	this.count = pair[1] ? pair[1] : 1;
}