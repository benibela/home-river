%SCRIPT
/* Counts how many Homespring(Tree) tokens are in the currently selected text, handling escape characters
   (useful if you need to add a certain count of filler tokens)
*/
var tokenizer = /^( *)(([.] |[^ ])*)(.*)$/;
var token = tokenizer.exec(cursor.selectedText());
var tokenCount = token[2] != "" ? 1 : 0;
while (token[2] != "") {
token = tokenizer.exec(token[4]);
if (token[2] == ".%") break;
if (token[2] == ".{" || token[2] == ".\\") continue;
if (token[2] != "") tokenCount++;
}
alert(tokenCount);