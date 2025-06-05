export type Animation = {
  keyframes: string
  duration: number
  timing: string
  fill: string
  delay?: string
  origin?: string
  onTop?: boolean
}

export type AnimationName =
  | 'moveToLeft'
  | 'moveFromLeft'
  | 'moveToRight'
  | 'moveFromRight'
  | 'moveToTop'
  | 'moveFromTop'
  | 'moveToBottom'
  | 'moveFromBottom'
  | 'fade'
  | 'moveToLeftFade'
  | 'moveFromLeftFade'
  | 'moveToRightFade'
  | 'moveFromRightFade'
  | 'moveToTopFade'
  | 'moveFromTopFade'
  | 'moveToBottomFade'
  | 'moveFromBottomFade'
  | 'scaleDown'
  | 'scaleUp'
  | 'scaleUpDown'
  | 'scaleDownUp'
  | 'scaleDownCenter'
  | 'scaleUpCenter'
  | 'rotateRightSideFirst'
  | 'rotateLeftSideFirst'
  | 'rotateTopSideFirst'
  | 'rotateBottomSideFirst'
  | 'rotateSlideIn'
  | 'rotateSlideOut'
  | 'flipOutRight'
  | 'flipInLeft'
  | 'flipOutLeft'
  | 'flipInRight'
  | 'flipOutTop'
  | 'flipInBottom'
  | 'flipOutBottom'
  | 'flipInTop'
  | 'rotateFall'
  | 'rotateOutNewspaper'
  | 'rotateInNewspaper'
  | 'rotatePushLeft'
  | 'rotatePushRight'
  | 'rotatePushTop'
  | 'rotatePushBottom'
  | 'rotatePullRight'
  | 'rotatePullLeft'
  | 'rotatePullBottom'
  | 'rotatePullTop'
  | 'rotateFoldLeft'
  | 'rotateFoldRight'
  | 'rotateFoldTop'
  | 'rotateFoldBottom'
  | 'rotateUnfoldLeft'
  | 'rotateUnfoldRight'
  | 'rotateUnfoldTop'
  | 'rotateUnfoldBottom'
  | 'rotateRoomLeftOut'
  | 'rotateRoomLeftIn'
  | 'rotateRoomRightOut'
  | 'rotateRoomRightIn'
  | 'rotateRoomTopOut'
  | 'rotateRoomTopIn'
  | 'rotateRoomBottomOut'
  | 'rotateRoomBottomIn'
  | 'rotateCubeLeftOut'
  | 'rotateCubeLeftIn'
  | 'rotateCubeRightOut'
  | 'rotateCubeRightIn'
  | 'rotateCubeTopOut'
  | 'rotateCubeTopIn'
  | 'rotateCubeBottomOut'
  | 'rotateCubeBottomIn'
  | 'rotateCarouselLeftOut'
  | 'rotateCarouselLeftIn'
  | 'rotateCarouselRightOut'
  | 'rotateCarouselRightIn'
  | 'rotateCarouselTopOut'
  | 'rotateCarouselTopIn'
  | 'rotateCarouselBottomOut'
  | 'rotateCarouselBottomIn'
  | 'rotateSidesOut'
  | 'rotateSidesIn'

export const animations: { [key in AnimationName]: Animation } = {
  moveToLeft: {
    keyframes: `
      from { }
      to { transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveFromLeft: {
    keyframes: `
      from {  transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveToRight: {
    keyframes: `
      from { }
      to { transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveFromRight: {
    keyframes: `
      from { transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveToTop: {
    keyframes: `
      from { }
      to { transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveFromTop: {
    keyframes: `
      from { transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveToBottom: {
    keyframes: `
      from { }
      to { transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveFromBottom: {
    keyframes: `
      from { transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  fade: {
    keyframes: `
      from { }
      to { opacity: 0.3; }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveToLeftFade: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveFromLeftFade: {
    keyframes: `
      from { opacity: 0.3;  transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveToRightFade: {
    keyframes: `
      from { }
      to { opacity: 0.3;  transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveFromRightFade: {
    keyframes: `
      from { opacity: 0.3; transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveToTopFade: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveFromTopFade: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveToBottomFade: {
    keyframes: `
      from { }
      to { opacity: 0.3;  transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  moveFromBottomFade: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  scaleDown: {
    keyframes: `
      from { }
      to { opacity: 0; transform: scale(0.8); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  scaleUp: {
    keyframes: `
	    from { opacity: 0;  transform: scale(0.8); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
  },
  scaleUpDown: {
    keyframes: `
      from { opacity: 0; transform: scale(1.2); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
  },
  scaleDownUp: {
    keyframes: `
	    from { }
	    to { opacity: 0; transform: scale(1.2); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
  },
  scaleDownCenter: {
    keyframes: `
      from { }
      to { opacity: 0; transform: scale(0.7); }
    `,
    duration: 400,
    timing: 'ease',
    fill: 'both',
  },
  scaleUpCenter: {
    keyframes: `
      from { opacity: 0;  transform: scale(0.7); }
    `,
    duration: 400,
    timing: 'ease',
    fill: 'both',
  },
  rotateRightSideFirst: {
    keyframes: `
      0% { }
      40% { transform: rotateY(15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateLeftSideFirst: {
    keyframes: `
      0% { }
      40% { transform: rotateY(-15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateTopSideFirst: {
    keyframes: `
      0% { }
      40% { transform: rotateX(15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateBottomSideFirst: {
    keyframes: `
      0% { }
      40% { transform: rotateX(-15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% {transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  flipOutRight: {
    keyframes: `
      from { }
      to { transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%',
  },
  flipInLeft: {
    keyframes: `
      from { transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%',
  },
  flipOutLeft: {
    keyframes: `
      from { }
      to { transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%',
  },
  flipInRight: {
    keyframes: `
      from { transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%',
  },
  flipOutTop: {
    keyframes: `
      from { }
      to { transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%',
  },
  flipInBottom: {
    keyframes: `
      from { transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%',
  },
  flipOutBottom: {
    keyframes: `
      from { }
      to { transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%',
  },
  flipInTop: {
    keyframes: `
      from { transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%',
  },
  rotateFall: {
    keyframes: `
      0% { transform: rotateZ(0deg); }
      20% { transform: rotateZ(10deg); animation-timing-function: ease-out; }
      40% { transform: rotateZ(17deg); }
      60% { transform: rotateZ(16deg); }
      100% { transform: translateY(100%) rotateZ(17deg); }
    `,
    duration: 1000,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 0%',
  },
  rotateOutNewspaper: {
    keyframes: `
      from { }
      to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%',
  },
  rotateInNewspaper: {
    keyframes: `
      from { transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%',
  },
  rotatePushLeft: {
    keyframes: `
      from { }
      to { opacity: 0; transform: rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotatePushRight: {
    keyframes: `
      from { }
      to { opacity: 0; transform: rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotatePushTop: {
    keyframes: `
      from { }
      to { opacity: 0; transform: rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotatePushBottom: {
    keyframes: `
      from { }
      to { opacity: 0; transform: rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotatePullRight: {
    keyframes: `
      from { opacity: 0; transform: rotateY(-90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotatePullLeft: {
    keyframes: `
      from { opacity: 0; transform: rotateY(90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotatePullTop: {
    keyframes: `
      from { opacity: 0; transform: rotateX(-90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotatePullBottom: {
    keyframes: `
      from { opacity: 0; transform: rotateX(90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateFoldRight: {
    keyframes: `
      from { }
      to { opacity: 0; transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateFoldLeft: {
    keyframes: `
      from { }
      to { opacity: 0; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateFoldTop: {
    keyframes: `
      from { }
      to { opacity: 0; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateFoldBottom: {
    keyframes: `
      from { }
      to { opacity: 0; transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateUnfoldLeft: {
    keyframes: `
      from { opacity: 0; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateUnfoldRight: {
    keyframes: `
      from { opacity: 0;  transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateUnfoldTop: {
    keyframes: `
      from { opacity: 0; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateUnfoldBottom: {
    keyframes: `
      from { opacity: 0; transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateRoomLeftOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateRoomLeftIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateRoomRightOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateRoomRightIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateRoomTopOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateRoomTopIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateRoomBottomOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateRoomBottomIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateCubeLeftOut: {
    keyframes: `
      0% { }
      50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
      100% { opacity: 0.3; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateCubeLeftIn: {
    keyframes: `
      0% { opacity: 0.3; transform: translateX(100%) rotateY(90deg); }
      50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateCubeRightOut: {
    keyframes: `
      0% { }
      50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
      100% { opacity: 0.3; transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateCubeRightIn: {
    keyframes: `
      0% { opacity: 0.3; transform: translateX(-100%) rotateY(-90deg); }
      50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateCubeTopOut: {
    keyframes: `
      0% {}
      50% { animation-timing-function: ease-out; transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
      100% { opacity: 0.3; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateCubeTopIn: {
    keyframes: `
      0% { opacity: 0.3; transform: translateY(100%) rotateX(-90deg); }
      50% { animation-timing-function: ease-out; transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateCubeBottomOut: {
    keyframes: `
      0% { }
      50% { animation-timing-function: ease-out; transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
      100% { opacity: 0.3; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateCubeBottomIn: {
    keyframes: `
      0% { opacity: 0.3; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
      50% { animation-timing-function: ease-out; transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateCarouselLeftOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateX(-150%) scale(0.4) rotateY(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateCarouselLeftIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateX(200%) scale(0.4) rotateY(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateCarouselRightOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateX(200%) scale(0.4) rotateY(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%',
  },
  rotateCarouselRightIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateX(-200%) scale(0.4) rotateY(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%',
  },
  rotateCarouselTopOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateY(-200%) scale(0.4) rotateX(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateCarouselTopIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(200%) scale(0.4) rotateX(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateCarouselBottomOut: {
    keyframes: `
      from { }
      to { opacity: 0.3; transform: translateY(200%) scale(0.4) rotateX(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%',
  },
  rotateCarouselBottomIn: {
    keyframes: `
      from { opacity: 0.3; transform: translateY(-200%) scale(0.4) rotateX(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%',
  },
  rotateSidesOut: {
    keyframes: `
      from { }
      to { opacity: 0; transform: translateZ(-500px) rotateY(90deg); }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '-50% 50%',
  },
  rotateSidesIn: {
    keyframes: `
      from { opacity: 0; transform: translateZ(-500px) rotateY(-90deg); }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '150% 50%',
  },
  rotateSlideOut: {
    keyframes: `
      0% { }
      25% { opacity: 0.5; transform: translateZ(-500px); }
      75% { opacity: 0.5; transform: translateZ(-500px) translateX(-200%); }
      100% { opacity: 0.5; transform: translateZ(-500px) translateX(-200%); }
    `,
    duration: 1000,
    timing: 'ease',
    fill: 'both',
  },
  rotateSlideIn: {
    keyframes: `
      0%, 25% { opacity: 0.5; transform: translateZ(-500px) translateX(200%); }
      75% { opacity: 0.5; transform: translateZ(-500px); }
      100% { opacity: 1; transform: translateZ(0) translateX(0); }
    `,
    duration: 1000,
    timing: 'ease',
    fill: 'both',
  },
}
