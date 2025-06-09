import { type AnimationName } from './animations.js'

export type AnimationMeta = {
  name: AnimationName
  delay?: number
  onTop?: boolean
}

export type Preset = {
  exit: AnimationMeta
  enter: AnimationMeta
}

export type PresetId =
  | 'none'
  | 'fall'
  | 'newspaper'
  | 'moveToLeftFromRight'
  | 'moveToRightFromLeft'
  | 'moveToTopFromBottom'
  | 'moveToBottomFromTop'
  | 'slideOverToLeftFromRight'
  | 'slideOverToRightFromLeft'
  | 'slideOverToTopFromBottom'
  | 'slideOverToBottomFromTop'
  | 'slide'
  | 'moveSmoothToLeftFromRight'
  | 'moveSmoothToRightFromLeft'
  | 'moveSmoothToTopFromBottom'
  | 'moveSmoothToBottomFromTop'
  | 'roomToLeft'
  | 'roomToRight'
  | 'roomToTop'
  | 'roomToBottom'
  | 'fadeFromRight'
  | 'fadeFromLeft'
  | 'fadeFromBottom'
  | 'fadeFromTop'
  | 'fadeLeftFadeRight'
  | 'fadeRightFadeLeft'
  | 'fadeTopFadeBottom'
  | 'fadeBottomFadeTop'
  | 'scaleDownFromRight'
  | 'scaleDownFromLeft'
  | 'scaleDownFromBottom'
  | 'scaleDownFromTop'
  | 'scaleDownScaleDown'
  | 'scaleUpScaleUp'
  | 'scaleDownScaleUp'
  | 'moveToLeftScaleUp'
  | 'moveToRightScaleUp'
  | 'moveToTopScaleUp'
  | 'moveToBottomScaleUp'
  | 'glueLeftFromRight'
  | 'glueRightFromLeft'
  | 'glueBottomFromTop'
  | 'glueTopFromBottom'
  | 'foldLeftFromRight'
  | 'foldRightFromLeft'
  | 'foldTopFromBottom'
  | 'foldBottomFromTop'
  | 'moveToRightUnfoldLeft'
  | 'moveToLeftUnfoldRight'
  | 'moveToBottomUnfoldTop'
  | 'moveToTopUnfoldBottom'
  | 'pushLeftFromRight'
  | 'pushRightFromLeft'
  | 'pushTopFromBottom'
  | 'pushBottomFromTop'
  | 'cubeToLeft'
  | 'cubeToRight'
  | 'cubeToTop'
  | 'cubeToBottom'
  | 'carouselToLeft'
  | 'carouselToRight'
  | 'carouselToTop'
  | 'carouselToBottom'
  | 'pushLeftPullRight'
  | 'pushRightPullLeft'
  | 'pushTopPullBottom'
  | 'pushBottomPullTop'
  | 'flipRight'
  | 'flipLeft'
  | 'flipTop'
  | 'flipBottom'
  | 'sides'

export const presets: { [presetId in PresetId]: Preset } = {
  fall: { exit: { name: 'rotateFall', onTop: true }, enter: { name: 'scaleUp' } },
  newspaper: { exit: { name: 'rotateOutNewspaper' }, enter: { name: 'rotateInNewspaper', delay: 500 } },
  moveToLeftFromRight: { exit: { name: 'moveToLeft' }, enter: { name: 'moveFromRight', onTop: true } },
  moveToRightFromLeft: { exit: { name: 'moveToRight' }, enter: { name: 'moveFromLeft', onTop: true } },
  moveToTopFromBottom: { exit: { name: 'moveToTop' }, enter: { name: 'moveFromBottom', onTop: true } },
  moveToBottomFromTop: { exit: { name: 'moveToBottom' }, enter: { name: 'moveFromTop', onTop: true } },
  slideOverToLeftFromRight: { exit: { name: 'none' }, enter: { name: 'moveFromRight', onTop: true } },
  slideOverToRightFromLeft: { exit: { name: 'none' }, enter: { name: 'moveFromLeft', onTop: true } },
  slideOverToTopFromBottom: { exit: { name: 'none' }, enter: { name: 'moveFromBottom', onTop: true } },
  slideOverToBottomFromTop: { exit: { name: 'none' }, enter: { name: 'moveFromTop', onTop: true } },
  slide: { exit: { name: 'rotateSlideOut' }, enter: { name: 'rotateSlideIn' } },
  moveSmoothToLeftFromRight: { exit: { name: 'moveSmoothToLeft' }, enter: { name: 'moveSmoothFromRight' } },
  moveSmoothToRightFromLeft: { exit: { name: 'moveSmoothToRight' }, enter: { name: 'moveSmoothFromLeft' } },
  moveSmoothToTopFromBottom: { exit: { name: 'moveSmoothToTop' }, enter: { name: 'moveSmoothFromBottom' } },
  moveSmoothToBottomFromTop: { exit: { name: 'moveSmoothToBottom' }, enter: { name: 'moveSmoothFromTop' } },
  roomToLeft: { exit: { name: 'rotateRoomLeftOut' }, enter: { name: 'rotateRoomLeftIn' } },
  roomToRight: { exit: { name: 'rotateRoomRightOut' }, enter: { name: 'rotateRoomRightIn' } },
  roomToTop: { exit: { name: 'rotateRoomTopOut' }, enter: { name: 'rotateRoomTopIn' } },
  roomToBottom: { exit: { name: 'rotateRoomBottomOut' }, enter: { name: 'rotateRoomBottomIn' } },
  fadeFromRight: { exit: { name: 'fade' }, enter: { name: 'moveFromRight', onTop: true } },
  fadeFromLeft: { exit: { name: 'fade' }, enter: { name: 'moveFromLeft', onTop: true } },
  fadeFromBottom: { exit: { name: 'fade' }, enter: { name: 'moveFromBottom', onTop: true } },
  fadeFromTop: { exit: { name: 'fade' }, enter: { name: 'moveFromTop', onTop: true } },
  fadeLeftFadeRight: { exit: { name: 'moveToLeftFade' }, enter: { name: 'moveFromRightFade' } },
  fadeRightFadeLeft: { exit: { name: 'moveToRightFade' }, enter: { name: 'moveFromLeftFade' } },
  fadeTopFadeBottom: { exit: { name: 'moveToTopFade' }, enter: { name: 'moveFromBottomFade' } },
  fadeBottomFadeTop: { exit: { name: 'moveToBottomFade' }, enter: { name: 'moveFromTopFade' } },
  scaleDownFromRight: { exit: { name: 'scaleDown' }, enter: { name: 'moveFromRight', onTop: true } },
  scaleDownFromLeft: { exit: { name: 'scaleDown' }, enter: { name: 'moveFromLeft', onTop: true } },
  scaleDownFromBottom: { exit: { name: 'scaleDown' }, enter: { name: 'moveFromBottom', onTop: true } },
  scaleDownFromTop: { exit: { name: 'scaleDown' }, enter: { name: 'moveFromTop', onTop: true } },
  scaleDownScaleDown: { exit: { name: 'scaleDown' }, enter: { name: 'scaleUpDown', delay: 300 } },
  scaleUpScaleUp: { exit: { name: 'scaleDownUp' }, enter: { name: 'scaleUp', delay: 300 } },
  scaleDownScaleUp: { exit: { name: 'scaleDownCenter' }, enter: { name: 'scaleUpCenter', delay: 400 } },
  moveToLeftScaleUp: { exit: { name: 'moveToLeft', onTop: true }, enter: { name: 'scaleUp' } },
  moveToRightScaleUp: { exit: { name: 'moveToRight', onTop: true }, enter: { name: 'scaleUp' } },
  moveToTopScaleUp: { exit: { name: 'moveToTop', onTop: true }, enter: { name: 'scaleUp' } },
  moveToBottomScaleUp: { exit: { name: 'moveToBottom', onTop: true }, enter: { name: 'scaleUp' } },
  glueLeftFromRight: { exit: { name: 'rotateRightSideFirst' }, enter: { name: 'moveFromRight', delay: 200, onTop: true } },
  glueRightFromLeft: { exit: { name: 'rotateLeftSideFirst' }, enter: { name: 'moveFromLeft', delay: 200, onTop: true } },
  glueBottomFromTop: { exit: { name: 'rotateTopSideFirst' }, enter: { name: 'moveFromTop', delay: 200, onTop: true } },
  glueTopFromBottom: { exit: { name: 'rotateBottomSideFirst' }, enter: { name: 'moveFromBottom', delay: 200, onTop: true } },
  foldLeftFromRight: { exit: { name: 'rotateFoldLeft' }, enter: { name: 'moveFromRightFade' } },
  foldRightFromLeft: { exit: { name: 'rotateFoldRight' }, enter: { name: 'moveFromLeftFade' } },
  foldTopFromBottom: { exit: { name: 'rotateFoldTop' }, enter: { name: 'moveFromBottomFade' } },
  foldBottomFromTop: { exit: { name: 'rotateFoldBottom' }, enter: { name: 'moveFromTopFade' } },
  moveToRightUnfoldLeft: { exit: { name: 'moveToRightFade' }, enter: { name: 'rotateUnfoldLeft' } },
  moveToLeftUnfoldRight: { exit: { name: 'moveToLeftFade' }, enter: { name: 'rotateUnfoldRight' } },
  moveToBottomUnfoldTop: { exit: { name: 'moveToBottomFade' }, enter: { name: 'rotateUnfoldTop' } },
  moveToTopUnfoldBottom: { exit: { name: 'moveToTopFade' }, enter: { name: 'rotateUnfoldBottom' } },
  pushLeftFromRight: { exit: { name: 'rotatePushLeft' }, enter: { name: 'moveFromRight', onTop: true } },
  pushRightFromLeft: { exit: { name: 'rotatePushRight' }, enter: { name: 'moveFromLeft', onTop: true } },
  pushTopFromBottom: { exit: { name: 'rotatePushTop' }, enter: { name: 'moveFromBottom', onTop: true } },
  pushBottomFromTop: { exit: { name: 'rotatePushBottom' }, enter: { name: 'moveFromTop', onTop: true } },
  cubeToLeft: { exit: { name: 'rotateCubeLeftOut' }, enter: { name: 'rotateCubeLeftIn' } },
  cubeToRight: { exit: { name: 'rotateCubeRightOut' }, enter: { name: 'rotateCubeRightIn' } },
  cubeToTop: { exit: { name: 'rotateCubeTopOut' }, enter: { name: 'rotateCubeTopIn' } },
  cubeToBottom: { exit: { name: 'rotateCubeBottomOut' }, enter: { name: 'rotateCubeBottomIn' } },
  carouselToLeft: { exit: { name: 'rotateCarouselLeftOut' }, enter: { name: 'rotateCarouselLeftIn' } },
  carouselToRight: { exit: { name: 'rotateCarouselRightOut' }, enter: { name: 'rotateCarouselRightIn' } },
  carouselToTop: { exit: { name: 'rotateCarouselTopOut' }, enter: { name: 'rotateCarouselTopIn' } },
  carouselToBottom: { exit: { name: 'rotateCarouselBottomOut' }, enter: { name: 'rotateCarouselBottomIn' } },
  pushLeftPullRight: { exit: { name: 'rotatePushLeft' }, enter: { name: 'rotatePullRight', delay: 180 } },
  pushRightPullLeft: { exit: { name: 'rotatePushRight' }, enter: { name: 'rotatePullLeft', delay: 180 } },
  pushTopPullBottom: { exit: { name: 'rotatePushTop' }, enter: { name: 'rotatePullBottom', delay: 180 } },
  pushBottomPullTop: { exit: { name: 'rotatePushBottom' }, enter: { name: 'rotatePullTop', delay: 180 } },
  flipRight: { exit: { name: 'flipOutRight' }, enter: { name: 'flipInLeft', delay: 500 } },
  flipLeft: { exit: { name: 'flipOutLeft' }, enter: { name: 'flipInRight', delay: 500 } },
  flipTop: { exit: { name: 'flipOutTop' }, enter: { name: 'flipInBottom', delay: 500 } },
  flipBottom: { exit: { name: 'flipOutBottom' }, enter: { name: 'flipInTop', delay: 500 } },
  sides: { exit: { name: 'rotateSidesOut' }, enter: { name: 'rotateSidesIn', delay: 200 } },
  none: { exit: { name: 'none' }, enter: { name: 'none' } },
}

export const presetsInfo: {
  [presetId in PresetId]: { group: string; label: string }
} = {
  fall: { label: 'Fall', group: 'Fun' },
  newspaper: { label: 'Newspaper', group: 'Fun' },
  moveToLeftFromRight: { label: 'Move to left (from right)', group: 'Slide' },
  moveToRightFromLeft: { label: 'Move to right (from left)', group: 'Slide' },
  moveToTopFromBottom: { label: 'Move to top (from bottom)', group: 'Slide' },
  moveToBottomFromTop: { label: 'Move to bottom (from top)', group: 'Slide' },
  slideOverToLeftFromRight: { label: 'Slide over to left (from right)', group: 'Slide' },
  slideOverToRightFromLeft: { label: 'Slide over to right (from left)', group: 'Slide' },
  slideOverToTopFromBottom: { label: 'Slide over to top (from bottom)', group: 'Slide' },
  slideOverToBottomFromTop: { label: 'Slide over to bottom (from top)', group: 'Slide' },
  slide: { label: 'Slide', group: 'Slide' },
  moveSmoothToLeftFromRight: { label: 'Move Smooth to left (from right)', group: 'Slide' },
  moveSmoothToRightFromLeft: { label: 'Move Smooth to right (from left)', group: 'Slide' },
  moveSmoothToTopFromBottom: { label: 'Move Smooth to top (from bottom)', group: 'Slide' },
  moveSmoothToBottomFromTop: { label: 'Move Smooth to bottom (from top)', group: 'Slide' },
  roomToLeft: { label: 'Room to left', group: 'Slide' },
  roomToRight: { label: 'Room to right', group: 'Slide' },
  roomToTop: { label: 'Room to top', group: 'Slide' },
  roomToBottom: { label: 'Room to bottom', group: 'Slide' },
  fadeFromRight: { label: 'Fade (from right)', group: 'Fade' },
  fadeFromLeft: { label: 'Fade (from left)', group: 'Fade' },
  fadeFromBottom: { label: 'Fade (from bottom)', group: 'Fade' },
  fadeFromTop: { label: 'Fade (from top)', group: 'Fade' },
  fadeLeftFadeRight: { label: 'Fade left / Fade right', group: 'Fade' },
  fadeRightFadeLeft: { label: 'Fade right / Fade left', group: 'Fade' },
  fadeTopFadeBottom: { label: 'Fade top / Fade bottom', group: 'Fade' },
  fadeBottomFadeTop: { label: 'Fade bottom / Fade top', group: 'Fade' },
  scaleDownFromRight: { label: 'Scale down (from right)', group: 'Scale' },
  scaleDownFromLeft: { label: 'Scale down (from left)', group: 'Scale' },
  scaleDownFromBottom: { label: 'Scale down (from bottom)', group: 'Scale' },
  scaleDownFromTop: { label: 'Scale down (from top)', group: 'Scale' },
  scaleDownScaleDown: { label: 'Scale down / scale down', group: 'Scale' },
  scaleUpScaleUp: { label: 'Scale up / scale up', group: 'Scale' },
  scaleDownScaleUp: { label: 'Scale down / scale up', group: 'Scale' },
  moveToLeftScaleUp: { label: 'Move to left / scale up', group: 'Scale' },
  moveToRightScaleUp: { label: 'Move to right / scale up', group: 'Scale' },
  moveToTopScaleUp: { label: 'Move to top / scale up', group: 'Scale' },
  moveToBottomScaleUp: { label: 'Move to bottom / scale up', group: 'Scale' },
  glueLeftFromRight: { label: 'Glue left (from right)', group: 'Fold' },
  glueRightFromLeft: { label: 'Glue right (from left)', group: 'Fold' },
  glueBottomFromTop: { label: 'Glue bottom (from top)', group: 'Fold' },
  glueTopFromBottom: { label: 'Glue top (from bottom)', group: 'Fold' },
  foldLeftFromRight: { label: 'Fold left (from right)', group: 'Fold' },
  foldRightFromLeft: { label: 'Fold right (from left)', group: 'Fold' },
  foldTopFromBottom: { label: 'Fold top (from bottom)', group: 'Fold' },
  foldBottomFromTop: { label: 'Fold bottom (from top)', group: 'Fold' },
  moveToRightUnfoldLeft: { label: 'Move to right / unfold left', group: 'Fold' },
  moveToLeftUnfoldRight: { label: 'Move to left / unfold right', group: 'Fold' },
  moveToBottomUnfoldTop: { label: 'Move to bottom / unfold top', group: 'Fold' },
  moveToTopUnfoldBottom: { label: 'Move to top / unfold bottom', group: 'Fold' },
  pushLeftFromRight: { label: 'Push left (from right)', group: 'Fold' },
  pushRightFromLeft: { label: 'Push right (from left)', group: 'Fold' },
  pushTopFromBottom: { label: 'Push top (from bottom)', group: 'Fold' },
  pushBottomFromTop: { label: 'Push bottom (from top)', group: 'Fold' },
  cubeToLeft: { label: 'Cube to left', group: 'Cube' },
  cubeToRight: { label: 'Cube to right', group: 'Cube' },
  cubeToTop: { label: 'Cube to top', group: 'Cube' },
  cubeToBottom: { label: 'Cube to bottom', group: 'Cube' },
  carouselToLeft: { label: 'Carousel to left', group: 'Cube' },
  carouselToRight: { label: 'Carousel to right', group: 'Cube' },
  carouselToTop: { label: 'Carousel to top', group: 'Cube' },
  carouselToBottom: { label: 'Carousel to bottom', group: 'Cube' },
  pushLeftPullRight: { label: 'Push left / pull right', group: 'Flip' },
  pushRightPullLeft: { label: 'Push right / pull left', group: 'Flip' },
  pushTopPullBottom: { label: 'Push top / pull bottom', group: 'Flip' },
  pushBottomPullTop: { label: 'Push bottom / pull top', group: 'Flip' },
  flipRight: { label: 'Flip right', group: 'Flip' },
  flipLeft: { label: 'Flip left', group: 'Flip' },
  flipTop: { label: 'Flip top', group: 'Flip' },
  flipBottom: { label: 'Flip bottom', group: 'Flip' },
  sides: { label: 'Sides', group: 'Flip' },
  none: { label: 'None', group: 'None' },
}
