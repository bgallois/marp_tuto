---
marp: true
theme: online
size: 16:9
paginate: true
math: mathjax
html: true
style: |
  section.dual-text {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr;
    column-gap: 0;
    align-items: start;
  }
  section.dual-text > h1 {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  section.dual-text > h2 {
    margin-bottom: 0.35em;
  }
  section.dual-text > h2:nth-of-type(1) {
    grid-column: 1;
    grid-row: 2;
    padding-right: 48px;
  }
  section.dual-text > h2:nth-of-type(2) {
    grid-column: 2;
    grid-row: 2;
    border-left: 2px solid var(--plot-grid);
    padding-left: 48px;
  }
  section.dual-text > h2:nth-of-type(1) + ul {
    grid-column: 1;
    grid-row: 3;
    margin-top: 0;
    padding-right: 48px;
  }
  section.dual-text > h2:nth-of-type(2) + ul {
    grid-column: 2;
    grid-row: 3;
    align-self: stretch;
    border-left: 2px solid var(--plot-grid);
    margin-top: 0;
    padding-left: 88px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->

# One source, several settings

A minimal theme-aware scientific figure

---

<span class="theme-name">The build command selects the theme</span>

# Inline SVG: the figure follows the theme

@[svg](figures/error.svg)

---

<span class="theme-name">Standard Markdown image</span>

# External SVG: the figure keeps its own style

![width:82% A synthetic error curve loaded as an external SVG](figures/error.svg)

The slide theme cannot select elements inside this image.

---

# The model as code and mathematics

```python
iteration = np.arange(51)
error = 0.2 + 0.8 * np.exp(-iteration / 12)
```

The same synthetic decay written mathematically:

$$
e_k = 0.2 + 0.8\exp\left(-\frac{k}{12}\right)
$$

---

![bg right:50% contain A synthetic error curve](figures/error.svg)

# Image + progressive text

* The curve falls rapidly at first.
* Improvement slows after 25 iterations.
* The final error approaches a plateau.

---

<!-- _class: dual-text -->

# Two progressive text columns

## Observations

* Fast initial decrease
* Stable final plateau

## Next steps

* Compare repeated experiments
* Report uncertainty
