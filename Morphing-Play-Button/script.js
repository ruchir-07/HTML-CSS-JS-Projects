var $triangleTweenTarget = $('#triangle-tween-target');
var $playTriangle = $('#play-triangle');
MorphSVGPlugin.convertToPath($triangleTweenTarget);
MorphSVGPlugin.convertToPath($playTriangle);



var clicked = false;
// In the next line, .progress(1).pause(0) is a tip from @greensock to force processing of morphs immediately
var morph = TweenMax.to('#play-triangle', 0.5, 
                        { morphSVG: $triangleTweenTarget,
                          scale: 5,
                          transformOrigin: "center center"
                        }).progress(1).pause(0);
var $pbContainer = $('#play-button-container');
var $buttonCircleSvg = $('#button-circle-svg');
var $buttonCircle = $('#button-circle');
var $playTriangleSvg = $('#play-triangle-svg');
$pbContainer.on('click', function(){
  if(!clicked){
    clicked =true;
    TweenMax.to($buttonCircleSvg, 0.2, {scale: getScale(), opacity: 0.8});
    TweenMax.to($buttonCircle, 0.5, {fill: '#333333'});
    morph.play();
    TweenMax.to($playTriangleSvg, 0.5, 
                { width: $(window).width(), 
                  height: $(window).height(),
                  x: -1 * $pbContainer.offset().left,
                  y: -1 * $pbContainer.offset().top,
                  onStart: playVideo,
                  onComplete: moveVideo
                });
    
  } else {
    clicked = false;
    TweenMax.to($buttonCircleSvg, 0.5, {scale: 1});
    morph.reverse();
    TweenMax.to($buttonCircle, 0.5, {fill: '#DDDDDD'});
    TweenMax.to($playTriangleSvg, 0.5, 
                { width: $pbContainer.width(), 
                  height: $pbContainer.height(),
                  x: 0,
                  y: 0,
                  scale: 1,
                  onStart: stopVideo
                });
  }
  
  
  //get the minimum scale for the play button to cover the screen
  function getScale() {
    let buttonPosition = 
        { x: $playTriangleSvg.offset().left + ($playTriangleSvg.width()/2),
          y: $playTriangleSvg.offset().top + ($playTriangleSvg.height()/2)
        };
    
    let $window = $(window);
    let farthestCorner = 
        { x: (buttonPosition.x > $window.width() / 2) ? 0 : $window.width(),
          y: (buttonPosition.y > $window.height() / 2) ? 0 : $window.height()
        };
    
    let a = Math.abs(buttonPosition.x - farthestCorner.x);
    let b = Math.abs(buttonPosition.y - farthestCorner.y);
    let hypotenuse = Math.sqrt(a*a + b*b);
    
    return hypotenuse / ($playTriangleSvg.width() / 2);
  }
  
  
  
  function playVideo() {
    player.playVideo();
  }
  
  
  
  var $youtubeVideo = $('#youtube-video');
  var $playTriangle = $('#play-triangle');
  function moveVideo() {   
    let pbcOffset = $pbContainer.offset();  
    let boundingBox = $playTriangle[0].getBoundingClientRect();
    TweenMax.set($youtubeVideo, 
                 { x: boundingBox.left - pbcOffset.left, 
                   y: boundingBox.top - pbcOffset.top,
                   width: boundingBox.width,
                   height: boundingBox.height});
    showVideo();
    
  }
  
  
  
  function showVideo() {    
    TweenMax.to($youtubeVideo, 0.3, {opacity: 1});
    $youtubeVideo.addClass('-visible');
  }
  
  
  
  function stopVideo() {    
    player.stopVideo();
    $youtubeVideo.removeClass('-visible');
    TweenMax.to($youtubeVideo, 0, {opacity: 0});
  }
  
  
  
});


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-video');  
}