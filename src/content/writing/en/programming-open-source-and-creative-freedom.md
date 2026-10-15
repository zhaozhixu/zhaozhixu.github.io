---
title: Open Source and the Freedom to Create
description: AI can free programmers to create around human needs. Open source shows what becomes possible when users can also become developers—and why that freedom matters.
slug: programming-open-source-and-creative-freedom
lang: en
draft: false
publishedAt: 2026-10-15
tags:
  - AI & Software
  - Open Source
translationKey: zhihu-source-08
originalUrl: https://www.zhihu.com/question/2083123101873844765/answer/2083780674100773658
originalPublishedAt: 2026-09-16
adaptedFrom: "The author's Chinese Zhihu answer on programming, open source, and creative freedom, published as Favoryoung."
---

*Adapted from my Chinese answer on Zhihu to [“What do you think of ‘I Have No Choice but to Bury My Talent in Yesterday’ by Liu Shengyu of DeepSeek?”](https://www.zhihu.com/question/2083123101873844765/answer/2083780674100773658), originally published on September 16, 2026.*

I have been thinking for a long time about programmers, open source, and communism. The upheaval brought by AI makes this a good moment to put those thoughts together.

There are two questions I want to explore:

- At the individual level, how should we respond to AI's revolution in the productivity of old-fashioned, hand-written programming? Where do we put the programming skills we spent so many years painstakingly honing?
- At the societal level, will AI bring a cyberpunk apocalypse in which a single ultimate owner controls the means of production, or a communist paradise in which everyone is free to develop themselves?

Marx and Engels describe this vision of a society beyond class divisions in [*The Communist Manifesto*, Chapter II](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm):

> “…we shall have an association, in which the free development of each is the condition for the free development of all.”

## Two kinds of programming work

For the first question, I have long had a rough distinction in mind. The code programmers write falls into two broad categories: performance optimization and value creation.

**Performance optimization means spending human effort to reduce machine costs.** Squeeze more out of a CPU or GPU, save RAM or GPU memory, make full use of bandwidth—and keep going until the machine costs you save are worth less than your salary, or an AI tool can cut those costs more cheaply and more thoroughly. At that point, you face the risk of being laid off. To break out, you either find a new, harder, more valuable performance bottleneck, or move into management, lead a team, and take on a wider scope so you can reduce costs across a larger area. This is a finite game.

**Value creation means using machines to reduce human effort.** Build an app, automate a business process, develop an open-source framework that benefits many people. This is the human instinct to use tools to make resources go further. It is what makes “laziness” a programmer's virtue. This is an infinite game, one that lets more people keep playing.

In the distinction drawn by James P. Carse in [*Finite and Infinite Games*](https://www.simonandschuster.net/books/Finite-and-Infinite-Games/James-Carse/9781476731711), the finite player aims to win; the infinite player aims to keep the game going. Infinite players therefore look beyond the immediate victory and keep expanding the boundaries of play.

The context window of an AI agent is naturally suited to local tasks such as performance optimization. I see this as an opportunity for us to give more attention to value creation. Even using an agent to optimize performance automatically changes the equation: **spending human effort to reduce machine costs** becomes **using machines to reduce human effort**. We can move from competing in a finite *Squid Game* to creating an infinite game.

Of course, value is undifferentiated human labor embodied in commodities. None of this means that performance optimization has no value. I have spent years doing performance optimization in AI infrastructure myself. With AI GPU prices through the roof, this work is enormously valuable. It is also a necessary step toward lowering the cost of creating value.

My point is that the value of reducing machine costs has a ceiling, rather like a nonrenewable resource. Even without AI, once performance has been squeezed to its limit and no new hardware comes along, our talent can still end up “buried in yesterday.”

## Value begins with unmet needs

Looking at value creation brings us to the second, larger question: where is our world heading?

What does it mean to create value? In the [philosophical sense of value as a relationship between a subject and an object](https://fuwu.12371.cn/2014/02/17/ARTI1392602984940346_all.shtml), value is the positive significance and usefulness of an object in meeting a subject's needs. Creating value is, at heart, meeting needs through labor. The most important step in finding work that creates value is finding needs that have not been met.

Where do those needs come from? Thinkers from Marx to Maslow have pointed out that, beyond basic physical needs such as food, clothing, housing, and transport, human beings have higher needs: leisure, beauty, self-realization. Work itself can become, in Marx's words, [“attractive work, the individual's self-realization”](https://www.marxists.org/archive/marx/works/1857/grundrisse/ch12.htm).

Tragically, under present conditions, most work is becoming alienated. People often cannot fulfill their need for self-realization through their jobs. Instead, pressures inherited from the feudal past—homeownership and patriarchal family obligations, for example—join forces with capital's pursuit of surplus value to squeeze them from both sides. They are forced to work simply to get through life. Meanwhile, impoverished regions where even basic physical needs remain unmet are routinely ignored because the people there cannot pay.

It is 2026, and AGI has already been declared to [“have arrived”](https://www.forrester.com/blogs/agi-has-arrived-but-its-just-barely-competent/). But can our existing, suppressed needs really absorb AI's immense productive capacity? And once those needs are liberated, can closed-source AI controlled by large corporations truly meet humanity's need for free development?

History has already shown us.

## What open source has already made possible

In computing, the free software movement that began in the 1980s, and the open-source movement it helped give rise to, were early signs that the need for self-realization could not be contained. They are also hard evidence of open source's power to advance human society:

- In 1983, Richard Stallman [announced GNU](https://www.gnu.org/gnu/initial-announcement.html), launching the free software movement: a community built on the freedom to use, study, modify, and share software, with copyleft ensuring that distributed derivatives preserve those freedoms.
- In 1991, Linus Torvalds developed the Linux kernel. In 1992, he [rereleased it under the GNU GPL](https://www.gnu.org/gnu/gnu-linux-faq.html#linuxalone), making it free software and allowing it to complete the GNU system.
- On April 30, 1993, CERN [put its World Wide Web software in the public domain](https://home.cern/science/computing/the-birth-of-the-web/where-web-was-born/), making it freely available for anyone to use and improve.
- Around 2000, Linux was [expanding rapidly across web servers](https://www.redhat.com/en/about/press-releases/press-globaluse) and [entering enterprise systems](https://newsroom.ibm.com/Thirteen-Months-That-Changed-IBM).
- In 2007, the iPhone arrived with the system later named iOS, built on Darwin and the [XNU kernel, which combines Mach with FreeBSD components and IOKit](https://github.com/apple-oss-distributions/xnu/blob/main/README.md). In 2008, Linux-based Android followed, and Google [released its source code](https://android-developers.googleblog.com/2008/10/android-is-now-open-source.html). The mobile internet finally found its way into everyone's hands.

Programmers, especially open-source programmers, may be among the professions with the greatest revolutionary potential today. They are among those closest to common ownership of the means of production—open-source code—and material abundance, because their means of production are so cheap.

From GNU and Linux onward, open-source software ushered in the internet age. Driven by the hacker spirit, it demonstrated the superior productivity at its heart: nobody understands where software needs to go better than the developers who use it. Only when users also become developers, free to create software around their own needs, can software development reach peak efficiency.

## Start with your own needs

AI, born from the internet age, releases more of this productive potential. It lowers the barrier between user and developer, making it easier for people to build tools that meet their own needs. If we nurture this spark and let it catch fire, humanity will enter an unprecedented period of development driven by individual needs.

Unfortunately, in China and elsewhere, much of frontier AI is still controlled by large companies and delivered through closed models—which makes [DeepSeek's openly released work](https://github.com/deepseek-ai) all the more precious. On the other side, people remain constrained by alienated work, corporate monopolies, and the lingering pull of feudal social structures. They have yet to recognize the potential of their own need for self-realization.

Mass-market products from large companies will never satisfy everyone's individual needs, just as the commercial software of the last century could not satisfy hackers' urge to create. Start by looking for your own needs. Find them and meet them. Then look for people who feel the same way.

There are more than eight billion people in this world. You will find your people.
