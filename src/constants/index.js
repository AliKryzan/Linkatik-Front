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
        button_color: "#0f172a",
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
]
