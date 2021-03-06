# Minecraft Skin Converter

Client side JavaScript library for converting Minecraft 1.7 skins 
to Minecraft 1.8 skins.

## Usage

Include the conversion code in your page.

    <script src="lib/convert.js"></script>

Then load and convert your images.

    skinConverter.convert(originalSkin, function(error, convertedSkin){
      // originalSkin is the 64x32 version of the skin
      // convertedSkin is the 64x64 version of the skin
    });

See **demo/index.html** for a full example.

## Notes

* Supports AMD/Require.js
* Supports different resolution skin files (64x32, 128x64, 256x128, etc.) 

## License

Freely distributable under the terms of the 
[MIT license](https://github.com/kevanstannard/minecraft-skin-converter/blob/master/LICENSE).


