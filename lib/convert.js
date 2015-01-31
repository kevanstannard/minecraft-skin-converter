;(function(){
  
  function isImage(o) {
    return o instanceof HTMLImageElement;
  }
  
  function isValidSourceDimension(w, h) {
    return w % 64 === 0 && w === (h * 2);
  }
  
  function makeImage() {
    return document.createElement('img');
  }
  
  function makeCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }
  
  function copy(sc, dc, sx, sy, sw, sh, dx, dy, dw, dh, f) {
    dc.drawImage(sc, sx*f, sy*f, sw*f, sh*f, dx*f, dy*f, dw*f, dh*f);
  }
  
  function convert(source, callback) {
    
    if (!source) {
      return callback( new Error('Source image not provided') );
    }
    
    // Ensure the source is an image
    if (!isImage(source)) {
      return callback( new Error('Source image is not an image') );
    }
    
    // Extract the source image width and height;
    var sw = source.width || 0;
    var sh = source.height || 0;
    
    // Ensure the source has a 2:1 ratio for width:height
    if (!isValidSourceDimension(sw, sh)) {
      return callback( new Error('Source source dimensions are not valid') );
    }
    
    // The destination image will be a square with the same
    // dimensions as the source width;
    var dw = sw;
    var dh = sw;
    
    // Create the canvas and context
    var sCanvas = makeCanvas(sw, sh);
    var sContext = sCanvas.getContext('2d', {alpha:true});
    var dCanvas = makeCanvas(dw, dh);
    var dContext = dCanvas.getContext('2d', {alpha:true});
    
    // Draw the source image onto the top left corner of the source canvas
    sContext.drawImage(source, 0, 0);
    
    // Also draw the source image onto the top left corner of the destination canvas
    dContext.drawImage(source, 0, 0);
    
    // Determine the multiplication factor for when the source image
    // is a multiple of 64 pixels;
    var f = sw / 64;
    
    // Save the current transformation state of the destination canvas
    dContext.save();
    
    // Flip the destination canvas horizontally
    // so when we draw the new parts they will be flipped
    dContext.translate(dw, 0);
    dContext.scale(-1, 1);
    
    // Copying: Leg
    copy(sCanvas, dContext, 0,  20, 4, 12, 36, 52, 4, 12, f); // Right
    copy(sCanvas, dContext, 4,  20, 4, 12, 40, 52, 4, 12, f); // Front
    copy(sCanvas, dContext, 8,  20, 4, 12, 44, 52, 4, 12, f); // Left
    copy(sCanvas, dContext, 12, 20, 4, 12, 32, 52, 4, 12, f); // Back
    copy(sCanvas, dContext, 4,  16, 4, 4,  40, 48, 4, 4,  f); // Top
    copy(sCanvas, dContext, 8,  16, 4, 4,  36, 48, 4, 4,  f); // Bottom
    
    // Copying: Arm
    copy(sCanvas, dContext, 40, 20, 4, 12, 20, 52, 4, 12, f); // Right
    copy(sCanvas, dContext, 44, 20, 4, 12, 24, 52, 4, 12, f); // Front
    copy(sCanvas, dContext, 48, 20, 4, 12, 28, 52, 4, 12, f); // Left
    copy(sCanvas, dContext, 52, 20, 4, 12, 16, 52, 4, 12, f); // Back
    copy(sCanvas, dContext, 44, 16, 4, 4,  24, 48, 4, 4,  f); // Top
    copy(sCanvas, dContext, 48, 16, 4, 4,  20, 48, 4, 4,  f); // Bottom
    
    // Return the destination back to it's original unflipped state
    dContext.restore();
    
    var dataURL = dCanvas.toDataURL('image/png');
    var image = makeImage();
    image.onload = function() {
      callback(null, image);
    };
    image.src = dataURL;

  };
  
  var skinConverter = {
      convert: convert
  };

  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
      define([], function () {
          return skinConverter;
      });
  }
  // included directly via <script> tag
  else {
      window.skinConverter = skinConverter;
  }

})();

