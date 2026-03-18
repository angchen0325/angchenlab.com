---
title: "Inverse Design: Let the Target Drive the Geometry"
date: "2020-03-15T12:00:00.000Z"
template: "post"
draft: false
slug: "/blog/inverse-design/"
popularity: 200
# img: "https://angchenlab.com/media/laptop-code-3.jpeg"
category: "Inverse Design"
tags:
  - "Inverse Design"
  - "Semiconductors"
description: A brief note on solving for the structure that produces a desired optical response.
---

Inverse design flips a familiar workflow. Instead of starting with a geometry and asking what it does, you start with a target behavior and ask what geometry could produce it.

That shift sounds cosmetic, but it changes the whole posture of the problem. Once the desired transmission, reflection, focal profile, or spectral response is explicit, the design task becomes a search over structures under physical and fabrication constraints.

I like inverse design because it makes tradeoffs visible early. You cannot ask for arbitrary performance without paying for complexity, bandwidth, tolerance, or manufacturability. The optimization process forces those conflicts into the open.

In practice, the workflow usually looks something like this:

1. Specify the field or spectrum you want.
2. Choose a parameterization for the device.
3. Evaluate the forward physics model.
4. Update the design until the objective and constraints are both acceptable.

For this site, I want the inverse design tag to stay centered on that way of thinking: define the outcome first, then work backward toward a structure that earns it.
