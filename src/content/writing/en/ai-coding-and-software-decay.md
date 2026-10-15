---
title: Why Faster AI Coding Does Not Mean Faster Development
description: AI agents can industrialize the production of hacks. Python shows how software decays—and how live, inspectable systems might help us fight back.
slug: ai-coding-and-software-decay
lang: en
draft: false
publishedAt: 2026-10-14
tags:
  - AI & Software
  - Programming Languages
translationKey: zhihu-source-02
originalUrl: https://www.zhihu.com/question/2061736961354774298/answer/2064027740009928302
originalPublishedAt: 2026-07-24
adaptedFrom: "The author's Chinese Zhihu answer about AI coding and software decay, published as Favoryoung."
---

*Adapted from [my Chinese answer on Zhihu](https://www.zhihu.com/question/2061736961354774298/answer/2064027740009928302), originally published on July 24, 2026.*

Because software is rotting faster too.

Take Python. If you have written it for more than a year, you have probably seen code like this:

A class does not quite do what someone needs, so they monkey-patch it at runtime. A function has too many complicated parameters, so someone throws them all into `**kwargs` and uses `hasattr` and `isinstance` inside the function to guess what the caller passed in. A bizarre production bug takes three days to track down, only to reveal that some module quietly changed the global configuration when it was imported.

Python is famous for its flexibility. That is central to its success. But we rarely take the next question seriously: when that flexibility has no constraints, and “if it runs, it’s good enough” becomes the default, how fast does the software rot?

The age of agents is accelerating that decay to an unprecedented degree. AI excels at local optimization, temporary fixes, and getting around obstacles. In other words, AI is a natural at hacking things together. When dozens of agents work on a large project at once, each responsible only for its own little task, the decay may stop being linear and become exponential.

## The price of flexibility

Python’s old motto was: “There should be one—and preferably only one—obvious way to do it.” It was known for being orderly, without too many clever tricks.

<figure class="article-figure article-figure--small" style="max-width: 320px;">
  <a href="/images/writing/ai-coding-and-software-decay/ai-software-decay-python-en-clean.png" target="_blank" rel="noopener" aria-label="Open full-size Python illustration (new tab)">
    <img src="/images/writing/ai-coding-and-software-decay/ai-software-decay-python-en-clean.png" alt="Python personified as a smiling young woman in an orange dress, with a blue-and-yellow snake draped around her shoulders." width="1036" height="1518" loading="lazy" decoding="async" />
  </a>
  <figcaption>Python as a refined young lady. Illustration via Moegirlpedia.</figcaption>
</figure>

> Compare that with Perl’s motto, “There’s More Than One Way To Do It,” which people used to beat it over the head with. Quite ironic. I wonder how many people still know Perl: the Swiss Army knife of text processing, notorious for syntax that looks like an undecipherable scripture. I actually like it. Before AI agents, Perl let you compress the context in your own brain to the limit. Its information density per token is enormous; once you know it well, it feels as if you can speak a spell and make it happen. The price, of course, is that you come back a while later and can’t fucking read your own code. So please, never use Perl for a large project. It belongs in small tools.

```sh
# A runnable Perl example. Look at the information density.
echo "apple banana apple cherry banana apple date" | \
perl -MList::Util=max -ane '
  $w{lc($_)}++ for $::_ =~ /[a-z]+/gi;
  END {
    $m = max(values %w) || 1;
    $c = sub { "\e[38;5;".(39 + int($_[0]*5))."m" };
    printf "%-10s | %s (%d)\n", $_, $c->($w{$_}/$m)."█" x int($w{$_}/$m*10)."\e[0m", $w{$_}
      for sort { $w{$b} <=> $w{$a} or $a cmp $b } keys %w
  }
'
```

<figure class="article-figure article-figure--small" style="max-width: 320px;">
  <a href="/images/writing/ai-coding-and-software-decay/ai-software-decay-perl-en-clean.png" target="_blank" rel="noopener" aria-label="Open full-size Perl illustration (new tab)">
    <img src="/images/writing/ai-coding-and-software-decay/ai-software-decay-perl-en-clean.png" alt="Perl personified as a young woman with short dark hair, glasses, headphones, and a camel-emblem jacket, working on electronics." width="998" height="1575" loading="lazy" decoding="async" />
  </a>
  <figcaption>Perl, the Swiss Army knife of text processing.</figcaption>
</figure>

But Python is no longer that demure young lady either. It trusts programmers to know which features to use and when, without imposing too many restrictions in the language itself. Want to replace a class method? Go ahead. Add attributes to an object at runtime? No problem. Reach straight into private variables? Of course—as long as you know what you are doing.

That trust makes development remarkably efficient. A beginner can write a useful script in a few hours. An experienced Python programmer can implement the same feature with half the code it would take in Java. Data science, AI, operations automation: Python has become the default choice in almost every field that depends on fast iteration.

**Python is today’s Perl.**

The trouble is that people are not always rational, and projects do not always belong to one person.

Software engineering is about managing complexity, establishing contracts, and making code written by different people fit together reliably. Many of Python’s dynamic features weaken those contracts, or dissolve them altogether.

This is not black and white. A monkey patch is not automatically bad code, and dynamic typing does not inevitably end in disaster. The danger is the slope: from “a temporary patch here won’t hurt,” to “everyone else does it this way, so I will too,” to “nobody dares refactor this because nobody knows what depends on the patch.”

The slope is gentle. Every step looks reasonable. But you reach the bottom much faster than you expect.

## Four ways dynamic features erode contracts

Let’s look at the Python features most easily abused, and how they eat away at a system’s boundaries.

### Monkey patching as runtime surgery

At heart, the object system in a dynamic language like Python is one big readable, writable dictionary. You can change practically anything.

While the program is running, you can replace methods, add attributes, and change the behavior of a class, a module, or even a single instance. No source changes, no recompilation. Import it and start changing it.

There are plenty of legitimate uses: mocking external dependencies in tests, hot-fixing a production bug, or temporarily patching a third-party library. In skilled hands, it is a precise surgical instrument.

In everyday development, though, it is more often a shortcut.

Suppose a class in a third-party library does not provide the behavior you need. The proper solution might be inheritance, composition, or an upstream PR. But a monkey patch takes just a few lines:

```python
from some_lib import SomeClass

def new_method(self):
    return self.value * 2

SomeClass.old_method = new_method
```

You may even feel rather clever afterward.

The problem is that this change is global, implicit, and undeclared. Everywhere that imports the module now gets the altered `SomeClass`, without knowing it. Another developer calls `old_method`, expecting the library’s original behavior, and gets the version you quietly substituted.

Worse, patches pile up. Module A patches something, then module B patches it again. Which version wins depends on import order—and in a large project, that order is almost impossible to keep under control.

The interface contract breaks down completely. The class is no longer defined in its source file; its definition is scattered across the runtime. The method you read in the source and the method that actually executes may be entirely different things.

### Duck typing and the unwritten contract

“If it walks like a duck and quacks like a duck, it’s a duck.”

Duck typing is one of Python’s great attractions. You do not need to declare an interface or inherit from a base class. If an object has the right methods and attributes, you can pass it in. That makes code extraordinarily flexible and has given rise to a whole ecosystem of mixins and protocols.

But duck typing checks whether something is there, not what it means.

A function says it accepts a file-like object: anything with a `read` method will do. But does `read` read a file, a network connection, memory, or a database? Does it return `bytes` or `str`? Can it block? Does it have side effects? None of that is in the contract.

In a statically typed language, an interface is a legal document: signed, sealed, and enforced by the compiler. Duck typing is more like a verbal agreement. It works efficiently when both sides understand the rules. When one side misunderstands—or deliberately exploits a loophole—the dispute begins, often only after deployment.

That is why Python later introduced type hints and `Protocol`. But these are optional. Half a project can have annotations while the other half has none. A function can declare that it returns `int`, then return `None`, and the interpreter will not stop it.

The force of the contract still comes down to self-discipline.

### Introspection and metaprogramming

If monkey patching is manually changing the code, `inspect` and metaprogramming are the magic that lets code change itself.

Python’s reflective capabilities are astonishing. At runtime, you can inspect a function’s parameters, list a class’s methods, examine the call stack, and even generate new classes and functions. Add decorators, metaclasses, and descriptors, and you can practically build another language inside Python.

Frameworks love these features. Django’s ORM, SQLAlchemy’s `declarative_base`, Pydantic’s validation, FastAPI’s dependency injection: metaprogramming underpins these wonderful tools.

But once developers start playing with the same machinery in ordinary business code, things begin to get out of hand.

Have you seen a “universal argument-validation decorator”? It uses `inspect` to retrieve a function’s parameters, looks up validation rules in some global configuration by parameter name, and applies them automatically. Sounds impressive. Saves a lot of repetitive code.

Three months later, nobody remembers exactly how a particular parameter gets validated. The rules live in a configuration file, the decorator lives in another module, and the function itself contains no visible validation logic. To diagnose a bug, you have to jump between three places just to reconstruct what happened to one argument between being passed in and being used.

An even more extreme case is a metaclass that generates methods dynamically: creating `get_by_xxx` methods on a `Model` class from a database schema, for example. Yes, there is less code. But the IDE cannot find those methods, the static checker cannot see them, and a newcomer stares at the source wondering where the hell they came from.

Metaprogramming turns explicit code into implicit rules. Once those rules multiply, overlap, and scatter across the project, the code is no longer written. It grows. And things that grow are usually unpredictable.

The interface contract becomes so vague that you cannot even be sure which methods a class has. They may not exist until runtime.

### Dynamic imports and invisible dependencies

Python’s `import` does more than load code. It also executes the module’s top-level code. That gives us all kinds of magic: automatic plugin registration, automatic configuration loading, automatic signal connections.

Many frameworks use this for their plugin systems. Just `pip install` a plugin and the framework discovers it without any configuration. Convenient, right?

The price is that a dependency stops being an explicit `import` statement and becomes an implicit “if it is installed, it takes effect.”

You cannot tell which plugin provides which behavior, because nothing in your code refers to it. Remove a seemingly unused package and the whole system may blow up: some deeply buried logic depended on a side effect of importing it.

Then there are imports built from strings:

```python
module = importlib.import_module(f"handlers.{handler_name}")
handler = getattr(module, handler_class)()
```

This is common in routing systems, plugin architectures, and implementations of the strategy pattern. The flexibility is undeniable: switch implementations by changing a configuration string, without touching the code.

But static analysis falls apart. The IDE cannot find references. `grep` cannot reconstruct the calls. When you refactor, you have no idea what will be affected. The dependency graph turns from a tree into an invisible spiderweb. You only discover which threads connect when the program runs.

Once even imports stop giving you a reliable picture, the software’s static structure exists in name only. You think you are reading the source. You are seeing the tip of an iceberg, with an unknowable mass of dynamically loaded logic below the surface.

> When generative AI first took off, we had more diffusion-model acceleration work than we could handle. So I wrote a library that used `inspect` to dynamically rewrite the complex signatures of diffusion-model PyTorch modules, export them to ONNX, then convert them to TensorRT. The user ran a PyTorch pipeline once, and out came a series of TensorRT models. Then I generated a TensorRT execution function as a string, evaluated it, and monkey-patched it over the original model’s `forward`. The next run used the accelerated implementation. Pretty much every trick in this article, rolled into one. It was a joy to use. The code was also one hell of a hack.

## Agents industrialize the production of hacks

If human developers make hacks by hand, agents put them on an industrial production line.

### The optimum is always local

You give an agent a task: “Add a permission check to this user class.”

A human developer might first ask: how is the permission system structured? At which layer do we already check permissions? Will this change conflict with logic elsewhere? Is there a shared decorator we can reuse?

The agent does not. At least, today’s agents do not.

It receives a local task and aims to make the feature work with the fewest changes. It reads the current file, looks at the surrounding code, and offers the most direct solution. Add an `if` at the start of the method? Sure. Monkey-patch a decorator into the class? Sure. Modify the parent class’s method directly? That works too.

If the tests pass and nothing throws an error, the agent considers the task finished. It does not consider the effect on the whole project, whether the architecture is still coherent, or whether the person maintaining this in three months will be swearing at it.

The agent is not being irresponsible. Its field of view is simply that small. Show it ten files and it thinks within those ten files. Show it one function and it solves the problem inside that function.

Python’s flexibility gives it far too many loopholes.

In Java, adding a feature might mean creating a class, implementing an interface, changing configuration, and registering it in the Spring container. Architectural constraints take effect through that process. In Python, the agent can solve everything with a three-line monkey patch. Perfectly legal syntax. Perfectly working behavior. A complete architectural disaster.

### The tragedy of the commons with multiple agents

The more frightening case is several agents developing the same system at once.

Imagine a medium-sized project with five or six agents working on different modules. Agent A patches a core class to finish its task. Agent B notices that the class no longer behaves as documented, so it patches the behavior back. Agent C depends on A’s patch. Agent D depends on B’s.

Nobody knows what is happening across the system. Every agent thinks its change is small, reasonable, and harmless to everyone else.

This is the tragedy of the commons in software engineering. Everyone erodes the shared codebase a little, and nobody feels responsible for the whole.

Human teams have architects, code reviews, and technical committees to catch this. In an agent team, unless someone deliberately puts constraints and checks in place, the hacks accumulate at an astonishing rate.

### Technical debt compounds

Everyone knows that technical debt carries interest. Fewer people realize that, in the age of agents, the interest compounds.

The messier the project, the messier the code the agent writes.

An agent learns from and imitates the code already there. If the project is full of monkey patches, dynamic magic, and implicit dependencies, the agent concludes that this is how the project is written, and carries on in the same style.

It will not step back and say, “Your architecture is a disaster. You should refactor it.” It follows the local customs.

That creates a vicious cycle. Hacks breed hacks. Confusion breeds confusion. The rate of decay goes from linear to exponential.

A human team might need two or three years to turn a project into a mountain of shit nobody dares touch. With agents helping, six months may be enough.

> Lately I keep noticing that the best agent from six months ago starts struggling when I use it today. Maybe the agent has not been throttled. Maybe the mountain of shit has been growing faster. Is this some kind of Moore’s law for agent-generated shit mountains? Performance halves every six months…

## Python is not the original sin

Let me make one thing clear: this is not an exercise in Python-bashing.

> Though every language is showing signs of accelerated decay in the age of agents. Especially dynamic languages like Python…

<figure class="article-figure article-figure--small" style="max-width: 441px;">
  <a href="/images/writing/ai-coding-and-software-decay/ai-software-decay-all-of-you-clean.png" target="_blank" rel="noopener" aria-label="Open full-size reaction image (new tab)">
    <img src="/images/writing/ai-coding-and-software-decay/ai-software-decay-all-of-you-clean.png" alt="Two movie stills of a man in glasses saying, in Chinese and English, that he does not mean one person—he means everyone present." width="1223" height="1286" loading="lazy" decoding="async" />
  </a>
  <figcaption>“Don’t get me wrong. I don’t mean you. I mean all of you.”</figcaption>
</figure>

The problem is the context and scale in which we use the tool.

A script you write alone, a quick prototype, a notebook for data analysis: be as flexible as you like. That is perfectly fine. Even for a small team’s internal tools, a few hacks to get things done are hardly a crime.

But when a project grows to dozens or hundreds of contributors, when production code serves tens of millions of users, when a system’s lifetime stretches from months to years, the returns from flexibility begin to diminish while the costs rise exponentially.

That is not Python’s fault. It is a scaling problem that every dynamic language faces. Python is just so flexible that you may not even notice where the red line is. By the time you do, you may have slid a long way past it.

More precisely: once the team and the codebase outgrow what self-discipline can hold together, missing language constraints turn into engineering disasters.

Agents lower that threshold further. Their self-discipline is worse than ours.

## Put guardrails around flexibility

So what do we do? Retreat to statically typed languages? That is hardly realistic. Python’s ecosystem is too valuable, especially in AI. Giving it up means giving up half your productivity.

The answer is to put guardrails around its flexibility.

The Python community is already moving in this direction. Many teams simply have not taken it seriously enough.

### Make type annotations standard

Type hints are contracts, not decoration.

A fully annotated Python project and a purely dynamic one are different species when it comes to maintainability. With static checkers such as mypy and Pyright, many interface mistakes can be caught while the code is being written.

More importantly, annotations give agents clear boundaries. If a signature plainly says that a function accepts a `User` and returns a `bool`, the agent is less likely to shove some bizarre duck-typed object into it.

This is the cheapest engineering improvement with the highest return.

### Set rules for dynamic features

The point is to specify when monkey patching and metaprogramming are allowed, who approves them, and which constraints apply. For example:

- Allow monkey patches only in tests and hot-fix scripts. Prohibit them in business logic.
- Require architectural review, complete documentation, and tests for metaclasses and dynamically generated methods.
- Require explicit registration for dynamic imports. Do not scatter string-built imports throughout the codebase.

You do not need many rules. You need to enforce them. When agents contribute to the project, put the rules in their system prompts so they know the boundaries from the beginning.

### Make the architecture enforce the rules

People are fallible. Code review misses things. The strongest constraints are architectural: make it impossible to write the bad code in the first place.

- Make core modules read-only. Business code can call them, but cannot modify them.
- Manage object lifetimes through dependency injection to reduce the coupling caused by direct imports.
- Require `Protocol` or abstract base classes at interface boundaries, with explicit declarations from every implementation.

Architectural constraints work on people and agents alike. However clever an agent is, it cannot bypass physical isolation between modules.

### Hold agents to engineering standards

This is a problem specific to the age of agents.

Do not let an agent write whatever it likes. State the engineering standards in its prompt: type annotations are required, unit tests are required, monkey patching is prohibited, and changes to public interfaces must come with updated documentation.

Then enforce gates in CI/CD. Agent-written code must pass static checks, coverage thresholds, and lint rules before it can be merged. Apply the same quality requirements to AI that you apply to people.

Treat the agent as a junior engineer: give it explicit standards, review its work rigorously, and send it back to rewrite anything that fails. That is how you gain speed while keeping quality under control.

---

**But come on. In the age of AI, how could I end this article with something so safe and sensible? ;)**

<figure class="article-figure">
  <a href="/images/writing/ai-coding-and-software-decay/ai-software-decay-lambda-clean.png" target="_blank" rel="noopener" aria-label="Open full-size lambda illustration (new tab)">
    <img src="/images/writing/ai-coding-and-software-decay/ai-software-decay-lambda-clean.png" alt="A smiling green-haired anime character in a red-and-white costume, with a lambda symbol beside her head." width="1448" height="1086" loading="lazy" decoding="async" />
  </a>
</figure>

## The heretical route of fighting dynamism with dynamism

The suggestions above all follow one idea: constrain flexibility and pull Python toward something more static and predictable.

But perhaps we can go in the opposite direction.

What if increasingly dynamic code is inevitable? What if agents will only produce more hacks, and more hidden ones? What if trying to contain all this with contracts and rules imposed while writing code is a race we can never catch up with?

Then perhaps the answer is to strengthen our control over dynamism: use more powerful runtime inspection, tracing, and intervention to confront the uncertainty of dynamic code.

### The eBPF philosophy

The Linux kernel is one of the largest and most rigorously engineered C projects on Earth. Yet its response was not simply to forbid change. It developed eBPF, a remarkable system for dynamic observation.

The idea is that, without changing the kernel source, recompiling it, or rebooting the system, you can attach probes to almost any kernel function at runtime, observe any state, collect any data, and even filter and modify packets.

Its underlying philosophy is to make every action observable, traceable, and auditable.

The same idea applies to Python.

Instead of banning monkey patches, make every patch inspectable: who made it, when, which method on which class was changed, what the original implementation was, and what replaced it.

Instead of banning dynamic imports, build a runtime dependency graph: track what each module loads, which classes are generated dynamically, and where the call chain makes implicit jumps.

**In a static world, safety comes from prohibition. In a dynamic world, it comes from transparency.**

### Lisp and the system that stays alive

None of this is new. The Lisp community was practicing this style of development half a century ago.

In Lisp, you do not simply write a program, compile it, and launch it as a one-shot affair. The system keeps running, and you talk to it through a REPL. Found a bug? Redefine the function on the spot, and the running process uses the new version without restarting. Want to see an object’s internal state? Inspect it directly. Nothing in the system is out of reach. An exception occurs? Enter the debugger and walk ten frames up the stack, viewing and changing local variables at every level.

Lisp programmers are not afraid of dynamism. Their runtime tools are powerful enough to master it.

Python has these genes too. `pdb`, `inspect`, `sys.settrace`, replacing code objects: these capabilities have always been there. Most teams simply treat them as debugging tools rather than infrastructure for a running production system.

What if we built a runtime REPL for Python too?

> Python 3.14’s [PEP 768](https://peps.python.org/pep-0768/) already provides part of this capability.

### Let agents inspect the running system

Here is the most interesting possibility: if agents accelerate dynamic decay, they can also become our tool for bringing it under control.

With a window into the runtime through a REPL, an agent can oversee the live system.

When something goes wrong, we would not have to kill the entire process and cycle through edit → run → add logs → edit. That workflow is enormously expensive in some large, long-running systems. Instead, we could open the REPL and let the agent write Python scripts to inspect the failing module’s actual state. The scene of the failure is, after all, the most faithful record of what happened. Once we find the problem, we could put together a patch and apply it live to see whether it works. After resolving the immediate issue, we could take our time preparing the proper patch offline.

Fight agents with agents.

With enough compute, we could even have a guardian agent monitoring dynamic behavior during runtime or CI tests. It could detect events such as these:

- A core class’s method is unexpectedly monkey-patched. Raise an alert immediately and record the full call stack.
- A duck-typed argument behaves unexpectedly. The interface fits, but its side effects do not match expectations. Flag the risk automatically.
- A module quietly changes global state during import. Trace the change back to the responsible plugin.

### Use both routes at different layers

Static constraints and runtime inspection suit different layers of a system.

Core components, foundational libraries, public interfaces: these change infrequently and have broad effects. Use static constraints there. Annotate all the types, lock down the interfaces, isolate the architecture, and minimize dynamic magic. Stability comes first.

Business logic, plugins, rapidly evolving modules: these change frequently and need flexibility. Use runtime inspection there. Aim for complete observability while the system runs, rather than complete certainty when the code is written. Detect problems immediately, locate them immediately, and patch them live.

**Keep the core stable and the outer layers alive. Constrain the core; observe the edges.**

This may be a more realistic engineering paradigm for the age of agents. Accept dynamism as the normal state of affairs. Let go of the fantasy of getting everything right once and for all. Build runtime infrastructure that lets us see clearly and correct course at any moment.

> **9. The whole language always available.** There is no real distinction between read-time, compile-time, and runtime. You can compile or run code while reading, read or run code while compiling, and read or compile code at runtime.
>
> — Paul Graham, [*What Made Lisp Different*](https://www.paulgraham.com/diff.html), December 2001

Lisp really is a lighthouse, always out ahead of the other languages.

---

> Lately I have been adding features to agent-shell in Emacs. It is such a pleasure. An Elisp REPL: change code live, inspect state live, reload it live. Hard to believe I am saying this about a 1970s application written in a language from the 1960s. I later wrote about that experience in [*Emacs Is My AI Coding Workbench*](/writing/emacs-is-my-ai-coding-workbench/).

**Update:** I have since written a tool for live programming in Python. Give it a try: [*pyvivo: Live Programming in Python*](https://zhuanlan.zhihu.com/p/2067202576785974584) (in Chinese).
