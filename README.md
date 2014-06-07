Pankkiviivakoodi
================

JavaScript-kirjasto suomalaisen pankkiviivakoodin luomiseen.

Kirjasto luo suomalaisen pankkiviivakoodistandardin mukaisen viivakoodin. Tulostettuna viivakoodin korkeus on 10mm ja leveys viivakoodin sivujen "hiljaisten" alueiden kanssa 105mm.

Kirjasto käyttää viivakoodin piirtämiseen [JsBarcode](https://github.com/karrirasinmaki/JsBarcode)-viivakoodikirjaston muokattua versiota.

##Käyttö
Lataa Pankkiviivakoodi-kirjaston paketoitu versio ([dist/pankkiviivakoodi-all.min.js](https://raw.githubusercontent.com/karrirasinmaki/Pankkiviivakoodi/master/dist/pankkiviivakoodi-all.min.js)) ja linkitä se sivullesi:
```
<script src="pankkiviivakoodi-all.min.js"></script>
```

Viivakoodi luodaan seuraavan komennon mukaisesti:
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
        
        <script src="https://rawgit.com/karrirasinmaki/Pankkiviivakoodi/master/dist/pankkiviivakoodi-all.min.js"></script>
    </head>
    <body>
        
        <img id="barcode">
        
        <script>
            Pankkiviivakoodi.luo(
                document.querySelector("#barcode"), // Kuvaelementti
                "FI79 4405 2020 0360 82",           // IBAN tilinumero
                4883,                               // Eurot
                15,                                 // Sentit
                "86851 62596 19897",                // Viite
                12, 6, 2010                         // Päivämäärä 12.6.2010 (päivä, kuukausi, vuosi) 
            );
        </script>
    </body>
</html>
```
Oheinen pätkä tulostaa seuraavanlaisen kuvan:    
![Esimerkkiviivakoodi](https://raw.githubusercontent.com/karrirasinmaki/Pankkiviivakoodi/master/esimerkkiviivakoodi.png)

##Lähteet
- [Pankkiviivakoodi-opas v.5.3 | Finanssialan Keskusliitto (7.6.2014)](http://www.fkl.fi/teemasivut/sepa/tekninen_dokumentaatio/Dokumentit/Pankkiviivakoodi-opas.pdf)
