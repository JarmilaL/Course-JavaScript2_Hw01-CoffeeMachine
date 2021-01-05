# Course-JavaScript2_Hw01-CoffeeMachine
First homework for JavaScript 2 course by Czechitas (autumn 2020)


Zadání
======
Opakovací úkol na procvičení znalostí
Požadované znalosti: Objekt (vlastnost, metoda, this, scope), funkce, podmínky, uživatelský vstup, typy

Tvým úkolem bude napsat jednoduchý objekt domácího kávovaru, který bude umět připravit nějakou tu kávičku,
protože jak se dobře ví, programátoři mění kofein ka kód.

Kávovar bude umět připravit druhy kávy které jsou připravené v konstantní objektu (nejde měnit) COFFEE_TYPES.

Kávovar bude mít dohromady šest různých vlastností (všechny typu Number) a to:
 1) maxWaterVolume - kolik se do kávovaru vleze vody (hodnota cca 800)
 2) maxCoffeeWeight - kolik se do kávovaru vleze kávy (hodnota cca 300)
 3) maxMilkVolume - kolik se do kávovaru vleze mléka (hodnota cca 350)
 4) waterVolume - kolik v kávovaru aktuálně je vody
 5) coffeeWeight - kolik v kávovaru aktuálně je kávy
 6) milkVolume - kolik v kávovaru aktuálně je mléka

A bude mít minimálně dvě metody a to:
 1) resourceRefill - která bude brát jeden parametr, který jí bude říkat, jakou surovinu pro výrobu kávy je nutné doplnit
                     a metoda ji doplní. Nesmí se přesáhnout maximální objem/váha suroviny, která se přidává. Metoda by
                     měla brát vstup od uživatele (pomocí funkce prompt), jaké množství suroviny se přidává
                     (nezapomeň, že prompt vždy vrací typ string takže budeš potřebovat funkci parseInt).
                   - BONUS: místo if bloků použij switch
 2) pickCoffee - která bude brát vstup od uživatele, který si vybere kávu. Metoda následovně zjistí jestli vybraná káva je dostupná
                 v COFFEE_TYPES a pokud ano tak zkontroluje jestli má kávovar dostatek zdrojů na její výrobu. Pokud nemá dostatek,
                 tak si vynutí doplnění všech zdrojů, které chybí. V momentě, kdy už má všeho dostatek tak uvaří kávu,
                 odečte všechny zdroje, které spotřeboval a oznámí uživateli, že jeho káva je hotová.
              -  BONUS: vytvoř jednoduché uživatelské prostředí, kde bude možnost vybrat si kávu pomocí tlačítek


Task
====
Homework to repeat and exercise your existing knowledge.
Required knowledge: Object (property, method, this, scope), function, conditions, user input, data types.

Create a simple object of a coffee machine. It should be able to "prepare" several coffee types (see constant object COFFEE_TYPES).

It should have six properties (of type Number):
 1) maxWaterVolume - water container capacity
 2) maxCoffeeWeight - coffee container capacity
 3) maxMilkVolume - milk container capacity
 4) waterVolume - current water volume
 5) coffeeWeight - current amount of coffee
 6) milkVolume - current milk volume
 
And it should have at least two methods: 
  1) pickCoffee - User input necessary. User picks a coffee from offer. Method check if there is sufficient amount of resources to prepare picked coffee. If not, another method is called to refill missing resources. As soon as resources are refilled, coffee should be prepared (user should be informed).

  2) resourceRefill - Missing resources should be refilled. Max volume/weight must not be exceeded. Method should work with user input. 
                    
BONUS: Create simple UI.                    
