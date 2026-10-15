// Claims checked against the public sources linked in docs/sources.md.
export const projects = [
  {
    id: "lightnet",
    name: "LightNet",
    status: "Earlier open-source work",
    description:
      "A lightweight neural-network optimization framework for different execution backends.",
    technologies: "Compilers · Neural networks",
    url: "https://github.com/zhaozhixu/LightNet",
    docs: "https://github.com/zhaozhixu/LightNet/blob/master/README.md",
    evidence: "https://github.com/zhaozhixu/LightNet/tree/master",
    problem:
      "Neural-network optimization has to connect a model’s structure to the capabilities of different software and hardware backends.",
    approach:
      "Separate the optimizer framework from backend-specific execution. This earlier project reflects my continuing interest in representations, transformations, and pluggable systems.",
    working:
      "The public repository provides the framework, build instructions, and examples for its documented backends.",
    limits:
      "This is earlier work with historical dependencies and setup instructions. I have not revalidated those instructions against current toolchains.",
  },
] as const;
