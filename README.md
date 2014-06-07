Pankkiviivakoodi
================

JavaScript-kirjasto suomalaisen pankkiviivakoodin luomiseen.

Kirjasto luo suomalaisen pankkiviivakoodistandardin mukaisen viivakoodin. Tulostettuna viivakoodin korkeus on 10mm ja leveys viivakoodin sivujen "hiljaisten" alueiden kanssa 105mm.

Kirjasto käyttää viivakoodin piirtämiseen [JsBarcode](https://github.com/karrirasinmaki/JsBarcode)-viivakoodikirjaston muokattua versiota.

##Käyttö
```
Pankkiviivakoodi.luo( 
  HTML kuvaelementti, 
  IBAN tilinumero, 
  eurot,
  sentit,
  viitenumero,
  eräpäivän päivä,
  eräpäivän kuukausi,
  eräpäivän vuosi
  );
```

##Esimerkki
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Pankkiviivakoodi</title>
        
        <script src="lib/JsBarcode/JsBarcode.js"></script>
        <script src="lib/JsBarcode/CODE128.js"></script>
        <script src="pankkiviivakoodi.js"></script>
    </head>
    <body>
        
        <img id="viivakoodi">
        
        <script>
            Pankkiviivakoodi.luo(
                document.querySelector("#viivakoodi"), // Kuvaelementti
                "FI79 4405 2020 0360 82",              // IBAN tilinumero
                4883,                                  // Eurot
                15,                                    // Sentit
                "86851 62596 19897",                   // Viite
                12, 6, 2010                            // Päivämäärä 12.6.2010 (päivä, kuukausi, vuosi) 
            );
        </script>
    </body>
</html>
```
Oheinen pätkä tulostaa seuraavanlaisen kuvan:    
![Esimerkkiviivakoodi](https://raw.github.com/karrirasinmaki/Pankkiviivakoodi/esimerkkiviivakoodi.png)

##Lähteet
- [Pankkiviivakoodi-opas v.5.3 | Finanssialan Keskusliitto (7.6.2014)](http://www.fkl.fi/teemasivut/sepa/tekninen_dokumentaatio/Dokumentit/Pankkiviivakoodi-opas.pdf)
