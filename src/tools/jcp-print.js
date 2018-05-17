const jcp = getJCP();
export const jcpPrint = {
	printPreview(doc){
		doc.copyrights = '杰创软件拥有版权  www.jatools.com';
		doc.noMargins = true;
		doc.settings = {paperName : "A4"}
		jcp.printPreview(doc, false);
	},
	printPreviewPaper(doc, width, height){
		doc.copyrights = '杰创软件拥有版权  www.jatools.com';
		doc.noMargins = true;
		doc.settings = {paperWidth: width, paperHeight: height}
		jcp.printPreview(doc, false);
	},
	print() {

	},
}