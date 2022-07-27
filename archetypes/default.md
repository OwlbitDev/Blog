---
title: "{{ replace .Name "-" " " | title }}"
description: "{{ replace .Name "-" " " | title }}"

date: {{ .Date }}
lastmod: {{ .Date }}
publishDate: {{ .Date }}

author: hongui

categories:
 - 
tags:
 - 

toc: true
draft: true
url: post/{{ replace .Name "-" " " | title }}.html
---

