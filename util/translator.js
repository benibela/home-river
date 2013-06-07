%SCRIPT


/*This TeXstudio script translates a HomeSpringTree structure to a Homespring program
	The semantic tree is the same in both case, but Homespring itself uses arbitrary whitespace to 
	move to the parent of the current node, while HomeSpringTree uses normal indentation to specify 
	the current deep with two easy rules:
	* The first token in a line with a high indentation is a child to the previous node that has a lower indentation.
	* Later tokens on the same line are children of the immediately previous token on the same line
	
	E.g.:
	
	a b c d
	  e f
	    g
	  h
	
	describes the tree in which the token/nodes have the following children:
	node : children
	a : b e h
	b : c 
	c : d
	d :
	e : f g
	
	
	It also adds additional escape characters to the Homespring .-whitespace escape:
	
	.%                 line comment (everything afterwards is ignored)
	.{ ...  .}         brackets make the children of the brackets children of the parent
	of the bracket, independent of their indentation to other nodes
	.n                 escaped "new line2 (only allowed at the end of a token)
	.#NAME:=VA LUE     defines a variable with name NAME and value VA LUE
	.$NAME             access a variable (copies it values in the text like a C macro )
	
	Brackets are useful for trees like:
	
	a b c .{
	   d
	.}
	
	to make d a child of c.
	
	
	todo: fix strange homespringtree indentation like:
	foo
	                 abc
	     def
	          xyz
	          
	          
	 
	(this file itself does not have indentation as it is lost when copy/pasting a script to TeXstudio)
*/

var tokenCount = 0;
var sepToken = " ";
var indentations = [-1,-1];
var tokenCounts = [0, 0];
var bracketProtected = [0, 0];

var lines = editor.document().textLines();
var result = "";
var previousTokenCount = 0;

var macros = {};

for (var li=0;li<lines.length;li++) {
var l = lines[li];
if (l.trim() == "") continue; 
for (var m in macros) 
while (l.indexOf(".$"+m) >= 0)
l = l.replace(".$"+m, macros[m]);
if ( /[ ]*[.]#.*:=/.test(l)) {
var macroDef = /[ ]*[.]#(.*):=(.*)/.exec(l);
macros[macroDef[1]] = macroDef[2];
continue;
}
//if (l == "") break;
var tokenizer = /^( *)(([.] |[^ ])*)(.*)$/;
var token = tokenizer.exec(l);
// alert(l+"\n"+tokenCount+" "+token+"\n"+indentations+"\n"+tokenCounts+"\n"+bracketProtected)
function removeTokens(){
while (tokenCount > tokenCounts[tokenCounts.length-1]) {
result += sepToken; sepToken = " ";
tokenCount--;
} 
}

function popAllLast(){
for (var i = tokenCounts[indentations.length-1]; i > tokenCounts[indentations.length-2]; i--) {
result += sepToken; sepToken = " ";
}
indentations.pop();
tokenCounts.pop();
tokenCount = tokenCounts[tokenCounts.length-1];
bracketProtected.pop();
}

if (token[2] == ".}") {
while (token[2] != "") {
removeTokens();
if (token[2] == ".}") 
while (!bracketProtected[bracketProtected.length-1] && bracketProtected.length > 0) popAllLast();
if (bracketProtected.length == 0) { alert("mismatched .}"); return; break; }
popAllLast();
//result += " "; tokenCount--;
token = tokenizer.exec(token[4]);
}
continue;
} else if (token[2] == ".%" || token[2] == ".\\") continue;

var newIndentationLevel = token[1].length;
if (newIndentationLevel > indentations[indentations.length-1]) {
indentations.push(newIndentationLevel);
tokenCounts.push(tokenCount);
bracketProtected.push(false);
} else if (result != "" && newIndentationLevel == indentations[indentations.length-1])  {
removeTokens();
} else { 
removeTokens();
while (newIndentationLevel < indentations[indentations.length-1] && !bracketProtected[bracketProtected.length-1]) {
popAllLast();
}
if (result != "" && newIndentationLevel == indentations[indentations.length-1]) 
removeTokens();
}
var newTokenCount = 0;
if (token[2] != "") { result += sepToken+token[2]; sepToken = " "; newTokenCount++; }
var protectionCount = 1;
while (token[2] != "") {
newIndentationLevel += token[2].length;
//alert(token)	
token = tokenizer.exec(token[4]);
newIndentationLevel += token[1].length;
if (token[2] != "") {
if (token[2] == ".{") { 
protectionCount = newTokenCount;
indentations.push(0);
tokenCounts.push(tokenCount+newTokenCount);
bracketProtected.push(true);
} else if (token[2] == ".%") { break; }
else if (token[2] == ".\\") { sepToken = "\n"; continue;}
else { result += sepToken+ token[2]; sepToken = " "; newTokenCount++; }
}
//if (!confirm(token)) return;

}//alert(tokenCount+" "+protectionCount+ " "+ newTokenCount)
if (newTokenCount > 0) {
var temp = newTokenCount;
for (var i=protectionCount;i<temp;i++) { result += " "; newTokenCount-=1;}
tokenCount += newTokenCount;
}
//alert(newIndentationLevel+token[1]+":"+indentations);

}
//alert(result);
//editor.write(result)
result = result.trim();
result += "\n";
result = result.replace(/[.]n /g, ".\n");
//alert(result.replace(/ /g, " _ "));

outName = "/tmp/test.hs";
if ( /[.]hst$/.test( editor.document().fileName) ) outName = editor.document().fileName.slice(0,-1);
///*
writeFile(outName, result)
system("txs:///homespring \""+outName+"\" | tail -n 100 | column > txs:///messages");
//*/