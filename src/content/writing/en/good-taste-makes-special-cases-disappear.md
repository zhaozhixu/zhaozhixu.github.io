---
title: Good Taste Makes Special Cases Disappear
description: Linus Torvalds’s linked-list example shows how a better abstraction eliminates special cases—and why that matters for the code our AI agents write.
slug: good-taste-makes-special-cases-disappear
lang: en
draft: false
publishedAt: 2026-10-14
tags:
  - Programming Languages
  - AI & Software
translationKey: zhihu-source-03
originalUrl: https://www.zhihu.com/question/2066610730116421630/answer/2069433686110496569
originalPublishedAt: 2026-08-08
adaptedFrom: "The author's Chinese Zhihu answer about programming taste, published as Favoryoung."
---

*Adapted from [my Chinese answer on Zhihu](https://www.zhihu.com/question/2066610730116421630/answer/2069433686110496569), originally published on August 8, 2026.*

When we talk about good taste in code, we can do more than trade abstract principles. There is a famous, concrete example from [Linus Torvalds’s 2016 TED interview](https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux), at around 14:10. He dislikes giving talks, so he had the organizers make it an interview instead. The perks of being Linus.

The example is simple: an introductory data structures exercise, removing a node that is known to be in a linked list.

## The textbook solution

<figure class="article-figure">
  <a href="/images/writing/good-taste-makes-special-cases-disappear/programming-taste-linked-list.jpg" target="_blank" rel="noopener" aria-label="Open full-size linked-list diagram (new tab)">
    <img src="/images/writing/good-taste-makes-special-cases-disappear/programming-taste-linked-list.jpg" alt="A head pointer leads to a singly linked list containing the values 4, 12, 3, 6, and 2. Each node points to the next; the last points to NULL." width="2362" height="202" loading="lazy" decoding="async" />
  </a>
  <figcaption>A singly linked list. Illustration by Marc Kirchner.</figcaption>
</figure>

A linked-list node is just a struct containing a `value` for the data and a pointer to the next node. The pointer `head` holds the address of the first node.

```c
struct list_entry {
    int value;
    struct list_entry *next;
};
typedef struct list_entry list_entry;
```

The interviewer contrasts two ways to write the removal function. Here is the textbook approach, using a head pointer:

```c
list_entry *remove_list_entry(list_entry *head, list_entry *entry)
{
    list_entry *prev = NULL;
    list_entry *walk = head;

    // Walk the list until we reach the node to remove.
    while (walk != entry) {
        prev = walk; // Keep track of the previous node.
        walk = walk->next;
    }

    if (!prev) // The first node: update head itself.
        head = entry->next;
    else // Otherwise, update the previous node's next pointer.
        prev->next = entry->next;

    return head;
}
```

This is the standard textbook answer. To remove a node, first find it, then make the preceding node point to the following one. If we are removing the first node, we update `head` itself. The node is no longer part of the list. We are not freeing its memory here, just unlinking it.

Both implementations return the resulting head pointer, so the caller writes:

```c
head = remove_list_entry(head, entry);
```

But Linus does not consider this good taste, because it introduces a special case: is the target the first node? That takes an `if` to handle. The nodes are all on equal footing, yet a node becomes a special case simply because it happens to come first.

Perhaps such a small demo does not convince you. “It’s just one more `if`. What’s the big deal?”

In a large, real-world system, though, this kind of structure reflects a real design flaw: the abstraction creates a special case where none needs to exist. In physics, the analogy would be a theory that cannot properly account for the experimental data and needs patching. In astronomy, it would be Ptolemy’s geocentric model explaining the Earth and Sun perfectly, only to need epicycles piled onto deferents to explain the planets’ retrograde motion.

## One more level of indirection

The version Linus considers good taste uses one more level of pointer indirection to make the special case disappear.

```c
list_entry *remove_list_entry(list_entry *head, list_entry *entry)
{
    // Think about why we can take this address here. ;)
    list_entry **indirect = &head;

    // Walk the pointers leading to the nodes.
    // Reminder: -> has higher precedence than & and *.
    while (*indirect != entry)
        indirect = &(*indirect)->next;

    // Then just unlink it.
    *indirect = entry->next;
    return head;
}
```

The clever move is changing the iterator from `list_entry *walk`, which points directly to each node, to `list_entry **indirect`, which points to the place where that node’s address is stored.

Every node has a pointer leading to it. For the first node, that pointer is `head`; for every other node, it is the preceding node’s `next` field. Once we operate on that incoming pointer, the distinction disappears.

Taking `&head` works because `head` is a local pointer variable. At the start, `indirect` points to that variable; as we walk the list, it points to the `next` fields inside the nodes. The final assignment, `*indirect = entry->next`, updates whichever pointer leads to the target. Returning `head` lets the caller keep the new starting point if the first node was removed.

Relativity replaces Newtonian mechanics. Heliocentrism replaces geocentrism.

## No extra node required

A dummy head is another way to eliminate the special case: give even the first data node a predecessor, and every removal can update a `next` field. The pointer-to-pointer version achieves that uniformity without adding an extra node.

<figure class="article-figure">
  <a href="/images/writing/good-taste-makes-special-cases-disappear/programming-taste-list-nodes.jpg" target="_blank" rel="noopener" aria-label="Open full-size diagram of the linked-list nodes (new tab)">
    <img src="/images/writing/good-taste-makes-special-cases-disappear/programming-taste-list-nodes.jpg" alt="Five linked nodes containing 4, 12, 3, 6, and 2, with the last pointing to NULL. No dummy node is shown." width="2044" height="196" loading="lazy" decoding="async" />
  </a>
  <figcaption>The linked nodes themselves. Illustration by Marc Kirchner.</figcaption>
</figure>

Simple. Efficient. Natural. If you are used to C, this feels like the perfect abstraction for a linked list.

You might still think: sure, another level of indirection gives us a perfect abstraction, but the original version with an `if` for the first node was easier to understand. It’s only one special case. Is the taste really that bad?

Then I suggest you look back at the code your AI agent has written. How many `if` statements are there to handle special cases?

> [Any problem in computer science can be solved with another level of indirection.](https://www.cl.cam.ac.uk/seminars/wheeler/andrew-herbert/)

---

I once wrote an AI inference engine in C, building it from the ground up, starting with linked lists, hash tables, and graphs. I used Linus’s technique there too: [LightNet](https://github.com/zhaozhixu/LightNet). You can see it in [the linked-list removal code](https://github.com/zhaozhixu/LightNet/blob/c576fcf9e13ae3b012f5e8a751f946c86d6af9fd/src/ln_list.c#L105).

Both illustrations come from [Marc Kirchner’s *Linked lists, pointer tricks and good taste*](https://github.com/mkirchner/linked-list-good-taste).

<details>
<summary>Illustration license</summary>

<p>MIT License<br />Copyright (c) 2020 Marc Kirchner</p>

<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>

</details>
