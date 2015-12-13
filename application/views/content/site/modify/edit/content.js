/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $ball = $('#ball');
  if (!$ball.length) return;
  var ball = $ball.get (0);
  var $move = $('#move');

  $(window).resize (function () {
    var d = Math.min ($(window).width (), $(window).height ());
    $ball.css ({
      width: $(window).width () >= d * 1.25 ? d * 1.25 : d,
      height: d
    });
  }).resize ();

  ball.viewer = new ThetaViewer (ball, function (position) {
    ball.viewer.position = {
      x: position.x,
      y: position.y,
      z: position.z,
    };
  }, $ball.data ('position'), $ball.data ('color'), 1, {
      max: 388,
    });
  // ball.viewer.autoRotate = true;
  ball.viewer.images = [$ball.data ('url')];
  ball.viewer.load (function () {
    if (!($ball.data ('cover') && $ball.data ('cover').length))
      uploadCover ($ball.data ('token'), $ball.find ('canvas').get (0).toDataURL ());
  });
  ball.viewer.position = $ball.data ('position');
  
  $move.bind ('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).hide (); });
  setTimeout (function () { $move.hide (); }, 3500);

  $('#cover').click (function () {
    $(this).prop ('disabled', true).text ('設定中..');

    uploadCoverPosition (
      $ball.data ('token'),
      $ball.find ('canvas').get (0).toDataURL (),
      ball.viewer.position,
      function (result) {
        $(this).text ($(this).attr ('title')).prop ('disabled', false);
        $move.text (result.message).attr ('class', result.status ? 'icon-info-outline' : 'icon-warning').show ();
      }.bind ($(this)));
  });

  $('#visibled').change (function () {
    $(this).prop ('disabled', true).nextAll ('div').text ('設定中..');

    uploadVisibled (
      $(this).data ('token'),
      $(this).prop ('checked') === true,
      function (result) {
        $(this).prop ('disabled', false);
        if (result.content)
          $(this).nextAll ('div').text (result.content);
    }.bind ($(this)));
  });
});