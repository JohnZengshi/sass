const jcp = getJCP();
export const jcpPrint = {
	printPreview(doc) {
		doc.copyrights = '杰创软件拥有版权  www.jatools.com';
		doc.settings = {paperName : "A4"}
		jcp.printPreview(doc, false);
	},
	print() {

	},
}