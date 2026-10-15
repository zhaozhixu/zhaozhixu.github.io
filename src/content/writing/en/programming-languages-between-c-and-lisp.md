---
title: Programming Languages Between C and Lisp
description: C and Lisp are the two great mountains of programming. Other popular languages build bridges between hardware control and the heights of abstraction.
slug: programming-languages-between-c-and-lisp
lang: en
draft: false
publishedAt: 2026-10-15
tags:
  - Programming Languages
translationKey: zhihu-source-09
originalUrl: https://www.zhihu.com/question/593462158/answer/2071979262836577601
originalPublishedAt: 2026-08-15
adaptedFrom: "The author's Chinese Zhihu answer about programming languages, C, and Lisp, published as Favoryoung."
---

*Adapted from my Chinese answer on Zhihu to [“Why have we stopped inventing programming languages?”](https://www.zhihu.com/question/593462158/answer/2071979262836577601), originally published on August 15, 2026.*

There is a pattern to the emergence of programming languages. Every high-level language that becomes popular has its own place in the landscape. If a new language cannot find a suitable new position, it will not catch on.

## Two great mountains

To understand this, start with the two great mountains of programming languages.

- **C:** As close to the hardware as you can get. Operators, structs, statements, and pointers describe CPU and memory operations in plain, direct terms.
- **Lisp:** Program abstraction taken to its limit—the embodiment of an abstract syntax tree. Its advanced features make it a beacon illuminating the world of programming languages.

All the other popular high-level languages are merely building bridges between these two mountains.

<figure class="article-figure">
  <a href="/images/writing/programming-languages-between-c-and-lisp/programming-languages-c-lisp-en.png" target="_blank" rel="noopener" aria-label="Open full-size C and Lisp diagram (new tab)">
    <img src="/images/writing/programming-languages-between-c-and-lisp/programming-languages-c-lisp-en.png" alt="Two mountains labeled C and Lisp are joined by a bridge carrying C++, Rust, Go, Java, C#, Python, JavaScript, Ruby, and Haskell. C emphasizes hardware control; Lisp emphasizes abstraction, metaprogramming, and expressive power." width="2170" height="725" loading="lazy" decoding="async" />
  </a>
  <figcaption>Languages building bridges between C and Lisp.</figcaption>
</figure>

## Building bridges

C++ added object-oriented programming to C. The word “object” originally referred to [“LISP atoms with identified properties”](https://www.softwarepreservation.org/projects/LISP/book/LISP%20I%20Programmers%20Manual.pdf#page=94).

Java added garbage collection to C++. Lisp was [the first language to have it](https://www-formal.stanford.edu/jmc/history/lisp/node3.html).

JavaScript brought functional programming to the web on a massive scale. And here, [Lisp is the founding ancestor](https://brendaneich.com/2008/04/popularity/).

Python's convenient dynamic typing and REPL—read, evaluate, print, loop—made it a darling of programming beginners and the large-language-model era. Lisp had these features first, and gave us the legendary computer science course [SICP, *Structure and Interpretation of Computer Programs*](https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/pages/readings/).

C macros, C++ templates, Rust macros: they seem to carry metaprogramming to ever higher peaks. Yet none reaches the metaprogramming power of Lisp's S-expressions, where [code is data](https://www.lispworks.com/documentation/HyperSpec/Body/m_defmac.htm). Lisp macros are the last summit other languages have yet to conquer. But once a language gains Lisp-like macro power, [it has already become a dialect of Lisp](https://www.paulgraham.com/diff.html).

Go, in fact, pulled back on high-level languages' increasingly chaotic obsession with collecting features, returning most work to C's simplicity and directness.

Rust, meanwhile, is the gifted prodigy with a very high opinion of itself, hoping to close the C–Lisp chasm single-handedly.

Most popular high-level languages speak with a C accent while trying hard to learn Lisp as a foreign language.

> **Note:** The two-mountain picture is a metaphor, and some comparisons exaggerate for effect. This essay focuses on hardware control and program abstraction, leaving much of the history of type systems, logic programming, concurrency, and other strands of language design unexplored. Read it as one perspective on the landscape, not a complete history or a rigorous ranking of programming languages.
