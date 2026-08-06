import { useState, useEffect, useRef } from "react";
import { SiFiverr, SiUpwork } from "react-icons/si";

/* ─── INLINE FA SVG ICONS (no external CDN dep) ────────────────────── */
const FA = {
  fiverr: <SiFiverr size={35} />,
  upwork: <SiUpwork size={22} />,
  arrowUp: (
    <svg width="12" height="12" viewBox="0 0 448 512" fill="currentColor">
      <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
    </svg>
  ),
  play: (
    <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
    </svg>
  ),
  globe: (
    <svg width="20" height="20" viewBox="0 0 496 512" fill="currentColor">
      <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z" />
    </svg>
  ),
  mobile: (
    <svg width="16" height="20" viewBox="0 0 320 512" fill="currentColor">
      <path d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z" />
    </svg>
  ),
  code: (
    <svg width="22" height="14" viewBox="0 0 640 512" fill="currentColor">
      <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.6-5.1 12.6 0 17.1l144.1 135.1c4.9 4.6 12.5 4.4 17-.1zm327.2.6l144.1-135.1c5.1-4.6 5.1-12.6 0-17.1L492.1 112.8c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" />
    </svg>
  ),
  broadcast: (
    <svg width="22" height="20" viewBox="0 0 640 512" fill="currentColor">
      <path d="M194.2 189c-23.7-23.7-36.7-55.1-36.7-88.5S170.5 38.2 194.2 14.5L176.4-3.3C148.3 24.8 130 64.2 130 100.5s18.3 75.7 46.4 103.8L194.2 189zm251.6 0l17.8-17.8c28.1-28.1 46.4-67.5 46.4-103.8S491.7 24.8 463.6-3.3L445.8 14.5c23.7 23.7 36.7 55.1 36.7 88.5S469.5 165.3 445.8 189l17.8 17.8zM484.2 32.3l-17.8 17.8C487.8 71.5 500 98.9 500 127c0 28-12.2 55.4-33.6 76.9l17.8 17.8C511.7 195 528 162.5 528 127c0-35.6-16.3-68-43.8-94.7zM155.8 50.1L138 32.3C110.3 59 94 91.4 94 127c0 35.5 16.3 68 43.8 94.7l17.8-17.8C134.2 182.4 122 155 122 127c0-28.1 12.2-55.5 33.8-76.9zM320 192c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm0 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm0 64c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32s32-14.3 32-32V384c0-17.7-14.3-32-32-32z" />
    </svg>
  ),
  film: (
    <svg width="20" height="18" viewBox="0 0 512 512" fill="currentColor">
      <path d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208H144V144h224v244zm112-16c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" />
    </svg>
  ),
  bolt: (
    <svg width="13" height="20" viewBox="0 0 320 512" fill="currentColor">
      <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
    </svg>
  ),
  mapMarker: (
    <svg width="14" height="20" viewBox="0 0 384 512" fill="currentColor">
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  ),
  star: (
    <svg width="13" height="13" viewBox="0 0 576 512" fill="currentColor">
      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
    </svg>
  ),
  quote: (
    <svg width="26" height="22" viewBox="0 0 512 512" fill="currentColor">
      <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z" />
    </svg>
  ),
  video: (
    <svg width="22" height="16" viewBox="0 0 576 512" fill="currentColor">
      <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" />
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 384 512" fill="currentColor">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    </svg>
  ),
  pause: (
    <svg width="14" height="14" viewBox="0 0 320 512" fill="currentColor">
      <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
    </svg>
  ),
  volume: (
    <svg width="16" height="16" viewBox="0 0 640 512" fill="currentColor">
      <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
    </svg>
  ),
};

/* ─── GLOBAL CSS ────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    :root {
      --seafoam:#5fb3a1; --seafoam-light:#a8d8ce; --seafoam-dark:#3d8a7a; --seafoam-pale:#e8f5f2;
      --salmon:#e8806a;  --salmon-light:#f2b3a3;  --salmon-dark:#c4604a;  --salmon-pale:#fdf0ed;
      --navy:#1a2744;    --navy-mid:#243358;       --navy-light:#2e4270;   --navy-pale:#eef1f7;
      --white:#ffffff; --off-white:#f8f9fb;
      --gray-100:#f1f3f7; --gray-200:#e2e6ef; --gray-400:#9aa3b8; --gray-600:#5c677d; --gray-800:#2d3344;
      --text-primary:#1a2744; --text-secondary:#5c677d; --text-muted:#9aa3b8;
      --font-display:'Montserrat',sans-serif; --font-body:'DM Sans',sans-serif;
      --ease-spring:cubic-bezier(0.34,1.56,0.64,1); --ease-out:cubic-bezier(0.22,1,0.36,1);
      --transition:all 0.3s var(--ease-out);
      --container:min(90vw,1280px);
      --radius-sm:6px; --radius-md:12px; --radius-lg:20px; --radius-xl:32px;
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:var(--font-body);background:var(--off-white);color:var(--text-primary);overflow-x:hidden;}
    h1,h2,h3,h4,h5,h6{font-family:var(--font-display);line-height:1.1;letter-spacing:-0.02em;}
    section{position:relative;}
    ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:var(--gray-100);} ::-webkit-scrollbar-thumb{background:var(--seafoam);border-radius:2px;}


    /* ── PAGE REVEAL ── */
    @keyframes pageReveal{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
    #app-root{animation:pageReveal .9s var(--ease-out) both;}

    /* ── SCROLL REVEAL ── */
    .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease-out),transform .7s var(--ease-out);}
    .reveal.visible{opacity:1;transform:none;}
    .reveal-delay-1{transition-delay:.1s;} .reveal-delay-2{transition-delay:.2s;} .reveal-delay-3{transition-delay:.3s;} .reveal-delay-4{transition-delay:.4s;}

    /* ── KEYFRAMES ── */
    @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-14px) rotate(1deg)}66%{transform:translateY(8px) rotate(-1deg)}}
    @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(10px) rotate(-1.5deg)}66%{transform:translateY(-12px) rotate(1.5deg)}}
    @keyframes float3{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
    @keyframes pulse-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.9);opacity:0}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes glow-pulse{0%,100%{opacity:.12}50%{opacity:.3}}
    @keyframes orbit{from{transform:rotate(0deg) translateX(110px) rotate(0deg)}to{transform:rotate(360deg) translateX(110px) rotate(-360deg)}}
    @keyframes counter-orbit{from{transform:rotate(0deg) translateX(72px) rotate(0deg)}to{transform:rotate(-360deg) translateX(72px) rotate(360deg)}}
    @keyframes bar-grow{from{width:0}to{width:var(--w)}}
    @keyframes slide-up-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin-slow{to{transform:rotate(360deg)}}

    /* ── PILLS / BUTTONS ── */
    .tag-pill{display:inline-flex;align-items:center;gap:6px;background:var(--seafoam-pale);color:var(--seafoam-dark);border:1px solid var(--seafoam-light);border-radius:100px;padding:5px 14px;font-size:12px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;font-family:var(--font-display);}
    .tag-pill.salmon{background:var(--salmon-pale);color:var(--salmon-dark);border-color:var(--salmon-light);}
    .tag-pill.navy{background:var(--navy-pale);color:var(--navy-light);border-color:var(--gray-200);}

    .btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--navy);color:var(--white);border:none;border-radius:var(--radius-md);padding:14px 28px;font-family:var(--font-display);font-size:15px;font-weight:600;letter-spacing:-.01em;transition:var(--transition);position:relative;overflow:hidden;text-decoration:none;}
    .btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--seafoam-dark),var(--navy-light));opacity:0;transition:opacity .3s;}
    .btn-primary:hover::before{opacity:1;}
    .btn-primary span{position:relative;z-index:1;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,39,68,.25);}

    .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--navy);border:1.5px solid var(--navy);border-radius:var(--radius-md);padding:13px 28px;font-family:var(--font-display);font-size:15px;font-weight:600;transition:var(--transition);text-decoration:none;}
    .btn-outline:hover{background:var(--navy);color:var(--white);transform:translateY(-2px);}

    /* ── CTA AI BUTTON (fixed left, tab style) ── */
    .cta-ai-btn{
      position:fixed; left:0; bottom:100px; z-index:1000;
      background:linear-gradient(180deg,var(--salmon) 0%,var(--salmon-dark) 100%);
      color:var(--white); border:none;
      border-radius:0 var(--radius-md) var(--radius-md) 0;
      padding:18px 12px;
      font-family:var(--font-display); font-size:12px; font-weight:700;
      letter-spacing:.1em; text-transform:uppercase;
      cursor:none;
      box-shadow:3px 3px 20px rgba(232,128,106,.45);
      transition:padding .25s var(--ease-out),box-shadow .25s;
      writing-mode:vertical-rl; text-orientation:mixed;
      display:flex; align-items:center; gap:10px;
    }
    .cta-ai-btn:hover{padding-left:18px;box-shadow:5px 5px 28px rgba(232,128,106,.6);}
    .cta-ai-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.75);flex-shrink:0;position:relative;}
    .cta-ai-dot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1px solid rgba(255,255,255,.5);animation:pulse-ring 1.8s ease-out infinite;}

    /* ── TESTI SOCIAL SIDEBAR (inside section, absolute) ── */
    .testi-social{
      position:absolute; right:0; top:50%; transform:translateY(-50%);
      z-index:10; display:flex; flex-direction:column;
      background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
      border-right:none; border-radius:var(--radius-md) 0 0 var(--radius-md); overflow:hidden;
    }
    .testi-social a{
      display:flex;align-items:center;justify-content:center;
      width:44px;height:44px;color:rgba(255,255,255,.4);text-decoration:none;
      transition:var(--transition);border-bottom:1px solid rgba(255,255,255,.07);
    }
    .testi-social a:last-child{border-bottom:none;}
    .testi-social a:hover{background:var(--seafoam);color:var(--white);}

    /* ── NAV ── */
    nav{position:sticky;top:0;left:0;right:0;z-index:9999;transition:transform 0.3s ease-out,background 0.3s ease-out;transform:translateY(0);background:var(--white);}
    nav.scrolled{background:rgba(255,255,255,.93);backdrop-filter:blur(20px);border-bottom:1px solid var(--gray-200);box-shadow:0 2px 20px rgba(26,39,68,.06);}
    nav.nav-hidden{transform:translateY(-100%);}
    .nav-inner{width:var(--container);margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:20px 0;}
    .nav-logo{font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--navy);text-decoration:none;letter-spacing:-.03em;display:flex;align-items:center;gap:10px;}
    .nav-logo-mark{width:32px;height:32px;background:var(--navy);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .nav-logo-mark svg{color:var(--white);}
    .nav-divider{width:2px;height:20px;background:var(--gray-200);}
    .nav-wordmark{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);}
    .nav-links{display:flex;align-items:center;gap:4px;list-style:none;}
    /* hover: scale only, NO bg change */
    .nav-links a{text-decoration:none;color:var(--text-secondary);font-size:14px;font-weight:500;padding:8px 16px;border-radius:var(--radius-sm);transition:color .3s,transform .3s var(--ease-spring),background .3s;font-family:var(--font-display);display:inline-block;position:relative;}
    .nav-links a:hover{color:var(--navy);transform:translateX(8px);}
    .nav-links a:hover::before{content:'';position:absolute;left:-2px;top:50%;transform:translateY(-50%);width:10px;height:10px;background:var(--seafoam);border-radius:50%;}
    .nav-cta{font-family:var(--font-display);font-size:14px;font-weight:600;color:var(--white);background:var(--navy);padding:9px 20px;border-radius:var(--radius-sm);text-decoration:none;transition:var(--transition);}
    .nav-cta:hover{background:var(--navy-light);transform:translateY(-1px);}
    .nav-hamburger{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:8px;order:2;transition:all 0.3s ease, opacity 0.3s ease;}
    .nav-hamburger span{width:24px;height:2px;background:var(--navy);transition:all 0.3s ease, opacity 0.3s ease;border-radius:1px;}
    .nav-hamburger:hover span{background:var(--seafoam);}
    .nav-hamburger.active span:nth-child(1){transform:rotate(45deg) translate(6px,6px);opacity:0.3;}
    .nav-hamburger.active span:nth-child(2){opacity:0;transform:scale(0.8);}
    .nav-hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(6px,-6px);opacity:0.3;}
    .nav-hamburger.fade-out span{opacity:0;transform:scale(0.6);}
    .nav-hamburger.fade-out span:nth-child(1){transform:rotate(0deg) translate(0,0);}
    .nav-hamburger.fade-out span:nth-child(2){opacity:0;}
    .nav-hamburger.fade-out span:nth-child(3){transform:rotate(0deg) translate(0,0);}
    .mobile-menu-overlay{position:fixed;top:0;right:-100%;width:80%;max-width:400px;height:100vh;background:var(--white);z-index:999999 !important;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:-4px 0 20px rgba(0,0,0,0.1);opacity:0;visibility:hidden;transform:translateY(20px) translateX(-20px);}
    .mobile-menu-overlay.mobile-open{right:0;opacity:1;visibility:visible;transform:translateY(0) translateX(0);transition:all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);}
    .mobile-menu-close{position:absolute;top:20px;right:20px;background:none;border:none;cursor:pointer;padding:8px;}
    .mobile-menu-close span{width:24px;height:2px;background:var(--navy);position:absolute;transition:all 0.3s ease;border-radius:1px;}
    .mobile-menu-close span:first-child{transform:rotate(45deg);}
    .mobile-menu-close span:last-child{transform:rotate(-45deg);}
    .mobile-menu-close:hover span{background:var(--seafoam);}
    .mobile-menu-links{list-style:none;text-align:center;width:100%;}
    .mobile-menu-links li{margin:16px 0;}
    .mobile-menu-links a{text-decoration:none;color:var(--text-secondary);font-size:24px;font-weight:500;padding:12px 24px;border-radius:var(--radius-sm);transition:var(--transition);font-family:var(--font-display);display:inline-block;}
    .mobile-menu-links a:hover{color:var(--navy);background:var(--seafoam-pale);transform:scale(1.05);}

    /* ── HERO ── */
    .hero{min-height:100vh;background:var(--navy);display:flex;flex-direction:column;position:relative;overflow:hidden;}
    .hero-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(95,179,161,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(95,179,161,.06) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
    .hero-glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
    .hero-content{flex:1;display:flex;align-items:center;width:var(--container);margin:0 auto;padding:120px 0 80px;position:relative;z-index:2;}
    .hero-left{flex:1;max-width:560px;}
    .hero-right{flex:1;position:relative;height:560px;margin-right:-60px;}
    .hero-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:24px;}
    .hero-dot{width:8px;height:8px;background:var(--salmon);border-radius:50%;position:relative;}
    .hero-dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--salmon);animation:pulse-ring 2s ease-out infinite;}
    .hero-h1{font-size:clamp(42px,5vw,68px);color:var(--white);line-height:1;margin-bottom:24px;}
    .hero-h1 em{font-style:normal;color:var(--seafoam);}
    .hero-sub{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:40px;max-width:440px;}
    .hero-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
    .hero-stats{display:flex;gap:40px;margin-top:60px;padding-top:40px;border-top:1px solid rgba(255,255,255,.08);}
    .hero-stat-num{font-family:var(--font-display);font-size:32px;font-weight:800;color:var(--white);line-height:1;}
    .hero-stat-num span{color:var(--salmon);}
    .hero-stat-label{font-size:13px;color:rgba(255,255,255,.4);margin-top:4px;}
    .hero-card{position:absolute;border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.06);}
    .hero-card-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(95,179,161,.15),rgba(232,128,106,.1));pointer-events:none;}
    .hero-badge{position:absolute;bottom:12px;left:12px;background:rgba(26,39,68,.85);backdrop-filter:blur(8px);border-radius:var(--radius-sm);padding:6px 10px;font-size:11px;color:rgba(255,255,255,.8);font-family:var(--font-display);font-weight:600;}
    .hero-ticker{border-top:1px solid rgba(255,255,255,.08);padding:14px 0;overflow:hidden;position:relative;z-index:2;}
    .hero-ticker:hover .ticker-inner{animation-play-state:paused;}
    .ticker-inner{display:flex;gap:60px;white-space:nowrap;animation:ticker 45s linear infinite;width:max-content;}
    .ticker-item{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.35);font-family:var(--font-display);font-weight:500;letter-spacing:.04em;text-transform:uppercase;}
    .ticker-dot{width:4px;height:4px;background:var(--seafoam);border-radius:50%;}

    /* ── STAT STRIP (creative) ── */
    .stat-strip{background:var(--navy);overflow:hidden;}
    .stat-strip-inner{width:var(--container);margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.07);}
    .stat-block{padding:48px 36px;border-right:1px solid rgba(255,255,255,.07);position:relative;overflow:hidden;}
    .stat-block::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--seafoam);transition:height .7s var(--ease-out);}
    .stat-block.visible::before{height:100%;}
    .stat-block-num{font-family:var(--font-display);font-size:52px;font-weight:800;color:var(--white);line-height:1;margin-bottom:8px;}
    .stat-block-num span{color:var(--seafoam);}
    .stat-block-label{font-size:13px;color:rgba(255,255,255,.4);font-family:var(--font-display);}

    /* ── NOISE OVERLAY ── */
    .noise{position:absolute;inset:0;pointer-events:none;z-index:1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");opacity:.4;}

    /* ── SECTION HELPERS ── */
    .section-wrap{width:var(--container);margin:0 auto;padding:0;}
    .section-label{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
    .section-label-line{width:32px;height:2px;background:var(--seafoam);}
    .section-label-text{font-family:var(--font-display);font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--seafoam-dark);}
    .section-h2{font-size:clamp(32px,3.5vw,50px);color:var(--navy);line-height:1.05;margin-bottom:0;}

    /* ── ABOUT ── */
    .about-section{background:var(--white);padding:120px 0;}
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
    .about-segments{display:flex;flex-direction:column;gap:48px;}
    .about-seg-title{font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--navy);margin-bottom:12px;display:flex;align-items:center;gap:10px;}
    .about-seg-title::before{content:'';width:6px;height:6px;background:var(--salmon);border-radius:50%;}
    .about-seg-body{font-size:15px;line-height:1.75;color:var(--text-secondary);}
    .about-visual{position:relative;height:520px;border-radius:var(--radius-xl);overflow:visible;}
    .about-float{position:absolute;background:var(--white);border-radius:var(--radius-md);padding:16px 20px;box-shadow:0 8px 32px rgba(26,39,68,.12);}
    .about-float-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);font-family:var(--font-display);margin-bottom:4px;}
    .about-float-val{font-family:var(--font-display);font-size:24px;font-weight:800;color:var(--navy);}
    .about-float-val span{color:var(--seafoam);}
    .about-badge{position:absolute;top:24px;right:-16px;background:var(--salmon);color:var(--white);border-radius:var(--radius-md);padding:12px 20px;font-family:var(--font-display);font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(232,128,106,.4);}

    /* ── TEAM ── */
    .team-section{background:var(--off-white);padding:120px 0;}
    .team-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:64px;}
    .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
    .team-card{border-radius:2rem;padding:32px 24px 28px;display:flex;flex-direction:column;align-items:center;border:none;}
    .team-avatar-container{width:100%;aspect-ratio:3/4;max-width:180px;background:var(--white);border-radius:1.5rem;display:flex;align-items:center;justify-content:center;padding:0;margin:0 auto 24px;box-shadow:0 8px 20px rgba(0,0,0,0.03);overflow:hidden;}
    .team-avatar-container img{width:100%;height:100%;object-fit:cover;display:block;}
    .team-card-body{padding:0;text-align:center;}
    .team-card-name{font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--navy);margin-bottom:6px;}
    .team-card-role{font-size:14px;color:rgba(28,43,76,0.6);font-weight:500;margin-bottom:0;}

    /* ── CEO VIDEO ── */
    .ceo-video-section{background:var(--navy);padding:120px 0;position:relative;}
    .ceo-video-section .section-h2{color:var(--white);}
    .ceo-video-header{text-align:center;max-width:620px;margin:0 auto 56px;position:relative;z-index:2;}
    .ceo-video-sub{font-size:16px;line-height:1.7;color:rgba(255,255,255,.55);margin-top:20px;}
    .ceo-video-stage{position:relative;z-index:2;padding:0 1rem;}
    .ceo-video-layout{display:flex;flex-direction:row;gap:32px;align-items:stretch;}
    .ceo-video-col{flex-basis:calc(50% - 16px);min-width:0;transition:flex .5s var(--ease-out);}
    .ceo-video-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:1rem;overflow:hidden;border:none;cursor:pointer;background:var(--navy-mid);padding:0;font:inherit;text-align:inherit;display:block;transition:box-shadow .45s var(--ease-out);}
    .ceo-video-frame--player{cursor:default;}
    .ceo-video-frame:focus-visible{outline:2px solid var(--seafoam);outline-offset:2px;}
    .ceo-video-thumb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:opacity 0.3s;z-index:1;}
    .ceo-video-stage.is-playing .ceo-video-thumb{opacity:0;pointer-events:none;}
    .ceo-yt-mount{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
    .ceo-yt-mount iframe{position:absolute;top:-100%;left:0;width:100%;height:300%;border:0;}
    .ceo-video-vignette{display:none;}
    .ceo-video-scanlines{display:none;}
    .ceo-video-play-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:3;pointer-events:none;}
    .ceo-video-play-ring{position:absolute;width:100px;height:100px;border-radius:50%;border:1px solid rgba(255,255,255,.25);animation:pulse-ring 2s ease-out infinite;}
    .ceo-video-play-btn{position:relative;width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--salmon),var(--salmon-dark));display:flex;align-items:center;justify-content:center;color:var(--white);box-shadow:0 12px 40px rgba(232,128,106,.45);transition:transform .35s var(--ease-spring),box-shadow .35s;}
    .ceo-video-frame:hover .ceo-video-play-btn{transform:scale(1.1);box-shadow:0 16px 48px rgba(232,128,106,.55);}
    .ceo-video-play-btn svg{width:22px;height:22px;margin-left:4px;}
    .ceo-video-caption{display:none;}
    .ceo-video-caption-text{font-family:var(--font-display);font-size:clamp(14px,2vw,16px);font-weight:700;color:var(--white);letter-spacing:.04em;text-transform:uppercase;}

    /* Custom Video Controls */
    .ceo-video-close{position:absolute;top:20px;right:20px;width:40px;height:40px;background:rgba(26,39,68,.6);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--white);cursor:pointer;z-index:10;transition:background .3s,transform .3s;opacity:0;pointer-events:none;}
    .ceo-video-stage.is-playing .ceo-video-frame:hover .ceo-video-close{opacity:1;pointer-events:all;}
    .ceo-video-close:hover{background:rgba(232,128,106,.8);transform:scale(1.1);}
    
    .ceo-video-controls{position:absolute;bottom:20px;left:20px;right:20px;background:rgba(26,39,68,.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius-md);padding:12px 20px;display:flex;align-items:center;gap:20px;z-index:10;opacity:0;transform:translateY(10px);transition:opacity .4s var(--ease-out),transform .4s var(--ease-out);pointer-events:none;}
    .ceo-video-stage.is-playing .ceo-video-frame:hover .ceo-video-controls{opacity:1;transform:none;pointer-events:all;}
    
    .cvc-btn{background:transparent;border:none;color:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:color .2s;width:24px;height:24px;}
    .cvc-btn:hover{color:var(--seafoam);}
    .cvc-btn svg{width:16px;height:16px;}
    .cvc-btn.play-pause svg{width:14px;height:14px;}
    
    .cvc-time{color:var(--white);font-size:13px;font-family:var(--font-display);font-weight:500;font-variant-numeric:tabular-nums;min-width:90px;}
    .cvc-time span{color:rgba(255,255,255,.5);}
    
    .cvc-progress-wrap{flex:1;height:24px;display:flex;align-items:center;cursor:pointer;position:relative;}
    .cvc-progress-track{width:100%;height:4px;background:rgba(255,255,255,.2);border-radius:2px;overflow:hidden;position:relative;}
    .cvc-progress-fill{position:absolute;top:0;left:0;height:100%;background:var(--seafoam);border-radius:2px;width:0%;transition:width 0.1s linear;}
    
    .cvc-volume-wrap{display:flex;align-items:center;gap:8px;}
    .cvc-volume-slider{
      width:70px;
      height:4px;
      -webkit-appearance:none;
      background:rgba(255,255,255,.2);
      border-radius:2px;
      outline:none;
      cursor:pointer;
      transition:background 0.3s;
    }
    .cvc-volume-slider::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: transparent;
      border-radius: 2px;
    }
    .cvc-volume-slider::-webkit-slider-thumb{
      -webkit-appearance:none;
      height:12px;
      width:12px;
      border-radius:50%;
      background:var(--seafoam);
      cursor:pointer;
      margin-top:-4px;
    }
    .cvc-volume-slider::-moz-range-thumb{
      height:12px;
      width:12px;
      border-radius:50%;
      background:var(--seafoam);
      cursor:pointer;
      border:none;
    }
    
    /* Transcript */
    .ceo-transcript-wrap{opacity:1;flex-basis:calc(50% - 16px);width:50%;position:relative;transition:all .5s var(--ease-out);display:flex;flex-direction:column;}
    
    .ceo-transcript{position:absolute;inset:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:1rem;padding:28px 24px;display:flex;flex-direction:column;min-height:0;min-width:0;box-sizing:border-box;}
    .ceo-transcript-label{font-family:var(--font-display);font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--seafoam);margin-bottom:20px;flex-shrink:0;}
    .ceo-transcript-scroll{flex:1;overflow-y:auto;padding-right:8px;scrollbar-width:thin;scrollbar-color:var(--seafoam) transparent;min-height:0;}
    .ceo-transcript-scroll::-webkit-scrollbar{width:4px;}
    .ceo-transcript-scroll::-webkit-scrollbar-thumb{background:var(--seafoam);border-radius:2px;}
    .ceo-transcript-line{font-size:15px;line-height:1.75;color:rgba(255,255,255,.45);padding:14px 16px;border-radius:0;margin-bottom:8px;border-left:3px solid transparent;cursor:pointer;transition:color .25s,border-color .25s;}
    .ceo-transcript-line.active{color:var(--white);background:transparent;border-left:3px solid var(--seafoam);}

    /* ── TESTIMONIALS ── */
    .testi-section{background:var(--navy);position:relative;overflow:visible;}
    .testi-track{height:300vh;position:relative;}
    .testi-sticky{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;}
    .testi-carousel-track{display:flex;gap:24px;width:max-content;padding:0 max(5vw, calc((100vw - var(--container)) / 2));will-change:transform;transition:transform 0.05s linear;}
    .testi-card{background:rgba(255,255,255,.03);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.07);border-radius:var(--radius-lg);padding:32px 32px 24px 32px;position:relative;z-index:1;width:520px;flex-shrink:0;display:flex;flex-direction:column;}
    .testi-card.featured{background:rgba(255,255,255,.03);backdrop-filter:blur(12px);border-color:rgba(255,255,255,.07);width:640px;}
    .testi-quote{color:var(--seafoam);opacity:.7;margin-bottom:16px;}
    .testi-text{font-size:15px;line-height:1.75;color:rgba(255,255,255,.8);margin-bottom:28px;}
    .testi-card.featured .testi-text{font-size:17px;color:rgba(255,255,255,.8);}
    .testi-author{display:flex;align-items:center;gap:12px;margin-top:auto;}
    .testi-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--white);flex-shrink:0;}
    .testi-name{font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--white);}
    .testi-country{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px;}
    .testi-stars{display:flex;gap:3px;margin-bottom:16px;}

    /* ── SERVICES ── */
    .services-section{background:var(--white);padding:120px 0;}
    .services-strip{display:flex;border:1px solid var(--gray-200);border-radius:var(--radius-xl);overflow:hidden;margin-bottom:24px;}
    .srv-label{display:flex;align-items:center;padding:36px 28px;border-right:1px solid var(--gray-200);min-width:180px;background:var(--navy);flex-direction:column;justify-content:center;}
    .srv-label-text{font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--white);text-align:center;line-height:1.3;}
    .srv-label-sub{font-size:11px;color:rgba(255,255,255,.4);text-align:center;margin-top:6px;text-transform:uppercase;letter-spacing:.08em;}
    .srv-block{flex:1;padding:36px 28px;border-right:1px solid var(--gray-200);transition:var(--transition);}
    .srv-block:last-child{border-right:none;}
    .srv-block:hover{background:var(--navy-pale);}
    .srv-block:hover .srv-icon-wrap{color:var(--seafoam-dark);}
    .srv-icon-wrap{margin-bottom:14px;color:var(--seafoam);transition:var(--transition);}
    .srv-name{font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--navy);margin-bottom:8px;}
    .srv-desc{font-size:13px;color:var(--text-muted);line-height:1.6;}
    .srv-tag{display:inline-block;margin-top:12px;background:var(--seafoam-pale);color:var(--seafoam-dark);border-radius:100px;padding:3px 10px;font-size:11px;font-weight:600;font-family:var(--font-display);}

    /* ── CONTACT ── */
    .contact-section{background:var(--off-white);padding:120px 0;}
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:64px;}
    .contact-form-wrap{background:var(--white);border-radius:var(--radius-xl);padding:48px;border:1px solid var(--gray-200);}
    .form-row{margin-bottom:20px;}
    .form-label{display:block;font-size:13px;font-weight:500;color:var(--navy);margin-bottom:8px;font-family:var(--font-display);}
    .form-input,.form-textarea{width:100%;padding:12px 16px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-family:var(--font-body);font-size:14px;color:var(--text-primary);background:var(--white);transition:var(--transition);outline:none;cursor:text;}
    .form-input:focus,.form-textarea:focus{border-color:var(--seafoam);box-shadow:0 0 0 3px rgba(95,179,161,.12);}
    .form-textarea{resize:vertical;min-height:120px;}
    .form-row-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .contact-info{display:flex;flex-direction:column;gap:32px;}
    .contact-info-title{font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--navy);line-height:1.2;}
    .contact-info-body{font-size:15px;color:var(--text-secondary);line-height:1.7;}
    .contact-detail{display:flex;align-items:center;gap:14px;}
    .contact-detail-icon{width:44px;height:44px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .contact-detail-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);font-family:var(--font-display);}
    .contact-detail-val{font-size:15px;font-weight:500;color:var(--navy);}
    .contact-detail-val a{color:var(--seafoam-dark);text-decoration:none;}
    .contact-detail-val a:hover{text-decoration:underline;}
    .map-ph{border-radius:var(--radius-lg);overflow:hidden;height:200px;background:linear-gradient(135deg,var(--navy-pale),var(--seafoam-pale));border:1px solid var(--gray-200);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--text-muted);font-size:14px;}

    /* ── FOOTER ── */
    footer{background:var(--navy);padding:64px 0 32px;}
    .footer-inner{width:var(--container);margin:0 auto;}
    .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.08);}
    .footer-desc{font-size:14px;color:rgba(255,255,255,.4);line-height:1.7;}
    .footer-col-title{font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--white);letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px;}
    .footer-links{display:flex;flex-direction:column;gap:10px;}
    .footer-links a{font-size:14px;color:rgba(255,255,255,.4);text-decoration:none;transition:color .2s;}
    .footer-links a:hover{color:var(--seafoam);}
    .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;font-size:13px;color:rgba(255,255,255,.25);}

    /* ── RESPONSIVE ── */
    @media(max-width:1024px){
      .team-grid{grid-template-columns:repeat(2,1fr);}
      .testi-grid{grid-template-columns:1fr 1fr;}
      .testi-card.featured{grid-column:1/3;}
      .testi-card.tall{grid-row:auto;}
      .footer-top{grid-template-columns:1fr 1fr;gap:40px;}
      .stat-strip-inner{grid-template-columns:repeat(2,1fr);}
    }
    @media(max-width:768px){
      .hero-content{flex-direction:column;padding:100px 0 40px;}
      .hero-right,.cta-ai-btn,.testi-social{display:none;}
      .about-grid,.contact-grid{grid-template-columns:1fr;}
      .services-strip{flex-direction:column;}
      .srv-block{border-right:none;border-bottom:1px solid var(--gray-200);}
      .team-grid{grid-template-columns:1fr 1fr;}
      .team-header{flex-direction:column;align-items:flex-start;gap:24px;}
      .team-header p{text-align:left!important;}
      .ceo-video-section{padding:80px 0;}
      .ceo-video-header{margin-bottom:40px;}
      .ceo-video-sub{font-size:15px;}
      .ceo-video-layout{flex-direction:column;gap:20px;}
      .ceo-video-col{flex-basis:auto!important;width:100%!important;}
      .ceo-transcript-wrap{flex-basis:auto!important;width:100%!important;position:relative;height:360px;}
      .ceo-video-play-ring{width:88px;height:88px;}
      .ceo-video-play-btn{width:68px;height:68px;}
      .ceo-video-play-btn svg{width:18px;height:18px;}
      .ceo-video-caption{padding:0 24px;}
      .nav-hamburger{display:flex;}
      .nav-links{display:none;}
      .testi-grid{grid-template-columns:1fr;}
      .testi-card{width:min(480px, 85vw);}
      .testi-card.featured{grid-column:auto;width:min(580px, 90vw);}
      .footer-top{grid-template-columns:1fr;gap:32px;}
      .stat-strip-inner{grid-template-columns:1fr 1fr;}
      .stat-block{padding:32px 24px;}
    }
    @media(max-width:480px){
      .stat-strip-inner{grid-template-columns:1fr;}
      .stat-block{padding:24px 16px;}
      .stat-block-num{font-size:24px;}
      .stat-block-label{font-size:12px;}
    }
  `}</style>
);

/* ─── DATA ──────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Minds Behind", href: "#team" },
  { label: "CEO's Words", href: "#ceo-message" },
  { label: "Services", href: "#services" },
  { label: "Earned Trust", href: "#testimonials" },
  { label: "Get in Touch", href: "#contact" },
];

const TEAM = [
  {
    name: "Anas Ali",
    role: "Founder & CEO | Senior Architect",
    Image: "/images/anasAli.jpeg",
    objectPosition: "center 5%",
  },
  {
    name: "Shumail Nazir",
    role: "Co-Founder & CTO | Video Streaming Expert",
    Image: "/images/shumailNazir.jpg",
    objectPosition: "center center",
  },
  {
    name: "Muhammad Qadeer",
    role: "Backend Engineer | WebRTC & FFmpeg",
    Image: "/images/qadeerAmin.jfif",
    objectPosition: "center center",
  },
  {
    name: "Sulyman Khalil",
    role: "Full Stack Engineer | FFmpeg",
    Image: "/images/sulymanKhalil.jpg",
    objectPosition: "center 10%",
  },
];

const TESTIMONIALS = [
  {
    name: "James Thornton",
    country: "United Kingdom",
    initials: "JT",
    bg: "#5fb3a1",
    text: "Their live streaming pipeline handles 500k concurrent viewers flawlessly. The team's technical depth is unmatched, they diagnosed and resolved a critical latency issue within hours that our internal team had struggled with for weeks.",
    featured: true,
  },
  {
    name: "Zeynep Elif",
    country: "Türkiye",
    initials: "ZE",
    bg: "#dc2906ff",
    text: "Our VOD platform went from concept to production launch in 10 weeks. The team delivered a flawless transcoding pipeline and thumbnail generator that scaled smoothly on day one.",
  },
  {
    name: "Christopher",
    country: "Germany",
    initials: "C",
    bg: "#8a8f0aff",
    text: "The real-time live streaming architecture they designed and built for our sports broadcasting platform is rock solid. We achieved reliable sub-second latency globally, even during peak events with massive traffic spikes, transforming our user experience.",
    tall: true,
  },
  {
    name: "Carlos Mendez",
    country: "Mexico",
    initials: "CM",
    bg: "#e8806a",
    text: "They engineered our custom multi-region CDN distribution and integrated DRM content protection. Highly professional and delivered ahead of schedule.",
  },
];

const SERVICES_DEV = [
  {
    icon: FA.globe,
    name: "Web Development",
    desc: "Full-stack web applications built with modern frameworks, optimized for performance and scalability.",
    tag: "React · Next.js · Node",
  },
  {
    icon: FA.mobile,
    name: "Mobile Development",
    desc: "Cross-platform native-quality apps for iOS and Android with seamless streaming capabilities.",
    tag: "React Native · Swift",
  },
  {
    icon: FA.code,
    name: "Custom Software",
    desc: "Bespoke software engineered to your exact business logic, integrations, and technical requirements.",
    tag: "Enterprise · API-first",
  },
];
const SERVICES_STREAM = [
  {
    icon: FA.bolt,
    name: "Real-Time Streaming",
    desc: "Ultra-low-latency solutions for interactive experiences, sports, auctions, and live commerce use cases.",
    tag: "< 500ms latency",
  },
  {
    icon: FA.film,
    name: "Video on Demand",
    desc: "Scalable VOD platforms with adaptive bitrate, DRM, multi-CDN delivery, and rich analytics dashboards.",
    tag: "Multi-CDN · DRM",
  },
  {
    icon: FA.broadcast,
    name: "Live Streaming",
    desc: "End-to-end live broadcasting infrastructure supporting millions of concurrent viewers at sub-second latency.",
    tag: "WebRTC · HLS · DASH",
  },
];

const TICKER_ITEMS = [
  // Core Streaming
  "WebRTC",
  "HLS",
  "MPEG-DASH",
  "Low-Latency HLS",
  "Real-Time Streaming",
  "Live Streaming",
  "Video on Demand",
  "Adaptive Bitrate",

  // Protocols & Transport
  "RTMP",
  "SRT",
  "WebSockets",

  // Video Processing
  "FFmpeg",
  "Transcoding",
  "Encoding/Decoding",

  // Infrastructure
  "Video Infrastructure",
  "Multi-CDN",
  "Load Balancing",

  // Cloud & Deployment
  "AWS Media Services",
  "CloudFront",
  "S3",
  "Docker",
  "Kubernetes",
  "CI/CD Pipelines",

  // Backend & Frontend
  "Node.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "MongoDB",
];

const HERO_CARDS = [
  {
    id: 0,
    top: "8%",
    left: "2%",
    w: 200,
    h: 140,
    depth: 0.03,
    anim: "float1",
    delay: "0s",
    label: "Live Stream · Active",
    bg: "linear-gradient(135deg,#1a3a5c,#0d2035)",
    content: "stream",
  },
  {
    id: 1,
    top: "5%",
    left: "38%",
    w: 220,
    h: 150,
    depth: 0.05,
    anim: "float2",
    delay: "0.4s",
    label: "Video · On Demand",
    bg: "linear-gradient(135deg,#2d1a4a,#1a0d2e)",
    content: "vod",
  },
  {
    id: 2,
    top: "38%",
    left: "0%",
    w: 180,
    h: 130,
    depth: 0.04,
    anim: "float3",
    delay: "0.8s",
    label: "React · TypeScript",
    bg: "linear-gradient(135deg,#1a2744,#0d1a2e)",
    content: "code",
  },
  {
    id: 3,
    top: "32%",
    left: "42%",
    w: 200,
    h: 260,
    depth: 0.06,
    anim: "float1",
    delay: "0.2s",
    label: "Viewer Dashboard",
    bg: "linear-gradient(135deg,#0d3530,#051f1c)",
    content: "dash",
  },
  {
    id: 4,
    top: "68%",
    left: "5%",
    w: 240,
    h: 130,
    depth: 0.03,
    anim: "float2",
    delay: "1s",
    label: "Server · 99.99% Uptime",
    bg: "linear-gradient(135deg,#3a1515,#1f0d0d)",
    content: "server",
  },
  {
    id: 5,
    top: "70%",
    left: "52%",
    w: 180,
    h: 100,
    depth: 0.05,
    anim: "float3",
    delay: "0.6s",
    label: "Node.js · AWS",
    bg: "linear-gradient(135deg,#1a2744,#2e4270)",
    content: "logos",
  },
];

function CardContent({ type }) {
  if (type === "stream")
    return (
      <div
        style={{
          padding: 16,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#e8806a",
              animation: "pulse-ring 1.5s ease-out infinite",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 11,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            LIVE
          </span>
        </div>
        <div>
          <div
            style={{
              background: "rgba(95,179,161,.2)",
              borderRadius: 4,
              height: 4,
              marginBottom: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "65%",
                background: "var(--seafoam)",
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              color: "rgba(255,255,255,.35)",
              fontSize: 10,
              fontFamily: "var(--font-display)",
            }}
          >
            VIEWERS: 124,832
          </div>
        </div>
      </div>
    );
  if (type === "vod")
    return (
      <div
        style={{
          padding: 14,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {[
          "Ep 01 · The Beginning",
          "Ep 02 · Rising Tide",
          "Ep 03 · Turning Point",
        ].map((ep, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: i === 1 ? "rgba(95,179,161,.15)" : "transparent",
              borderRadius: 6,
              padding: "6px 8px",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 4,
                background: "rgba(255,255,255,.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "4px 0 4px 8px",
                  borderColor:
                    "transparent transparent transparent rgba(255,255,255,.6)",
                }}
              />
            </div>
            <span
              style={{
                color:
                  i === 1 ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.4)",
                fontSize: 11,
                fontFamily: "var(--font-display)",
              }}
            >
              {ep}
            </span>
          </div>
        ))}
      </div>
    );
  if (type === "code")
    return (
      <div
        style={{
          padding: 14,
          fontFamily: "monospace",
          fontSize: 11,
          lineHeight: 1.7,
        }}
      >
        <div style={{ color: "#5fb3a1" }}>
          {"const"} <span style={{ color: "#e8806a" }}>stream</span> ={" "}
          <span style={{ color: "#5fb3a1" }}>await</span>
        </div>
        <div style={{ color: "rgba(255,255,255,.5)", paddingLeft: 12 }}>
          LiveStream.connect(
        </div>
        <div style={{ color: "#f2b3a3", paddingLeft: 24 }}>'ws://cdn.edge'</div>
        <div style={{ color: "rgba(255,255,255,.3)", paddingLeft: 12 }}>);</div>
      </div>
    );
  if (type === "dash")
    return (
      <div
        style={{
          padding: 16,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,.9)",
            fontSize: 13,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
          }}
        >
          Analytics
        </div>
        {[
          ["Bitrate", "4.8 Mbps", 80],
          ["Buffer", "0.3s", 15],
          ["CDN Hit", "97%", 97],
        ].map(([k, v, p]) => (
          <div key={k}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,.4)",
                  fontSize: 10,
                  fontFamily: "var(--font-display)",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,.8)",
                  fontSize: 10,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                {v}
              </span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.08)",
                borderRadius: 3,
                height: 3,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${p}%`,
                  background: "var(--seafoam)",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  if (type === "server")
    return (
      <div
        style={{
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,.5)",
            fontSize: 10,
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Infrastructure
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["US-East", "EU-West", "AP-SE"].map((r) => (
            <div
              key={r}
              style={{
                flex: 1,
                background: "rgba(95,179,161,.15)",
                border: "1px solid rgba(95,179,161,.25)",
                borderRadius: 6,
                padding: "6px 4px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#5fb3a1",
                  margin: "0 auto 4px",
                }}
              />
              <div
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: 9,
                  fontFamily: "var(--font-display)",
                }}
              >
                {r}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {["⬡ Node", "⚛ React", "☁ AWS", "⚡ TS"].map((t) => (
        <div
          key={t}
          style={{
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 6,
            padding: "4px 8px",
            color: "rgba(255,255,255,.5)",
            fontSize: 10,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

/* ─── REVEAL HOOK ─────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(".reveal,.stat-block")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── NAV ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo" aria-label="Home">
          <div className="nav-logo-mark">{FA.play}</div>
          <div className="nav-divider" />
          <span className="nav-wordmark">Streamli</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-hamburger ${mobileMenuOpen ? "active fade-out" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileMenuOpen && (
          <div
            className={`mobile-menu-overlay ${mobileMenuOpen ? "mobile-open" : ""}`}
          >
            <button
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <span></span>
              <span></span>
            </button>
            <ul className="mobile-menu-links">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={closeMobileMenu}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────── */
function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const cardsRef = useRef([]);

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2,
        cy = window.innerHeight / 2;
      mouseRef.current = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy };
    };
    let raf;
    const anim = () => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = HERO_CARDS[i]?.depth ?? 0.04;
        el.style.transform = `translate(${mouseRef.current.x * d * 60}px,${mouseRef.current.y * d * 40}px)`;
      });
      raf = requestAnimationFrame(anim);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(anim);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-grid" />
      <div
        className="hero-glow"
        style={{
          width: 600,
          height: 600,
          top: -200,
          right: -100,
          background:
            "radial-gradient(circle,rgba(95,179,161,.1),transparent 70%)",
        }}
      />
      <div
        className="hero-glow"
        style={{
          width: 400,
          height: 400,
          bottom: 0,
          left: "20%",
          background:
            "radial-gradient(circle,rgba(232,128,106,.08),transparent 70%)",
        }}
      />

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="hero-dot" />
            <span
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 13,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Precision Engineering at Scale
            </span>
          </div>
          <h1 className="hero-h1">
            Build the Future of
            <br />
            <em>Video Streaming</em>
            <br />
            Infrastructure
          </h1>
          <p className="hero-sub">
            We engineer high-performance streaming platforms, real-time media
            systems, and scalable software solutions trusted by broadcasters and
            tech leaders worldwide.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              <span>Start a Project</span>
              <span>→</span>
            </a>
            <a
              href="#services"
              className="btn-outline"
              style={{
                color: "rgba(255,255,255,.7)",
                borderColor: "rgba(255,255,255,.2)",
              }}
            >
              <span>Explore Services</span>
            </a>
          </div>
          <div className="hero-stats">
            {[
              ["40", "Projects Delivered"],
              ["99.9%", "Uptime SLA"],
              ["18", "Countries Served"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="hero-stat-num">
                  {n}
                  <span>
                    {n.includes("%") ? "" : n.includes(".") ? "" : " +"}
                  </span>
                </div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          {HERO_CARDS.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="hero-card"
              style={{
                top: c.top,
                left: c.left,
                width: c.w,
                height: c.h,
                background: c.bg,
                animation: `${c.anim} ${4 + i * 0.7}s ease-in-out infinite`,
                animationDelay: c.delay,
              }}
            >
              <div className="hero-card-overlay" />
              <CardContent type={c.content} />
              <div className="hero-badge">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-ticker">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="ticker-item">
              <div className="ticker-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STAT STRIP ─────────────────────────────────────────────────────── */
function StatStrip() {
  return (
    <div className="stat-strip">
      <div className="stat-strip-inner">
        {[
          ["40+", "Projects Shipped"],
          ["99.9%", "Uptime SLA"],
          ["200ms", "Avg Stream Latency"],
          ["18+", "Countries Served"],
        ].map(([n, l]) => (
          <div key={l} className="stat-block reveal">
            <div className="stat-block-num">
              {n.replace("+", "").replace("%", "").replace("ms", "")}
              <span>
                {n.includes("+") ? "+" : n.includes("%") ? "%" : "ms"}
              </span>
            </div>
            <div className="stat-block-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-wrap">
        <div className="about-grid">
          <div>
            <div className="section-label reveal">
              <div className="section-label-line" />
              <span className="section-label-text">Who We Are</span>
            </div>
            <h2
              className="section-h2 reveal reveal-delay-1"
              style={{ marginBottom: 40 }}
            >
              Crafting the Tech Behind
              <br />
              <span style={{ color: "var(--salmon)" }}>
                What the World Watches
              </span>
            </h2>
            <div className="about-segments">
              {[
                {
                  title: "About Us",
                  text: "At Streamli, We build and engineer video streaming systems and cutting edge digital products. Founded in 2022, we've built streaming infrastructure for broadcasters, OTT platforms, and enterprise clients across 15+ countries. Our engineers blend deep protocol level expertise with modern cloud-native architectures to deliver systems that scale without compromise.",
                },
                {
                  title: "Founder's Perspective",
                  text: `"We build scalable video streaming infrastructure designed for real-world performance. From real time delivery to large-scale distribution, we focus on reliability and architecture. We value long term partnerships and grow with our clients over time at global scale." — Anas Ali, Founder & CEO`,
                },
                {
                  title: "Inside Our Thinking",
                  text: "We're obsessed with latency, reliability, and scale. Every decision, from CDN topology to codec choice to API design, is evaluated against real-world performance metrics. We ship production grade software, not prototypes. Our philosophy: if it can't handle 10x the load, it's not ready.",
                },
              ].map((s, i) => (
                <div key={s.title} className={`reveal reveal-delay-${i + 1}`}>
                  <div className="about-seg-title">{s.title}</div>
                  <p className="about-seg-body">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="about-visual reveal reveal-delay-2"
            style={{
              background:
                "linear-gradient(135deg,var(--navy) 0%,#2e4270 40%,#0d3530 100%)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                padding: 40,
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,.4)",
                    fontSize: 11,
                    fontFamily: "var(--font-display)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Live Viewers
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  124<span style={{ color: "var(--seafoam)" }}>,</span>832
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--seafoam)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--seafoam)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    +12.4% from last hour
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  width: "100%",
                }}
              >
                {[
                  ["99.9%", "Uptime"],
                  ["0.2s", "Avg Latency"],
                  ["4K", "Max Quality"],
                  ["Multi-CDN", "Delivery"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.06)",
                      borderRadius: 12,
                      padding: 16,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,.35)",
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-badge">Est. 2022</div>
            <div className="about-float" style={{ bottom: 24, left: 24 }}>
              <div className="about-float-label">Projects Delivered</div>
              <div className="about-float-val">
                40<span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM ───────────────────────────────────────────────────────────── */
function Team() {
  const colors = ['#d8c3b3', '#d0ebf5', '#ebdfff', '#dfcbb5'];
  return (
    <section className="team-section" id="team">
      <div className="section-wrap">
        <div className="team-header">
          <div>
            <div className="section-label reveal">
              <div className="section-label-line" />
              <span className="section-label-text">The Team</span>
            </div>
            <h2 className="section-h2 reveal reveal-delay-1">
              Engineers, Builders,
              <br />
              <span style={{ color: "var(--salmon)" }}>Stream Architects</span>
            </h2>
          </div>
          <p
            className="reveal reveal-delay-2"
            style={{
              maxWidth: 340,
              color: "var(--text-secondary)",
              fontSize: 15,
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            A handpicked team of streaming specialists and software craftspeople
            united by a passion for performance at scale.
          </p>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`team-card reveal reveal-delay-${(i % 4) + 1}`}
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <div className="team-avatar-container">
                <img 
                  src={m.Image} 
                  alt={m.name} 
                  style={{ objectPosition: m.objectPosition || 'center center' }}
                />
              </div>
              <div className="team-card-body">
                <div className="team-card-name">{m.name}</div>
                <div className="team-card-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CEO VIDEO ─────────────────────────────────────────────────────── */
const CEO_YT_ID = "UsHGF4ox5Fs";

const CEO_TRANSCRIPT = [
  "Hi, I’m Anas — a Software Engineer with over 7 years of experience and the founder of Streamli.",
  "I specialize in building scalable web & mobile applications, and video streaming development for startups, businesses, and growing platforms.",
  "On the application development side, my team and I work across full-stack development using technologies like MERN Stack, TypeScript, React Native, Flutter and modern backend architectures — always choosing the right technology based on the project requirements.",
  "For Video streaming development, I work with WebRTC for video calls, FFmpeg and GStreamer for media processing and transcoding, and HLS and RTMP for live streaming Projects.",
  "Whether you need a modern SaaS application, a live streaming platform, or a custom media pipeline —“that’s where I can deliver the most impact.”",
  "I believe in clear communication, reliable delivery, and building long-term partnerships with clients.",
  "If you’re looking for someone who understands both software engineering and scalable streaming infrastructure,“Let’s discuss how we can bring your idea to production.\""
];

function loadYouTubeIframeAPI() {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

function CeoVideo() {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${CEO_YT_ID}/maxresdefault.jpg`);
  const [activeSegment, setActiveSegment] = useState(0);

  const playerMountRef = useRef(null);
  const playerRef = useRef(null);
  const transcriptScrollRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      playerRef.current?.destroy?.();
      playerRef.current = null;
      setDuration(0);
      setCurrentTime(0);
      setActiveSegment(0);
      setPaused(false);
      return;
    }

    let cancelled = false;

    loadYouTubeIframeAPI().then(() => {
      if (cancelled || !playerMountRef.current) return;

      const ytContainer = document.createElement("div");
      playerMountRef.current.appendChild(ytContainer);

      playerRef.current = new window.YT.Player(ytContainer, {
        videoId: CEO_YT_ID,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          showinfo: 0,
          title: 0,
        },
        events: {
          onReady: (e) => {
            if (!cancelled) {
              setDuration(e.target.getDuration() || 0);
              e.target.setVolume(volume);
              e.target.playVideo();
            }
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setPaused(false);
            if (e.data === window.YT.PlayerState.PAUSED) setPaused(true);
            if (e.data === window.YT.PlayerState.ENDED) setPlaying(false);
          }
        },
      });
    });

    return () => {
      cancelled = true;
      try { playerRef.current?.destroy?.(); } catch { }
      playerRef.current = null;
      if (playerMountRef.current) {
        playerMountRef.current.innerHTML = "";
      }
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      const t = player.getCurrentTime();
      setCurrentTime(t);
    }, 200);

    return () => clearInterval(tick);
  }, [playing]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!playerRef.current?.getPlayerState) return;
    if (paused) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (playerRef.current) {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(val);
      }
      if (val === 0) {
        if (typeof playerRef.current.mute === 'function') {
          playerRef.current.mute();
        }
      } else {
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
      }
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!playerRef.current) return;
    if (volume > 0) {
      if (typeof playerRef.current.mute === 'function') playerRef.current.mute();
      setVolume(0);
    } else {
      if (typeof playerRef.current.unMute === 'function') playerRef.current.unMute();
      if (typeof playerRef.current.setVolume === 'function') playerRef.current.setVolume(100);
      setVolume(100);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!duration || !progressRef.current || !playerRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const targetTime = pct * duration;
    playerRef.current.seekTo(targetTime, true);
    setCurrentTime(targetTime);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const seekToSegment = (index) => {
    // Progressive playback disabled, mapping disabled.
  };

  return (
    <section className="ceo-video-section" id="ceo-message">
      <div className="noise" />
      <div className="section-wrap" style={{ position: "relative", zIndex: 2 }}>
        <header className="ceo-video-header">
          <div className="section-label reveal" style={{ justifyContent: "center" }}>
            <div className="section-label-line" style={{ background: "var(--seafoam)" }} />
            <span className="section-label-text" style={{ color: "var(--seafoam)" }}>
              From the CEO
            </span>
            <div className="section-label-line" style={{ background: "var(--seafoam)" }} />
          </div>
          <h2 className="section-h2 reveal reveal-delay-1">
            Hear It From Our <span style={{ color: "var(--seafoam)" }}>CEO</span>
          </h2>
          <p className="ceo-video-sub reveal reveal-delay-2">
            Anas Ali walks through what we build, who we are, and the services we deliver — straight from the architect behind Streamli.
          </p>
        </header>

        <div className="reveal reveal-delay-3">
          <div className={`ceo-video-stage${playing ? " is-playing" : ""}`}>
            <div className="ceo-video-layout">
              <div className="ceo-video-col">
                <div 
                  className="ceo-video-frame" 
                  onClick={!playing ? () => setPlaying(true) : togglePlay}
                  aria-label={playing ? "CEO video playing" : "Play CEO introduction video"}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!playing) setPlaying(true);
                      else togglePlay();
                    }
                  }}
                >
                  {!playing && (
                    <img
                      className="ceo-video-thumb"
                      src={thumbSrc}
                      alt="CEO introduction"
                      loading="lazy"
                      onError={() => {
                        if (!thumbSrc.includes("hqdefault")) {
                          setThumbSrc(`https://img.youtube.com/vi/${CEO_YT_ID}/hqdefault.jpg`);
                        }
                      }}
                    />
                  )}
                  {(!playing || paused) && (
                    <>
                      <div className="ceo-video-vignette" aria-hidden="true" />
                      <div className="ceo-video-scanlines" aria-hidden="true" />
                      <span className="ceo-video-play-wrap" aria-hidden="true">
                        <span className="ceo-video-play-ring" />
                        <span className="ceo-video-play-btn">{FA.play}</span>
                      </span>
                    </>
                  )}
                  <div ref={playerMountRef} className="ceo-yt-mount" style={{ display: 'block' }} />
                  
                  {/* Custom Video Controls overlay */}

                  <div className="ceo-video-controls" onClick={e => e.stopPropagation()}>
                    <button className="cvc-btn play-pause" onClick={togglePlay} aria-label={paused ? "Play" : "Pause"}>
                      {paused ? FA.play : FA.pause}
                    </button>
                    <div className="cvc-volume-wrap">
                      <button className="cvc-btn" onClick={toggleMute} aria-label={volume === 0 ? "Unmute" : "Mute"}>
                        {volume === 0 ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          FA.volume
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="cvc-volume-slider"
                      />
                    </div>
                    <div className="cvc-time">
                      {formatTime(currentTime)} <span>/ {formatTime(duration)}</span>
                    </div>
                    <div className="cvc-progress-wrap" ref={progressRef} onClick={handleSeek} role="slider" aria-valuenow={currentTime} aria-valuemax={duration} tabIndex={0}>
                      <div className="cvc-progress-track">
                        <div className="cvc-progress-fill" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ceo-transcript-wrap">
                <aside className="ceo-transcript" aria-label="Video transcript">
                  <div className="ceo-transcript-label">Live Transcript</div>
                  <div className="ceo-transcript-scroll" ref={transcriptScrollRef}>
                    {CEO_TRANSCRIPT.map((line, i) => (
                      <p
                        key={i}
                        className="ceo-transcript-line active"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
            <div className="ceo-video-caption">
              <span className="ceo-video-caption-text">What we build · Who we are · Our services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */
function Testimonials() {
  const trackRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current || !scrollRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const maxScroll = rect.height - windowHeight;
      let p = -rect.top / maxScroll;
      p = Math.max(0, Math.min(1, p));
      
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = scrollRef.current.parentElement ? scrollRef.current.parentElement.clientWidth : window.innerWidth;
      const maxTranslate = Math.max(0, scrollWidth - containerWidth);
      
      scrollRef.current.style.transform = `translateX(-${p * maxTranslate}px)`;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="testi-section" id="testimonials">
      <div className="testi-track" ref={trackRef}>
        <div className="testi-sticky">
          <div className="noise" />
          <div className="section-wrap" style={{ position: "relative", zIndex: 2, marginBottom: 40, flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div className="section-label reveal">
                  <div
                    className="section-label-line"
                    style={{ background: "var(--seafoam)" }}
                  />
                  <span
                    className="section-label-text"
                    style={{ color: "var(--seafoam)" }}
                  >
                    Testimonials
                  </span>
                </div>
                <h2
                  className="section-h2 reveal reveal-delay-1"
                  style={{ color: "var(--white)" }}
                >
                  Trusted by Teams
                  <br />
                  <span style={{ color: "var(--seafoam)" }}>Across the Globe</span>
                </h2>
              </div>
              <div
                className="reveal reveal-delay-2"
                style={{ display: "flex", gap: 4, alignItems: "center" }}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: "var(--salmon)" }}>
                    {FA.star}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: "100%", overflow: "hidden", position: "relative", zIndex: 2 }}>
            <div className="testi-carousel-track" ref={scrollRef}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`testi-card reveal reveal-delay-${i + 1}${t.featured ? " featured" : ""}${t.tall ? " tall" : ""}`}
                >
                  <div className="testi-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ color: "var(--salmon)" }}>
                        {FA.star}
                      </span>
                    ))}
                  </div>
                  <div className="testi-quote">{FA.quote}</div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <div className="testi-avatar" style={{ background: t.bg }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-country">{t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ──────────────────────────────────────────────────────── */
function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-wrap">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">What We Build</span>
          </div>
          <h2 className="section-h2 reveal reveal-delay-1">
            Two Pillars of
            <br />
            <span style={{ color: "var(--salmon)" }}>
              Exceptional Engineering
            </span>
          </h2>
        </div>

        <div className="reveal">
          <div style={{ marginBottom: 12 }}>
            <span className="tag-pill salmon">Video Streaming</span>
          </div>
          <div
            className="services-strip"
            style={{ borderColor: "var(--salmon-light)" }}
          >
            <div
              className="srv-label"
              style={{
                background:
                  "linear-gradient(135deg,var(--salmon-dark),var(--salmon))",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  color: "var(--white)",
                }}
              >
                {FA.video}
              </div>
              <div className="srv-label-text">
                Video
                <br />
                Streaming
              </div>
              <div className="srv-label-sub">Services</div>
            </div>
            {SERVICES_STREAM.map((s) => (
              <div key={s.name} className="srv-block">
                <div
                  className="srv-icon-wrap"
                  style={{ color: "var(--salmon)" }}
                >
                  {s.icon}
                </div>
                <div className="srv-name">{s.name}</div>
                <div className="srv-desc">{s.desc}</div>
                <div
                  className="srv-tag"
                  style={{
                    background: "var(--salmon-pale)",
                    color: "var(--salmon-dark)",
                  }}
                >
                  {s.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2">
          <div style={{ marginBottom: 12 }}>
            <span className="tag-pill navy">Software Development</span>
          </div>
          <div className="services-strip">
            <div className="srv-label">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  color: "var(--seafoam)",
                }}
              >
                {FA.code}
              </div>
              <div className="srv-label-text">
                Software
                <br />
                Development
              </div>
              <div className="srv-label-sub">Services</div>
            </div>
            {SERVICES_DEV.map((s) => (
              <div key={s.name} className="srv-block">
                <div className="srv-icon-wrap">{s.icon}</div>
                <div className="srv-name">{s.name}</div>
                <div className="srv-desc">{s.desc}</div>
                <div className="srv-tag">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap">
        <div>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">Get In Touch</span>
          </div>
          <h2 className="section-h2 reveal reveal-delay-1">
            Let's Build Something
            <br />
            <span style={{ color: "var(--salmon)" }}>Remarkable Together</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-form-wrap reveal reveal-delay-1">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--navy)",
                marginBottom: 28,
              }}
            >
              Send us a message
            </h3>
            <div className="form-row-2">
              <div className="form-row">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                placeholder="Project inquiry, streaming consultation..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="form-row">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Tell us about your project, timeline, and goals..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setSent(true);
                setTimeout(() => setSent(false), 3000);
              }}
            >
              <span>{sent ? "✓ Message Sent!" : "Send Message"}</span>
              {!sent && <span>→</span>}
            </button>
          </div>
          <div className="contact-info reveal reveal-delay-2">
            <div>
              <div className="contact-info-title">
                Connected locally.
                <br />
                Working globally.
              </div>
              <p className="contact-info-body" style={{ marginTop: 16 }}>
                Whether you're a startup launching your first streaming product
                or an enterprise modernizing your media infrastructure, we'd
                love to hear from you. Our team typically responds within 24
                hours.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  icon: FA.mapMarker,
                  label: "Location",
                  val: "Lahore, Pakistan",
                  bg: "var(--salmon-pale)",
                  c: "var(--salmon-dark)",
                },
              ].map(({ icon, label, val, bg, c }) => (
                <div key={label} className="contact-detail">
                  <div
                    className="contact-detail-icon"
                    style={{ background: bg, color: c }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="contact-detail-label">{label}</div>
                    <div className="contact-detail-val">{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-ph">
              <div style={{ color: "var(--seafoam-dark)" }}>{FA.mapMarker}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  fontSize: 16,
                }}
              >
                Lahore
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Punjab, Pakistan
              </div>
              <div style={{ marginTop: 8 }}>
                <a
                  href="https://www.google.com/maps/place/Lahore,+Pakistan/@31.4831037,74.0047298,10z/data=!3m1!4b1!4m6!3m5!1s0x39190483e58107d9:0xc23abe6ccc7e2462!8m2!3d31.5203696!4d74.3587473!16zL20vMHhudDU?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "var(--seafoam-dark)",
                    fontSize: 13,
                    textDecoration: "none",
                    border: "1px solid var(--seafoam-light)",
                    borderRadius: "var(--radius-sm)",
                    padding: "6px 14px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                  }}
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--seafoam)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {FA.play}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.4)",
                }}
              >
                Streamli
              </span>
            </div>
            <p className="footer-desc">
              Engineering the future of video streaming and real time media
              systems. Trusted by broadcasters, OTT platforms, and tech
              companies worldwide.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Navigation</div>
            <div className="footer-links">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              {[
                "Live Streaming",
                "Video on Demand",
                "Real-Time Systems",
                "Web Development",
                "Mobile Apps",
                "Custom Software",
              ].map((s) => (
                <a key={s} href="#services">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a href="#contact">Project Inquiry</a>
              <span style={{ color: "rgba(255,255,255,.25)", fontSize: 14 }}>
                Lahore, Pakistan
              </span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App() {
  useReveal();
  return (
    <div id="app-root">
      <GlobalStyle />
      <Nav />
      <Hero />
      <StatStrip />
      <About />
      <Team />
      <CeoVideo />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
