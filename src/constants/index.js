// Additional animated themes
export const themes = [
  {
    id: 3,
    name: "Custom",
    image: "",
    settings: {
      bio_link: {
        text_color: "#ffffff",
        border_color: "#000000",
        border_style: "solid",
        border_width: "0",
        border_radius: "straight",
        background_color: "#000000",
        border_shadow_blur: "20",
        border_shadow_color: "#000000",
        border_shadow_spread: "0",
        border_shadow_offset_x: "0",
        border_shadow_offset_y: "0",
      },
      bio_page: {
        font: "arial",
        font_size: "16",
        background: null,
        background_type: "preset",
        background_color_one: null,
        background_color_two: null,
      },
    },
  },
  {
    id: 16,
    name: "theme with hard shadow button",
    image: "https://back-dev-project.linkatik.com/storage/548/rotate-group.svg",
    settings: {
      bio_link: {
        type: "hard-shadow",
        text_color: "#000000",
        button_color: "#fcf3d8",
      },
      bio_page: {
        css: ".background {  height: 100lvh;  opacity: 0.8;  background-color: #e5e5f7;  background:    linear-gradient(135deg, #63270055 25%, transparent 25%) -39px 0/ 78px 78px,    linear-gradient(225deg, #632700 25%, transparent 25%) -39px 0/ 78px 78px,    linear-gradient(315deg, #63270055 25%, transparent 25%) 0px 0/ 78px 78px,    linear-gradient(45deg, #632700 25%, #e5e5f7 25%) 0px 0/ 78px 78px;}",
        html: "<div class='background'></div>",
      },
    },
  },
  {
    id: 18,
    name: "Gradient Flow",
    image: "https://back-dev-project.linkatik.com/storage/550/rotate-group.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#4158D0",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%); animation: gradientFlow 15s ease infinite; background-size: 400% 400%; } @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }",
        html: "<div class='background'></div>",
      },
    },
  },
  {
    id: 19,
    name: "Neon Pulse",
    image: "https://back-dev-project.linkatik.com/storage/551/rotate-group.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#2d00f7",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: #000000; position: relative; overflow: hidden; } .neon-circle { position: absolute; width: 200px; height: 200px; border-radius: 50%; filter: blur(80px); animation: neonPulse 4s ease-in-out infinite; } .circle1 { background: #ff0080; top: 20%; left: 30%; } .circle2 { background: #00ff00; bottom: 20%; right: 30%; animation-delay: -2s; } @keyframes neonPulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.5); opacity: 0.8; } }",
        html: "<div class='background'><div class='neon-circle circle1'></div><div class='neon-circle circle2'></div></div>",
      },
    },
  },
  {
    id: 20,
    name: "Geometric Waves",
    image: "https://back-dev-project.linkatik.com/storage/552/rotate-group.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#6366f1",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: #1a1a1a; position: relative; overflow: hidden; } .wave { position: absolute; width: 100%; height: 100%; opacity: 0.4; animation: waveAnimation 8s linear infinite; } .wave1 { background: repeating-linear-gradient(45deg, #6366f1 0%, transparent 10%); animation-delay: -2s; } .wave2 { background: repeating-linear-gradient(-45deg, #2563eb 0%, transparent 10%); animation-delay: -4s; } .wave3 { background: repeating-linear-gradient(0deg, #7c3aed 0%, transparent 10%); animation-delay: -6s; } @keyframes waveAnimation { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }",
        html: "<div class='background'><div class='wave wave1'></div><div class='wave wave2'></div><div class='wave wave3'></div></div>",
      },
    },
  },
  {
    id: 21,
    name: "Particle Network",
    image: "https://back-dev-project.linkatik.com/storage/553/rotate-group.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#14b8a6",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: #0f172a; position: relative; overflow: hidden; } .particle { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: float 6s infinite; } .p1 { top: 20%; left: 20%; } .p2 { top: 60%; left: 80%; animation-delay: -2s; } .p3 { top: 40%; left: 40%; animation-delay: -4s; } .line { position: absolute; width: 100px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform-origin: left; animation: rotateLine 4s linear infinite; } .l1 { top: 30%; left: 25%; } .l2 { top: 70%; left: 75%; animation-delay: -2s; } @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, 20px); } } @keyframes rotateLine { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }",
        html: "<div class='background'><div class='particle p1'></div><div class='particle p2'></div><div class='particle p3'></div><div class='line l1'></div><div class='line l2'></div></div>",
      },
    },
  },
  {
    id: 22,
    name: "Aurora Borealis",
    image: "https://back-dev-project.linkatik.com/storage/554/rotate-group.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#0c4a6e",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: linear-gradient(180deg, #0c4a6e 0%, #0f172a 100%); position: relative; overflow: hidden; } .aurora { position: absolute; width: 100%; height: 100%; mix-blend-mode: screen; } .a1 { background: linear-gradient(90deg, #4ade80 0%, transparent 100%); animation: auroraFlow 8s ease-in-out infinite; } .a2 { background: linear-gradient(-90deg, #818cf8 0%, transparent 100%); animation: auroraFlow 8s ease-in-out infinite reverse; } .a3 { background: linear-gradient(0deg, #2dd4bf 0%, transparent 100%); animation: auroraFlow 8s ease-in-out infinite; animation-delay: -4s; } @keyframes auroraFlow { 0%, 100% { opacity: 0.5; transform: translateY(0) skewY(0deg); } 50% { opacity: 0.8; transform: translateY(-20px) skewY(-5deg); } }",
        html: "<div class='background'><div class='aurora a1'></div><div class='aurora a2'></div><div class='aurora a3'></div></div>",
      },
    },
  },
  {
    id: 23,
    name: "Parallax Mountains",
    image: "https://example.com/parallax-mountains-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#3b82f6",
      },
      bio_page: {
        css: ".parallax-bg { height: 100lvh; background-color: #0f172a; overflow: hidden; position: relative; } .mountain-layer { position: absolute; bottom: 0; width: 100%; height: 100%; background-repeat: no-repeat; background-position: bottom center; background-size: cover; } .sky { background-image: url('https://images.unsplash.com/photo-1478719059408-592965723cbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3RhcnJ5JTIwc2t5fHwwfHx8fDE2MTQwODg1MzQ&ixlib=rb-4.0.3&q=80&w=1080'); height: 100%; width: 100%; position: absolute; } .mountains-back { background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW91bnRhaW5zJTIwc2lsaG91ZXR0ZXx8MHx8fHwxNjE0MDg4NTQ2&ixlib=rb-4.0.3&q=80&w=1080'); opacity: 0.7; animation: parallax 60s infinite linear; } .mountains-mid { background-image: url('https://images.unsplash.com/photo-1621682372775-533449e550ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bW91bnRhaW5zJTIwc2lsaG91ZXR0ZXx8MHx8fHwxNjE0MDg4NTQ2&ixlib=rb-4.0.3&q=80&w=1080'); opacity: 0.8; animation: parallax 40s infinite linear; } .mountains-front { background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bW91bnRhaW5zfHwwfHx8fDE2MTQwODg1NjA&ixlib=rb-4.0.3&q=80&w=1080'); opacity: 0.9; animation: parallax 20s infinite linear; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%); } @keyframes parallax { 0% { background-position: 0% bottom; } 50% { background-position: 100% bottom; } 100% { background-position: 0% bottom; } }",
        html: "<div class='parallax-bg'><div class='mountain-layer sky'></div><div class='mountain-layer mountains-back'></div><div class='mountain-layer mountains-mid'></div><div class='mountain-layer mountains-front'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 24,
    name: "Urban Slideshow",
    image: "https://example.com/urban-slideshow-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#f43f5e",
      },
      bio_page: {
        css: ".slideshow-container { height: 100lvh; position: relative; overflow: hidden; } .slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0; transition: opacity 2s; animation: slideshow 24s infinite; } .slide1 { background-image: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y2l0eSUyMG5pZ2h0fHwwfHx8fDE2MTQwODg2MjA&ixlib=rb-4.0.3&q=80&w=1080'); animation-delay: 0s; } .slide2 { background-image: url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2l0eXx8MHx8fHwxNjE0MDg4NjMz&ixlib=rb-4.0.3&q=80&w=1080'); animation-delay: 8s; } .slide3 { background-image: url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y2l0eXx8MHx8fHwxNjE0MDg4NjMz&ixlib=rb-4.0.3&q=80&w=1080'); animation-delay: 16s; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%); z-index: 1; } @keyframes slideshow { 0%, 25%, 100% { opacity: 0; transform: scale(1); } 4%, 21% { opacity: 1; transform: scale(1.05); } }",
        html: "<div class='slideshow-container'><div class='slide slide1'></div><div class='slide slide2'></div><div class='slide slide3'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 25,
    name: "Floating Clouds",
    image: "https://example.com/floating-clouds-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#1e293b",
        button_color: "#38bdf8",
      },
      bio_page: {
        css: ".sky-container { height: 100lvh; background: linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%); position: relative; overflow: hidden; } .sun { position: absolute; top: 10%; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: radial-gradient(circle, #FFD700 30%, rgba(255, 215, 0, 0) 70%); border-radius: 50%; animation: pulse 4s ease-in-out infinite; filter: blur(5px); } .cloud { position: absolute; background-image: url('https://images.unsplash.com/photo-1535543962029-0b2023f6a3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2xvdWR8fDB8fHx8MTYxNDA4ODczMg&ixlib=rb-4.0.3&q=80&w=1080'); background-size: contain; background-repeat: no-repeat; opacity: 0.85; filter: brightness(1.2); } .cloud1 { width: 200px; height: 120px; top: 20%; left: -10%; animation: floatCloud 30s linear infinite; } .cloud2 { width: 300px; height: 180px; top: 30%; left: -20%; animation: floatCloud 40s linear infinite; animation-delay: -5s; } .cloud3 { width: 250px; height: 150px; top: 15%; left: -15%; animation: floatCloud 35s linear infinite; animation-delay: -12s; } .cloud4 { width: 200px; height: 120px; top: 40%; left: -10%; animation: floatCloud 25s linear infinite; animation-delay: -20s; } .birds { position: absolute; width: 100px; height: 50px; background-image: url('https://images.unsplash.com/photo-1516233758813-a38d024919c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Zmx5aW5nJTIwYmlyZHN8fDB8fHx8MTYxNDA4ODc3NQ&ixlib=rb-4.0.3&q=80&w=1080'); background-size: contain; background-repeat: no-repeat; top: 25%; left: -5%; animation: flyBirds 15s linear infinite; animation-delay: -8s; transform: scale(0.5); } @keyframes pulse { 0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; } 50% { transform: translateX(-50%) scale(1.1); opacity: 0.9; } } @keyframes floatCloud { from { transform: translateX(0); } to { transform: translateX(calc(100vw + 300px)); } } @keyframes flyBirds { from { transform: translateX(0) scale(0.5); } to { transform: translateX(calc(100vw + 100px)) scale(0.5); } }",
        html: "<div class='sky-container'><div class='sun'></div><div class='cloud cloud1'></div><div class='cloud cloud2'></div><div class='cloud cloud3'></div><div class='cloud cloud4'></div><div class='birds'></div></div>",
      },
    },
  },
  {
    id: 26,
    name: "Misty Forest",
    image: "https://example.com/misty-forest-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#166534",
      },
      bio_page: {
        css: ".forest-container { height: 100lvh; position: relative; overflow: hidden; } .forest-bg { position: absolute; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Zm9yZXN0JTIwbWlzdHl8fDB8fHx8MTYxNDA4ODgxNw&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; animation: forestZoom 30s ease-in-out infinite alternate; } .mist { position: absolute; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%); animation: mistFloat 20s ease-in-out infinite alternate; } .mist-layer { position: absolute; width: 100%; height: 100%; animation: mistOpacity 8s ease-in-out infinite alternate; } .mist1 { background: radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%); animation-delay: -2s; } .mist2 { background: radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%); animation-delay: -5s; } .mist3 { background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%); animation-delay: -7s; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,30,10,0.3); } .firefly { position: absolute; width: 3px; height: 3px; background: #FFFF99; border-radius: 50%; filter: blur(1px); opacity: 0; animation: firefly 6s ease-in-out infinite; } .f1 { top: 30%; left: 20%; animation-delay: -1s; } .f2 { top: 50%; left: 60%; animation-delay: -3s; } .f3 { top: 70%; left: 30%; animation-delay: -4s; } .f4 { top: 40%; left: 80%; animation-delay: -2s; } .f5 { top: 60%; left: 40%; animation-delay: -5s; } @keyframes forestZoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } } @keyframes mistFloat { 0% { transform: translateX(-5%); } 100% { transform: translateX(5%); } } @keyframes mistOpacity { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.7; } } @keyframes firefly { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } 0% { transform: translate(0, 0); } 25% { transform: translate(10px, -10px); } 50% { transform: translate(0, 10px); } 75% { transform: translate(-10px, -10px); } 100% { transform: translate(0, 0); } }",
        html: "<div class='forest-container'><div class='forest-bg'></div><div class='mist'></div><div class='mist-layer mist1'></div><div class='mist-layer mist2'></div><div class='mist-layer mist3'></div><div class='overlay'></div><div class='firefly f1'></div><div class='firefly f2'></div><div class='firefly f3'></div><div class='firefly f4'></div><div class='firefly f5'></div></div>",
      },
    },
  },
  {
    id: 27,
    name: "Ocean Waves",
    image: "https://example.com/ocean-waves-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#0891b2",
      },
      bio_page: {
        css: ".ocean-container { height: 100lvh; position: relative; overflow: hidden; background: linear-gradient(180deg, #87CEEB 0%, #1E3A8A 100%); } .ocean-bg { position: absolute; bottom: 0; width: 100%; height: 60%; background-image: url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8b2NlYW58fDB8fHx8MTYxNDA4ODg3MA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; animation: oceanMove 15s ease-in-out infinite alternate; } .wave { position: absolute; bottom: 0; left: 0; width: 200%; height: 100px; background: url('https://images.unsplash.com/photo-1617651235213-5bc7dfdeb1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8d2F2ZSUyMHBhdHRlcm58fDB8fHx8MTYxNDA4ODg5OA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: 50% 100px; background-repeat: repeat-x; animation: waveMotion 10s linear infinite; opacity: 0.8; } .wave1 { bottom: -10px; opacity: 0.8; animation-duration: 8s; } .wave2 { bottom: -20px; opacity: 0.6; animation-duration: 10s; animation-direction: reverse; } .sun { position: absolute; top: 10%; right: 10%; width: 80px; height: 80px; background: radial-gradient(circle, #FFD700 30%, rgba(255, 215, 0, 0) 70%); border-radius: 50%; animation: sunPulse 4s ease-in-out infinite; filter: blur(3px); } .seagull { position: absolute; width: 50px; height: 30px; background-image: url('https://images.unsplash.com/photo-1506747958701-808cb9303771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2VhZ3VsbHx8MHx8fHwxNjE0MDg4OTIz&ixlib=rb-4.0.3&q=80&w=1080'); background-size: contain; background-repeat: no-repeat; top: 15%; left: -5%; animation: flySeagulls 20s linear infinite; transform: scale(0.4); } .boat { position: absolute; width: 100px; height: 70px; background-image: url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Ym9hdHx8MHx8fHwxNjE0MDg4OTQy&ixlib=rb-4.0.3&q=80&w=1080'); background-size: contain; background-repeat: no-repeat; bottom: 20%; left: -5%; animation: boatSail 40s linear infinite; transform: scale(0.5); } @keyframes oceanMove { 0% { transform: translateY(0); } 100% { transform: translateY(-20px); } } @keyframes waveMotion { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @keyframes sunPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.9; } } @keyframes flySeagulls { from { transform: translateX(0) scale(0.4); } to { transform: translateX(calc(100vw + 50px)) scale(0.4); } } @keyframes boatSail { from { transform: translateX(0) scale(0.5); } to { transform: translateX(calc(100vw + 100px)) scale(0.5); } }",
        html: "<div class='ocean-container'><div class='sun'></div><div class='seagull'></div><div class='ocean-bg'></div><div class='wave wave1'></div><div class='wave wave2'></div><div class='boat'></div></div>",
      },
    },
  },
  {
    id: 28,
    name: "Night City",
    image: "https://example.com/night-city-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#9333ea",
      },
      bio_page: {
        css: ".city-container { height: 100lvh; position: relative; overflow: hidden; background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%); } .city-bg { position: absolute; bottom: 0; width: 100%; height: 60%; background-image: url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2l0eXx8MHx8fHwxNjE0MDg4NjMz&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center bottom; animation: cityPulse 20s ease-in-out infinite alternate; } .stars { position: absolute; top: 0; left: 0; width: 100%; height: 40%; background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)); background-repeat: repeat; background-size: 200px 200px; animation: twinkling 4s ease-in-out infinite; } .moon { position: absolute; top: 15%; right: 15%; width: 60px; height: 60px; background: radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 50%, rgba(240, 240, 240, 0) 100%); border-radius: 50%; } .car { position: absolute; width: 30px; height: 15px; background-color: #333; border-radius: 3px; bottom: 10%; left: -30px; animation: carDrive 8s linear infinite; } .headlight { position: absolute; width: 5px; height: 5px; background-color: #ffff99; border-radius: 50%; top: 5px; right: 0; filter: blur(1px); } .taillight { position: absolute; width: 3px; height: 3px; background-color: #ff3333; border-radius: 50%; top: 5px; left: 0; filter: blur(1px); } .window { position: absolute; width: 10px; height: 5px; background-color: #7dd3fc; top: 2px; left: 8px; opacity: 0.8; animation: windowLight 1s ease-in-out infinite alternate; } @keyframes cityPulse { 0% { filter: brightness(1); } 100% { filter: brightness(1.2); } } @keyframes twinkling { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } } @keyframes carDrive { from { transform: translateX(0); } to { transform: translateX(calc(100vw + 30px)); } } @keyframes windowLight { 0% { opacity: 0.7; } 100% { opacity: 1; } }",
        html: "<div class='city-container'><div class='stars'></div><div class='moon'></div><div class='city-bg'></div><div class='car'><div class='headlight'></div><div class='taillight'></div><div class='window'></div></div></div>",
      },
    },
  },
  {
    id: 29,
    name: "Desert Journey",
    image: "https://example.com/desert-journey-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#c2410c",
      },
      bio_page: {
        css: ".desert-container { height: 100lvh; position: relative; overflow: hidden; background: linear-gradient(180deg, #f97316 0%, #7c2d12 100%); } .desert-bg { position: absolute; bottom: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZGVzZXJ0fHwwfHx8fDE2MTQwODkwMjA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; animation: desertShift 30s ease-in-out infinite alternate; } .sun { position: absolute; top: 15%; left: 25%; width: 80px; height: 80px; background: radial-gradient(circle, #FFD700 30%, rgba(255, 215, 0, 0) 70%); border-radius: 50%; animation: sunHeat 8s ease-in-out infinite; } .dune { position: absolute; bottom: 0; width: 100%; height: 30%; } .dune1 { background-image: url('https://images.unsplash.com/photo-1473580044835-7a9b0200c77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZHVuZXN8fDB8fHx8MTYxNDA4OTA0OA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; animation: duneShift 15s ease-in-out infinite; } .dune2 { background-image: url('https://images.unsplash.com/photo-1489493512598-d08130f49bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZHVuZXN8fDB8fHx8MTYxNDA4OTA0OA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; opacity: 0.7; height: 20%; animation: duneShift 20s ease-in-out infinite reverse; } .mirage { position: absolute; bottom: 25%; width: 100%; height: 10%; background: linear-gradient(0deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%); animation: mirageWave 4s ease-in-out infinite; } .tumbleweed { position: absolute; width: 30px; height: 30px; background-image: url('https://images.unsplash.com/photo-1580661669722-bc39fbcc58a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHVtYmxld2VlZHx8MHx8fHwxNjE0MDg5MDcx&ixlib=rb-4.0.3&q=80&w=1080'); background-size: contain; background-repeat: no-repeat; bottom: 15%; left: -30px; animation: tumbleRoll 15s linear infinite; } @keyframes desertShift { 0% { transform: translateX(0); } 100% { transform: translateX(-50px); } } @keyframes sunHeat { 0%, 100% { transform: scale(1); filter: blur(2px); } 50% { transform: scale(1.1); filter: blur(5px); } } @keyframes duneShift { 0% { transform: translateX(0); } 100% { transform: translateX(-100px); } } @keyframes mirageWave { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.5; transform: scaleY(1.2); } } @keyframes tumbleRoll { from { transform: translateX(0) rotate(0deg); } to { transform: translateX(calc(100vw + 30px)) rotate(1080deg); } }",
        html: "<div class='desert-container'><div class='desert-bg'></div><div class='sun'></div><div class='dune dune1'></div><div class='dune dune2'></div><div class='mirage'></div><div class='tumbleweed'></div></div>",
      },
    },
  },
  {
    id: 31,
    name: "Liquid Gradient",
    image: "https://example.com/liquid-gradient-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#06b6d4",
      },
      bio_page: {
        css: ".liquid-container { height: 100lvh; position: relative; overflow: hidden; } .liquid-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 400% 400%; animation: gradientFlow 15s ease infinite; } .bubble { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); animation: bubbleFloat linear infinite; } .b1 { width: 80px; height: 80px; top: 10%; left: 10%; animation-duration: 20s; } .b2 { width: 40px; height: 40px; top: 20%; left: 80%; animation-duration: 15s; } .b3 { width: 100px; height: 100px; top: 60%; left: 30%; animation-duration: 25s; } .b4 { width: 60px; height: 60px; top: 80%; left: 70%; animation-duration: 18s; } .light-streak { position: absolute; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); animation: streakMove 8s linear infinite; } .ls1 { top: 30%; left: -50%; width: 200%; } .ls2 { top: 70%; left: -50%; width: 200%; animation-delay: -4s; } @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } @keyframes bubbleFloat { 0% { transform: translate(0, 0) scale(1); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.6; } 100% { transform: translate(20px, -100vh) scale(1.5); opacity: 0; } } @keyframes streakMove { 0% { transform: translateX(-100%) rotate(45deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateX(100%) rotate(45deg); opacity: 0; } }",
        html: "<div class='liquid-container'><div class='liquid-bg'></div><div class='bubble b1'></div><div class='bubble b2'></div><div class='bubble b3'></div><div class='bubble b4'></div><div class='light-streak ls1'></div><div class='light-streak ls2'></div></div>",
      },
    },
  },
  {
    id: 32,
    name: "Floating Particles",
    image: "https://example.com/floating-particles-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#1d4ed8",
      },
      bio_page: {
        css: ".particles-container { height: 100lvh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); position: relative; overflow: hidden; } .particle { position: absolute; background: #fff; border-radius: 50%; opacity: 0.5; animation: particleFloat linear infinite; } .p1 { width: 3px; height: 3px; top: 10%; left: 20%; animation-duration: 60s; } .p2 { width: 4px; height: 4px; top: 20%; left: 80%; animation-duration: 75s; } .p3 { width: 2px; height: 2px; top: 30%; left: 40%; animation-duration: 90s; } .p4 { width: 5px; height: 5px; top: 40%; left: 60%; animation-duration: 105s; } .p5 { width: 3px; height: 3px; top: 50%; left: 10%; animation-duration: 120s; } .p6 { width: 2px; height: 2px; top: 60%; left: 30%; animation-duration: 135s; } .p7 { width: 4px; height: 4px; top: 70%; left: 50%; animation-duration: 150s; } .p8 { width: 3px; height: 3px; top: 80%; left: 70%; animation-duration: 165s; } .p9 { width: 2px; height: 2px; top: 90%; left: 90%; animation-duration: 180s; } .connection { position: absolute; height: 1px; background: rgba(255, 255, 255, 0.1); transform-origin: left center; animation: connectionPulse 8s ease-in-out infinite alternate; } .c1 { width: 200px; top: 20%; left: 30%; transform: rotate(30deg); } .c2 { width: 150px; top: 40%; left: 60%; transform: rotate(-45deg); } .c3 { width: 180px; top: 70%; left: 20%; transform: rotate(60deg); } .c4 { width: 220px; top: 50%; left: 70%; transform: rotate(-30deg); } .glow { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 70%); filter: blur(30px); animation: glowPulse 10s ease-in-out infinite; } .g1 { top: 30%; left: 20%; } .g2 { top: 60%; left: 70%; animation-delay: -5s; } @keyframes particleFloat { 0% { transform: translate(0, 0); } 100% { transform: translate(20px, 20px); } } @keyframes connectionPulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } } @keyframes glowPulse { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.2); opacity: 0.2; } }",
        html: "<div class='particles-container'><div class='glow g1'></div><div class='glow g2'></div><div class='particle p1'></div><div class='particle p2'></div><div class='particle p3'></div><div class='particle p4'></div><div class='particle p5'></div><div class='particle p6'></div><div class='particle p7'></div><div class='particle p8'></div><div class='particle p9'></div><div class='connection c1'></div><div class='connection c2'></div><div class='connection c3'></div><div class='connection c4'></div></div>",
      },
    },
  },
  {
    id: 33,
    name: "Digital Rain",
    image: "https://example.com/digital-rain-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#15803d",
      },
      bio_page: {
        css: ".matrix-container { height: 100lvh; background-color: #000000; position: relative; overflow: hidden; } .rain-column { position: absolute; top: -100px; font-family: monospace; color: #00ff41; font-size: 16px; line-height: 1; animation: raindrop linear infinite; width: 20px; text-align: center; } .col1 { left: 5%; animation-duration: 10s; } .col2 { left: 15%; animation-duration: 8s; animation-delay: -2s; } .col3 { left: 25%; animation-duration: 12s; animation-delay: -5s; } .col4 { left: 35%; animation-duration: 9s; animation-delay: -1s; } .col5 { left: 45%; animation-duration: 11s; animation-delay: -7s; } .col6 { left: 55%; animation-duration: 7s; animation-delay: -3s; } .col7 { left: 65%; animation-duration: 10s; animation-delay: -6s; } .col8 { left: 75%; animation-duration: 9s; animation-delay: -4s; } .col9 { left: 85%; animation-duration: 8s; animation-delay: -2s; } .col10 { left: 95%; animation-duration: 11s; animation-delay: -5s; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%); } @keyframes raindrop { 0% { transform: translateY(0); opacity: 1; } 95% { opacity: 0.8; } 100% { transform: translateY(calc(100vh + 100px)); opacity: 0; } }",
        html: "<div class='matrix-container'><div class='rain-column col1'>10010110<br>01101001<br>10110010<br>01001101<br>10100101</div><div class='rain-column col2'>01101001<br>10110010<br>01001101<br>10100101<br>01011010</div><div class='rain-column col3'>10110010<br>01001101<br>10100101<br>01011010<br>10010110</div><div class='rain-column col4'>01001101<br>10100101<br>01011010<br>10010110<br>01101001</div><div class='rain-column col5'>10100101<br>01011010<br>10010110<br>01101001<br>10110010</div><div class='rain-column col6'>01011010<br>10010110<br>01101001<br>10110010<br>01001101</div><div class='rain-column col7'>10010110<br>01101001<br>10110010<br>01001101<br>10100101</div><div class='rain-column col8'>01101001<br>10110010<br>01001101<br>10100101<br>01011010</div><div class='rain-column col9'>10110010<br>01001101<br>10100101<br>01011010<br>10010110</div><div class='rain-column col10'>01001101<br>10100101<br>01011010<br>10010110<br>01101001</div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 34,
    name: "Falling Leaves",
    image: "https://example.com/falling-leaves-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#b45309",
      },
      bio_page: {
        css: ".autumn-container { height: 100lvh; background: linear-gradient(180deg, #f97316 0%, #7c2d12 100%); position: relative; overflow: hidden; } .leaf { position: absolute; width: 20px; height: 20px; background-size: contain; background-repeat: no-repeat; opacity: 0.8; animation: leafFall linear infinite, leafSway ease-in-out infinite alternate; } .leaf1 { background-image: url('https://api.placeholder.com/20x20'); top: -20px; left: 10%; animation-duration: 12s, 3s; animation-delay: -2s, -1s; } .leaf2 { background-image: url('https://api.placeholder.com/20x20'); top: -20px; left: 30%; animation-duration: 10s, 4s; animation-delay: -5s, -2s; } .leaf3 { background-image: url('https://api.placeholder.com/20x20'); top: -20px; left: 50%; animation-duration: 15s, 2.5s; animation-delay: -3s, -0.5s; } .leaf4 { background-image: url('https://api.placeholder.com/20x20'); top: -20px; left: 70%; animation-duration: 11s, 3.5s; animation-delay: -7s, -1.5s; } .leaf5 { background-image: url('https://api.placeholder.com/20x20'); top: -20px; left: 90%; animation-duration: 14s, 4.5s; animation-delay: -1s, -2.5s; } .tree { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 200px; height: 300px; background-image: url('https://api.placeholder.com/200x300'); background-size: contain; background-repeat: no-repeat; background-position: bottom center; } .ground { position: absolute; bottom: 0; width: 100%; height: 30%; background: linear-gradient(180deg, rgba(120,53,15,0) 0%, rgba(120,53,15,1) 100%); } @keyframes leafFall { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(calc(100vh + 20px)) rotate(360deg); } } @keyframes leafSway { 0% { transform: translateX(-15px); } 100% { transform: translateX(15px); } }",
        html: "<div class='autumn-container'><div class='leaf leaf1'></div><div class='leaf leaf2'></div><div class='leaf leaf3'></div><div class='leaf leaf4'></div><div class='leaf leaf5'></div><div class='tree'></div><div class='ground'></div></div>",
      },
    },
  },
  {
    id: 35,
    name: "Neon Glow",
    image: "https://example.com/neon-glow-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#d946ef",
      },
      bio_page: {
        css: ".neon-container { height: 100lvh; background-color: #0f0f1f; position: relative; overflow: hidden; } .neon-grid { position: absolute; width: 200%; height: 200%; background-image: linear-gradient(#ff00ea 1px, transparent 1px), linear-gradient(90deg, #ff00ea 1px, transparent 1px); background-size: 40px 40px; opacity: 0.3; transform: perspective(500px) rotateX(60deg); transform-origin: center top; animation: gridMove 15s linear infinite; } .horizon { position: absolute; bottom: 0; width: 100%; height: 30%; background: linear-gradient(0deg, #ff00ea 0%, rgba(255,0,234,0) 100%); opacity: 0.2; } .sun { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; background: radial-gradient(circle, #00fff2 0%, rgba(0,255,242,0) 70%); border-radius: 50%; filter: blur(10px); animation: sunPulse 4s ease-in-out infinite; } .neon-line { position: absolute; height: 2px; background: #00fff2; animation: neonLinePulse 2s ease-in-out infinite; } .line1 { width: 60%; top: 20%; left: 20%; } .line2 { width: 40%; top: 30%; left: 30%; animation-delay: -0.5s; } .line3 { width: 70%; top: 70%; left: 15%; animation-delay: -1s; } .line4 { width: 50%; top: 80%; left: 25%; animation-delay: -1.5s; } @keyframes gridMove { 0% { transform: perspective(500px) rotateX(60deg) translateY(0); } 100% { transform: perspective(500px) rotateX(60deg) translateY(40px); } } @keyframes sunPulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; } 50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; } } @keyframes neonLinePulse { 0%, 100% { opacity: 0.5; filter: blur(1px); box-shadow: 0 0 5px #00fff2, 0 0 10px #00fff2; } 50% { opacity: 1; filter: blur(2px); box-shadow: 0 0 10px #00fff2, 0 0 20px #00fff2, 0 0 30px #00fff2; } }",
        html: "<div class='neon-container'><div class='neon-grid'></div><div class='horizon'></div><div class='sun'></div><div class='neon-line line1'></div><div class='neon-line line2'></div><div class='neon-line line3'></div><div class='neon-line line4'></div></div>",
      },
    },
  },

  // Beautiful non-animated themes with static backgrounds
  {
    id: 36,
    name: "Tranquil Sunset",
    image: "https://example.com/tranquil-sunset-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#f59e0b",
      },
      bio_page: {
        css: ".sunset-container { height: 100lvh; position: relative; overflow: hidden; } .sunset-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #ff7e5f 0%, #feb47b 100%); } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%); } .silhouette { position: absolute; bottom: 0; width: 100%; height: 30%; background-image: url('https://api.placeholder.com/1920x300'); background-size: cover; background-position: center bottom; opacity: 0.7; }",
        html: "<div class='sunset-container'><div class='sunset-bg'></div><div class='overlay'></div><div class='silhouette'></div></div>",
      },
    },
  },
  {
    id: 37,
    name: "Minimal Bloom",
    image: "https://example.com/minimal-bloom-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#1e293b",
        button_color: "#ffffff",
      },
      bio_page: {
        css: ".minimal-container { height: 100lvh; background-color: #f8fafc; position: relative; overflow: hidden; } .bloom { position: absolute; width: 500px; height: 500px; border-radius: 50%; filter: blur(100px); opacity: 0.8; } .bloom1 { background-color: #f0abfc; top: -200px; right: -200px; } .bloom2 { background-color: #bae6fd; bottom: -200px; left: -200px; }",
        html: "<div class='minimal-container'><div class='bloom bloom1'></div><div class='bloom bloom2'></div></div>",
      },
    },
  },
  {
    id: 38,
    name: "Deep Forest",
    image: "https://example.com/deep-forest-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#047857",
      },
      bio_page: {
        css: ".forest-container { height: 100lvh; position: relative; overflow: hidden; } .forest-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Zm9yZXN0fHwwfHx8fDE2MTQwOTIxMzM&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(4,120,87,0.4) 0%, rgba(4,120,87,0.1) 100%); }",
        html: "<div class='forest-container'><div class='forest-bg'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 39,
    name: "Elegant Marble",
    image: "https://example.com/elegant-marble-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#1e293b",
        button_color: "#f8fafc",
      },
      bio_page: {
        css: ".marble-container { height: 100lvh; position: relative; overflow: hidden; } .marble-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFyYmxlfHwwfHx8fDE2MTQwOTIxNzM&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at center, rgba(255,255,255,0) 70%, rgba(220,220,220,0.5) 100%); }",
        html: "<div class='marble-container'><div class='marble-bg'></div><div class='vignette'></div></div>",
      },
    },
  },
  {
    id: 40,
    name: "Desert Calm",
    image: "https://example.com/desert-calm-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#1e293b",
        button_color: "#fef3c7",
      },
      bio_page: {
        css: ".desert-calm-container { height: 100lvh; position: relative; overflow: hidden; } .desert-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1547234935-80c7145ec969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FuZCUyMGR1bmVzfHwwfHx8fDE2MTQwOTIyMTA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(254,243,199,0.3) 0%, rgba(254,243,199,0) 100%); }",
        html: "<div class='desert-calm-container'><div class='desert-bg'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 41,
    name: "Abstract Art",
    image: "https://example.com/abstract-art-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#db2777",
      },
      bio_page: {
        css: ".abstract-container { height: 100lvh; position: relative; overflow: hidden; } .abstract-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YWJzdHJhY3QlMjBhcnR8fDB8fHx8MTYxNDA5MjI0Nw&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .color-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(219,39,119,0.2); }",
        html: "<div class='abstract-container'><div class='abstract-bg'></div><div class='color-overlay'></div></div>",
      },
    },
  },
  {
    id: 42,
    name: "Monochrome",
    image: "https://example.com/monochrome-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#262626",
      },
      bio_page: {
        css: ".monochrome-container { height: 100lvh; position: relative; overflow: hidden; } .monochrome-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1502230831726-fe5549140034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmxhY2slMjBhbmQlMjB3aGl0ZXx8MHx8fHwxNjE0MDkyMjgw&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; filter: grayscale(100%) contrast(120%); } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%); }",
        html: "<div class='monochrome-container'><div class='monochrome-bg'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 43,
    name: "Serene Ocean",
    image: "https://example.com/serene-ocean-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#0369a1",
      },
      bio_page: {
        css: ".ocean-calm-container { height: 100lvh; position: relative; overflow: hidden; } .ocean-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8b2NlYW58fDB8fHx8MTYxNDA4ODg3MA&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .blue-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(3,105,161,0.2); }",
        html: "<div class='ocean-calm-container'><div class='ocean-bg'></div><div class='blue-overlay'></div></div>",
      },
    },
  },
  {
    id: 44,
    name: "Mountain Vista",
    image: "https://example.com/mountain-vista-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#4b5563",
      },
      bio_page: {
        css: ".mountain-vista-container { height: 100lvh; position: relative; overflow: hidden; } .mountain-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW91bnRhaW4lMjB2aXN0YXx8MHx8fHwxNjE0MDkyMzQx&ixlib=rb-4.0.3&q=80&w=1080'); background-size: cover; background-position: center; } .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(75,85,99,0.4) 0%, rgba(75,85,99,0) 100%); }",
        html: "<div class='mountain-vista-container'><div class='mountain-bg'></div><div class='overlay'></div></div>",
      },
    },
  },
  {
    id: 45,
    name: "Galaxy Spin",
    image: "https://example.com/galaxy-spin-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#6d28d9",
      },
      bio_page: {
        css: `.galaxy-container {
            height: 100lvh;
            background: radial-gradient(circle, #1e1b4b 0%, #0f172a 100%);
            position: relative;
            overflow: hidden;
          }
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 2s infinite;
          }
          .galaxy {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(109, 40, 217, 0.5) 0%, rgba(109, 40, 217, 0) 70%);
            border-radius: 50%;
            animation: spin 20s linear infinite;
          }
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }`,
        html: `<div class="galaxy-container">
            <div class="galaxy"></div>
            <div class="star" style="top: 10%; left: 20%;"></div>
            <div class="star" style="top: 30%; left: 70%;"></div>
            <div class="star" style="top: 50%; left: 40%;"></div>
            <div class="star" style="top: 80%; left: 60%;"></div>
          </div>`,
      },
    },
  },
  {
    id: 46,
    name: "Neon Cityscape",
    image: "https://example.com/neon-cityscape-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#db2777",
      },
      bio_page: {
        css: `.cityscape-container {
            height: 100lvh;
            background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%);
            position: relative;
            overflow: hidden;
          }
          .building {
            position: absolute;
            bottom: 0;
            width: 100px;
            height: 300px;
            background: #1e293b;
            animation: glow 3s infinite alternate;
          }
          .building1 { left: 10%; height: 200px; animation-delay: -1s; }
          .building2 { left: 30%; height: 250px; animation-delay: -2s; }
          .building3 { left: 50%; height: 300px; animation-delay: -3s; }
          .building4 { left: 70%; height: 220px; animation-delay: -4s; }
          @keyframes glow {
            0% { box-shadow: 0 0 10px #db2777; }
            100% { box-shadow: 0 0 20px #db2777, 0 0 30px #db2777; }
          }`,
        html: `<div class="cityscape-container">
            <div class="building building1"></div>
            <div class="building building2"></div>
            <div class="building building3"></div>
            <div class="building building4"></div>
          </div>`,
      },
    },
  },

  // New static background themes
  {
    id: 47,
    name: "Golden Hour",
    image: "https://example.com/golden-hour-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#f59e0b",
      },
      bio_page: {
        css: `.golden-hour-container {
            height: 100lvh;
            background: linear-gradient(180deg, #f59e0b 0%, #f97316 100%);
            position: relative;
            overflow: hidden;
          }
          .sun {
            position: absolute;
            top: 10%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #ffd700 0%, rgba(255, 215, 0, 0) 70%);
            border-radius: 50%;
          }`,
        html: `<div class="golden-hour-container">
            <div class="sun"></div>
          </div>`,
      },
    },
  },
  {
    id: 48,
    name: "Pastel Dream",
    image: "https://example.com/pastel-dream-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#1e293b",
        button_color: "#f8fafc",
      },
      bio_page: {
        css: `.pastel-container {
            height: 100lvh;
            background: linear-gradient(135deg, #f0abfc 0%, #bae6fd 100%);
            position: relative;
            overflow: hidden;
          }`,
        html: `<div class="pastel-container"></div>`,
      },
    },
  },
  {
    id: 49,
    name: "Mystic Fog",
    image: "https://example.com/mystic-fog-thumbnail.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#4c1d95",
      },
      bio_page: {
        css: `.mystic-container {
            height: 100lvh;
            background: linear-gradient(180deg, #4c1d95 0%, #6d28d9 100%);
            position: relative;
            overflow: hidden;
          }
          .fog {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
          }`,
        html: `<div class="mystic-container">
            <div class="fog"></div>
          </div>`,
      },
    },
  },
  {
    id: 50,
    name: "Elegant Gold",
    image: "https://back-dev-project.linkatik.com/storage/552/gold-elegant.svg",
    settings: {
      bio_link: {
        type: "outline",
        text_color: "#d4af37",
        button_color: "#ffffff",
        border_color: "#d4af37",
        border_width: "2",
        border_radius: "5",
        border_style: "solid",
        border_shadow_blur: "10",
        border_shadow_color: "rgba(212, 175, 55, 0.3)",
        border_shadow_spread: "0",
      },
      bio_page: {
        css: ".background { height: 100lvh; background-color: #1a1a1a; position: relative; overflow: hidden; } .luxury-pattern { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(circle, rgba(212, 175, 55, 0.1) 1px, transparent 1px); background-size: 20px 20px; } .gold-accent { position: absolute; width: 100%; height: 100px; background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.2), transparent); transform: skewY(-5deg); top: 20%; }",
        html: "<div class='background'><div class='luxury-pattern'></div><div class='gold-accent'></div></div>",
        font: "Playfair Display, serif",
        font_size: "18",
      },
    },
  },
  {
    id: 51,
    name: "Marble Luxury",
    image: "https://back-dev-project.linkatik.com/storage/553/marble-luxury.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#3a3a3a",
        border_radius: "8",
        border_shadow_blur: "15",
        border_shadow_color: "rgba(0, 0, 0, 0.2)",
        border_shadow_spread: "0",
        border_shadow_offset_y: "4",
      },
      bio_page: {
        css: ".background { height: 100lvh; background-color: #f5f5f5; position: relative; overflow: hidden; } .marble { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4='); } .accent-line { position: absolute; width: 80%; height: 2px; background: linear-gradient(to right, transparent, #3a3a3a, transparent); left: 10%; top: 50%; }",
        html: "<div class='background'><div class='marble'></div><div class='accent-line'></div></div>",
        font: "Montserrat, sans-serif",
        font_size: "16",
      },
    },
  },
  {
    id: 52,
    name: "Saudi Founding Day",
    image: "https://back-dev-project.linkatik.com/storage/554/saudi-founding.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "#006c35",
        border_radius: "5",
        border_shadow_blur: "10",
        border_shadow_color: "rgba(0, 108, 53, 0.3)",
        border_shadow_spread: "0",
      },
      bio_page: {
        css: ".background { height: 100lvh; background-color: #f8f8f8; position: relative; overflow: hidden; } .saudi-green { position: absolute; top: 0; left: 0; width: 100%; height: 40%; background-color: #006c35; } .palm-tree { position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); width: 120px; height: 200px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMDA2YzM1IiBkPSJNMjU2LDUxMiAyNDYsNDUwQzI0Niw0MDAgMjQ2LDM1MCAxODAsMzUwQzE1MCwzNTAgMTUwLDMwMCAyMDAsMzAwQzE1MCwzMDAgMTQwLDI1MCAxODAsMjUwQzE0MCwyNTAgMTMwLDIwMCAxODAsMjAwQzE0MCwyMDAgMTMwLDE1MCAxNjAsMTUwQzEyMCwxNTAgMTIwLDEwMCAxODAsODBDMTQwLDgwIDE0MCw1MCAyMjAsNTBDMjU2LDUwIDMwMCw1MCAzMzIsODBDMzcyLDUwIDM5Miw4MCAzNzIsMTAwQzQxMiwxMDAgNDMyLDE1MCAzOTIsMTUwQzQzMiwxNTAgNDQyLDE5MCA0MTIsMjAwQzQ1MiwyMDAgNDYyLDI1MCA0MjIsMjUwQzQ2MiwyNTAgNDcyLDMwMCA0MzIsMzAwQzQ1MiwzMDAgNDUyLDM1MCAzMzIsMzUwQzI2NiwzNTAgMjY2LDQwMCAyNjYsNDUwTDI1Niw1MTJaIi8+PC9zdmc+'); background-size: contain; background-repeat: no-repeat; } .saudi-emblem { position: absolute; top: 15%; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZjhmOGY4IiBkPSJNMjU2LDUwIEMzNjQuOCw1MCA0NTIsMTM3LjIgNDUyLDI0NiBDNDUyLDM1NC44IDM2NC44LDQ0MiAyNTYsNDQyIEMxNDcuMiw0NDIgNjAsMzU0LjggNjAsMjQ2IEM2MCwxMzcuMiAxNDcuMiw1MCAyNTYsNTAgWiIvPjxwYXRoIGZpbGw9IiMwMDZjMzUiIGQ9Ik0zNDIsMjQ2IEwzNDIsMjA2IEwzMDIsMjA2IEwzMDIsMTY2IEwyMTAsMTY2IEwyMTAsMjA2IEwxNzAsMjA2IEwxNzAsMjQ2IEwxNzAsMjg2IEwyMTAsMjg2IEwyMTAsMzI2IEwzMDIsMzI2IEwzMDIsMjg2IEwzNDIsMjg2IEwzNDIsMjQ2IFoiLz48cGF0aCBmaWxsPSIjZjhmOGY4IiBkPSJNMjIwLDE3NiBMMjkyLDE3NiBMMjkyLDMxNiBMMjIwLDMxNiBMMjIwLDE3NiBaIi8+PHBhdGggZmlsbD0iIzAwNmMzNSIgZD0iTTI1NiwyMTYgQzI2OS4yNTQ4MzQsMjE2IDI4MCwyMjYuNzQ1MTY2IDI4MCwyNDAgQzI4MCwyNTMuMjU0ODM0IDI2OS4yNTQ4MzQsMjY0IDI1NiwyNjQgQzI0Mi43NDUxNjYsMjY0IDIzMiwyNTMuMjU0ODM0IDIzMiwyNDAgQzIzMiwyMjYuNzQ1MTY2IDI0Mi43NDUxNjYsMjE2IDI1NiwyMTYgWiIvPjwvc3ZnPg=='); background-size: contain; background-repeat: no-repeat; } .founding-date { position: absolute; top: 35%; left: 50%; transform: translateX(-50%); font-family: 'Amiri', serif; font-size: 24px; color: #ffffff; text-align: center; } .decorative-pattern { position: absolute; bottom: 0; left: 0; width: 100%; height: 60%; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHBhdGggZD0iTTEyLjUgMTIuNWwyNSAyNW0wLTI1bC0yNSAyNSIgc3Ryb2tlPSIjMDA2YzM1IiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+'); }",
        html: "<div class='background'><div class='saudi-green'></div><div class='decorative-pattern'></div><div class='saudi-emblem'></div><div class='founding-date'>يوم التأسيس - ١٧٩٤ م</div><div class='palm-tree'></div></div>",
        font: "Tajawal, sans-serif",
        font_size: "18",
      },
    },
  },
  {
    id: 53,
    name: "Crystalline",
    image: "https://back-dev-project.linkatik.com/storage/555/crystalline.svg",
    settings: {
      bio_link: {
        type: "filled",
        text_color: "#ffffff",
        button_color: "rgba(255, 255, 255, 0.1)",
        border_color: "rgba(255, 255, 255, 0.2)",
        border_width: "1",
        border_radius: "10",
        border_style: "solid",
        backdrop_filter: "blur(10px)",
      },
      bio_page: {
        css: ".background { height: 100lvh; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); position: relative; overflow: hidden; } .crystal { position: absolute; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1); transform: rotate(45deg); } .crystal1 { width: 200px; height: 200px; top: -50px; left: -50px; } .crystal2 { width: 300px; height: 300px; bottom: -100px; right: -100px; } .shine { position: absolute; width: 100%; height: 100%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent); animation: shine 3s infinite; } @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }",
        html: "<div class='background'><div class='crystal crystal1'><div class='shine'></div></div><div class='crystal crystal2'><div class='shine'></div></div></div>",
        font: "Roboto, sans-serif",
        font_size: "16",
      },
    },
  },
]
