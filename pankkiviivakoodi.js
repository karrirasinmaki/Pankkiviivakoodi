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