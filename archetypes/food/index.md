{{- $date := substr .Name 0 10 -}}
{{- $title := replace (substr .Name 11) "-" " " -}}
---
title: {{ $title }}
address:
date: {{ $date }}
ratings:
- 
foodtags:
-
countrycodes:
- 
cover: 
---