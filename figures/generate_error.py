#!/usr/bin/env python3
"""Generate the theme-aware SVG figure used by the Marp demo."""

import os
import tempfile
from pathlib import Path
from xml.etree import ElementTree

# Matplotlib needs a writable cache even in restricted build environments.
os.environ.setdefault(
    "MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "marp-matplotlib-cache")
)

import matplotlib.pyplot as plt
import numpy as np


SVG_NAMESPACE = "http://www.w3.org/2000/svg"
NAMESPACES = {
    "": SVG_NAMESPACE,
    "cc": "http://creativecommons.org/ns#",
    "dc": "http://purl.org/dc/elements/1.1/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "xlink": "http://www.w3.org/1999/xlink",
}


def add_inline_svg_hooks(svg_path: Path) -> None:
    """Add one root class, a fallback background, and accessible metadata."""
    for prefix, namespace in NAMESPACES.items():
        ElementTree.register_namespace(prefix, namespace)
    tree = ElementTree.parse(svg_path)
    root = tree.getroot()

    root.set("class", "figure")
    root.set("style", "background: #ffffff")
    root.set("role", "img")
    root.set("aria-labelledby", "plot-title plot-description")

    title = ElementTree.Element(f"{{{SVG_NAMESPACE}}}title", {"id": "plot-title"})
    title.text = "Illustrative error by iteration"
    description = ElementTree.Element(
        f"{{{SVG_NAMESPACE}}}desc", {"id": "plot-description"}
    )
    description.text = (
        "A synthetic exponential curve that decreases quickly and then levels off."
    )
    root.insert(0, title)
    root.insert(1, description)

    tree.write(svg_path, encoding="utf-8", xml_declaration=True)


def main() -> None:
    plt.rcParams["svg.fonttype"] = "none"

    iteration = np.arange(51)
    error = 0.2 + 0.8 * np.exp(-iteration / 12)

    fig, ax = plt.subplots(figsize=(9, 4.3), layout="constrained")
    fig.patch.set_alpha(0)
    ax.set_facecolor("none")

    ax.plot(
        iteration,
        error,
        color="#146a82",
        linewidth=2.6,
        label="experiment",
    )
    ax.scatter(iteration[13], error[13], color="#146a82", s=48, zorder=3)
    ax.set(
        xlabel="Iteration",
        ylabel="Illustrative error (a.u.)",
        xlim=(0, 50),
        ylim=(0.15, 1.05),
    )
    ax.set_xticks([0, 25, 50])
    # Reserve enough space for the largest text size applied by a Marp theme.
    ax.xaxis.labelpad = 20
    ax.yaxis.labelpad = 20
    ax.tick_params(axis="both", pad=8)
    ax.grid(axis="y", color="#d7e3e8", linewidth=0.9)
    # Leave room for the legend when a theme enlarges all SVG text.
    ax.legend(frameon=False, loc="upper right", bbox_to_anchor=(0.88, 1.0))
    ax.spines[["top", "right"]].set_visible(False)

    output = Path(__file__).with_name("error.svg")
    fig.savefig(
        output,
        format="svg",
        transparent=True,
    )
    plt.close(fig)

    add_inline_svg_hooks(output)
    print(f"Generated {output.relative_to(Path.cwd())} with Matplotlib")


if __name__ == "__main__":
    main()
