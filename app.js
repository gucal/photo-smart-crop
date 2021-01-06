var processed = {},
  options = {
    debug: true,
    width: 250,
    height: 250,
  };

  let crops = []
let currentCrop = 0

let nextCrop = () => { 
  var img = $("#photo")
  console.log(`${currentCrop}. crop`)
  console.log(img[0])
  let crop = crops[currentCrop];
  var  canvas = $('<canvas>')[0],
  ctx = canvas.getContext('2d');
  canvas.width = options.width;
  canvas.height = options.height;
  console.log(img[0], crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img[0], crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
  img
    .after(canvas)
  //   .after(result.debugCanvas);
    currentCrop++;  
}

$("#next").click(nextCrop)

  
$("#format").click(function(){
$('img').each(function() {
  $(this).load(function() {
    window.setTimeout(function() {
      var img = this;
      console.log(img)
      if (processed[img.src]) return;
      processed[img.src] = true;
      SmartCrop.crop(img, options, function(result) {
        crops = result.crops
        console.log(result);
        var crop = result.topCrop,
          canvas = $('<canvas>')[0],
          ctx = canvas.getContext('2d');
        canvas.width = options.width;
        canvas.height = options.height;
        console.log(crop.x, crop.y);
        ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
        $(img)
          .after(canvas)
          .after(result.debugCanvas);
      });
    }.bind(this), 100);
  });
  if (this.complete)
    $(this).load();
});
})