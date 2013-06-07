diff --git a/./src/hsgui.ml b/home/benito/opt/homespring-0.1.0/src/hsgui.ml
index b45ad28..9d10fcf 100644
--- a/./src/hsgui.ml
+++ b/home/benito/opt/homespring-0.1.0/src/hsgui.ml
@@ -114,6 +114,7 @@ let open_hs name =
         ~tab_label:(GMisc.label
             ~text:(Filename.basename name) ())#coerce
         c#getPane#coerce;
+        ignore(0)
 in
 
 let open_file action = 

