;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-liebiao-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M94.785 220.22h-55.637c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h55.637c15.379 0 27.756 12.419 27.756 27.779 0 15.379-12.378 27.859-27.756 27.859v0zM984.989 220.22h-667.652c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h667.652c15.276 0 27.756 12.419 27.756 27.779 0 15.379-12.482 27.859-27.756 27.859v0zM94.785 554.048h-55.637c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h55.637c15.379 0 27.756 12.419 27.756 27.779 0 15.379-12.378 27.859-27.756 27.859v0zM984.989 554.048h-667.652c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h667.652c15.276 0 27.756 12.419 27.756 27.779 0 15.379-12.482 27.859-27.756 27.859v0zM94.785 887.875h-55.637c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h55.637c15.379 0 27.756 12.419 27.756 27.779 0 15.379-12.378 27.859-27.756 27.859v0zM984.989 887.875h-667.652c-15.379 0-27.883-12.482-27.883-27.859 0-15.359 12.503-27.779 27.883-27.779h667.652c15.276 0 27.756 12.419 27.756 27.779 0 15.379-12.482 27.859-27.756 27.859v0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M691.881 249.91c-122.036-122.092-319.94-122.092-442.033 0s-122.093 319.997 0 442.033c56.558 56.574 134.7 91.567 221.017 91.567 86.316 0 164.458-34.994 221.016-91.567 56.575-56.558 91.568-134.701 91.568-221.017 0-86.316-34.994-164.458-91.567-221.016zM181.8 759.992c-74.010-73.991-119.787-176.22-119.787-289.14 0-225.802 183.050-408.852 408.852-408.852 225.803 0 408.852 183.050 408.852 408.852 0 112.92-45.778 215.149-119.787 289.139-73.985 73.966-176.183 119.713-289.065 119.713-112.883 0-215.080-45.747-289.065-119.713zM945.517 945.579c-10.099 10.115-24.058 16.372-39.48 16.372s-29.381-6.257-39.479-16.371l-78.903-78.959c-10.097-10.097-16.342-24.045-16.342-39.452 0-30.814 24.98-55.792 55.792-55.792 15.406 0 29.355 6.245 39.452 16.341l78.958 78.903c10.142 10.087 16.418 24.050 16.418 39.479s-6.277 29.393-16.416 39.477z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)