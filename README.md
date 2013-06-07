Home River
==========

Homespring
-----------

Homespring is a funny language for salmons described here: http://esolangs.org/wiki/homespring

A simple Homespring program printing Hello World is:

    Universe bear hatchery powers world.
        bear hatchery powers o.      bear hatchery powers hell     marshy marshy marshy a snowmelt


(From the 3 interpreters linked there, only the Ocaml-interpreter is complete and able to run the programs in this repository.)


HomeSpringTree
-----------

HomeSpringTree is an extension "language" that "compiles" to Homespring,
and is generally more readable since it removes the semantic meaning of whitespaces,
except for Python-like indentation to specify nesting.

The same Hello World program as above in HomeSpringTree is written as:

    Universe 
      bear hatchery powers world.n 
      bear hatchery powers o.  
      bear hatchery powers hell
      marshy marshy marshy a snowmelt


More details of the language are described in util/translator.js

Examples
----------
The example/ directory contains a bunch of HomeSpringTree (.hst) and their corresponding Homespring (.hs) version.

The .poem.hs programs are written in the way Homespring is intended to be written.

The .hst files usually also contain a comment at the top, describing what the program is doing.

Usage
------------

To run Homespring programs you need to download the Ocaml interpreter 0.1 from http://esoteric.voxelperfect.net/files/homespring/impl/    
If the hsgui part does not compile with your Ocaml version, you can use the patch file in the patch/ directory to add a missing ignore(0).
There are also new fish.svg which have more contrast and are easier to recognize as fish.




To run/compile a HomeSpringTree program, you need the compile script from util/ as well as TeXstudio.  
There create a new user macro in TeXstudio, copy util/translator.js in it and create a user command called homespring pointing to hsrun of the interpreter.  
Calling the macro will then compile the current file from HomeSpringTree to Homespring, save it as /tmp/test.hs and run it.