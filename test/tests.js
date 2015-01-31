;(function(){
  
  
  describe('Convert Tests', function(){
    
    it('should return undefined if the argument is not an image', function(done){
      skinConverter.convert(null, function(error, image) {
        assert.isDefined(error);
        assert.isUndefined(image);
        done();
      });
    });
    
    it('should return undefined for images with incorrect dimensions', function(done){
      skinConverter.convert(images.steveFace, function(error, image) {
        assert.isDefined(error);
        assert.isUndefined(image);
        done();
      });
    });
    
    it('should return an image for images with correct dimensions', function(done){
      skinConverter.convert(images.steve64x32, function(error, image) {
        assert.isNull(error);
        assert.isTrue( isImage(image) );
        done();
      });
    });
    
    it('should correctly convert a 64x32 skin', function(done){
      
      skinConverter.convert(images.steve64x32, function(error, image) {

        var convertedCanvas = document.createElement('canvas');
        convertedCanvas.width = image.width;
        convertedCanvas.height = image.height;

        var expectedCanvas = document.createElement('canvas');
        expectedCanvas.width = images.steve64x64.width;
        expectedCanvas.height = images.steve64x64.height;

        var convertedDataURL = convertedCanvas.toDataURL('image/png');
        var expectedDataURL = expectedCanvas.toDataURL('image/png');

        var convertedContext = convertedCanvas.getContext('2d', {alpha:true});
        var expectedContext = expectedCanvas.getContext('2d', {alpha:true});
        
        convertedContext.drawImage(image, 0, 0);
        expectedContext.drawImage(images.steve64x64, 0, 0);
        
        var convertedDataURL = convertedCanvas.toDataURL('image/png');
        var expectedDataURL = expectedCanvas.toDataURL('image/png');
        
        assert.equal(expectedDataURL, convertedDataURL);
        
        done();
        
      });
      
    });
    

    it('should correctly convert a 128x64 skin', function(done){
      
      skinConverter.convert(images.steve128x64, function(error, image) {

        var convertedCanvas = document.createElement('canvas');
        convertedCanvas.width = image.width;
        convertedCanvas.height = image.height;

        var expectedCanvas = document.createElement('canvas');
        expectedCanvas.width = images.steve128x128.width;
        expectedCanvas.height = images.steve128x128.height;

        var convertedDataURL = convertedCanvas.toDataURL('image/png');
        var expectedDataURL = expectedCanvas.toDataURL('image/png');

        var convertedContext = convertedCanvas.getContext('2d', {alpha:true});
        var expectedContext = expectedCanvas.getContext('2d', {alpha:true});
        
        convertedContext.drawImage(image, 0, 0);
        expectedContext.drawImage(images.steve128x128, 0, 0);
        
        var convertedDataURL = convertedCanvas.toDataURL('image/png');
        var expectedDataURL = expectedCanvas.toDataURL('image/png');
        
        assert.equal(expectedDataURL, convertedDataURL);
        
        done();
        
      });
      
    });
    

  });
  

  /////////////////////////////////////////////////////////////////////////////
  
  var images;
  
  function isImage(o) {
    return o instanceof HTMLImageElement;
  }
  
  function makeImage() {
    return document.createElement('img');
  }
  
  function loadImages(cb) {
    
    var paths = [
      {id:'steve64x32',src:'../images/steve-64x32.png'},
      {id:'steve64x64',src:'../images/steve-64x64.png'},
      {id:'steve128x64',src:'../images/steve-128x64.png'},
      {id:'steve128x128',src:'../images/steve-128x128.png'},
      {id:'steveFace',src:'../images/steve-face.png'},
    ];
    
    var cache = {};
    var loadedCount = 0;
    
    var done = function() {
      loadedCount++;
      if (loadedCount === paths.length) {
        cb(cache);
      }
    }
    
    for (var i=0; i<paths.length; i++) {
      (function(path){
        var img = document.createElement('img');
        img.onload = function() {
          done();
        };
        img.src = path.src;
        cache[path.id] = img;
      })(paths[i])
    }

  }

  loadImages(function(theImages){
    images = theImages;
    mocha.run();
  });
  
})();

