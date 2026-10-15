# Source record

Checked against public repositories on 2026-10-08. These are evidence for the conservative project descriptions, not independent reproductions of the projects’ tests. Recheck before changing or publishing capability claims.

| Project | Revision | Primary evidence | Site claims supported |
| --- | --- | --- | --- |
| Astro Nano | `66aa017d614828ba5dba02a9e51a1a714850ad31` | [Theme repository](https://github.com/markhorn-dev/astro-nano/tree/66aa017d614828ba5dba02a9e51a1a714850ad31) | Layout, components, typography, theme controls; original MIT notice retained. |
| LightNet | `c576fcf9e13ae3b012f5e8a751f946c86d6af9fd` | [README](https://github.com/zhaozhixu/LightNet/blob/c576fcf9e13ae3b012f5e8a751f946c86d6af9fd/README.md) | Earlier neural-network optimization framework for different backends; build instructions use historical dependencies. No claim that those instructions were tested against current toolchains. |

## Publishing infrastructure

Rechecked the official deployment guide and the remaining project's public README on 2026-10-14. The manual workflow uses the guide's current action versions and runs the local release checks before uploading the site.

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/): current loader API, `astro/zod`, generated routes, and language-qualified IDs.
- [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/): official action and user-site root URL. The local workflow intentionally uses manual dispatch only.
- [Astro Nano listing](https://astro.build/themes/details/astronano/): owner-selected theme. No demo employer names, sample posts, marketing claims, or sample images are retained.

## First-essay research

The complete Chinese original was read from the separately supplied private bundle. The Chinese source remains outside the public repository. The owner approved the English adaptation and its eight selected figures for the first release on 2026-10-14. The author’s firsthand experiences are attributed to that source; upstream checks establish only the public API and project status.

- [agent-shell README](https://github.com/xenodium/agent-shell/blob/d9493d8921a6ade0c3a4c561db092803f0595e83/README.org) and [source](https://github.com/xenodium/agent-shell/blob/d9493d8921a6ade0c3a4c561db092803f0595e83/agent-shell.el): ACP agent support, transcripts, and `agent-shell-transcript-file-path-function` (no arguments; full path or nil).
- [Issue #734](https://github.com/xenodium/agent-shell/issues/734) and [PR #735](https://github.com/xenodium/agent-shell/pull/735): recognizable output errors after normal end-turn; the proposed retry PR is closed and not merged.
- [lark-cli](https://github.com/larksuite/cli): public CLI reference only. The author’s custom bridge is not represented as publicly released.
- [GNU Emacs manual](https://www.gnu.org/software/emacs/manual/html_node/emacs/Invoking-emacsclient.html): `emacsclient --eval`. The new example expressions are illustrative and were not executed in the author’s running Emacs session.
- DSH revision `5badb15009ae1756c3afe0ae0cef1faafc290ccc`: [README](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/README.md), [retry plugin](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/llm/llm-retry/README.md), [ACP server](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/acp/acp/README.md). Developer preview, request recovery inside agent turns, automation-focused ACP with limited interactive presentation. No tested agent-shell integration or general hot-reload guarantee is claimed.

### Media authorization update — 2026-10-09

The owner confirmed that the supplied Emacs article images are theirs and explicitly requested their inclusion in the local draft. Eight figures are served from ignored local storage, with English captions and alt text. At the owner's subsequent request, built-in image_gen removed the “知乎 @Favoryoung” watermark from seven figures; the GNU illustration needed no cleanup. Cleaned PNGs are saved separately from preserved original JPEGs. This updates the original media-exclusion decision; it does not publish the article or its media.

The owner also requested Lark naming throughout the essay and English translations inside the images. Five localized screenshots were created with built-in image_gen, using explicit English translations and keeping technical identifiers, code, and equations. The article identifies the screenshots as translated adaptations; these are not new captures of an English-language app. Original and watermark-cleaned versions remain available in ignored local storage.

### First-release authorization — 2026-10-14

The owner explicitly requested that the current Emacs article be included in the first release. The approved Markdown is now public content, and exactly the eight images referenced by that version were copied into `public/images/writing/emacs-is-my-ai-coding-workbench/`. Image bytes are unchanged from the reviewed copies. The English publication date is 2026-10-14; the source article's 2026-10-02 date remains separate. The author's latest wording, passion, captions, and left-side table of contents are preserved.

## Programming-taste article — 2026-10-14

The owner approved the author-edited head-pointer revision of **Good Taste Makes Special Cases Disappear** as the formal article. The English publication date is 2026-10-14; the original Chinese date remains 2026-08-08. The author's latest prose is preserved. Two reviewed illustrations are included unchanged, with attribution and the full MIT notice in the article.

- [Original Chinese answer](https://www.zhihu.com/question/2066610730116421630/answer/2069433686110496569): the author's argument, metaphors, and firsthand LightNet experience. The English examples were revised to use an ordinary head pointer consistently.
- [Official TED interview](https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux) and [TED's event report](https://blog.ted.com/the-quotable-linus-torvalds-live-onstage-at-ted/): Torvalds's 2016 interview with Chris Anderson. The approximately 14:10 reference is corroborated by the linked illustration author's explanation. The fetched official page did not expose a transcript; the aside about requesting an interview format remains attributed to the author's source rather than independently verified here.
- [Marc Kirchner's explanation](https://github.com/mkirchner/linked-list-good-taste/tree/cbc3fb92257c5444b461637fd08394820129361f) and [MIT license](https://github.com/mkirchner/linked-list-good-taste/blob/cbc3fb92257c5444b461637fd08394820129361f/LICENSE): original source of the two illustrations and explanation of pointer-to-pointer traversal. Copyright (c) 2020 Marc Kirchner; the copyright and permission notice are retained.
- [Cambridge Computer Laboratory's 2016 Wheeler lecture](https://www.cl.cam.ac.uk/seminars/wheeler/andrew-herbert/): institutional attribution of the indirection aphorism to David Wheeler. The article retains the wording supplied in the author's original.
- [LightNet's linked-list implementation](https://github.com/zhaozhixu/LightNet/blob/c576fcf9e13ae3b012f5e8a751f946c86d6af9fd/src/ln_list.c#L105): `ln_list_remove` uses a pointer to pointer beginning at `&list`, rewires the incoming pointer, and returns the updated list head. The same revision contains the project's hash-table and graph implementations. This supports the author's statement that he used the technique; no current build or performance claim is made for LightNet.

The article's two revised removal implementations were compiled locally with `clang -std=c11 -Wall -Wextra -Werror`. All 42 valid-target cases passed: every position in lists of lengths 1 through 6, for both implementations. Checks covered the returned head, surviving node identities and order, and NULL termination. These examples assume that the target is a non-null node already in the list and unlink it without freeing its memory. The checks are specific to these examples; the full LightNet project was not built or tested for this article.

## AI coding and software decay — 2026-10-14

The owner requested the reviewed English essay be committed, built, and pushed. Its English publication date is 2026-10-14; the Chinese source date remains 2026-07-24. The reviewed prose is preserved. Four selected figures were copied byte-for-byte from the reviewed clean versions. The Python and Perl profile labels were translated into English, and the Zhihu uploader watermarks were removed from all four figures at the owner's request. The original article's Moegirlpedia attribution is retained; watermark removal is not represented as an ownership or licensing determination.

- [Original Chinese answer](https://www.zhihu.com/question/2061736961354774298/answer/2064027740009928302): the author's argument, personal TensorRT anecdote, humor, and engineering proposals. The question's 30% premise is not presented as a measured result in the English title. Numerical productivity and decay comparisons in the essay are the author's argument, not independently reproduced benchmarks.
- [Python typing documentation](https://docs.python.org/3.14/library/typing.html) and [PEP 544](https://peps.python.org/pep-0544/): annotations are not enforced by the interpreter; Protocol supports structural subtyping. Explicit implementation declarations in the essay are an advocated project policy, not an intrinsic Protocol requirement. Ordinary interfaces do not by themselves enforce all behavioral properties.
- [PEP 768](https://peps.python.org/pep-0768/) and [Python 3.14 pdb documentation](https://docs.python.org/3.14/library/pdb.html): the external debugger interface and PID attachment. The essay's comprehensive runtime oversight and guardian-agent scenarios remain proposals, not claimed implementations of PEP 768.
- [Linux eBPF verifier documentation](https://docs.kernel.org/bpf/verifier.html): dynamic instrumentation is subject to verifier, program-type, helper, memory-access, and permission constraints. The essay's broad eBPF comparison is the author's analogy, not a guarantee of unrestricted access.
- [Paul Graham's What Made Lisp Different](https://www.paulgraham.com/diff.html): the ninth point quoted in the supplied original. The page is dated December 2001, revised May 2002.

The Perl example was run locally with exit status 0 and no stderr. It reported apple 3, banana 2, cherry 1, and date 1, with bar lengths 10, 6, 3, and 3. The two Python fragments illustrate external-library and dynamic-import patterns; they are not presented as standalone tested programs.

## Live programming with pyvivo — 2026-10-14

The owner approved the reviewed pyvivo translation for commit, build, and push. The English publication date is 2026-10-14; the original Chinese date remains 2026-08-02. The approved prose is preserved, and its cleaned architecture diagram was copied unchanged into the article's public image directory. The original image remains preserved locally. The AI coding essay now links to the English pyvivo article, and both references back to the AI coding essay use its permanent site route. The separate, untranslated short Emacs essay still links to its Chinese original.

- [Original Chinese answer](https://www.zhihu.com/question/27376156/answer/2067252272313152605): the author's live-programming argument, architecture, examples, limitations, and proposed features.
- [pyvivo README](https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/README.md), [client](https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/src/pyvivo/client.py), and [agent](https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/src/pyvivo/agent.py): the checked public revision implements the bootstrap, Unix socket, thread/frame inspection, eval/exec, code-object replacement, patch history, and rollback. Compatibility checks cover call shape and free-variable names; defaults and annotations remain unchanged. Existing active frames keep their current code. Mode 0600 restricts socket access by account, not exclusively to one client process.
- [CLI](https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/src/pyvivo/cli.py) and [process-tree discovery](https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/src/pyvivo/process_tree.py): shared patch IDs and individual process results. Tree operations are not atomic. The article's rebind and conditional-patching modes remain proposals.
- [Python 3.14 sys.remote_exec documentation](https://docs.python.org/3.14/library/sys.html#sys.remote_exec) and [PEP 768](https://peps.python.org/pep-0768/): asynchronous interpreter-supported injection with compatible-interpreter and OS-permission requirements. An interpreter safe point does not ensure application-level patch safety. PEP 768's platform scope does not establish Windows support for this Unix-socket-based prototype.
- [Ron Garret's firsthand account](https://flownet.com/gat/jpl-lisp.html) and [interview](https://corecursive.com/lisp-in-space-with-ron-garret/): the 1999 Deep Space 1 experiment, remote REPL, race condition, and quotation. The interview describes injecting an event to unblock the session; the translation says the team fixed it in place without asserting a particular code patch.

At the pinned revision, `python3 -m unittest discover -s tests` on macOS with CPython 3.14.3 ran 46 tests: 45 passed; one live-attach integration test errored during setup because macOS denied the child-process Mach task-port access required by `sys.remote_exec` (`kern_return_t: 5`). No privilege escalation was attempted. This observation supports the tested helpers and command parsing; it is not evidence of a successful live-attach cycle in this environment or a production-safety guarantee.

## Open source and creative freedom — 2026-10-15

The owner approved **Open Source and the Freedom to Create** for commit, build, and push. Its site release date is 2026-10-15; its original Chinese date, 2026-09-16, is the displayed article date. The latest reviewed prose and requested English quotation are preserved. The final illustration and caption were removed at the owner's request; this article publishes no media.

- [Original Chinese answer](https://www.zhihu.com/question/2083123101873844765/answer/2083780674100773658): the author's account of programming work, open source, and creative freedom. The finite/infinite-game analogy and social conclusions are the author's argument.
- [The Communist Manifesto, Chapter II](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm) and [edition record](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/index.htm): the quotation about each person's free development comes from Samuel Moore's 1888 English translation in cooperation with Engels.
- [James P. Carse, Finite and Infinite Games, publisher's edition](https://www.simonandschuster.net/books/Finite-and-Infinite-Games/James-Carse/9781476731711): winning a finite game versus continuing an infinite game.
- [Value, 共产党员网](https://fuwu.12371.cn/2014/02/17/ARTI1392602984940346_all.shtml): the philosophical definition of value as an object's usefulness in meeting a subject's needs.
- [Marx, Grundrisse, Notebook VI](https://www.marxists.org/archive/marx/works/1857/grundrisse/ch12.htm): the wording about attractive work and individual self-realization.

At the owner's request, article headers, lists, metadata, and RSS now use the original publication date when supplied, and lists sort newest first by that date. `publishedAt` still records the site release date and controls publication eligibility. Answer adaptations include the original question's title in English in their attribution.

## Programming languages between C and Lisp — 2026-10-15

The owner approved the reviewed essay and diagram for commit, build, and push. Its site release date is 2026-10-15; its displayed original date is 2026-08-15. The author's closing note explicitly acknowledges rhetorical exaggeration and the omission of type systems, logic programming, concurrency, and other language-design traditions. The reviewed English diagram was copied unchanged into the public article directory. Captions and accessibility text describe image content; translation and image-editing records remain in editorial notes.

- [Original Chinese answer](https://www.zhihu.com/question/593462158/answer/2071979262836577601): the two-mountain metaphor, language comparisons, and C-accent conclusion.
- [LISP I Programmer's Manual, printed p. 88 / PDF page 94](https://www.softwarepreservation.org/projects/LISP/book/LISP%20I%20Programmers%20Manual.pdf#page=94): early use of “objects” for atomic symbols and “property lists” for association lists. The phrase quoted in the essay is retained from the supplied answer; it paraphrases the manual rather than quoting it verbatim. This terminology does not establish that C++'s object model came from Lisp; [Stroustrup's account](https://www.stroustrup.com/bs_faq.html) traces its classes, inheritance, and virtual functions to Simula.
- [John McCarthy's History of Lisp](https://www-formal.stanford.edu/jmc/history/lisp/node3.html): firsthand account of choosing garbage collection and developing the interpreter and READ/PRINT notation.
- [Brendan Eich's Popularity](https://brendaneich.com/2008/04/popularity/): Scheme-inspired first-class functions and Self-inspired prototypes in JavaScript.
- [MIT's SICP course readings](https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/pages/readings/): the course, textbook, and Scheme material.
- [Common Lisp HyperSpec, DEFMACRO](https://www.lispworks.com/documentation/HyperSpec/Body/m_defmac.htm): macro expansion functions operate on forms. [Paul Graham's What Made Lisp Different](https://www.paulgraham.com/diff.html) supplies the argument about other languages converging on Lisp's macro facilities. The essay's ranking is a rhetorical judgment, not a formal expressiveness result; [Rust's reference](https://doc.rust-lang.org/reference/procedural-macros.html) documents its own token-stream transformations.
