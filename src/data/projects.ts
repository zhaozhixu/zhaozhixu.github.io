// Claims checked against the public sources linked in docs/sources.md.
export const projects = [
  {
    id: "pyvivo",
    name: "pyvivo",
    status: "Research prototype",
    description:
      "A REPL-style tool for inspecting and modifying a running CPython process.",
    technologies: "Python 3.14 · Live programming",
    url: "https://github.com/zhaozhixu/pyvivo",
    docs:
      "https://github.com/zhaozhixu/pyvivo/blob/5ff2936ddd4129cfc17c4a02e06e4d8f083c0350/README.md",
    problem:
      "The edit-restart cycle loses the live state of a long-running program, often at the moment when that state is most useful for understanding or fixing it.",
    approach:
      "Use Python 3.14’s remote-execution API to install a small agent in an existing process, then work with it through a local Unix-domain socket.",
    working:
      "The public prototype can inspect threads, frames, and local variables; evaluate or execute code; replace compatible function code objects; roll patches back; and apply commands across a process tree.",
    limits:
      "It targets CPython 3.14 or newer on Linux/macOS-style systems and depends on operating-system attachment permissions.",
  },
  {
    id: "emacs-d",
    name: "emacs.d",
    status: "Personal configuration",
    description:
      "The Emacs configuration behind my programmable coding and AI-agent workbench.",
    technologies: "Emacs Lisp · Developer tooling",
    url: "https://github.com/zhaozhixu/emacs.d",
    docs:
      "https://github.com/zhaozhixu/emacs.d/blob/326d7a5355e5032cce3d0099a2ec6a02308f12cd/README",
    problem:
      "Daily development spans editing, navigation, language tooling, and AI agents, and each workflow benefits from being shaped around the work instead of treated as a separate application.",
    approach:
      "Compose packages with small Emacs Lisp modules, keeping the environment live and programmable as new needs appear.",
    working:
      "The public configuration covers editing and project navigation, language support, terminals, and AI-agent sessions. Its custom modules add transcript handling, agent controls, Markdown previews, and a two-way Lark bridge.",
    limits:
      "It tracks my own environment and assumes the same local tools, credentials, and private settings.",
  },
  {
    id: "lightnet",
    name: "LightNet",
    status: "Earlier open-source work",
    description:
      "A lightweight neural-network optimization framework for different execution backends.",
    technologies: "Compilers · Neural networks",
    url: "https://github.com/zhaozhixu/LightNet",
    docs: "https://github.com/zhaozhixu/LightNet/blob/master/README.md",
    related: [
      {
        name: "TensorLight",
        url: "https://github.com/zhaozhixu/TensorLight",
      },
      {
        name: "lightnet-plugin",
        url: "https://github.com/zhaozhixu/lightnet-plugin",
      },
    ],
    problem:
      "Neural-network optimization has to connect a model’s structure to the capabilities of different software and hardware backends.",
    approach:
      "Separate the optimizer framework from backend-specific execution and tensor operations. TensorLight supplies its lightweight C and CUDA tensor operations, while lightnet-plugin demonstrates how to extend LightNet with an external plugin.",
    working:
      "LightNet provides command-line, C, and Python interfaces. lightnet-plugin demonstrates its external plugin mechanism with a sample CUDA operation and test scaffold.",
    limits:
      "This is earlier work with historical dependencies and setup instructions. I have not revalidated those instructions against current toolchains.",
  },
] as const;
