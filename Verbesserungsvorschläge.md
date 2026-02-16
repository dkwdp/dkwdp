# Projekt Verbesserungsvorschläge:

1. BEM für CSS Klassen benutzen (Block - Element - Modifier) --> Beispiel in LevelNavButton (Normalerweise benutzt man hier __ und -- find ich aber absolut hässlich, deswegen benutze ich gerne einen _ und ein -)
2. Assets wie die tiles nicht im static Ordner sondern in den Assets Ordner
3. Branches auf einem Development Branch mergen, nicht auf Main mergen (Keine Ahnung ob das bei der Projektgröße juckt)
4. Einige Größen von Elementen sind Hard gecoded --> Nicht responsive (Soll die Webapp auch unter mobile benutzbar sein?)
5. Bin ich dumm? In LevelShell Zeile 35 sind Tailwind Klassen, im Projekt benutzen wir aber kein Tailwind oder?
6. Typografie für die h1-..., p, button etc. erstellen --> Weniger doppelten Code 
(Bsp.: in Svelte kann ein style Block als global definiert werden <style global> wenn darin das button Element das Styling cursor: pointer bekommt ist das für alle Buttons im Projekt gültig)