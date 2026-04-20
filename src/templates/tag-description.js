// @flow
import { Link } from 'gatsby';
import React from 'react';

const tagDescriptions = {
  Colors: (
    <>
      <p>
        Colors is where I want to treat color as more than a label on a spectrum. It is the tag
        for posts about how materials, structure, illumination, and visual interpretation combine
        to produce what we finally see.
      </p>
      <p>
        That bridge matters because measured spectra and perceived color are related, but they are
        not identical. This is where I want to keep both sides in view: the physical origin of
        color and the design choices that shape its appearance in practice.
      </p>
      <p style={{ marginBottom: 0 }}>A good place to start:</p>
      <ul>
        <li>
          <Link to="/blog/colors/">Colors: Structure, Perception, and Design</Link>
        </li>
      </ul>
      <p>
        Closely related tags include <Link to="/tag/optics/">Optics</Link> and{' '}
        <Link to="/tag/photonics/">Photonics</Link>.
      </p>
    </>
  ),
  'Inverse Design': (
    <>
      <p>
        Inverse Design is the tag for working backward from a target response to the structure that
        can produce it. Instead of asking what a chosen geometry does, the posts here start by
        making the desired transmission, reflection, field profile, or spectrum explicit.
      </p>
      <p>
        What interests me most is how that workflow exposes tradeoffs early. Performance goals,
        fabrication limits, bandwidth, robustness, and complexity all show up in the same problem,
        so the design process becomes a more honest negotiation with constraints.
      </p>
      <p style={{ marginBottom: 0 }}>Start here:</p>
      <ul>
        <li>
          <Link to="/blog/inverse-design/">
            Inverse Design: Let the Target Drive the Geometry
          </Link>
        </li>
      </ul>
      <p>
        Nearby viewpoints include <Link to="/tag/photonics/">Photonics</Link> and{' '}
        <Link to="/tag/optics/">Optics</Link>.
      </p>
    </>
  ),
  Optics: (
    <>
      <p>
        Optics is where I usually start when I want to reason about a light-based system at human
        scale. It is the layer where lenses, imaging paths, apertures, aberrations, and system
        tradeoffs become concrete enough to think about clearly.
      </p>
      <p>
        What I want this tag to emphasize is physical intuition: what bends, what focuses, what
        blurs, and which part of the system is really driving the behavior you care about.
      </p>
      <p style={{ marginBottom: 0 }}>A good place to start:</p>
      <ul>
        <li>
          <Link to="/blog/optics_imaging_refraction_systems/">
            Optics: Imaging, Refraction, and Systems
          </Link>
        </li>
        <li>
          <Link to="/blog/optics_more/">More on Optics</Link>
        </li>
      </ul>
      <p>
        Closely related tags include <Link to="/tag/photonics/">Photonics</Link> and{' '}
        <Link to="/tag/colors/">Colors</Link>.
      </p>
    </>
  ),
  Photonics: (
    <>
      <p>
        Photonics is the broader design space where geometry, refractive index, fabrication limits,
        and performance targets all interact. I use this tag for posts that are less about a single
        lens or imaging path and more about how structure can be chosen to make light behave in a
        particular way.
      </p>
      <p>
        It is the tag where I want to connect intuition and engineering: waveguides, metasurfaces,
        resonators, filtering, sensing, and other cases where light response is inseparable from
        the structure that produces it.
      </p>
      <p style={{ marginBottom: 0 }}>Start here:</p>
      <ul>
        <li>
          <Link to="/blog/photonics_designing_light_with_structure/">
            Photonics: Designing Light with Structure
          </Link>
        </li>
        <li>
          <Link to="/blog/optics_more/">More on Optics</Link>
        </li>
      </ul>
      <p>
        If you want the neighboring viewpoint, see <Link to="/tag/optics/">Optics</Link>.
      </p>
    </>
  ),
  Semiconductors: (
    <>
      <p>
        Semiconductors is the tag for posts about the physics, materials, and engineering of
        semiconductors
      </p>
      <p>
        That bridge matters because measured spectra and perceived color are related, but they are
        not identical. This is where I want to keep both sides in view: the physical origin of
        color and the design choices that shape its appearance in practice.
      </p>
      <p style={{ marginBottom: 0 }}>A good place to start:</p>
      <ul>
        <li>
          <Link to="/blog/colors/">Colors: Structure, Perception, and Design</Link>
        </li>
      </ul>
      <p>
        Closely related tags include <Link to="/tag/optics/">Optics</Link> and{' '}
        <Link to="/tag/photonics/">Photonics</Link>.
      </p>
    </>
  ),
};

export const buildTagDescription = (tag, edges) => {
  if (tagDescriptions[tag]) {
    return tagDescriptions[tag];
  }

  return null;
};
