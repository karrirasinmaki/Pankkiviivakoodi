(function(win) {
	
	var leadingZerosNum = function(zerosStr, num) {
		var zerosLen = zerosStr.length;
		return (zerosStr.substring(0, zerosLen - (""+num).length) + num).substring(0, zerosLen);
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
    var luo = function(img, iban, eurot, sentit, viite, paiva, kuukausi, vuosi) {
		if (arguments.length < 8) {
			throw "Unohdit antaa kaikki function vaativat parametrit.";
			eurot = 0;
			sentit = 0;
		}
		if ((""+eurot).length > 6) {
			console.warn("Laskun summa on liian suuri tulostettavaksi viivakoodille. Tulostetaan summa 00000000.");
			eurot = 0;
			sentit = 0;
		}
		else if ((""+sentit).length > 2) {
			console.warn("Annetut sentit ovat enemmän kuin 99. Tulostetaan summa 00000000.");
			eurot = 0;
			sentit = 0;
		}
		
		iban = (""+iban).replace("FI", "");
		eurot = leadingZerosNum("000000", eurot);
		sentit = leadingZerosNum("00", sentit);
		viite = leadingZerosNum("00000000000000000000", viite);
		vuosi = (""+vuosi).substr(-2);
		kuukausi = leadingZerosNum("00", kuukausi);
		paiva = leadingZerosNum("00", paiva);
		
		var data = "4" + iban + eurot + sentit + "000" + viite + vuosi + kuukausi + paiva;
		
		img.style.height = "10mm";
		img.style.width = "105mm";
		JsBarcode(img, data, {
			width: 1, 
			height: img.offsetHeight, 
			totalWidth: img.offsetWidth,
			format: "CODE128C"
		});
	};
    
    win["Pankkiviivakoodi"] = {
        luo: luo
    }
    
})(window);