(function(){
	
	JsBarcode = function(image, content, options) {
		
		var merge = function(m1, m2) {
			for (var k in m2) {
				m1[k] = m2[k];
			}
			return m1;
		};
	
		//Merge the user options with the default
		options = merge(JsBarcode.defaults, options);

		//Create the canvas where the barcode will be drawn on
		var canvas = document.createElement('canvas');
		
		//Abort if the browser does not support HTML5canvas
		if (!canvas.getContext) {
			return image;
		}
		
		var encoder = new window[options.format](content);
		
		//Abort if the barcode format does not support the content
		if(!encoder.valid()){
			return this;
		}
		
		//Encode the content
		var binary = encoder.encoded();
		
		//Get the canvas context
		var ctx	= canvas.getContext("2d");
		
		//Set the width and height of the barcode
		canvas.width = binary.length*options.width+2*options.quite;
		canvas.height = options.height;
		
		//Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.backgroundColor){
			ctx.fillStyle = options.backgroundColor;
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}
		
		//Creates the barcode out of the encoded binary
		ctx.fillStyle = options.lineColor;
		for(var i=0;i<binary.length;i++){
			var x = i*options.width+options.quite;
			if(binary[i] == "1"){
				ctx.fillRect(x,0,options.width,options.height);
			}			
		}
		
		//Grab the dataUri from the canvas
		uri = canvas.toDataURL('image/png');
		
		//Put the data uri into the image
		if (image.attr) { //If element has attr function (jQuery element)
			return image.attr("src", uri);
		}
		else { //DOM element
			image.setAttribute("src", uri);
		}

	};
	
	JsBarcode.defaults = {
		width:	2,
		height:	100,
		quite: 10,
		format:	"CODE128",
		backgroundColor:"#fff",
		lineColor:"#000"
	};
	
	//Extend jQuery
	if (window.jQuery) {
		jQuery.fn.JsBarcode = function(content, options) {
			JsBarcode(this, content, options);
		};
	}
	
	//Add as global object
	window["JsBarcode"] = JsBarcode;

})();
function CODE128(string, code){
	code = code || "B";

	this.string128 = string+"";
	
	this.valid = valid;

	//The public encoding function
	this.encoded = function(){
		if(valid(string)){
			return calculate["code128" + code](string);
		}
		else{
			return "";
		}
	}

	//Data for each character, the last characters will not be encoded but are used for error correction
	var code128b = [
	[" ","11011001100",0],
	["!","11001101100",1],
	["\"","11001100110",2],
	["#","10010011000",3],
	["$","10010001100",4],
	["%","10001001100",5],
	["&","10011001000",6],
	["'","10011000100",7],
	["(","10001100100",8],
	[")","11001001000",9],
	["*","11001000100",10],
	["+","11000100100",11],
	[",","10110011100",12],
	["-","10011011100",13],
	[".","10011001110",14],
	["/","10111001100",15],
	["0","10011101100",16],
	["1","10011100110",17],
	["2","11001110010",18],
	["3","11001011100",19],
	["4","11001001110",20],
	["5","11011100100",21],
	["6","11001110100",22],
	["7","11101101110",23],
	["8","11101001100",24],
	["9","11100101100",25],
	[":","11100100110",26],
	[";","11101100100",27],
	["<","11100110100",28],
	["=","11100110010",29],
	[">","11011011000",30],
	["?","11011000110",31],
	["@","11000110110",32],
	["A","10100011000",33],
	["B","10001011000",34],
	["C","10001000110",35],
	["D","10110001000",36],
	["E","10001101000",37],
	["F","10001100010",38],
	["G","11010001000",39],
	["H","11000101000",40],
	["I","11000100010",41],
	["J","10110111000",42],
	["K","10110001110",43],
	["L","10001101110",44],
	["M","10111011000",45],
	["N","10111000110",46],
	["O","10001110110",47],
	["P","11101110110",48],
	["Q","11010001110",49],
	["R","11000101110",50],
	["S","11011101000",51],
	["T","11011100010",52],
	["U","11011101110",53],
	["V","11101011000",54],
	["W","11101000110",55],
	["X","11100010110",56],
	["Y","11101101000",57],
	["Z","11101100010",58],
	["[","11100011010",59],
	["\\","11101111010",60],
	["]","11001000010",61],
	["^","11110001010",62],
	["_","10100110000",63],
	["`","10100001100",64],
	["a","10010110000",65],
	["b","10010000110",66],
	["c","10000101100",67],
	["d","10000100110",68],
	["e","10110010000",69],
	["f","10110000100",70],
	["g","10011010000",71],
	["h","10011000010",72],
	["i","10000110100",73],
	["j","10000110010",74],
	["k","11000010010",75],
	["l","11001010000",76],
	["m","11110111010",77],
	["n","11000010100",78],
	["o","10001111010",79],
	["p","10100111100",80],
	["q","10010111100",81],
	["r","10010011110",82],
	["s","10111100100",83],
	["t","10011110100",84],
	["u","10011110010",85],
	["v","11110100100",86],
	["w","11110010100",87],
	["x","11110010010",88],
	["y","11011011110",89],
	["z","11011110110",90],
	["{","11110110110",91],
	["|","10101111000",92],
	["}","10100011110",93],
	["~","10001011110",94],
	[String.fromCharCode(127),"10111101000",95],
	[String.fromCharCode(128),"10111100010",96],
	[String.fromCharCode(129),"11110101000",97],
	[String.fromCharCode(130),"11110100010",98],
	[String.fromCharCode(131),"10111011110",99],
	[String.fromCharCode(132),"10111101110",100],
	[String.fromCharCode(133),"11101011110",101],
	[String.fromCharCode(134),"11110101110",102],
	//Start codes
	[String.fromCharCode(135),"11010000100",103],
	[String.fromCharCode(136),"11010010000",104],
	[String.fromCharCode(137),"11010011100",105]];

	//The end bits
	var endBin = "1100011101011";

	//This regexp is used for validation
	var regexp = /^[!-~ ]+$/;

	//Use the regexp variable for validation
	function valid(){
		if(string.search(regexp)==-1){
			return false;
		}
		return true;
	}

	//The encoder function that return a complete binary string. Data need to be validated before sent to this function
	//This is general calculate function, which is called by code specific calculate functions
	function calculateCode128(string, encodeFn, startCode, checksumFn){
		var result = "";

		//Add the start bits
		result += encodingById(startCode);

		//Add the encoded bits
		result += encodeFn(string);

		//Add the checksum
		result += encodingById(checksumFn(string, startCode));

		//Add the end bits
		result += endBin;
		
		return result;
	}
	
	//Code specific calculate functions
	var calculate = {
		code128B: function(string){
			return calculateCode128(string, encodeB, 104, checksumB);
		},
		code128C: function(string){
			string = string.replace(/ /g, "");
			return calculateCode128(string, encodeC, 105, checksumC);
		}
	}

	//Encode the characters (128 B)
	function encodeB(string){
		var result = "";
		for(var i=0;i<string.length;i++){
			result+=encodingByChar(string[i]);
		}
		return result;
	}
	
	//Encode the characters (128 C)
	function encodeC(string){
		var result = "";
		for(var i=0;i<string.length;i+=2){
			result+=encodingById(parseInt(string.substr(i, 2)));
		}
		return result;
	}

	//Calculate the checksum (128 B)
	function checksumB(string, startCode){
		var sum = 0;
		for(var i=0;i<string.length;i++){
			sum += weightByCharacter(string[i])*(i+1);
		}
		return (sum+startCode) % 103;
	}
	
	//Calculate the checksum (128 C)
	function checksumC(string, startCode){
		var sum = 0;
		var w = 1;
		for(var i=0;i<string.length;i+=2){
			sum += parseInt(string.substr(i, 2))*(w);
			w++;
		}
		return (sum+startCode) % 103;
	}

	//Get the encoded data by the id of the character
	function encodingById(id){
		for(var i=0;i<code128b.length;i++){
			if(code128b[i][2]==id){
				return code128b[i][1];
			}
		}
		return "";
	}

	//Get the id (weight) of a character
	function weightByCharacter(character){
		for(var i=0;i<code128b.length;i++){
			if(code128b[i][0]==character){
				return code128b[i][2];
			}
		}
		return 0;
	}

	//Get the encoded data of a character
	function encodingByChar(character){
		for(var i=0;i<code128b.length;i++){
			if(code128b[i][0]==character){
				return code128b[i][1];
			}
		}
		return "";
	}
}

function CODE128B(string) {
	return new CODE128(string, "B");
}
function CODE128C(string) {
	return new CODE128(string, "C");
};
(function(win, doc) {
    
    var Pankkiviivakoodi = {
        backgroundColor: "#fff",
        lineColor: "#000",
        strict: false
    };
	
	var leadingZerosNum = function(zerosStr, num) {
		var zerosLen = zerosStr.length;
		return (zerosStr.substring(0, zerosLen - (""+num).length) + num).substring(0, zerosLen);
	};
    
    var drawErrorImage = function(img, msg) {
        var canvas = doc.createElement("canvas");
        
        //Get the canvas context
		var ctx	= canvas.getContext("2d");
		
		//Set the width and height of the barcode
		canvas.width = img.offsetWidth;
		canvas.height = img.offsetHeight;
		
		//Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = Pankkiviivakoodi.backgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
		
		ctx.fillStyle = Pankkiviivakoodi.lineColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(msg, canvas.width/2, canvas.height/2);
        
		//Grab the dataUri from the canvas
		var uri = canvas.toDataURL('image/png');
        img.setAttribute("src", uri);
    };
    
    var drawGeneralErrorImage = function(img) {
        drawErrorImage(img, "Virheellinen pankkiviivakoodi");
    };
    
    /**
     * Check if parameters are valid. Print error image (and throw exception) if not valid.
     */
    var checkStrictValidity = function(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi) {
        if (viite.length > 20) {
            drawGeneralErrorImage(img);
			throw "Viitenumero liian pitkä (max. 20).";
        }
        if (iban.length != 16) {
            drawGeneralErrorImage(img);
            throw "IBAN tilinumero virheellinen.";
        }
    };
    
    /**
     * Check if parameters are valid. Prints out warn message on console if not valid.
     * If mode "strict" is true, throw exception if not valid.
     */
    var checkLooseValidity = function(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi) {
        var giveError = function(msg, looseExtraMsg) {
            if (Pankkiviivakoodi.strict) {
                drawGeneralErrorImage(img);
                throw msg;
            }
            else {
                console.warn(msg + " " + looseExtraMsg);
            }
        };
		if ((""+eurot).length > 6) {
			eurot = 0;
			sentit = 0;
            giveError("Laskun summa on liian suuri tulostettavaksi viivakoodille.", "Tulostetaan summa 00000000.");
		}
		else if ((""+sentit).length > 2) {
			giveError("Annetut sentit ovat enemmän kuin 99.", "Tulostetaan summa 00000000.");
			eurot = 0;
			sentit = 0;
		}
    };
    
	/**
	 * Luo suomalaisen pankkiviivakoodin.
	 * img 		- HTML kuvaelementti, mihin viivakoodi piiretään
	 * iban 	- IBAN tilinumero
	 * eurot 	- Laskun summan eurot
	 * sentit 	- Laskun summan sentit
	 * viite 	- Viitenumero
	 * paiva 	- Laskun eräpäivän päivämäärä
	 * kuukausi - Laskun epäpäivän kuukausi
	 * vuosi 	- Laskun eräpäivän vuosi
	 */
    Pankkiviivakoodi.luo = function(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi) {
		img.style.height = "10mm";
		img.style.width = "105mm";
        
		iban = (""+iban).replace("FI", "").replace(/ /g, "");
        
		if (arguments.length < 8) {
            drawGeneralErrorImage(img);
			throw "Unohdit antaa kaikki function vaativat parametrit.";
		}
        
        checkStrictValidity(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi);
        checkLooseValidity(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi);
		
		eurot = leadingZerosNum("000000", eurot);
		sentit = leadingZerosNum("00", sentit);
		viite = leadingZerosNum("00000000000000000000", viite);
		vuosi = (""+vuosi).substr(-2);
		kuukausi = leadingZerosNum("00", kuukausi);
		paiva = leadingZerosNum("00", paiva);
        
		
		var data = "4" + iban + eurot + sentit + "000" + viite + vuosi + kuukausi + paiva;
		
		JsBarcode(img, data, {
			width: 4, 
			height: img.offsetHeight,
            quite: 20,
			format: "CODE128C",
            backgroundColor: Pankkiviivakoodi.backgroundColor,
            lineColor: Pankkiviivakoodi.lineColor
		});
	};
    
    win["Pankkiviivakoodi"] = Pankkiviivakoodi;
    
})(window, document);