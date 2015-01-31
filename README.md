# Minecraft Skin Converter

Client side JabaScript library for converting Minecraft 1.7 skins to Minecraft 1.8 skins.

## Usage

Include the conversion code in your page.

    <script src="lib/convert.js"></script>

Then load and convert your images.

    skinConverter.convert(originalSkin, function(error, convertedSkin){
      // convertedSkin is the 64x64 version of the skin
    });

See **demon/index.html** for a full example.

## License

Freely distributable under the terms of the [MIT license](https://github.com/kevanstannard/minecraft-skin-converter/blob/master/LICENSE).


