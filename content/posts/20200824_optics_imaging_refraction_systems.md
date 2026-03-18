---
title: "Optics: Imaging, Refraction, and Systems"
date: "2025-08-24T12:00:00.000Z"
template: "post"
draft: false
slug: "/blog/optics_imaging_refraction_systems/"
popularity: 300
category: "Optics"
tags:
  - "Optics"
description: "A compact overview of how I think about optics as a system-level discipline."
---

> **2026 Update**: this is still one of my most popular posts after all these years, and also one of my personal favorites. Reading this will help you build foundational intuition for more complex systems like LLMs!

Optics is where I usually start when I want to reason about a light-based system at human scale. If photonics is the broad field, optics is often the operational layer: lenses, imaging paths, apertures, aberrations, and the tradeoffs that show up once a real device has to work.

Three questions tend to keep the discussion honest:

1. What field distribution am I sending into the system?
2. How does each surface or medium transform it?
3. What loss of information am I willing to accept?

That framing works for simple refractive setups and for more exotic computational systems too. It forces attention onto resolution, contrast, throughput, and robustness instead of treating "good optics" as a vague aesthetic judgement.

I like optics because it rewards clean approximations. Geometric optics can get you surprisingly far. Wave optics tells you when the approximation breaks. The interesting engineering happens in the handoff between those two views.

When I write about optics here, I want those posts to stay close to physical intuition: what bends, what focuses, what blurs, and why the whole system behaves the way it does.
