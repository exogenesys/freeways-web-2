/*
 * Includes all the helper functions here that are being used in the
 * codebase.
 * Created: 19-6-2017
*/

module.exports = {
	buildImgUrl: function(url, height, quality) {
		// params: height, quality in percentage
		//		   url as string
		var s = String(url).split('upload');
		return s[0] + 'upload/c_scale,h_' + height + ',q_' + quality + s[1];
	}
}
