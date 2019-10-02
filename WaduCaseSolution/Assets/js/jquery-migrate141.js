"undefined" ==
  /*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
  typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
  (function(a, b, c) {
    function d(c) {
      var d = b.console;
      f[c] ||
        ((f[c] = !0),
        a.migrateWarnings.push(c),
        d &&
          d.warn &&
          !a.migrateMute &&
          (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()));
    }
    function e(b, c, e, f) {
      if (Object.defineProperty)
        try {
          return void Object.defineProperty(b, c, {
            configurable: !0,
            enumerable: !0,
            get: function() {
              return d(f), e;
            },
            set: function(a) {
              d(f), (e = a);
            }
          });
        } catch (g) {}
      (a._definePropertyBroken = !0), (b[c] = e);
    }
    a.migrateVersion = "1.4.1";
    var f = {};
    (a.migrateWarnings = []),
      b.console &&
        b.console.log &&
        b.console.log(
          "JQMIGRATE: Migrate is installed" +
            (a.migrateMute ? "" : " with logging active") +
            ", version " +
            a.migrateVersion
        ),
      a.migrateTrace === c && (a.migrateTrace = !0),
      (a.migrateReset = function() {
        (f = {}), (a.migrateWarnings.length = 0);
      }),
      "BackCompat" === document.compatMode &&
        d("jQuery is not compatible with Quirks Mode");
    var g = a("<input/>", { size: 1 }).attr("size") && a.attrFn,
      h = a.attr,
      i =
        (a.attrHooks.value && a.attrHooks.value.get) ||
        function() {
          return null;
        },
      j =
        (a.attrHooks.value && a.attrHooks.value.set) ||
        function() {
          return c;
        },
      k = /^(?:input|button)$/i,
      l = /^[238]$/,
      m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      n = /^(?:checked|selected)$/i;
    e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"),
      (a.attr = function(b, e, f, i) {
        var j = e.toLowerCase(),
          o = b && b.nodeType;
        return i &&
          (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"),
          b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e])))
          ? a(b)[e](f)
          : ("type" === e &&
              f !== c &&
              k.test(b.nodeName) &&
              b.parentNode &&
              d("Can't change the 'type' of an input or button in IE 6/7/8"),
            !a.attrHooks[j] &&
              m.test(j) &&
              ((a.attrHooks[j] = {
                get: function(b, d) {
                  var e,
                    f = a.prop(b, d);
                  return f === !0 ||
                    ("boolean" != typeof f &&
                      (e = b.getAttributeNode(d)) &&
                      e.nodeValue !== !1)
                    ? d.toLowerCase()
                    : c;
                },
                set: function(b, c, d) {
                  var e;
                  return (
                    c === !1
                      ? a.removeAttr(b, d)
                      : ((e = a.propFix[d] || d),
                        e in b && (b[e] = !0),
                        b.setAttribute(d, d.toLowerCase())),
                    d
                  );
                }
              }),
              n.test(j) &&
                d(
                  "jQuery.fn.attr('" +
                    j +
                    "') might use property instead of attribute"
                )),
            h.call(a, b, e, f));
      }),
      (a.attrHooks.value = {
        get: function(a, b) {
          var c = (a.nodeName || "").toLowerCase();
          return "button" === c
            ? i.apply(this, arguments)
            : ("input" !== c &&
                "option" !== c &&
                d("jQuery.fn.attr('value') no longer gets properties"),
              b in a ? a.value : null);
        },
        set: function(a, b) {
          var c = (a.nodeName || "").toLowerCase();
          return "button" === c
            ? j.apply(this, arguments)
            : ("input" !== c &&
                "option" !== c &&
                d("jQuery.fn.attr('value', val) no longer sets properties"),
              void (a.value = b));
        }
      });
    var o,
      p,
      q = a.fn.init,
      r = a.find,
      s = a.parseJSON,
      t = /^\s*</,
      u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
      v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
      w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    (a.fn.init = function(b, e, f) {
      var g, h;
      return b &&
        "string" == typeof b &&
        !a.isPlainObject(e) &&
        (g = w.exec(a.trim(b))) &&
        g[0] &&
        (t.test(b) || d("$(html) HTML strings must start with '<' character"),
        g[3] && d("$(html) HTML text after last tag is ignored"),
        "#" === g[0].charAt(0) &&
          (d("HTML string cannot start with a '#' character"),
          a.error("JQMIGRATE: Invalid selector string (XSS)")),
        e && e.context && e.context.nodeType && (e = e.context),
        a.parseHTML)
        ? q.call(
            this,
            a.parseHTML(g[2], (e && e.ownerDocument) || e || document, !0),
            e,
            f
          )
        : ((h = q.apply(this, arguments)),
          b && b.selector !== c
            ? ((h.selector = b.selector), (h.context = b.context))
            : ((h.selector = "string" == typeof b ? b : ""),
              b && (h.context = b.nodeType ? b : e || document)),
          h);
    }),
      (a.fn.init.prototype = a.fn),
      (a.find = function(a) {
        var b = Array.prototype.slice.call(arguments);
        if ("string" == typeof a && u.test(a))
          try {
            document.querySelector(a);
          } catch (c) {
            a = a.replace(v, function(a, b, c, d) {
              return "[" + b + c + '"' + d + '"]';
            });
            try {
              document.querySelector(a),
                d("Attribute selector with '#' must be quoted: " + b[0]),
                (b[0] = a);
            } catch (e) {
              d("Attribute selector with '#' was not fixed: " + b[0]);
            }
          }
        return r.apply(this, b);
      });
    var x;
    for (x in r)
      Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
    (a.parseJSON = function(a) {
      return a
        ? s.apply(this, arguments)
        : (d("jQuery.parseJSON requires a valid JSON string"), null);
    }),
      (a.uaMatch = function(a) {
        a = a.toLowerCase();
        var b =
          /(chrome)[ \/]([\w.]+)/.exec(a) ||
          /(webkit)[ \/]([\w.]+)/.exec(a) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) ||
          /(msie) ([\w.]+)/.exec(a) ||
          (a.indexOf("compatible") < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)) ||
          [];
        return { browser: b[1] || "", version: b[2] || "0" };
      }),
      a.browser ||
        ((o = a.uaMatch(navigator.userAgent)),
        (p = {}),
        o.browser && ((p[o.browser] = !0), (p.version = o.version)),
        p.chrome ? (p.webkit = !0) : p.webkit && (p.safari = !0),
        (a.browser = p)),
      e(a, "browser", a.browser, "jQuery.browser is deprecated"),
      (a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode),
      e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"),
      e(
        a.support,
        "boxModel",
        a.support.boxModel,
        "jQuery.support.boxModel is deprecated"
      ),
      (a.sub = function() {
        function b(a, c) {
          return new b.fn.init(a, c);
        }
        a.extend(!0, b, this),
          (b.superclass = this),
          (b.fn = b.prototype = this()),
          (b.fn.constructor = b),
          (b.sub = this.sub),
          (b.fn.init = function(d, e) {
            var f = a.fn.init.call(this, d, e, c);
            return f instanceof b ? f : b(f);
          }),
          (b.fn.init.prototype = b.fn);
        var c = b(document);
        return d("jQuery.sub() is deprecated"), b;
      }),
      (a.fn.size = function() {
        return (
          d("jQuery.fn.size() is deprecated; use the .length property"),
          this.length
        );
      });
    var y = !1;
    a.swap &&
      a.each(["height", "width", "reliableMarginRight"], function(b, c) {
        var d = a.cssHooks[c] && a.cssHooks[c].get;
        d &&
          (a.cssHooks[c].get = function() {
            var a;
            return (y = !0), (a = d.apply(this, arguments)), (y = !1), a;
          });
      }),
      (a.swap = function(a, b, c, e) {
        var f,
          g,
          h = {};
        y || d("jQuery.swap() is undocumented and deprecated");
        for (g in b) (h[g] = a.style[g]), (a.style[g] = b[g]);
        f = c.apply(a, e || []);
        for (g in b) a.style[g] = h[g];
        return f;
      }),
      a.ajaxSetup({ converters: { "text json": a.parseJSON } });
    var z = a.fn.data;
    a.fn.data = function(b) {
      var e,
        f,
        g = this[0];
      return !g ||
        "events" !== b ||
        1 !== arguments.length ||
        ((e = a.data(g, b)),
        (f = a._data(g, b)),
        (e !== c && e !== f) || f === c)
        ? z.apply(this, arguments)
        : (d("Use of jQuery.fn.data('events') is deprecated"), f);
    };
    var A = /\/(java|ecma)script/i;
    a.clean ||
      (a.clean = function(b, c, e, f) {
        (c = c || document),
          (c = (!c.nodeType && c[0]) || c),
          (c = c.ownerDocument || c),
          d("jQuery.clean() is deprecated");
        var g,
          h,
          i,
          j,
          k = [];
        if ((a.merge(k, a.buildFragment(b, c).childNodes), e))
          for (
            i = function(a) {
              return !a.type || A.test(a.type)
                ? f
                  ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a)
                  : e.appendChild(a)
                : void 0;
            },
              g = 0;
            null != (h = k[g]);
            g++
          )
            (a.nodeName(h, "script") && i(h)) ||
              (e.appendChild(h),
              "undefined" != typeof h.getElementsByTagName &&
                ((j = a.grep(a.merge([], h.getElementsByTagName("script")), i)),
                k.splice.apply(k, [g + 1, 0].concat(j)),
                (g += j.length)));
        return k;
      });
    var B = a.event.add,
      C = a.event.remove,
      D = a.event.trigger,
      E = a.fn.toggle,
      F = a.fn.live,
      G = a.fn.die,
      H = a.fn.load,
      I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
      J = new RegExp("\\b(?:" + I + ")\\b"),
      K = /(?:^|\s)hover(\.\S+|)\b/,
      L = function(b) {
        return "string" != typeof b || a.event.special.hover
          ? b
          : (K.test(b) &&
              d(
                "'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"
              ),
            b && b.replace(K, "mouseenter$1 mouseleave$1"));
      };
    a.event.props &&
      "attrChange" !== a.event.props[0] &&
      a.event.props.unshift(
        "attrChange",
        "attrName",
        "relatedNode",
        "srcElement"
      ),
      a.event.dispatch &&
        e(
          a.event,
          "handle",
          a.event.dispatch,
          "jQuery.event.handle is undocumented and deprecated"
        ),
      (a.event.add = function(a, b, c, e, f) {
        a !== document &&
          J.test(b) &&
          d("AJAX events should be attached to document: " + b),
          B.call(this, a, L(b || ""), c, e, f);
      }),
      (a.event.remove = function(a, b, c, d, e) {
        C.call(this, a, L(b) || "", c, d, e);
      }),
      a.each(["load", "unload", "error"], function(b, c) {
        a.fn[c] = function() {
          var a = Array.prototype.slice.call(arguments, 0);
          return "load" === c && "string" == typeof a[0]
            ? H.apply(this, a)
            : (d("jQuery.fn." + c + "() is deprecated"),
              a.splice(0, 0, c),
              arguments.length
                ? this.bind.apply(this, a)
                : (this.triggerHandler.apply(this, a), this));
        };
      }),
      (a.fn.toggle = function(b, c) {
        if (!a.isFunction(b) || !a.isFunction(c))
          return E.apply(this, arguments);
        d("jQuery.fn.toggle(handler, handler...) is deprecated");
        var e = arguments,
          f = b.guid || a.guid++,
          g = 0,
          h = function(c) {
            var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
            return (
              a._data(this, "lastToggle" + b.guid, d + 1),
              c.preventDefault(),
              e[d].apply(this, arguments) || !1
            );
          };
        for (h.guid = f; g < e.length; ) e[g++].guid = f;
        return this.click(h);
      }),
      (a.fn.live = function(b, c, e) {
        return (
          d("jQuery.fn.live() is deprecated"),
          F
            ? F.apply(this, arguments)
            : (a(this.context).on(b, this.selector, c, e), this)
        );
      }),
      (a.fn.die = function(b, c) {
        return (
          d("jQuery.fn.die() is deprecated"),
          G
            ? G.apply(this, arguments)
            : (a(this.context).off(b, this.selector || "**", c), this)
        );
      }),
      (a.event.trigger = function(a, b, c, e) {
        return (
          c || J.test(a) || d("Global events are undocumented and deprecated"),
          D.call(this, a, b, c || document, e)
        );
      }),
      a.each(I.split("|"), function(b, c) {
        a.event.special[c] = {
          setup: function() {
            var b = this;
            return (
              b !== document &&
                (a.event.add(document, c + "." + a.guid, function() {
                  a.event.trigger(
                    c,
                    Array.prototype.slice.call(arguments, 1),
                    b,
                    !0
                  );
                }),
                a._data(this, c, a.guid++)),
              !1
            );
          },
          teardown: function() {
            return (
              this !== document &&
                a.event.remove(document, c + "." + a._data(this, c)),
              !1
            );
          }
        };
      }),
      (a.event.special.ready = {
        setup: function() {
          this === document && d("'ready' event is deprecated");
        }
      });
    var M = a.fn.andSelf || a.fn.addBack,
      N = a.fn.find;
    if (
      ((a.fn.andSelf = function() {
        return (
          d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
          M.apply(this, arguments)
        );
      }),
      (a.fn.find = function(a) {
        var b = N.apply(this, arguments);
        return (
          (b.context = this.context),
          (b.selector = this.selector ? this.selector + " " + a : a),
          b
        );
      }),
      a.Callbacks)
    ) {
      var O = a.Deferred,
        P = [
          [
            "resolve",
            "done",
            a.Callbacks("once memory"),
            a.Callbacks("once memory"),
            "resolved"
          ],
          [
            "reject",
            "fail",
            a.Callbacks("once memory"),
            a.Callbacks("once memory"),
            "rejected"
          ],
          ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]
        ];
      a.Deferred = function(b) {
        var c = O(),
          e = c.promise();
        return (
          (c.pipe = e.pipe = function() {
            var b = arguments;
            return (
              d("deferred.pipe() is deprecated"),
              a
                .Deferred(function(d) {
                  a.each(P, function(f, g) {
                    var h = a.isFunction(b[f]) && b[f];
                    c[g[1]](function() {
                      var b = h && h.apply(this, arguments);
                      b && a.isFunction(b.promise)
                        ? b
                            .promise()
                            .done(d.resolve)
                            .fail(d.reject)
                            .progress(d.notify)
                        : d[g[0] + "With"](
                            this === e ? d.promise() : this,
                            h ? [b] : arguments
                          );
                    });
                  }),
                    (b = null);
                })
                .promise()
            );
          }),
          (c.isResolved = function() {
            return (
              d("deferred.isResolved is deprecated"), "resolved" === c.state()
            );
          }),
          (c.isRejected = function() {
            return (
              d("deferred.isRejected is deprecated"), "rejected" === c.state()
            );
          }),
          b && b.call(c, c),
          c
        );
      };
    }
  })(jQuery, window);
!(function(y, O, i, e) {
  var n,
    I,
    a,
    s,
    l,
    o,
    r,
    c,
    u,
    h,
    t,
    g,
    f = "mPageScroll2id",
    x = "mPS2id",
    d = {
      scrollSpeed: 1e3,
      autoScrollSpeed: !0,
      scrollEasing: "easeInOutQuint",
      scrollingEasing: "easeOutQuint",
      pageEndSmoothScroll: !0,
      layout: "vertical",
      offset: 0,
      highlightSelector: !1,
      clickedClass: x + "-clicked",
      targetClass: x + "-target",
      highlightClass: x + "-highlight",
      forceSingleHighlight: !1,
      keepHighlightUntilNext: !1,
      highlightByNextTarget: !1,
      disablePluginBelow: !1,
      clickEvents: !0,
      appendHash: !1,
      onStart: function() {},
      onComplete: function() {},
      defaultSelector: !1,
      live: !0,
      liveSelector: !1
    },
    p = 0,
    _ = {
      init: function(e) {
        e = y.extend(!0, {}, d, e);
        if ((y(i).data(x, e), (I = y(i).data(x)), !this.selector)) {
          var t = "__" + x;
          this.each(function() {
            var e = y(this);
            e.hasClass(t) || e.addClass(t);
          }),
            (this.selector = "." + t);
        }
        I.liveSelector && (this.selector += "," + I.liveSelector),
          (n = n ? n + "," + this.selector : this.selector),
          I.defaultSelector &&
            (("object" == typeof y(n) && 0 !== y(n).length) ||
              (n =
                ".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id")),
          I.clickEvents &&
            y(i)
              .undelegate("." + x)
              .delegate(n, "click." + x, function(e) {
                if (m._isDisabled.call(null)) m._removeClasses.call(null);
                else {
                  var t = y(this),
                    n = t.attr("href"),
                    a = t.prop("href").baseVal || t.prop("href");
                  (n && -1 !== n.indexOf("#/")) ||
                    (m._reset.call(null),
                    (h = t.data("ps2id-offset") || 0),
                    m._isValid.call(null, n, a) &&
                      m._findTarget.call(null, n) &&
                      (e.preventDefault(),
                      (s = "selector"),
                      (l = t),
                      m._setClasses.call(null, !0),
                      m._scrollTo.call(null)));
                }
              }),
          y(O)
            .unbind("." + x)
            .bind("scroll." + x + " resize." + x, function() {
              if (m._isDisabled.call(null)) m._removeClasses.call(null);
              else {
                var s = y("._" + x + "-t");
                s.each(function(e) {
                  var t = y(this),
                    n = t.attr("id"),
                    a = m._findHighlight.call(null, n);
                  m._setClasses.call(null, !1, t, a),
                    e == s.length - 1 && m._extendClasses.call(null);
                });
              }
            }),
          (a = !0),
          m._setup.call(null),
          m._live.call(null);
      },
      scrollTo: function(e, t) {
        if (m._isDisabled.call(null)) m._removeClasses.call(null);
        else if (e && void 0 !== e) {
          m._isInit.call(null);
          var n = { layout: I.layout, offset: I.offset, clicked: !1 };
          t = y.extend(!0, {}, n, t);
          m._reset.call(null),
            (c = t.layout),
            (u = t.offset),
            (e = -1 !== e.indexOf("#") ? e : "#" + e),
            m._isValid.call(null, e) &&
              m._findTarget.call(null, e) &&
              ((s = "scrollTo"),
              (l = t.clicked) && m._setClasses.call(null, !0),
              m._scrollTo.call(null));
        }
      },
      destroy: function() {
        y(O).unbind("." + x),
          y(i)
            .undelegate("." + x)
            .removeData(x),
          y("._" + x + "-t").removeData(x),
          m._removeClasses.call(null, !0);
      }
    },
    m = {
      _isDisabled: function() {
        var e = O,
          t = "inner",
          n =
            I.disablePluginBelow instanceof Array
              ? [I.disablePluginBelow[0] || 0, I.disablePluginBelow[1] || 0]
              : [I.disablePluginBelow || 0, 0];
        return (
          "innerWidth" in O ||
            ((t = "client"), (e = i.documentElement || i.body)),
          e[t + "Width"] <= n[0] || e[t + "Height"] <= n[1]
        );
      },
      _isValid: function(e, t) {
        if (e) {
          var n =
              -1 !== (t = t || e).indexOf("#/")
                ? t.split("#/")[0]
                : t.split("#")[0],
            a = O.location.toString().split("#")[0];
          return (
            "#" !== e &&
            -1 !== e.indexOf("#") &&
            ("" === n || decodeURIComponent(n) === decodeURIComponent(a))
          );
        }
      },
      _setup: function() {
        var l = m._highlightSelector(),
          o = 1,
          r = 0;
        return y(l).each(function() {
          var e = y(this),
            t = e.attr("href"),
            n = e.prop("href").baseVal || e.prop("href");
          if (m._isValid.call(null, t, n)) {
            var a = -1 !== t.indexOf("#/") ? t.split("#/")[1] : t.split("#")[1],
              s = y("#" + a);
            if (0 < s.length) {
              I.highlightByNextTarget &&
                s !== r &&
                (r ? r.data(x, { tn: s }) : s.data(x, { tn: "0" }), (r = s)),
                s.hasClass("_" + x + "-t") || s.addClass("_" + x + "-t"),
                s.data(x, { i: o }),
                e.hasClass("_" + x + "-h") || e.addClass("_" + x + "-h");
              var i = m._findHighlight.call(null, a);
              m._setClasses.call(null, !1, s, i),
                (p = o),
                ++o == y(l).length && m._extendClasses.call(null);
            }
          }
        });
      },
      _highlightSelector: function() {
        return I.highlightSelector && "" !== I.highlightSelector
          ? I.highlightSelector
          : n;
      },
      _findTarget: function(e) {
        var t = -1 !== e.indexOf("#/") ? e.split("#/")[1] : e.split("#")[1],
          n = y("#" + t);
        if (n.length < 1 || "fixed" === n.css("position")) {
          if ("top" !== t) return;
          n = y("body");
        }
        return (
          (o = n),
          c || (c = I.layout),
          (u = m._setOffset.call(null)),
          ((r = [
            (n.offset().top - u[0]).toString(),
            (n.offset().left - u[1]).toString()
          ])[0] =
            r[0] < 0 ? 0 : r[0]),
          (r[1] = r[1] < 0 ? 0 : r[1]),
          r
        );
      },
      _setOffset: function() {
        var e, t, n, a;
        switch ((u || (u = I.offset ? I.offset : 0), h && (u = h), typeof u)) {
          case "object":
          case "string":
            0 <
            (t = [
              (e = [u.y ? u.y : u, u.x ? u.x : u])[0] instanceof jQuery
                ? e[0]
                : y(e[0]),
              e[1] instanceof jQuery ? e[1] : y(e[1])
            ])[0].length
              ? ((n = t[0].height()),
                "fixed" === t[0].css("position") && (n += t[0][0].offsetTop))
              : (n =
                  !isNaN(parseFloat(e[0])) && isFinite(e[0])
                    ? parseInt(e[0])
                    : 0),
              0 < t[1].length
                ? ((a = t[1].width()),
                  "fixed" === t[1].css("position") && (a += t[1][0].offsetLeft))
                : (a =
                    !isNaN(parseFloat(e[1])) && isFinite(e[1])
                      ? parseInt(e[1])
                      : 0);
            break;
          case "function":
            (e = u.call(null)) instanceof Array
              ? ((n = e[0]), (a = e[1]))
              : (n = a = e);
            break;
          default:
            n = a = parseInt(u);
        }
        return [n, a];
      },
      _findHighlight: function(e) {
        var t = O.location,
          n = t.toString().split("#")[0],
          a = t.pathname;
        return y(
          "._" +
            x +
            "-h[href='#" +
            e +
            "'],._" +
            x +
            "-h[href='" +
            n +
            "#" +
            e +
            "'],._" +
            x +
            "-h[href='" +
            a +
            "#" +
            e +
            "'],._" +
            x +
            "-h[href='#/" +
            e +
            "'],._" +
            x +
            "-h[href='" +
            n +
            "#/" +
            e +
            "'],._" +
            x +
            "-h[href='" +
            a +
            "#/" +
            e +
            "']"
        );
      },
      _setClasses: function(e, t, n) {
        var a = I.clickedClass,
          s = I.targetClass,
          i = I.highlightClass;
        e && a && "" !== a
          ? (y("." + a).removeClass(a), l.addClass(a))
          : t &&
            s &&
            "" !== s &&
            n &&
            i &&
            "" !== i &&
            (m._currentTarget.call(null, t)
              ? (t.addClass(s), n.addClass(i))
              : (!I.keepHighlightUntilNext || 1 < y("." + i).length) &&
                (t.removeClass(s), n.removeClass(i)));
      },
      _extendClasses: function() {
        var e = I.targetClass,
          t = I.highlightClass,
          n = y("." + e),
          a = y("." + t),
          s = e + "-first",
          i = e + "-last",
          l = t + "-first",
          o = t + "-last";
        y("._" + x + "-t").removeClass(s + " " + i),
          y("._" + x + "-h").removeClass(l + " " + o),
          I.forceSingleHighlight
            ? I.keepHighlightUntilNext && 1 < n.length
              ? (n.slice(0, 1).removeClass(e), a.slice(0, 1).removeClass(t))
              : (n.slice(1).removeClass(e), a.slice(1).removeClass(t))
            : (n
                .slice(0, 1)
                .addClass(s)
                .end()
                .slice(-1)
                .addClass(i),
              a
                .slice(0, 1)
                .addClass(l)
                .end()
                .slice(-1)
                .addClass(o));
      },
      _removeClasses: function(e) {
        y("." + I.clickedClass).removeClass(I.clickedClass),
          y("." + I.targetClass).removeClass(
            I.targetClass +
              " " +
              I.targetClass +
              "-first " +
              I.targetClass +
              "-last"
          ),
          y("." + I.highlightClass).removeClass(
            I.highlightClass +
              " " +
              I.highlightClass +
              "-first " +
              I.highlightClass +
              "-last"
          ),
          e &&
            (y("._" + x + "-t").removeClass("_" + x + "-t"),
            y("._" + x + "-h").removeClass("_" + x + "-h"));
      },
      _currentTarget: function(e) {
        var t = I["target_" + e.data(x).i],
          n = e.data("ps2id-target"),
          a =
            n && y(n)[0]
              ? y(n)[0].getBoundingClientRect()
              : e[0].getBoundingClientRect();
        if (void 0 !== t) {
          var s = e.offset().top,
            i = e.offset().left,
            l = t.from ? t.from + s : s,
            o = t.to ? t.to + s : s,
            r = t.fromX ? t.fromX + i : i,
            c = t.toX ? t.toX + i : i;
          return a.top >= o && a.top <= l && a.left >= c && a.left <= r;
        }
        var u = y(O).height(),
          h = y(O).width(),
          g = n ? y(n).height() : e.height(),
          f = n ? y(n).width() : e.width(),
          d = 1 + g / u,
          p = d,
          _ = g < u ? d * (u / g) : d,
          m = 1 + f / h,
          v = m,
          S = f < h ? m * (h / f) : m,
          C = [
            a.top <= u / p,
            a.bottom >= u / _,
            a.left <= h / v,
            a.right >= h / S
          ];
        if (I.highlightByNextTarget) {
          var w = e.data(x).tn;
          if (w) {
            var b = w[0].getBoundingClientRect();
            "vertical" === I.layout
              ? (C = [a.top <= u / 2, b.top > u / 2, 1, 1])
              : "horizontal" === I.layout &&
                (C = [1, 1, a.left <= h / 2, b.left > h / 2]);
          }
        }
        return C[0] && C[1] && C[2] && C[3];
      },
      _scrollTo: function() {
        (g = m._scrollSpeed.call(null)),
          (r = I.pageEndSmoothScroll ? m._pageEndSmoothScroll.call(null) : r);
        var e = y("html,body"),
          t = I.autoScrollSpeed ? m._autoScrollSpeed.call(null) : g,
          n = e.is(":animated") ? I.scrollingEasing : I.scrollEasing,
          a = y(O).scrollTop(),
          s = y(O).scrollLeft();
        switch (c) {
          case "horizontal":
            s != r[1] &&
              (m._callbacks.call(null, "onStart"),
              e
                .stop()
                .animate({ scrollLeft: r[1] }, t, n)
                .promise()
                .then(function() {
                  m._callbacks.call(null, "onComplete");
                }));
            break;
          case "auto":
            var i;
            if (a != r[0] || s != r[1])
              if (
                (m._callbacks.call(null, "onStart"),
                navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))
              )
                e
                  .stop()
                  .animate(
                    { pageYOffset: r[0], pageXOffset: r[1] },
                    {
                      duration: t,
                      easing: n,
                      step: function(e, t) {
                        "pageXOffset" == t.prop
                          ? (i = e)
                          : "pageYOffset" == t.prop && O.scrollTo(i, e);
                      }
                    }
                  )
                  .promise()
                  .then(function() {
                    m._callbacks.call(null, "onComplete");
                  });
              else
                e
                  .stop()
                  .animate({ scrollTop: r[0], scrollLeft: r[1] }, t, n)
                  .promise()
                  .then(function() {
                    m._callbacks.call(null, "onComplete");
                  });
            break;
          default:
            a != r[0] &&
              (m._callbacks.call(null, "onStart"),
              e
                .stop()
                .animate({ scrollTop: r[0] }, t, n)
                .promise()
                .then(function() {
                  m._callbacks.call(null, "onComplete");
                }));
        }
      },
      _pageEndSmoothScroll: function() {
        var e = y(i).height(),
          t = y(i).width(),
          n = y(O).height(),
          a = y(O).width();
        return [e - r[0] < n ? e - n : r[0], t - r[1] < a ? t - a : r[1]];
      },
      _scrollSpeed: function() {
        var a = I.scrollSpeed;
        return (
          l &&
            l.length &&
            l.add(l.parent()).each(function() {
              var e = y(this);
              if (e.attr("class")) {
                var t = e.attr("class").split(" ");
                for (var n in t)
                  if (String(t[n]).match(/^ps2id-speed-\d+$/)) {
                    a = t[n].split("ps2id-speed-")[1];
                    break;
                  }
              }
            }),
          parseInt(a)
        );
      },
      _autoScrollSpeed: function() {
        var e = y(O).scrollTop(),
          t = y(O).scrollLeft(),
          n = y(i).height(),
          a = y(i).width(),
          s = [
            g + g * Math.floor(Math.abs(r[0] - e) / n * 100) / 100,
            g + g * Math.floor(Math.abs(r[1] - t) / a * 100) / 100
          ];
        return Math.max.apply(Math, s);
      },
      _callbacks: function(e) {
        if (I)
          switch (
            ((this[x] = {
              trigger: s,
              clicked: l,
              target: o,
              scrollTo: { y: r[0], x: r[1] }
            }),
            e)
          ) {
            case "onStart":
              if (
                I.appendHash &&
                O.history &&
                O.history.pushState &&
                l &&
                l.length
              ) {
                var t = "#" + l.attr("href").split("#")[1];
                t !== O.location.hash && history.pushState("", "", t);
              }
              I.onStart.call(null, this[x]);
              break;
            case "onComplete":
              I.onComplete.call(null, this[x]);
          }
      },
      _reset: function() {
        c = u = h = !1;
      },
      _isInit: function() {
        a || _.init.apply(this);
      },
      _live: function() {
        t = setTimeout(function() {
          I.live
            ? y(m._highlightSelector()).length !== p && m._setup.call(null)
            : t && clearTimeout(t),
            m._live.call(null);
        }, 1e3);
      },
      _easing: function() {
        function t(e) {
          var t = 7.5625,
            n = 2.75;
          return e < 1 / n
            ? t * e * e
            : e < 2 / n
              ? t * (e -= 1.5 / n) * e + 0.75
              : e < 2.5 / n
                ? t * (e -= 2.25 / n) * e + 0.9375
                : t * (e -= 2.625 / n) * e + 0.984375;
        }
        (y.easing.easeInQuad =
          y.easing.easeInQuad ||
          function(e) {
            return e * e;
          }),
          (y.easing.easeOutQuad =
            y.easing.easeOutQuad ||
            function(e) {
              return 1 - (1 - e) * (1 - e);
            }),
          (y.easing.easeInOutQuad =
            y.easing.easeInOutQuad ||
            function(e) {
              return e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
            }),
          (y.easing.easeInCubic =
            y.easing.easeInCubic ||
            function(e) {
              return e * e * e;
            }),
          (y.easing.easeOutCubic =
            y.easing.easeOutCubic ||
            function(e) {
              return 1 - Math.pow(1 - e, 3);
            }),
          (y.easing.easeInOutCubic =
            y.easing.easeInOutCubic ||
            function(e) {
              return e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
            }),
          (y.easing.easeInQuart =
            y.easing.easeInQuart ||
            function(e) {
              return e * e * e * e;
            }),
          (y.easing.easeOutQuart =
            y.easing.easeOutQuart ||
            function(e) {
              return 1 - Math.pow(1 - e, 4);
            }),
          (y.easing.easeInOutQuart =
            y.easing.easeInOutQuart ||
            function(e) {
              return e < 0.5
                ? 8 * e * e * e * e
                : 1 - Math.pow(-2 * e + 2, 4) / 2;
            }),
          (y.easing.easeInQuint =
            y.easing.easeInQuint ||
            function(e) {
              return e * e * e * e * e;
            }),
          (y.easing.easeOutQuint =
            y.easing.easeOutQuint ||
            function(e) {
              return 1 - Math.pow(1 - e, 5);
            }),
          (y.easing.easeInOutQuint =
            y.easing.easeInOutQuint ||
            function(e) {
              return e < 0.5
                ? 16 * e * e * e * e * e
                : 1 - Math.pow(-2 * e + 2, 5) / 2;
            }),
          (y.easing.easeInExpo =
            y.easing.easeInExpo ||
            function(e) {
              return 0 === e ? 0 : Math.pow(2, 10 * e - 10);
            }),
          (y.easing.easeOutExpo =
            y.easing.easeOutExpo ||
            function(e) {
              return 1 === e ? 1 : 1 - Math.pow(2, -10 * e);
            }),
          (y.easing.easeInOutExpo =
            y.easing.easeInOutExpo ||
            function(e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : e < 0.5
                    ? Math.pow(2, 20 * e - 10) / 2
                    : (2 - Math.pow(2, -20 * e + 10)) / 2;
            }),
          (y.easing.easeInSine =
            y.easing.easeInSine ||
            function(e) {
              return 1 - Math.cos(e * Math.PI / 2);
            }),
          (y.easing.easeOutSine =
            y.easing.easeOutSine ||
            function(e) {
              return Math.sin(e * Math.PI / 2);
            }),
          (y.easing.easeInOutSine =
            y.easing.easeInOutSine ||
            function(e) {
              return -(Math.cos(Math.PI * e) - 1) / 2;
            }),
          (y.easing.easeInCirc =
            y.easing.easeInCirc ||
            function(e) {
              return 1 - Math.sqrt(1 - Math.pow(e, 2));
            }),
          (y.easing.easeOutCirc =
            y.easing.easeOutCirc ||
            function(e) {
              return Math.sqrt(1 - Math.pow(e - 1, 2));
            }),
          (y.easing.easeInOutCirc =
            y.easing.easeInOutCirc ||
            function(e) {
              return e < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2;
            }),
          (y.easing.easeInElastic =
            y.easing.easeInElastic ||
            function(e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : -Math.pow(2, 10 * e - 10) *
                    Math.sin((10 * e - 10.75) * (2 * Math.PI / 3));
            }),
          (y.easing.easeOutElastic =
            y.easing.easeOutElastic ||
            function(e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : Math.pow(2, -10 * e) *
                      Math.sin((10 * e - 0.75) * (2 * Math.PI / 3)) +
                    1;
            }),
          (y.easing.easeInOutElastic =
            y.easing.easeInOutElastic ||
            function(e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : e < 0.5
                    ? -Math.pow(2, 20 * e - 10) *
                      Math.sin((20 * e - 11.125) * (2 * Math.PI / 4.5)) /
                      2
                    : Math.pow(2, -20 * e + 10) *
                        Math.sin((20 * e - 11.125) * (2 * Math.PI / 4.5)) /
                        2 +
                      1;
            }),
          (y.easing.easeInBack =
            y.easing.easeInBack ||
            function(e) {
              return 2.70158 * e * e * e - 1.70158 * e * e;
            }),
          (y.easing.easeOutBack =
            y.easing.easeOutBack ||
            function(e) {
              return (
                1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2)
              );
            }),
          (y.easing.easeInOutBack =
            y.easing.easeInOutBack ||
            function(e) {
              return e < 0.5
                ? Math.pow(2 * e, 2) * (7.189819 * e - 2.5949095) / 2
                : (Math.pow(2 * e - 2, 2) *
                    (3.5949095 * (2 * e - 2) + 2.5949095) +
                    2) /
                    2;
            }),
          (y.easing.easeInBounce =
            y.easing.easeInBounce ||
            function(e) {
              return 1 - t(1 - e);
            }),
          (y.easing.easeOutBounce = y.easing.easeOutBounce || t),
          (y.easing.easeInOutBounce =
            y.easing.easeInOutBounce ||
            function(e) {
              return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : (1 + t(2 * e - 1)) / 2;
            });
      }
    };
  m._easing.call(),
    (y.fn[f] = function(e) {
      return _[e]
        ? _[e].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof e && e
          ? void y.error("Method " + e + " does not exist")
          : _.init.apply(this, arguments);
    }),
    (y[f] = function(e) {
      return _[e]
        ? _[e].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof e && e
          ? void y.error("Method " + e + " does not exist")
          : _.init.apply(this, arguments);
    }),
    (y[f].defaults = d);
})(jQuery, window, document),
  (function(l) {
    var o = "mPS2id",
      r = mPS2id_params,
      c = r.shortcode_class,
      u = location.hash || null,
      h = function(e, t) {
        try {
          l(e);
        } catch (e) {
          return !1;
        }
        return (
          l(e).length &&
          (t ||
            l("a[href*='" + e + "']").filter(function() {
              return 1 == l(this).data(o + "Element");
            }).length)
        );
      },
      g = function(e) {
        if (-1 === e.indexOf(",")) return e;
        var t = e.split(",");
        return { y: t[0] || "0", x: t[1] || "0" };
      },
      f = function(e) {
        if (-1 === e.indexOf(",")) return e;
        var t = e.split(",");
        return [t[0] || "0", t[1] || "0"];
      },
      d = function(e) {
        "horizontal" !== e && l(window).scrollTop(0),
          "vertical" !== e && l(window).scrollLeft(0);
      },
      p = function(e, t) {
        for (var n = e.click.length - 1; 0 <= n; n--) {
          var a = e.click[n];
          a &&
            "mPS2id" != a.namespace &&
            ('a[href*="#"]' === a.selector
              ? (a.selector = 'a[href*="#"]:not(._mPS2id-h)')
              : "a[href*=#]:not([href=#])" === a.selector
                ? (a.selector = "a[href*=#]:not([href=#]):not(._mPS2id-h)")
                : t.off("click", a.handler));
        }
      },
      _ =
        "a[data-ps2id-api='true'][href*='#'],.ps2id > a[href*='#'],a.ps2id[href*='#']";
    l(document).ready(function() {
      for (var e = 0; e < r.total_instances; e++)
        if (
          "true" === r.instances[o + "_instance_" + e].scrollToHash &&
          u &&
          (l(
            r.instances[o + "_instance_" + e].selector + ",." + c + "," + _
          ).each(function() {
            l(this).data(o + "Element", !0);
          }),
          h(u, "true" === r.instances[o + "_instance_" + e].scrollToHashForAll))
        ) {
          var t =
            "true" ===
            r.instances[o + "_instance_" + e].scrollToHashRemoveUrlHash
              ? window.location.href.replace(/#.*$/, "")
              : window.location.href.replace(/#.*$/, "#");
          d(r.instances[o + "_instance_" + e].layout),
            window.history && window.history.replaceState
              ? window.history.replaceState("", "", t)
              : (window.location.href = t);
        }
    }),
      l(window).on("load", function() {
        for (var e = 0; e < r.total_instances; e++) {
          var n = l(
              r.instances[o + "_instance_" + e].selector + ",." + c + "," + _
            ),
            t = r.instances[o + "_instance_" + e].autoCorrectScroll,
            a = 0;
          if (
            (n.mPageScroll2id({
              scrollSpeed: r.instances[o + "_instance_" + e].scrollSpeed,
              autoScrollSpeed:
                "true" === r.instances[o + "_instance_" + e].autoScrollSpeed,
              scrollEasing: r.instances[o + "_instance_" + e].scrollEasing,
              scrollingEasing:
                r.instances[o + "_instance_" + e].scrollingEasing,
              pageEndSmoothScroll:
                "true" ===
                r.instances[o + "_instance_" + e].pageEndSmoothScroll,
              layout: r.instances[o + "_instance_" + e].layout,
              offset: g(r.instances[o + "_instance_" + e].offset.toString()),
              highlightSelector:
                r.instances[o + "_instance_" + e].highlightSelector,
              clickedClass: r.instances[o + "_instance_" + e].clickedClass,
              targetClass: r.instances[o + "_instance_" + e].targetClass,
              highlightClass: r.instances[o + "_instance_" + e].highlightClass,
              forceSingleHighlight:
                "true" ===
                r.instances[o + "_instance_" + e].forceSingleHighlight,
              keepHighlightUntilNext:
                "true" ===
                r.instances[o + "_instance_" + e].keepHighlightUntilNext,
              highlightByNextTarget:
                "true" ===
                r.instances[o + "_instance_" + e].highlightByNextTarget,
              disablePluginBelow: f(
                r.instances[o + "_instance_" + e].disablePluginBelow.toString()
              ),
              appendHash:
                "true" === r.instances[o + "_instance_" + e].appendHash,
              onStart: function() {
                "true" === t && "selector" === mPS2id.trigger && a++;
              },
              onComplete: function() {
                1 == a &&
                  (mPS2id.clicked.length &&
                    mPS2id.clicked.trigger("click.mPS2id"),
                  (a = 0));
              }
            }),
            "true" === r.instances[o + "_instance_" + e].scrollToHash &&
              u &&
              h(
                u,
                "true" === r.instances[o + "_instance_" + e].scrollToHashForAll
              ))
          ) {
            d(r.instances[o + "_instance_" + e].layout);
            var s =
                r.instances[o + "_instance_" + e].scrollToHashUseElementData,
              i = l(
                "a._mPS2id-h[href$='" +
                  u +
                  "'][data-ps2id-offset]:not([data-ps2id-offset=''])"
              ).last();
            setTimeout(function() {
              "true" === s && i.length
                ? i.trigger("click.mPS2id")
                : l.mPageScroll2id("scrollTo", u),
                -1 !== window.location.href.indexOf("#") &&
                  (window.history && window.history.replaceState
                    ? window.history.replaceState("", "", u)
                    : (window.location.hash = u));
            }, r.instances[o + "_instance_" + e].scrollToHashDelay);
          }
          "true" ===
            r.instances[o + "_instance_" + e].unbindUnrelatedClickEvents &&
            setTimeout(function() {
              var e = n.length ? l._data(n[0], "events") : null,
                t = n.length ? l._data(l(document)[0], "events") : null;
              e && p(e, n), t && p(t, n);
            }, 300),
            "true" ===
              r.instances[o + "_instance_" + e].normalizeAnchorPointTargets &&
              l("a._mPS2id-t[id]:empty").css({
                display: "inline-block",
                "line-height": 0,
                width: 0,
                height: 0,
                border: "none"
              }),
            "true" ===
              r.instances[o + "_instance_" + e].stopScrollOnUserAction &&
              l(document).on("mousewheel DOMMouseScroll touchmove", function() {
                var e = l("html,body");
                e.is(":animated") && e.stop();
              });
        }
      }),
      l.extend(l.expr[":"], {
        absolute:
          l.expr[":"].absolute ||
          function(e) {
            return "absolute" === l(e).css("position");
          },
        relative:
          l.expr[":"].relative ||
          function(e) {
            return "relative" === l(e).css("position");
          },
        static:
          l.expr[":"].static ||
          function(e) {
            return "static" === l(e).css("position");
          },
        fixed:
          l.expr[":"].fixed ||
          function(e) {
            return "fixed" === l(e).css("position");
          },
        width:
          l.expr[":"].width ||
          function(e, t, n) {
            var a = n[3].replace("&lt;", "<").replace("&gt;", ">");
            return (
              !!a &&
              (">" === a.substr(0, 1)
                ? l(e).width() > a.substr(1)
                : "<" === a.substr(0, 1)
                  ? l(e).width() < a.substr(1)
                  : l(e).width() === parseInt(a))
            );
          },
        height:
          l.expr[":"].height ||
          function(e, t, n) {
            var a = n[3].replace("&lt;", "<").replace("&gt;", ">");
            return (
              !!a &&
              (">" === a.substr(0, 1)
                ? l(e).height() > a.substr(1)
                : "<" === a.substr(0, 1)
                  ? l(e).height() < a.substr(1)
                  : l(e).height() === parseInt(a))
            );
          }
      });
  })(jQuery);
/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
!(function() {
  "use strict";
  function e(e) {
    function t(t, n) {
      var s,
        h,
        k = t == window,
        y = n && n.message !== undefined ? n.message : undefined;
      if (
        !(n = e.extend({}, e.blockUI.defaults, n || {})).ignoreIfBlocked ||
        !e(t).data("blockUI.isBlocked")
      ) {
        if (
          ((n.overlayCSS = e.extend(
            {},
            e.blockUI.defaults.overlayCSS,
            n.overlayCSS || {}
          )),
          (s = e.extend({}, e.blockUI.defaults.css, n.css || {})),
          n.onOverlayClick && (n.overlayCSS.cursor = "pointer"),
          (h = e.extend({}, e.blockUI.defaults.themedCSS, n.themedCSS || {})),
          (y = y === undefined ? n.message : y),
          k && p && o(window, { fadeOut: 0 }),
          y && "string" != typeof y && (y.parentNode || y.jquery))
        ) {
          var m = y.jquery ? y[0] : y,
            g = {};
          e(t).data("blockUI.history", g),
            (g.el = m),
            (g.parent = m.parentNode),
            (g.display = m.style.display),
            (g.position = m.style.position),
            g.parent && g.parent.removeChild(m);
        }
        e(t).data("blockUI.onUnblock", n.onUnblock);
        var v,
          I,
          w,
          U,
          x = n.baseZ;
        (v = e(
          r || n.forceIframe
            ? '<iframe class="blockUI" style="z-index:' +
              x++ +
              ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' +
              n.iframeSrc +
              '"></iframe>'
            : '<div class="blockUI" style="display:none"></div>'
        )),
          (I = e(
            n.theme
              ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' +
                x++ +
                ';display:none"></div>'
              : '<div class="blockUI blockOverlay" style="z-index:' +
                x++ +
                ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'
          )),
          n.theme && k
            ? ((U =
                '<div class="blockUI ' +
                n.blockMsgClass +
                ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                (x + 10) +
                ';display:none;position:fixed">'),
              n.title &&
                (U +=
                  '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                  (n.title || "&nbsp;") +
                  "</div>"),
              (U += '<div class="ui-widget-content ui-dialog-content"></div>'),
              (U += "</div>"))
            : n.theme
              ? ((U =
                  '<div class="blockUI ' +
                  n.blockMsgClass +
                  ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' +
                  (x + 10) +
                  ';display:none;position:absolute">'),
                n.title &&
                  (U +=
                    '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                    (n.title || "&nbsp;") +
                    "</div>"),
                (U +=
                  '<div class="ui-widget-content ui-dialog-content"></div>'),
                (U += "</div>"))
              : (U = k
                  ? '<div class="blockUI ' +
                    n.blockMsgClass +
                    ' blockPage" style="z-index:' +
                    (x + 10) +
                    ';display:none;position:fixed"></div>'
                  : '<div class="blockUI ' +
                    n.blockMsgClass +
                    ' blockElement" style="z-index:' +
                    (x + 10) +
                    ';display:none;position:absolute"></div>'),
          (w = e(U)),
          y &&
            (n.theme ? (w.css(h), w.addClass("ui-widget-content")) : w.css(s)),
          n.theme || I.css(n.overlayCSS),
          I.css("position", k ? "fixed" : "absolute"),
          (r || n.forceIframe) && v.css("opacity", 0);
        var C = [v, I, w],
          S = e(k ? "body" : t);
        e.each(C, function() {
          this.appendTo(S);
        }),
          n.theme &&
            n.draggable &&
            e.fn.draggable &&
            w.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" });
        var O =
          f &&
          (!e.support.boxModel || e("object,embed", k ? null : t).length > 0);
        if (u || O) {
          if (
            (k &&
              n.allowBodyStretch &&
              e.support.boxModel &&
              e("html,body").css("height", "100%"),
            (u || !e.support.boxModel) && !k)
          )
            var E = a(t, "borderTopWidth"),
              T = a(t, "borderLeftWidth"),
              M = E ? "(0 - " + E + ")" : 0,
              B = T ? "(0 - " + T + ")" : 0;
          e.each(C, function(e, t) {
            var o = t[0].style;
            if (((o.position = "absolute"), e < 2))
              k
                ? o.setExpression(
                    "height",
                    "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" +
                      n.quirksmodeOffsetHack +
                      ') + "px"'
                  )
                : o.setExpression(
                    "height",
                    'this.parentNode.offsetHeight + "px"'
                  ),
                k
                  ? o.setExpression(
                      "width",
                      'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'
                    )
                  : o.setExpression(
                      "width",
                      'this.parentNode.offsetWidth + "px"'
                    ),
                B && o.setExpression("left", B),
                M && o.setExpression("top", M);
            else if (n.centerY)
              k &&
                o.setExpression(
                  "top",
                  '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'
                ),
                (o.marginTop = 0);
            else if (!n.centerY && k) {
              var i =
                "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " +
                (n.css && n.css.top ? parseInt(n.css.top, 10) : 0) +
                ') + "px"';
              o.setExpression("top", i);
            }
          });
        }
        if (
          (y &&
            (n.theme ? w.find(".ui-widget-content").append(y) : w.append(y),
            (y.jquery || y.nodeType) && e(y).show()),
          (r || n.forceIframe) && n.showOverlay && v.show(),
          n.fadeIn)
        ) {
          var j = n.onBlock ? n.onBlock : c,
            H = n.showOverlay && !y ? j : c,
            z = y ? j : c;
          n.showOverlay && I._fadeIn(n.fadeIn, H), y && w._fadeIn(n.fadeIn, z);
        } else
          n.showOverlay && I.show(),
            y && w.show(),
            n.onBlock && n.onBlock.bind(w)();
        if (
          (i(1, t, n),
          k
            ? ((p = w[0]),
              (b = e(n.focusableElements, p)),
              n.focusInput && setTimeout(l, 20))
            : d(w[0], n.centerX, n.centerY),
          n.timeout)
        ) {
          var W = setTimeout(function() {
            k ? e.unblockUI(n) : e(t).unblock(n);
          }, n.timeout);
          e(t).data("blockUI.timeout", W);
        }
      }
    }
    function o(t, o) {
      var s,
        l = t == window,
        d = e(t),
        a = d.data("blockUI.history"),
        c = d.data("blockUI.timeout");
      c && (clearTimeout(c), d.removeData("blockUI.timeout")),
        (o = e.extend({}, e.blockUI.defaults, o || {})),
        i(0, t, o),
        null === o.onUnblock &&
          ((o.onUnblock = d.data("blockUI.onUnblock")),
          d.removeData("blockUI.onUnblock"));
      var r;
      (r = l
        ? e(document.body)
            .children()
            .filter(".blockUI")
            .add("body > .blockUI")
        : d.find(">.blockUI")),
        o.cursorReset &&
          (r.length > 1 && (r[1].style.cursor = o.cursorReset),
          r.length > 2 && (r[2].style.cursor = o.cursorReset)),
        l && (p = b = null),
        o.fadeOut
          ? ((s = r.length),
            r.stop().fadeOut(o.fadeOut, function() {
              0 == --s && n(r, a, o, t);
            }))
          : n(r, a, o, t);
    }
    function n(t, o, n, i) {
      var s = e(i);
      if (!s.data("blockUI.isBlocked")) {
        t.each(function(e, t) {
          this.parentNode && this.parentNode.removeChild(this);
        }),
          o &&
            o.el &&
            ((o.el.style.display = o.display),
            (o.el.style.position = o.position),
            (o.el.style.cursor = "default"),
            o.parent && o.parent.appendChild(o.el),
            s.removeData("blockUI.history")),
          s.data("blockUI.static") && s.css("position", "static"),
          "function" == typeof n.onUnblock && n.onUnblock(i, n);
        var l = e(document.body),
          d = l.width(),
          a = l[0].style.width;
        l.width(d - 1).width(d), (l[0].style.width = a);
      }
    }
    function i(t, o, n) {
      var i = o == window,
        l = e(o);
      if (
        (t || ((!i || p) && (i || l.data("blockUI.isBlocked")))) &&
        (l.data("blockUI.isBlocked", t),
        i && n.bindEvents && (!t || n.showOverlay))
      ) {
        var d =
          "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
        t ? e(document).bind(d, n, s) : e(document).unbind(d, s);
      }
    }
    function s(t) {
      if (
        "keydown" === t.type &&
        t.keyCode &&
        9 == t.keyCode &&
        p &&
        t.data.constrainTabKey
      ) {
        var o = b,
          n = !t.shiftKey && t.target === o[o.length - 1],
          i = t.shiftKey && t.target === o[0];
        if (n || i)
          return (
            setTimeout(function() {
              l(i);
            }, 10),
            !1
          );
      }
      var s = t.data,
        d = e(t.target);
      return (
        d.hasClass("blockOverlay") && s.onOverlayClick && s.onOverlayClick(t),
        d.parents("div." + s.blockMsgClass).length > 0 ||
          0 ===
            d
              .parents()
              .children()
              .filter("div.blockUI").length
      );
    }
    function l(e) {
      if (b) {
        var t = b[!0 === e ? b.length - 1 : 0];
        t && t.focus();
      }
    }
    function d(e, t, o) {
      var n = e.parentNode,
        i = e.style,
        s = (n.offsetWidth - e.offsetWidth) / 2 - a(n, "borderLeftWidth"),
        l = (n.offsetHeight - e.offsetHeight) / 2 - a(n, "borderTopWidth");
      t && (i.left = s > 0 ? s + "px" : "0"),
        o && (i.top = l > 0 ? l + "px" : "0");
    }
    function a(t, o) {
      return parseInt(e.css(t, o), 10) || 0;
    }
    e.fn._fadeIn = e.fn.fadeIn;
    var c = e.noop || function() {},
      r = /MSIE/.test(navigator.userAgent),
      u =
        /MSIE 6.0/.test(navigator.userAgent) &&
        !/MSIE 8.0/.test(navigator.userAgent),
      f = (document.documentMode,
      e.isFunction(document.createElement("div").style.setExpression));
    (e.blockUI = function(e) {
      t(window, e);
    }),
      (e.unblockUI = function(e) {
        o(window, e);
      }),
      (e.growlUI = function(t, o, n, i) {
        var s = e('<div class="growlUI"></div>');
        t && s.append("<h1>" + t + "</h1>"),
          o && s.append("<h2>" + o + "</h2>"),
          n === undefined && (n = 3e3);
        var l = function(t) {
          (t = t || {}),
            e.blockUI({
              message: s,
              fadeIn: "undefined" != typeof t.fadeIn ? t.fadeIn : 700,
              fadeOut: "undefined" != typeof t.fadeOut ? t.fadeOut : 1e3,
              timeout: "undefined" != typeof t.timeout ? t.timeout : n,
              centerY: !1,
              showOverlay: !1,
              onUnblock: i,
              css: e.blockUI.defaults.growlCSS
            });
        };
        l();
        s.css("opacity");
        s
          .mouseover(function() {
            l({ fadeIn: 0, timeout: 3e4 });
            var t = e(".blockMsg");
            t.stop(), t.fadeTo(300, 1);
          })
          .mouseout(function() {
            e(".blockMsg").fadeOut(1e3);
          });
      }),
      (e.fn.block = function(o) {
        if (this[0] === window) return e.blockUI(o), this;
        var n = e.extend({}, e.blockUI.defaults, o || {});
        return (
          this.each(function() {
            var t = e(this);
            (n.ignoreIfBlocked && t.data("blockUI.isBlocked")) ||
              t.unblock({ fadeOut: 0 });
          }),
          this.each(function() {
            "static" == e.css(this, "position") &&
              ((this.style.position = "relative"),
              e(this).data("blockUI.static", !0)),
              (this.style.zoom = 1),
              t(this, o);
          })
        );
      }),
      (e.fn.unblock = function(t) {
        return this[0] === window
          ? (e.unblockUI(t), this)
          : this.each(function() {
              o(this, t);
            });
      }),
      (e.blockUI.version = 2.7),
      (e.blockUI.defaults = {
        message: "<h1>Please wait...</h1>",
        title: null,
        draggable: !0,
        theme: !1,
        css: {
          padding: 0,
          margin: 0,
          width: "30%",
          top: "40%",
          left: "35%",
          textAlign: "center",
          color: "#000",
          border: "3px solid #aaa",
          backgroundColor: "#fff",
          cursor: "wait"
        },
        themedCSS: { width: "30%", top: "40%", left: "35%" },
        overlayCSS: { backgroundColor: "#000", opacity: 0.6, cursor: "wait" },
        cursorReset: "default",
        growlCSS: {
          width: "350px",
          top: "10px",
          left: "",
          right: "10px",
          border: "none",
          padding: "5px",
          opacity: 0.6,
          cursor: "default",
          color: "#fff",
          backgroundColor: "#000",
          "-webkit-border-radius": "10px",
          "-moz-border-radius": "10px",
          "border-radius": "10px"
        },
        iframeSrc: /^https/i.test(window.location.href || "")
          ? "javascript:false"
          : "about:blank",
        forceIframe: !1,
        baseZ: 1e3,
        centerX: !0,
        centerY: !0,
        allowBodyStretch: !0,
        bindEvents: !0,
        constrainTabKey: !0,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: !0,
        focusInput: !0,
        focusableElements: ":input:enabled:visible",
        onBlock: null,
        onUnblock: null,
        onOverlayClick: null,
        quirksmodeOffsetHack: 4,
        blockMsgClass: "blockMsg",
        ignoreIfBlocked: !1
      });
    var p = null,
      b = [];
  }
  "function" == typeof define && define.amd && define.amd.jQuery
    ? define(["jquery"], e)
    : e(jQuery);
})();
jQuery(function(e) {
  if ("undefined" == typeof wc_add_to_cart_params) return !1;
  var t = function() {
    e(document.body)
      .on("click", ".add_to_cart_button", this.onAddToCart)
      .on("click", ".remove_from_cart_button", this.onRemoveFromCart)
      .on("added_to_cart", this.updateButton)
      .on("added_to_cart", this.updateCartPage)
      .on("added_to_cart removed_from_cart", this.updateFragments);
  };
  (t.prototype.onAddToCart = function(t) {
    var a = e(this);
    if (a.is(".ajax_add_to_cart")) {
      if (!a.attr("data-product_id")) return !0;
      t.preventDefault(), a.removeClass("added"), a.addClass("loading");
      var o = {};
      e.each(a.data(), function(t, a) {
        o[t] = a;
      }),
        e(document.body).trigger("adding_to_cart", [a, o]),
        e.post(
          wc_add_to_cart_params.wc_ajax_url
            .toString()
            .replace("%%endpoint%%", "add_to_cart"),
          o,
          function(t) {
            t &&
              (t.error && t.product_url
                ? (window.location = t.product_url)
                : "yes" !== wc_add_to_cart_params.cart_redirect_after_add
                  ? e(document.body).trigger("added_to_cart", [
                      t.fragments,
                      t.cart_hash,
                      a
                    ])
                  : (window.location = wc_add_to_cart_params.cart_url));
          }
        );
    }
  }),
    (t.prototype.onRemoveFromCart = function(t) {
      var a = e(this),
        o = a.closest(".woocommerce-mini-cart-item");
      t.preventDefault(),
        o.block({ message: null, overlayCSS: { opacity: 0.6 } }),
        e
          .post(
            wc_add_to_cart_params.wc_ajax_url
              .toString()
              .replace("%%endpoint%%", "remove_from_cart"),
            { cart_item_key: a.data("cart_item_key") },
            function(t) {
              t && t.fragments
                ? e(document.body).trigger("removed_from_cart", [
                    t.fragments,
                    t.cart_hash,
                    a
                  ])
                : (window.location = a.attr("href"));
            }
          )
          .fail(function() {
            window.location = a.attr("href");
          });
    }),
    (t.prototype.updateButton = function(t, a, o, r) {
      (r = void 0 !== r && r) &&
        (r.removeClass("loading"),
        r.addClass("added"),
        wc_add_to_cart_params.is_cart ||
          0 !== r.parent().find(".added_to_cart").length ||
          r.after(
            ' <a href="' +
              wc_add_to_cart_params.cart_url +
              '" class="added_to_cart wc-forward" title="' +
              wc_add_to_cart_params.i18n_view_cart +
              '">' +
              wc_add_to_cart_params.i18n_view_cart +
              "</a>"
          ),
        e(document.body).trigger("wc_cart_button_updated", [r]));
    }),
    (t.prototype.updateCartPage = function() {
      var t = window.location
        .toString()
        .replace("add-to-cart", "added-to-cart");
      e(".shop_table.cart").load(t + " .shop_table.cart:eq(0) > *", function() {
        e(".shop_table.cart")
          .stop(!0)
          .css("opacity", "1")
          .unblock(),
          e(document.body).trigger("cart_page_refreshed");
      }),
        e(".cart_totals").load(t + " .cart_totals:eq(0) > *", function() {
          e(".cart_totals")
            .stop(!0)
            .css("opacity", "1")
            .unblock(),
            e(document.body).trigger("cart_totals_refreshed");
        });
    }),
    (t.prototype.updateFragments = function(t, a) {
      a &&
        (e.each(a, function(t) {
          e(t)
            .addClass("updating")
            .fadeTo("400", "0.6")
            .block({ message: null, overlayCSS: { opacity: 0.6 } });
        }),
        e.each(a, function(t, a) {
          e(t).replaceWith(a),
            e(t)
              .stop(!0)
              .css("opacity", "1")
              .unblock();
        }),
        e(document.body).trigger("wc_fragments_loaded"));
    }),
    new t();
});
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!(function(e) {
  var n = !1;
  if (
    ("function" == typeof define && define.amd && (define(e), (n = !0)),
    "object" == typeof exports && ((module.exports = e()), (n = !0)),
    !n)
  ) {
    var o = window.Cookies,
      t = (window.Cookies = e());
    t.noConflict = function() {
      return (window.Cookies = o), t;
    };
  }
})(function() {
  function e() {
    for (var e = 0, n = {}; e < arguments.length; e++) {
      var o = arguments[e];
      for (var t in o) n[t] = o[t];
    }
    return n;
  }
  function n(o) {
    function t(n, r, i) {
      var c;
      if ("undefined" != typeof document) {
        if (arguments.length > 1) {
          if (
            "number" == typeof (i = e({ path: "/" }, t.defaults, i)).expires
          ) {
            var a = new Date();
            a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
              (i.expires = a);
          }
          i.expires = i.expires ? i.expires.toUTCString() : "";
          try {
            (c = JSON.stringify(r)), /^[\{\[]/.test(c) && (r = c);
          } catch (m) {}
          (r = o.write
            ? o.write(r, n)
            : encodeURIComponent(String(r)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (n = (n = (n = encodeURIComponent(String(n))).replace(
              /%(23|24|26|2B|5E|60|7C)/g,
              decodeURIComponent
            )).replace(/[\(\)]/g, escape));
          var f = "";
          for (var s in i)
            i[s] && ((f += "; " + s), !0 !== i[s] && (f += "=" + i[s]));
          return (document.cookie = n + "=" + r + f);
        }
        n || (c = {});
        for (
          var p = document.cookie ? document.cookie.split("; ") : [],
            d = /(%[0-9A-Z]{2})+/g,
            u = 0;
          u < p.length;
          u++
        ) {
          var l = p[u].split("="),
            C = l.slice(1).join("=");
          '"' === C.charAt(0) && (C = C.slice(1, -1));
          try {
            var g = l[0].replace(d, decodeURIComponent);
            if (
              ((C = o.read
                ? o.read(C, g)
                : o(C, g) || C.replace(d, decodeURIComponent)),
              this.json)
            )
              try {
                C = JSON.parse(C);
              } catch (m) {}
            if (n === g) {
              c = C;
              break;
            }
            n || (c[g] = C);
          } catch (m) {}
        }
        return c;
      }
    }
    return (
      (t.set = t),
      (t.get = function(e) {
        return t.call(t, e);
      }),
      (t.getJSON = function() {
        return t.apply({ json: !0 }, [].slice.call(arguments));
      }),
      (t.defaults = {}),
      (t.remove = function(n, o) {
        t(n, "", e(o, { expires: -1 }));
      }),
      (t.withConverter = n),
      t
    );
  }
  return n(function() {});
});
jQuery(function(i) {
  i(".woocommerce-ordering").on("change", "select.orderby", function() {
    i(this)
      .closest("form")
      .submit();
  }),
    i("input.qty:not(.product-quantity input.qty)").each(function() {
      var o = parseFloat(i(this).attr("min"));
      0 <= o && parseFloat(i(this).val()) < o && i(this).val(o);
    }),
    i(".woocommerce-store-notice__dismiss-link").click(function() {
      Cookies.set("store_notice", "hidden", { path: "/" }),
        i(".woocommerce-store-notice").hide();
    }),
    "hidden" === Cookies.get("store_notice")
      ? i(".woocommerce-store-notice").hide()
      : i(".woocommerce-store-notice").show(),
    i(document.body).on("click", function() {
      i(".woocommerce-input-wrapper span.description:visible")
        .prop("aria-hidden", !0)
        .slideUp(250);
    }),
    i(".woocommerce-input-wrapper").on("click", function(o) {
      o.stopPropagation();
    }),
    i(".woocommerce-input-wrapper :input")
      .on("keydown", function(o) {
        var e = i(this)
          .parent()
          .find("span.description");
        if (27 === o.which && e.length && e.is(":visible"))
          return e.prop("aria-hidden", !0).slideUp(250), o.preventDefault(), !1;
      })
      .on("click focus", function() {
        var o = i(this).parent(),
          e = o.find("span.description");
        o.addClass("currentTarget"),
          i(
            ".woocommerce-input-wrapper:not(.currentTarget) span.description:visible"
          )
            .prop("aria-hidden", !0)
            .slideUp(250),
          e.length &&
            e.is(":hidden") &&
            e.prop("aria-hidden", !1).slideDown(250),
          o.removeClass("currentTarget");
      }),
    (i.scroll_to_notices = function(o) {
      o.length &&
        i("html, body").animate({ scrollTop: o.offset().top - 100 }, 1e3);
    });
});
jQuery(function(n) {
  if ("undefined" == typeof wc_cart_fragments_params) return !1;
  var t = !0,
    o = wc_cart_fragments_params.cart_hash_key;
  try {
    (t = "sessionStorage" in window && null !== window.sessionStorage),
      window.sessionStorage.setItem("wc", "test"),
      window.sessionStorage.removeItem("wc"),
      window.localStorage.setItem("wc", "test"),
      window.localStorage.removeItem("wc");
  } catch (w) {
    t = !1;
  }
  function a() {
    t && sessionStorage.setItem("wc_cart_created", new Date().getTime());
  }
  function s(e) {
    t && (localStorage.setItem(o, e), sessionStorage.setItem(o, e));
  }
  var e = {
    url: wc_cart_fragments_params.wc_ajax_url
      .toString()
      .replace("%%endpoint%%", "get_refreshed_fragments"),
    type: "POST",
    success: function(e) {
      e &&
        e.fragments &&
        (n.each(e.fragments, function(e, t) {
          n(e).replaceWith(t);
        }),
        t &&
          (sessionStorage.setItem(
            wc_cart_fragments_params.fragment_name,
            JSON.stringify(e.fragments)
          ),
          s(e.cart_hash),
          e.cart_hash && a()),
        n(document.body).trigger("wc_fragments_refreshed"));
    }
  };
  function r() {
    n.ajax(e);
  }
  if (t) {
    var i = null;
    n(document.body).on("wc_fragment_refresh updated_wc_div", function() {
      r();
    }),
      n(document.body).on("added_to_cart removed_from_cart", function(e, t, n) {
        var r = sessionStorage.getItem(o);
        (null !== r && r !== undefined && "" !== r) || a(),
          sessionStorage.setItem(
            wc_cart_fragments_params.fragment_name,
            JSON.stringify(t)
          ),
          s(n);
      }),
      n(document.body).on("wc_fragments_refreshed", function() {
        clearTimeout(i), (i = setTimeout(r, 864e5));
      }),
      n(window).on("storage onstorage", function(e) {
        o === e.originalEvent.key &&
          localStorage.getItem(o) !== sessionStorage.getItem(o) &&
          r();
      }),
      n(window).on("pageshow", function(e) {
        e.originalEvent.persisted &&
          (n(".widget_shopping_cart_content").empty(),
          n(document.body).trigger("wc_fragment_refresh"));
      });
    try {
      var c = n.parseJSON(
          sessionStorage.getItem(wc_cart_fragments_params.fragment_name)
        ),
        _ = sessionStorage.getItem(o),
        g = Cookies.get("woocommerce_cart_hash"),
        m = sessionStorage.getItem("wc_cart_created");
      if (
        ((null !== _ && _ !== undefined && "" !== _) || (_ = ""),
        (null !== g && g !== undefined && "" !== g) || (g = ""),
        _ && (null === m || m === undefined || "" === m))
      )
        throw "No cart_created";
      if (m) {
        var d = 1 * m + 864e5,
          f = new Date().getTime();
        if (d < f) throw "Fragment expired";
        i = setTimeout(r, d - f);
      }
      if (!c || !c["div.widget_shopping_cart_content"] || _ !== g)
        throw "No fragment";
      n.each(c, function(e, t) {
        n(e).replaceWith(t);
      }),
        n(document.body).trigger("wc_fragments_loaded");
    } catch (w) {
      r();
    }
  } else r();
  0 < Cookies.get("woocommerce_items_in_cart")
    ? n(".hide_cart_widget_if_empty")
        .closest(".widget_shopping_cart")
        .show()
    : n(".hide_cart_widget_if_empty")
        .closest(".widget_shopping_cart")
        .hide(),
    n(document.body).on("adding_to_cart", function() {
      n(".hide_cart_widget_if_empty")
        .closest(".widget_shopping_cart")
        .show();
    });
});
/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function(a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a("object" == typeof exports ? require("jquery") : jQuery);
})(function(a) {
  var b = (function() {
      if (a && a.fn && a.fn.select2 && a.fn.select2.amd)
        var b = a.fn.select2.amd;
      var b;
      return (
        (function() {
          if (!b || !b.requirejs) {
            b ? (c = b) : (b = {});
            var a, c, d;
            !(function(b) {
              function e(a, b) {
                return u.call(a, b);
              }
              function f(a, b) {
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  n = b && b.split("/"),
                  o = s.map,
                  p = (o && o["*"]) || {};
                if (a && "." === a.charAt(0))
                  if (b) {
                    for (
                      a = a.split("/"),
                        g = a.length - 1,
                        s.nodeIdCompat &&
                          w.test(a[g]) &&
                          (a[g] = a[g].replace(w, "")),
                        a = n.slice(0, n.length - 1).concat(a),
                        k = 0;
                      k < a.length;
                      k += 1
                    )
                      if (((m = a[k]), "." === m)) a.splice(k, 1), (k -= 1);
                      else if (".." === m) {
                        if (1 === k && (".." === a[2] || ".." === a[0])) break;
                        k > 0 && (a.splice(k - 1, 2), (k -= 2));
                      }
                    a = a.join("/");
                  } else 0 === a.indexOf("./") && (a = a.substring(2));
                if ((n || p) && o) {
                  for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                    if (((d = c.slice(0, k).join("/")), n))
                      for (l = n.length; l > 0; l -= 1)
                        if (
                          ((e = o[n.slice(0, l).join("/")]), e && (e = e[d]))
                        ) {
                          (f = e), (h = k);
                          break;
                        }
                    if (f) break;
                    !i && p && p[d] && ((i = p[d]), (j = k));
                  }
                  !f && i && ((f = i), (h = j)),
                    f && (c.splice(0, h, f), (a = c.join("/")));
                }
                return a;
              }
              function g(a, c) {
                return function() {
                  var d = v.call(arguments, 0);
                  return (
                    "string" != typeof d[0] && 1 === d.length && d.push(null),
                    n.apply(b, d.concat([a, c]))
                  );
                };
              }
              function h(a) {
                return function(b) {
                  return f(b, a);
                };
              }
              function i(a) {
                return function(b) {
                  q[a] = b;
                };
              }
              function j(a) {
                if (e(r, a)) {
                  var c = r[a];
                  delete r[a], (t[a] = !0), m.apply(b, c);
                }
                if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
                return q[a];
              }
              function k(a) {
                var b,
                  c = a ? a.indexOf("!") : -1;
                return (
                  c > -1 &&
                    ((b = a.substring(0, c)),
                    (a = a.substring(c + 1, a.length))),
                  [b, a]
                );
              }
              function l(a) {
                return function() {
                  return (s && s.config && s.config[a]) || {};
                };
              }
              var m,
                n,
                o,
                p,
                q = {},
                r = {},
                s = {},
                t = {},
                u = Object.prototype.hasOwnProperty,
                v = [].slice,
                w = /\.js$/;
              (o = function(a, b) {
                var c,
                  d = k(a),
                  e = d[0];
                return (
                  (a = d[1]),
                  e && ((e = f(e, b)), (c = j(e))),
                  e
                    ? (a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b))
                    : ((a = f(a, b)),
                      (d = k(a)),
                      (e = d[0]),
                      (a = d[1]),
                      e && (c = j(e))),
                  { f: e ? e + "!" + a : a, n: a, pr: e, p: c }
                );
              }),
                (p = {
                  require: function(a) {
                    return g(a);
                  },
                  exports: function(a) {
                    var b = q[a];
                    return "undefined" != typeof b ? b : (q[a] = {});
                  },
                  module: function(a) {
                    return { id: a, uri: "", exports: q[a], config: l(a) };
                  }
                }),
                (m = function(a, c, d, f) {
                  var h,
                    k,
                    l,
                    m,
                    n,
                    s,
                    u = [],
                    v = typeof d;
                  if (((f = f || a), "undefined" === v || "function" === v)) {
                    for (
                      c =
                        !c.length && d.length
                          ? ["require", "exports", "module"]
                          : c,
                        n = 0;
                      n < c.length;
                      n += 1
                    )
                      if (((m = o(c[n], f)), (k = m.f), "require" === k))
                        u[n] = p.require(a);
                      else if ("exports" === k) (u[n] = p.exports(a)), (s = !0);
                      else if ("module" === k) h = u[n] = p.module(a);
                      else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
                      else {
                        if (!m.p) throw new Error(a + " missing " + k);
                        m.p.load(m.n, g(f, !0), i(k), {}), (u[n] = q[k]);
                      }
                    (l = d ? d.apply(q[a], u) : void 0),
                      a &&
                        (h && h.exports !== b && h.exports !== q[a]
                          ? (q[a] = h.exports)
                          : (l === b && s) || (q[a] = l));
                  } else a && (q[a] = d);
                }),
                (a = c = n = function(a, c, d, e, f) {
                  if ("string" == typeof a)
                    return p[a] ? p[a](c) : j(o(a, c).f);
                  if (!a.splice) {
                    if (((s = a), s.deps && n(s.deps, s.callback), !c)) return;
                    c.splice ? ((a = c), (c = d), (d = null)) : (a = b);
                  }
                  return (
                    (c = c || function() {}),
                    "function" == typeof d && ((d = e), (e = f)),
                    e
                      ? m(b, a, c, d)
                      : setTimeout(function() {
                          m(b, a, c, d);
                        }, 4),
                    n
                  );
                }),
                (n.config = function(a) {
                  return n(a);
                }),
                (a._defined = q),
                (d = function(a, b, c) {
                  if ("string" != typeof a)
                    throw new Error(
                      "See almond README: incorrect module build, no module name"
                    );
                  b.splice || ((c = b), (b = [])),
                    e(q, a) || e(r, a) || (r[a] = [a, b, c]);
                }),
                (d.amd = { jQuery: !0 });
            })(),
              (b.requirejs = a),
              (b.require = c),
              (b.define = d);
          }
        })(),
        b.define("almond", function() {}),
        b.define("jquery", [], function() {
          var b = a || $;
          return (
            null == b &&
              console &&
              console.error &&
              console.error(
                "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
              ),
            b
          );
        }),
        b.define("select2/utils", ["jquery"], function(a) {
          function b(a) {
            var b = a.prototype,
              c = [];
            for (var d in b) {
              var e = b[d];
              "function" == typeof e && "constructor" !== d && c.push(d);
            }
            return c;
          }
          var c = {};
          (c.Extend = function(a, b) {
            function c() {
              this.constructor = a;
            }
            var d = {}.hasOwnProperty;
            for (var e in b) d.call(b, e) && (a[e] = b[e]);
            return (
              (c.prototype = b.prototype),
              (a.prototype = new c()),
              (a.__super__ = b.prototype),
              a
            );
          }),
            (c.Decorate = function(a, c) {
              function d() {
                var b = Array.prototype.unshift,
                  d = c.prototype.constructor.length,
                  e = a.prototype.constructor;
                d > 0 &&
                  (b.call(arguments, a.prototype.constructor),
                  (e = c.prototype.constructor)),
                  e.apply(this, arguments);
              }
              function e() {
                this.constructor = d;
              }
              var f = b(c),
                g = b(a);
              (c.displayName = a.displayName), (d.prototype = new e());
              for (var h = 0; h < g.length; h++) {
                var i = g[h];
                d.prototype[i] = a.prototype[i];
              }
              for (
                var j = function(a) {
                    var b = function() {};
                    (a in d.prototype) && (b = d.prototype[a]);
                    var e = c.prototype[a];
                    return function() {
                      var a = Array.prototype.unshift;
                      return a.call(arguments, b), e.apply(this, arguments);
                    };
                  },
                  k = 0;
                k < f.length;
                k++
              ) {
                var l = f[k];
                d.prototype[l] = j(l);
              }
              return d;
            });
          var d = function() {
            this.listeners = {};
          };
          return (
            (d.prototype.on = function(a, b) {
              (this.listeners = this.listeners || {}),
                a in this.listeners
                  ? this.listeners[a].push(b)
                  : (this.listeners[a] = [b]);
            }),
            (d.prototype.trigger = function(a) {
              var b = Array.prototype.slice,
                c = b.call(arguments, 1);
              (this.listeners = this.listeners || {}),
                null == c && (c = []),
                0 === c.length && c.push({}),
                (c[0]._type = a),
                a in this.listeners &&
                  this.invoke(this.listeners[a], b.call(arguments, 1)),
                "*" in this.listeners &&
                  this.invoke(this.listeners["*"], arguments);
            }),
            (d.prototype.invoke = function(a, b) {
              for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b);
            }),
            (c.Observable = d),
            (c.generateChars = function(a) {
              for (var b = "", c = 0; a > c; c++) {
                var d = Math.floor(36 * Math.random());
                b += d.toString(36);
              }
              return b;
            }),
            (c.bind = function(a, b) {
              return function() {
                a.apply(b, arguments);
              };
            }),
            (c._convertData = function(a) {
              for (var b in a) {
                var c = b.split("-"),
                  d = a;
                if (1 !== c.length) {
                  for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    (f = f.substring(0, 1).toLowerCase() + f.substring(1)),
                      f in d || (d[f] = {}),
                      e == c.length - 1 && (d[f] = a[b]),
                      (d = d[f]);
                  }
                  delete a[b];
                }
              }
              return a;
            }),
            (c.hasScroll = function(b, c) {
              var d = a(c),
                e = c.style.overflowX,
                f = c.style.overflowY;
              return e !== f || ("hidden" !== f && "visible" !== f)
                ? "scroll" === e || "scroll" === f
                  ? !0
                  : d.innerHeight() < c.scrollHeight ||
                    d.innerWidth() < c.scrollWidth
                : !1;
            }),
            (c.escapeMarkup = function(a) {
              var b = {
                "\\": "&#92;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#47;"
              };
              return "string" != typeof a
                ? a
                : String(a).replace(/[&<>"'\/\\]/g, function(a) {
                    return b[a];
                  });
            }),
            (c.appendMany = function(b, c) {
              if ("1.7" === a.fn.jquery.substr(0, 3)) {
                var d = a();
                a.map(c, function(a) {
                  d = d.add(a);
                }),
                  (c = d);
              }
              b.append(c);
            }),
            c
          );
        }),
        b.define("select2/results", ["jquery", "./utils"], function(a, b) {
          function c(a, b, d) {
            (this.$element = a),
              (this.data = d),
              (this.options = b),
              c.__super__.constructor.call(this);
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function() {
              var b = a(
                '<ul class="select2-results__options" role="tree"></ul>'
              );
              return (
                this.options.get("multiple") &&
                  b.attr("aria-multiselectable", "true"),
                (this.$results = b),
                b
              );
            }),
            (c.prototype.clear = function() {
              this.$results.empty();
            }),
            (c.prototype.displayMessage = function(b) {
              var c = this.options.get("escapeMarkup");
              this.clear(), this.hideLoading();
              var d = a(
                  '<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'
                ),
                e = this.options.get("translations").get(b.message);
              d.append(c(e(b.args))),
                (d[0].className += " select2-results__message"),
                this.$results.append(d);
            }),
            (c.prototype.hideMessages = function() {
              this.$results.find(".select2-results__message").remove();
            }),
            (c.prototype.append = function(a) {
              this.hideLoading();
              var b = [];
              if (null == a.results || 0 === a.results.length)
                return void (
                  0 === this.$results.children().length &&
                  this.trigger("results:message", { message: "noResults" })
                );
              a.results = this.sort(a.results);
              for (var c = 0; c < a.results.length; c++) {
                var d = a.results[c],
                  e = this.option(d);
                b.push(e);
              }
              this.$results.append(b);
            }),
            (c.prototype.position = function(a, b) {
              var c = b.find(".select2-results");
              c.append(a);
            }),
            (c.prototype.sort = function(a) {
              var b = this.options.get("sorter");
              return b(a);
            }),
            (c.prototype.highlightFirstItem = function() {
              var a = this.$results.find(
                  ".select2-results__option[aria-selected]"
                ),
                b = a.filter("[aria-selected=true]");
              b.length > 0
                ? b.first().trigger("mouseenter")
                : a.first().trigger("mouseenter"),
                this.ensureHighlightVisible();
            }),
            (c.prototype.setClasses = function() {
              var b = this;
              this.data.current(function(c) {
                var d = a.map(c, function(a) {
                    return a.id.toString();
                  }),
                  e = b.$results.find(
                    ".select2-results__option[aria-selected]"
                  );
                e.each(function() {
                  var b = a(this),
                    c = a.data(this, "data"),
                    e = "" + c.id;
                  (null != c.element && c.element.selected) ||
                  (null == c.element && a.inArray(e, d) > -1)
                    ? b.attr("aria-selected", "true")
                    : b.attr("aria-selected", "false");
                });
              });
            }),
            (c.prototype.showLoading = function(a) {
              this.hideLoading();
              var b = this.options.get("translations").get("searching"),
                c = { disabled: !0, loading: !0, text: b(a) },
                d = this.option(c);
              (d.className += " loading-results"), this.$results.prepend(d);
            }),
            (c.prototype.hideLoading = function() {
              this.$results.find(".loading-results").remove();
            }),
            (c.prototype.option = function(b) {
              var c = document.createElement("li");
              c.className = "select2-results__option";
              var d = { role: "treeitem", "aria-selected": "false" };
              b.disabled &&
                (delete d["aria-selected"], (d["aria-disabled"] = "true")),
                null == b.id && delete d["aria-selected"],
                null != b._resultId && (c.id = b._resultId),
                b.title && (c.title = b.title),
                b.children &&
                  ((d.role = "group"),
                  (d["aria-label"] = b.text),
                  delete d["aria-selected"]);
              for (var e in d) {
                var f = d[e];
                c.setAttribute(e, f);
              }
              if (b.children) {
                var g = a(c),
                  h = document.createElement("strong");
                h.className = "select2-results__group";
                a(h);
                this.template(b, h);
                for (var i = [], j = 0; j < b.children.length; j++) {
                  var k = b.children[j],
                    l = this.option(k);
                  i.push(l);
                }
                var m = a("<ul></ul>", {
                  class:
                    "select2-results__options select2-results__options--nested"
                });
                m.append(i), g.append(h), g.append(m);
              } else this.template(b, c);
              return a.data(c, "data", b), c;
            }),
            (c.prototype.bind = function(b, c) {
              var d = this,
                e = b.id + "-results";
              this.$results.attr("id", e),
                b.on("results:all", function(a) {
                  d.clear(),
                    d.append(a.data),
                    b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }),
                b.on("results:append", function(a) {
                  d.append(a.data), b.isOpen() && d.setClasses();
                }),
                b.on("query", function(a) {
                  d.hideMessages(), d.showLoading(a);
                }),
                b.on("select", function() {
                  b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }),
                b.on("unselect", function() {
                  b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }),
                b.on("open", function() {
                  d.$results.attr("aria-expanded", "true"),
                    d.$results.attr("aria-hidden", "false"),
                    d.setClasses(),
                    d.ensureHighlightVisible();
                }),
                b.on("close", function() {
                  d.$results.attr("aria-expanded", "false"),
                    d.$results.attr("aria-hidden", "true"),
                    d.$results.removeAttr("aria-activedescendant");
                }),
                b.on("results:toggle", function() {
                  var a = d.getHighlightedResults();
                  0 !== a.length && a.trigger("mouseup");
                }),
                b.on("results:select", function() {
                  var a = d.getHighlightedResults();
                  if (0 !== a.length) {
                    var b = a.data("data");
                    "true" == a.attr("aria-selected")
                      ? d.trigger("close", {})
                      : d.trigger("select", { data: b });
                  }
                }),
                b.on("results:previous", function() {
                  var a = d.getHighlightedResults(),
                    b = d.$results.find("[aria-selected]"),
                    c = b.index(a);
                  if (0 !== c) {
                    var e = c - 1;
                    0 === a.length && (e = 0);
                    var f = b.eq(e);
                    f.trigger("mouseenter");
                    var g = d.$results.offset().top,
                      h = f.offset().top,
                      i = d.$results.scrollTop() + (h - g);
                    0 === e
                      ? d.$results.scrollTop(0)
                      : 0 > h - g && d.$results.scrollTop(i);
                  }
                }),
                b.on("results:next", function() {
                  var a = d.getHighlightedResults(),
                    b = d.$results.find("[aria-selected]"),
                    c = b.index(a),
                    e = c + 1;
                  if (!(e >= b.length)) {
                    var f = b.eq(e);
                    f.trigger("mouseenter");
                    var g =
                        d.$results.offset().top + d.$results.outerHeight(!1),
                      h = f.offset().top + f.outerHeight(!1),
                      i = d.$results.scrollTop() + h - g;
                    0 === e
                      ? d.$results.scrollTop(0)
                      : h > g && d.$results.scrollTop(i);
                  }
                }),
                b.on("results:focus", function(a) {
                  a.element.addClass("select2-results__option--highlighted");
                }),
                b.on("results:message", function(a) {
                  d.displayMessage(a);
                }),
                a.fn.mousewheel &&
                  this.$results.on("mousewheel", function(a) {
                    var b = d.$results.scrollTop(),
                      c = d.$results.get(0).scrollHeight - b + a.deltaY,
                      e = a.deltaY > 0 && b - a.deltaY <= 0,
                      f = a.deltaY < 0 && c <= d.$results.height();
                    e
                      ? (d.$results.scrollTop(0),
                        a.preventDefault(),
                        a.stopPropagation())
                      : f &&
                        (d.$results.scrollTop(
                          d.$results.get(0).scrollHeight - d.$results.height()
                        ),
                        a.preventDefault(),
                        a.stopPropagation());
                  }),
                this.$results.on(
                  "mouseup",
                  ".select2-results__option[aria-selected]",
                  function(b) {
                    var c = a(this),
                      e = c.data("data");
                    return "true" === c.attr("aria-selected")
                      ? void (d.options.get("multiple")
                          ? d.trigger("unselect", { originalEvent: b, data: e })
                          : d.trigger("close", {}))
                      : void d.trigger("select", { originalEvent: b, data: e });
                  }
                ),
                this.$results.on(
                  "mouseenter",
                  ".select2-results__option[aria-selected]",
                  function(b) {
                    var c = a(this).data("data");
                    d
                      .getHighlightedResults()
                      .removeClass("select2-results__option--highlighted"),
                      d.trigger("results:focus", { data: c, element: a(this) });
                  }
                );
            }),
            (c.prototype.getHighlightedResults = function() {
              var a = this.$results.find(
                ".select2-results__option--highlighted"
              );
              return a;
            }),
            (c.prototype.destroy = function() {
              this.$results.remove();
            }),
            (c.prototype.ensureHighlightVisible = function() {
              var a = this.getHighlightedResults();
              if (0 !== a.length) {
                var b = this.$results.find("[aria-selected]"),
                  c = b.index(a),
                  d = this.$results.offset().top,
                  e = a.offset().top,
                  f = this.$results.scrollTop() + (e - d),
                  g = e - d;
                (f -= 2 * a.outerHeight(!1)),
                  2 >= c
                    ? this.$results.scrollTop(0)
                    : (g > this.$results.outerHeight() || 0 > g) &&
                      this.$results.scrollTop(f);
              }
            }),
            (c.prototype.template = function(b, c) {
              var d = this.options.get("templateResult"),
                e = this.options.get("escapeMarkup"),
                f = d(b, c);
              null == f
                ? (c.style.display = "none")
                : "string" == typeof f
                  ? (c.innerHTML = e(f))
                  : a(c).append(f);
            }),
            c
          );
        }),
        b.define("select2/keys", [], function() {
          var a = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          };
          return a;
        }),
        b.define(
          "select2/selection/base",
          ["jquery", "../utils", "../keys"],
          function(a, b, c) {
            function d(a, b) {
              (this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this);
            }
            return (
              b.Extend(d, b.Observable),
              (d.prototype.render = function() {
                var b = a(
                  '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
                );
                return (
                  (this._tabindex = 0),
                  null != this.$element.data("old-tabindex")
                    ? (this._tabindex = this.$element.data("old-tabindex"))
                    : null != this.$element.attr("tabindex") &&
                      (this._tabindex = this.$element.attr("tabindex")),
                  b.attr("title", this.$element.attr("title")),
                  b.attr("tabindex", this._tabindex),
                  (this.$selection = b),
                  b
                );
              }),
              (d.prototype.bind = function(a, b) {
                var d = this,
                  e = (a.id + "-container", a.id + "-results");
                (this.container = a),
                  this.$selection.on("focus", function(a) {
                    d.trigger("focus", a);
                  }),
                  this.$selection.on("blur", function(a) {
                    d._handleBlur(a);
                  }),
                  this.$selection.on("keydown", function(a) {
                    d.trigger("keypress", a),
                      a.which === c.SPACE && a.preventDefault();
                  }),
                  a.on("results:focus", function(a) {
                    d.$selection.attr(
                      "aria-activedescendant",
                      a.data._resultId
                    );
                  }),
                  a.on("selection:update", function(a) {
                    d.update(a.data);
                  }),
                  a.on("open", function() {
                    d.$selection.attr("aria-expanded", "true"),
                      d.$selection.attr("aria-owns", e),
                      d._attachCloseHandler(a);
                  }),
                  a.on("close", function() {
                    d.$selection.attr("aria-expanded", "false"),
                      d.$selection.removeAttr("aria-activedescendant"),
                      d.$selection.removeAttr("aria-owns"),
                      d.$selection.focus(),
                      d._detachCloseHandler(a);
                  }),
                  a.on("enable", function() {
                    d.$selection.attr("tabindex", d._tabindex);
                  }),
                  a.on("disable", function() {
                    d.$selection.attr("tabindex", "-1");
                  });
              }),
              (d.prototype._handleBlur = function(b) {
                var c = this;
                window.setTimeout(function() {
                  document.activeElement == c.$selection[0] ||
                    a.contains(c.$selection[0], document.activeElement) ||
                    c.trigger("blur", b);
                }, 1);
              }),
              (d.prototype._attachCloseHandler = function(b) {
                a(document.body).on("mousedown.select2." + b.id, function(b) {
                  var c = a(b.target),
                    d = c.closest(".select2"),
                    e = a(".select2.select2-container--open");
                  e.each(function() {
                    var b = a(this);
                    if (this != d[0]) {
                      var c = b.data("element");
                      c.select2("close");
                    }
                  });
                });
              }),
              (d.prototype._detachCloseHandler = function(b) {
                a(document.body).off("mousedown.select2." + b.id);
              }),
              (d.prototype.position = function(a, b) {
                var c = b.find(".selection");
                c.append(a);
              }),
              (d.prototype.destroy = function() {
                this._detachCloseHandler(this.container);
              }),
              (d.prototype.update = function(a) {
                throw new Error(
                  "The `update` method must be defined in child classes."
                );
              }),
              d
            );
          }
        ),
        b.define(
          "select2/selection/single",
          ["jquery", "./base", "../utils", "../keys"],
          function(a, b, c, d) {
            function e() {
              e.__super__.constructor.apply(this, arguments);
            }
            return (
              c.Extend(e, b),
              (e.prototype.render = function() {
                var a = e.__super__.render.call(this);
                return (
                  a.addClass("select2-selection--single"),
                  a.html(
                    '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                  ),
                  a
                );
              }),
              (e.prototype.bind = function(a, b) {
                var c = this;
                e.__super__.bind.apply(this, arguments);
                var d = a.id + "-container";
                this.$selection
                  .find(".select2-selection__rendered")
                  .attr("id", d),
                  this.$selection.attr("aria-labelledby", d),
                  this.$selection.on("mousedown", function(a) {
                    1 === a.which && c.trigger("toggle", { originalEvent: a });
                  }),
                  this.$selection.on("focus", function(a) {}),
                  this.$selection.on("blur", function(a) {}),
                  a.on("focus", function(b) {
                    a.isOpen() || c.$selection.focus();
                  }),
                  a.on("selection:update", function(a) {
                    c.update(a.data);
                  });
              }),
              (e.prototype.clear = function() {
                this.$selection.find(".select2-selection__rendered").empty();
              }),
              (e.prototype.display = function(a, b) {
                var c = this.options.get("templateSelection"),
                  d = this.options.get("escapeMarkup");
                return d(c(a, b));
              }),
              (e.prototype.selectionContainer = function() {
                return a("<span></span>");
              }),
              (e.prototype.update = function(a) {
                if (0 === a.length) return void this.clear();
                var b = a[0],
                  c = this.$selection.find(".select2-selection__rendered"),
                  d = this.display(b, c);
                c.empty().append(d), c.prop("title", b.title || b.text);
              }),
              e
            );
          }
        ),
        b.define(
          "select2/selection/multiple",
          ["jquery", "./base", "../utils"],
          function(a, b, c) {
            function d(a, b) {
              d.__super__.constructor.apply(this, arguments);
            }
            return (
              c.Extend(d, b),
              (d.prototype.render = function() {
                var a = d.__super__.render.call(this);
                return (
                  a.addClass("select2-selection--multiple"),
                  a.html('<ul class="select2-selection__rendered"></ul>'),
                  a
                );
              }),
              (d.prototype.bind = function(b, c) {
                var e = this;
                d.__super__.bind.apply(this, arguments),
                  this.$selection.on("click", function(a) {
                    e.trigger("toggle", { originalEvent: a });
                  }),
                  this.$selection.on(
                    "click",
                    ".select2-selection__choice__remove",
                    function(b) {
                      if (!e.options.get("disabled")) {
                        var c = a(this),
                          d = c.parent(),
                          f = d.data("data");
                        e.trigger("unselect", { originalEvent: b, data: f });
                      }
                    }
                  );
              }),
              (d.prototype.clear = function() {
                this.$selection.find(".select2-selection__rendered").empty();
              }),
              (d.prototype.display = function(a, b) {
                var c = this.options.get("templateSelection"),
                  d = this.options.get("escapeMarkup");
                return d(c(a, b));
              }),
              (d.prototype.selectionContainer = function() {
                var b = a(
                  '<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'
                );
                return b;
              }),
              (d.prototype.update = function(a) {
                if ((this.clear(), 0 !== a.length)) {
                  for (var b = [], d = 0; d < a.length; d++) {
                    var e = a[d],
                      f = this.selectionContainer(),
                      g = this.display(e, f);
                    f.append(g),
                      f.prop("title", e.title || e.text),
                      f.data("data", e),
                      b.push(f);
                  }
                  var h = this.$selection.find(".select2-selection__rendered");
                  c.appendMany(h, b);
                }
              }),
              d
            );
          }
        ),
        b.define("select2/selection/placeholder", ["../utils"], function(a) {
          function b(a, b, c) {
            (this.placeholder = this.normalizePlaceholder(
              c.get("placeholder")
            )),
              a.call(this, b, c);
          }
          return (
            (b.prototype.normalizePlaceholder = function(a, b) {
              return "string" == typeof b && (b = { id: "", text: b }), b;
            }),
            (b.prototype.createPlaceholder = function(a, b) {
              var c = this.selectionContainer();
              return (
                c.html(this.display(b)),
                c
                  .addClass("select2-selection__placeholder")
                  .removeClass("select2-selection__choice"),
                c
              );
            }),
            (b.prototype.update = function(a, b) {
              var c = 1 == b.length && b[0].id != this.placeholder.id,
                d = b.length > 1;
              if (d || c) return a.call(this, b);
              this.clear();
              var e = this.createPlaceholder(this.placeholder);
              this.$selection.find(".select2-selection__rendered").append(e);
            }),
            b
          );
        }),
        b.define(
          "select2/selection/allowClear",
          ["jquery", "../keys"],
          function(a, b) {
            function c() {}
            return (
              (c.prototype.bind = function(a, b, c) {
                var d = this;
                a.call(this, b, c),
                  null == this.placeholder &&
                    this.options.get("debug") &&
                    window.console &&
                    console.error &&
                    console.error(
                      "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                    ),
                  this.$selection.on(
                    "mousedown",
                    ".select2-selection__clear",
                    function(a) {
                      d._handleClear(a);
                    }
                  ),
                  b.on("keypress", function(a) {
                    d._handleKeyboardClear(a, b);
                  });
              }),
              (c.prototype._handleClear = function(a, b) {
                if (!this.options.get("disabled")) {
                  var c = this.$selection.find(".select2-selection__clear");
                  if (0 !== c.length) {
                    b.stopPropagation();
                    for (var d = c.data("data"), e = 0; e < d.length; e++) {
                      var f = { data: d[e] };
                      if ((this.trigger("unselect", f), f.prevented)) return;
                    }
                    this.$element.val(this.placeholder.id).trigger("change"),
                      this.trigger("toggle", {});
                  }
                }
              }),
              (c.prototype._handleKeyboardClear = function(a, c, d) {
                d.isOpen() ||
                  ((c.which == b.DELETE || c.which == b.BACKSPACE) &&
                    this._handleClear(c));
              }),
              (c.prototype.update = function(b, c) {
                if (
                  (b.call(this, c),
                  !(
                    this.$selection.find(".select2-selection__placeholder")
                      .length > 0 || 0 === c.length
                  ))
                ) {
                  var d = a(
                    '<span class="select2-selection__clear">&times;</span>'
                  );
                  d.data("data", c),
                    this.$selection
                      .find(".select2-selection__rendered")
                      .prepend(d);
                }
              }),
              c
            );
          }
        ),
        b.define(
          "select2/selection/search",
          ["jquery", "../utils", "../keys"],
          function(a, b, c) {
            function d(a, b, c) {
              a.call(this, b, c);
            }
            return (
              (d.prototype.render = function(b) {
                var c = a(
                  '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                );
                (this.$searchContainer = c), (this.$search = c.find("input"));
                var d = b.call(this);
                return this._transferTabIndex(), d;
              }),
              (d.prototype.bind = function(a, b, d) {
                var e = this;
                a.call(this, b, d),
                  b.on("open", function() {
                    e.$search.trigger("focus");
                  }),
                  b.on("close", function() {
                    e.$search.val(""),
                      e.$search.removeAttr("aria-activedescendant"),
                      e.$search.trigger("focus");
                  }),
                  b.on("enable", function() {
                    e.$search.prop("disabled", !1), e._transferTabIndex();
                  }),
                  b.on("disable", function() {
                    e.$search.prop("disabled", !0);
                  }),
                  b.on("focus", function(a) {
                    e.$search.trigger("focus");
                  }),
                  b.on("results:focus", function(a) {
                    e.$search.attr("aria-activedescendant", a.id);
                  }),
                  this.$selection.on(
                    "focusin",
                    ".select2-search--inline",
                    function(a) {
                      e.trigger("focus", a);
                    }
                  ),
                  this.$selection.on(
                    "focusout",
                    ".select2-search--inline",
                    function(a) {
                      e._handleBlur(a);
                    }
                  ),
                  this.$selection.on(
                    "keydown",
                    ".select2-search--inline",
                    function(a) {
                      a.stopPropagation(),
                        e.trigger("keypress", a),
                        (e._keyUpPrevented = a.isDefaultPrevented());
                      var b = a.which;
                      if (b === c.BACKSPACE && "" === e.$search.val()) {
                        var d = e.$searchContainer.prev(
                          ".select2-selection__choice"
                        );
                        if (d.length > 0) {
                          var f = d.data("data");
                          e.searchRemoveChoice(f), a.preventDefault();
                        }
                      }
                    }
                  );
                var f = document.documentMode,
                  g = f && 11 >= f;
                this.$selection.on(
                  "input.searchcheck",
                  ".select2-search--inline",
                  function(a) {
                    return g
                      ? void e.$selection.off("input.search input.searchcheck")
                      : void e.$selection.off("keyup.search");
                  }
                ),
                  this.$selection.on(
                    "keyup.search input.search",
                    ".select2-search--inline",
                    function(a) {
                      if (g && "input" === a.type)
                        return void e.$selection.off(
                          "input.search input.searchcheck"
                        );
                      var b = a.which;
                      b != c.SHIFT &&
                        b != c.CTRL &&
                        b != c.ALT &&
                        b != c.TAB &&
                        e.handleSearch(a);
                    }
                  );
              }),
              (d.prototype._transferTabIndex = function(a) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                  this.$selection.attr("tabindex", "-1");
              }),
              (d.prototype.createPlaceholder = function(a, b) {
                this.$search.attr("placeholder", b.text);
              }),
              (d.prototype.update = function(a, b) {
                var c = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", ""),
                  a.call(this, b),
                  this.$selection
                    .find(".select2-selection__rendered")
                    .append(this.$searchContainer),
                  this.resizeSearch(),
                  c && this.$search.focus();
              }),
              (d.prototype.handleSearch = function() {
                if ((this.resizeSearch(), !this._keyUpPrevented)) {
                  var a = this.$search.val();
                  this.trigger("query", { term: a });
                }
                this._keyUpPrevented = !1;
              }),
              (d.prototype.searchRemoveChoice = function(a, b) {
                this.trigger("unselect", { data: b }),
                  this.$search.val(b.text),
                  this.handleSearch();
              }),
              (d.prototype.resizeSearch = function() {
                this.$search.css("width", "25px");
                var a = "";
                if ("" !== this.$search.attr("placeholder"))
                  a = this.$selection
                    .find(".select2-selection__rendered")
                    .innerWidth();
                else {
                  var b = this.$search.val().length + 1;
                  a = 0.75 * b + "em";
                }
                this.$search.css("width", a);
              }),
              d
            );
          }
        ),
        b.define("select2/selection/eventRelay", ["jquery"], function(a) {
          function b() {}
          return (
            (b.prototype.bind = function(b, c, d) {
              var e = this,
                f = [
                  "open",
                  "opening",
                  "close",
                  "closing",
                  "select",
                  "selecting",
                  "unselect",
                  "unselecting"
                ],
                g = ["opening", "closing", "selecting", "unselecting"];
              b.call(this, c, d),
                c.on("*", function(b, c) {
                  if (-1 !== a.inArray(b, f)) {
                    c = c || {};
                    var d = a.Event("select2:" + b, { params: c });
                    e.$element.trigger(d),
                      -1 !== a.inArray(b, g) &&
                        (c.prevented = d.isDefaultPrevented());
                  }
                });
            }),
            b
          );
        }),
        b.define("select2/translation", ["jquery", "require"], function(a, b) {
          function c(a) {
            this.dict = a || {};
          }
          return (
            (c.prototype.all = function() {
              return this.dict;
            }),
            (c.prototype.get = function(a) {
              return this.dict[a];
            }),
            (c.prototype.extend = function(b) {
              this.dict = a.extend({}, b.all(), this.dict);
            }),
            (c._cache = {}),
            (c.loadPath = function(a) {
              if (!(a in c._cache)) {
                var d = b(a);
                c._cache[a] = d;
              }
              return new c(c._cache[a]);
            }),
            c
          );
        }),
        b.define("select2/diacritics", [], function() {
          var a = {
            "Ⓐ": "A",
            Ａ: "A",
            À: "A",
            Á: "A",
            Â: "A",
            Ầ: "A",
            Ấ: "A",
            Ẫ: "A",
            Ẩ: "A",
            Ã: "A",
            Ā: "A",
            Ă: "A",
            Ằ: "A",
            Ắ: "A",
            Ẵ: "A",
            Ẳ: "A",
            Ȧ: "A",
            Ǡ: "A",
            Ä: "A",
            Ǟ: "A",
            Ả: "A",
            Å: "A",
            Ǻ: "A",
            Ǎ: "A",
            Ȁ: "A",
            Ȃ: "A",
            Ạ: "A",
            Ậ: "A",
            Ặ: "A",
            Ḁ: "A",
            Ą: "A",
            Ⱥ: "A",
            Ɐ: "A",
            Ꜳ: "AA",
            Æ: "AE",
            Ǽ: "AE",
            Ǣ: "AE",
            Ꜵ: "AO",
            Ꜷ: "AU",
            Ꜹ: "AV",
            Ꜻ: "AV",
            Ꜽ: "AY",
            "Ⓑ": "B",
            Ｂ: "B",
            Ḃ: "B",
            Ḅ: "B",
            Ḇ: "B",
            Ƀ: "B",
            Ƃ: "B",
            Ɓ: "B",
            "Ⓒ": "C",
            Ｃ: "C",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            Ç: "C",
            Ḉ: "C",
            Ƈ: "C",
            Ȼ: "C",
            Ꜿ: "C",
            "Ⓓ": "D",
            Ｄ: "D",
            Ḋ: "D",
            Ď: "D",
            Ḍ: "D",
            Ḑ: "D",
            Ḓ: "D",
            Ḏ: "D",
            Đ: "D",
            Ƌ: "D",
            Ɗ: "D",
            Ɖ: "D",
            Ꝺ: "D",
            Ǳ: "DZ",
            Ǆ: "DZ",
            ǲ: "Dz",
            ǅ: "Dz",
            "Ⓔ": "E",
            Ｅ: "E",
            È: "E",
            É: "E",
            Ê: "E",
            Ề: "E",
            Ế: "E",
            Ễ: "E",
            Ể: "E",
            Ẽ: "E",
            Ē: "E",
            Ḕ: "E",
            Ḗ: "E",
            Ĕ: "E",
            Ė: "E",
            Ë: "E",
            Ẻ: "E",
            Ě: "E",
            Ȅ: "E",
            Ȇ: "E",
            Ẹ: "E",
            Ệ: "E",
            Ȩ: "E",
            Ḝ: "E",
            Ę: "E",
            Ḙ: "E",
            Ḛ: "E",
            Ɛ: "E",
            Ǝ: "E",
            "Ⓕ": "F",
            Ｆ: "F",
            Ḟ: "F",
            Ƒ: "F",
            Ꝼ: "F",
            "Ⓖ": "G",
            Ｇ: "G",
            Ǵ: "G",
            Ĝ: "G",
            Ḡ: "G",
            Ğ: "G",
            Ġ: "G",
            Ǧ: "G",
            Ģ: "G",
            Ǥ: "G",
            Ɠ: "G",
            Ꞡ: "G",
            Ᵹ: "G",
            Ꝿ: "G",
            "Ⓗ": "H",
            Ｈ: "H",
            Ĥ: "H",
            Ḣ: "H",
            Ḧ: "H",
            Ȟ: "H",
            Ḥ: "H",
            Ḩ: "H",
            Ḫ: "H",
            Ħ: "H",
            Ⱨ: "H",
            Ⱶ: "H",
            Ɥ: "H",
            "Ⓘ": "I",
            Ｉ: "I",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            İ: "I",
            Ï: "I",
            Ḯ: "I",
            Ỉ: "I",
            Ǐ: "I",
            Ȉ: "I",
            Ȋ: "I",
            Ị: "I",
            Į: "I",
            Ḭ: "I",
            Ɨ: "I",
            "Ⓙ": "J",
            Ｊ: "J",
            Ĵ: "J",
            Ɉ: "J",
            "Ⓚ": "K",
            Ｋ: "K",
            Ḱ: "K",
            Ǩ: "K",
            Ḳ: "K",
            Ķ: "K",
            Ḵ: "K",
            Ƙ: "K",
            Ⱪ: "K",
            Ꝁ: "K",
            Ꝃ: "K",
            Ꝅ: "K",
            Ꞣ: "K",
            "Ⓛ": "L",
            Ｌ: "L",
            Ŀ: "L",
            Ĺ: "L",
            Ľ: "L",
            Ḷ: "L",
            Ḹ: "L",
            Ļ: "L",
            Ḽ: "L",
            Ḻ: "L",
            Ł: "L",
            Ƚ: "L",
            Ɫ: "L",
            Ⱡ: "L",
            Ꝉ: "L",
            Ꝇ: "L",
            Ꞁ: "L",
            Ǉ: "LJ",
            ǈ: "Lj",
            "Ⓜ": "M",
            Ｍ: "M",
            Ḿ: "M",
            Ṁ: "M",
            Ṃ: "M",
            Ɱ: "M",
            Ɯ: "M",
            "Ⓝ": "N",
            Ｎ: "N",
            Ǹ: "N",
            Ń: "N",
            Ñ: "N",
            Ṅ: "N",
            Ň: "N",
            Ṇ: "N",
            Ņ: "N",
            Ṋ: "N",
            Ṉ: "N",
            Ƞ: "N",
            Ɲ: "N",
            Ꞑ: "N",
            Ꞥ: "N",
            Ǌ: "NJ",
            ǋ: "Nj",
            "Ⓞ": "O",
            Ｏ: "O",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Ồ: "O",
            Ố: "O",
            Ỗ: "O",
            Ổ: "O",
            Õ: "O",
            Ṍ: "O",
            Ȭ: "O",
            Ṏ: "O",
            Ō: "O",
            Ṑ: "O",
            Ṓ: "O",
            Ŏ: "O",
            Ȯ: "O",
            Ȱ: "O",
            Ö: "O",
            Ȫ: "O",
            Ỏ: "O",
            Ő: "O",
            Ǒ: "O",
            Ȍ: "O",
            Ȏ: "O",
            Ơ: "O",
            Ờ: "O",
            Ớ: "O",
            Ỡ: "O",
            Ở: "O",
            Ợ: "O",
            Ọ: "O",
            Ộ: "O",
            Ǫ: "O",
            Ǭ: "O",
            Ø: "O",
            Ǿ: "O",
            Ɔ: "O",
            Ɵ: "O",
            Ꝋ: "O",
            Ꝍ: "O",
            Ƣ: "OI",
            Ꝏ: "OO",
            Ȣ: "OU",
            "Ⓟ": "P",
            Ｐ: "P",
            Ṕ: "P",
            Ṗ: "P",
            Ƥ: "P",
            Ᵽ: "P",
            Ꝑ: "P",
            Ꝓ: "P",
            Ꝕ: "P",
            "Ⓠ": "Q",
            Ｑ: "Q",
            Ꝗ: "Q",
            Ꝙ: "Q",
            Ɋ: "Q",
            "Ⓡ": "R",
            Ｒ: "R",
            Ŕ: "R",
            Ṙ: "R",
            Ř: "R",
            Ȑ: "R",
            Ȓ: "R",
            Ṛ: "R",
            Ṝ: "R",
            Ŗ: "R",
            Ṟ: "R",
            Ɍ: "R",
            Ɽ: "R",
            Ꝛ: "R",
            Ꞧ: "R",
            Ꞃ: "R",
            "Ⓢ": "S",
            Ｓ: "S",
            ẞ: "S",
            Ś: "S",
            Ṥ: "S",
            Ŝ: "S",
            Ṡ: "S",
            Š: "S",
            Ṧ: "S",
            Ṣ: "S",
            Ṩ: "S",
            Ș: "S",
            Ş: "S",
            Ȿ: "S",
            Ꞩ: "S",
            Ꞅ: "S",
            "Ⓣ": "T",
            Ｔ: "T",
            Ṫ: "T",
            Ť: "T",
            Ṭ: "T",
            Ț: "T",
            Ţ: "T",
            Ṱ: "T",
            Ṯ: "T",
            Ŧ: "T",
            Ƭ: "T",
            Ʈ: "T",
            Ⱦ: "T",
            Ꞇ: "T",
            Ꜩ: "TZ",
            "Ⓤ": "U",
            Ｕ: "U",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ũ: "U",
            Ṹ: "U",
            Ū: "U",
            Ṻ: "U",
            Ŭ: "U",
            Ü: "U",
            Ǜ: "U",
            Ǘ: "U",
            Ǖ: "U",
            Ǚ: "U",
            Ủ: "U",
            Ů: "U",
            Ű: "U",
            Ǔ: "U",
            Ȕ: "U",
            Ȗ: "U",
            Ư: "U",
            Ừ: "U",
            Ứ: "U",
            Ữ: "U",
            Ử: "U",
            Ự: "U",
            Ụ: "U",
            Ṳ: "U",
            Ų: "U",
            Ṷ: "U",
            Ṵ: "U",
            Ʉ: "U",
            "Ⓥ": "V",
            Ｖ: "V",
            Ṽ: "V",
            Ṿ: "V",
            Ʋ: "V",
            Ꝟ: "V",
            Ʌ: "V",
            Ꝡ: "VY",
            "Ⓦ": "W",
            Ｗ: "W",
            Ẁ: "W",
            Ẃ: "W",
            Ŵ: "W",
            Ẇ: "W",
            Ẅ: "W",
            Ẉ: "W",
            Ⱳ: "W",
            "Ⓧ": "X",
            Ｘ: "X",
            Ẋ: "X",
            Ẍ: "X",
            "Ⓨ": "Y",
            Ｙ: "Y",
            Ỳ: "Y",
            Ý: "Y",
            Ŷ: "Y",
            Ỹ: "Y",
            Ȳ: "Y",
            Ẏ: "Y",
            Ÿ: "Y",
            Ỷ: "Y",
            Ỵ: "Y",
            Ƴ: "Y",
            Ɏ: "Y",
            Ỿ: "Y",
            "Ⓩ": "Z",
            Ｚ: "Z",
            Ź: "Z",
            Ẑ: "Z",
            Ż: "Z",
            Ž: "Z",
            Ẓ: "Z",
            Ẕ: "Z",
            Ƶ: "Z",
            Ȥ: "Z",
            Ɀ: "Z",
            Ⱬ: "Z",
            Ꝣ: "Z",
            "ⓐ": "a",
            ａ: "a",
            ẚ: "a",
            à: "a",
            á: "a",
            â: "a",
            ầ: "a",
            ấ: "a",
            ẫ: "a",
            ẩ: "a",
            ã: "a",
            ā: "a",
            ă: "a",
            ằ: "a",
            ắ: "a",
            ẵ: "a",
            ẳ: "a",
            ȧ: "a",
            ǡ: "a",
            ä: "a",
            ǟ: "a",
            ả: "a",
            å: "a",
            ǻ: "a",
            ǎ: "a",
            ȁ: "a",
            ȃ: "a",
            ạ: "a",
            ậ: "a",
            ặ: "a",
            ḁ: "a",
            ą: "a",
            ⱥ: "a",
            ɐ: "a",
            ꜳ: "aa",
            æ: "ae",
            ǽ: "ae",
            ǣ: "ae",
            ꜵ: "ao",
            ꜷ: "au",
            ꜹ: "av",
            ꜻ: "av",
            ꜽ: "ay",
            "ⓑ": "b",
            ｂ: "b",
            ḃ: "b",
            ḅ: "b",
            ḇ: "b",
            ƀ: "b",
            ƃ: "b",
            ɓ: "b",
            "ⓒ": "c",
            ｃ: "c",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            ç: "c",
            ḉ: "c",
            ƈ: "c",
            ȼ: "c",
            ꜿ: "c",
            ↄ: "c",
            "ⓓ": "d",
            ｄ: "d",
            ḋ: "d",
            ď: "d",
            ḍ: "d",
            ḑ: "d",
            ḓ: "d",
            ḏ: "d",
            đ: "d",
            ƌ: "d",
            ɖ: "d",
            ɗ: "d",
            ꝺ: "d",
            ǳ: "dz",
            ǆ: "dz",
            "ⓔ": "e",
            ｅ: "e",
            è: "e",
            é: "e",
            ê: "e",
            ề: "e",
            ế: "e",
            ễ: "e",
            ể: "e",
            ẽ: "e",
            ē: "e",
            ḕ: "e",
            ḗ: "e",
            ĕ: "e",
            ė: "e",
            ë: "e",
            ẻ: "e",
            ě: "e",
            ȅ: "e",
            ȇ: "e",
            ẹ: "e",
            ệ: "e",
            ȩ: "e",
            ḝ: "e",
            ę: "e",
            ḙ: "e",
            ḛ: "e",
            ɇ: "e",
            ɛ: "e",
            ǝ: "e",
            "ⓕ": "f",
            ｆ: "f",
            ḟ: "f",
            ƒ: "f",
            ꝼ: "f",
            "ⓖ": "g",
            ｇ: "g",
            ǵ: "g",
            ĝ: "g",
            ḡ: "g",
            ğ: "g",
            ġ: "g",
            ǧ: "g",
            ģ: "g",
            ǥ: "g",
            ɠ: "g",
            ꞡ: "g",
            ᵹ: "g",
            ꝿ: "g",
            "ⓗ": "h",
            ｈ: "h",
            ĥ: "h",
            ḣ: "h",
            ḧ: "h",
            ȟ: "h",
            ḥ: "h",
            ḩ: "h",
            ḫ: "h",
            ẖ: "h",
            ħ: "h",
            ⱨ: "h",
            ⱶ: "h",
            ɥ: "h",
            ƕ: "hv",
            "ⓘ": "i",
            ｉ: "i",
            ì: "i",
            í: "i",
            î: "i",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            ï: "i",
            ḯ: "i",
            ỉ: "i",
            ǐ: "i",
            ȉ: "i",
            ȋ: "i",
            ị: "i",
            į: "i",
            ḭ: "i",
            ɨ: "i",
            ı: "i",
            "ⓙ": "j",
            ｊ: "j",
            ĵ: "j",
            ǰ: "j",
            ɉ: "j",
            "ⓚ": "k",
            ｋ: "k",
            ḱ: "k",
            ǩ: "k",
            ḳ: "k",
            ķ: "k",
            ḵ: "k",
            ƙ: "k",
            ⱪ: "k",
            ꝁ: "k",
            ꝃ: "k",
            ꝅ: "k",
            ꞣ: "k",
            "ⓛ": "l",
            ｌ: "l",
            ŀ: "l",
            ĺ: "l",
            ľ: "l",
            ḷ: "l",
            ḹ: "l",
            ļ: "l",
            ḽ: "l",
            ḻ: "l",
            ſ: "l",
            ł: "l",
            ƚ: "l",
            ɫ: "l",
            ⱡ: "l",
            ꝉ: "l",
            ꞁ: "l",
            ꝇ: "l",
            ǉ: "lj",
            "ⓜ": "m",
            ｍ: "m",
            ḿ: "m",
            ṁ: "m",
            ṃ: "m",
            ɱ: "m",
            ɯ: "m",
            "ⓝ": "n",
            ｎ: "n",
            ǹ: "n",
            ń: "n",
            ñ: "n",
            ṅ: "n",
            ň: "n",
            ṇ: "n",
            ņ: "n",
            ṋ: "n",
            ṉ: "n",
            ƞ: "n",
            ɲ: "n",
            ŉ: "n",
            ꞑ: "n",
            ꞥ: "n",
            ǌ: "nj",
            "ⓞ": "o",
            ｏ: "o",
            ò: "o",
            ó: "o",
            ô: "o",
            ồ: "o",
            ố: "o",
            ỗ: "o",
            ổ: "o",
            õ: "o",
            ṍ: "o",
            ȭ: "o",
            ṏ: "o",
            ō: "o",
            ṑ: "o",
            ṓ: "o",
            ŏ: "o",
            ȯ: "o",
            ȱ: "o",
            ö: "o",
            ȫ: "o",
            ỏ: "o",
            ő: "o",
            ǒ: "o",
            ȍ: "o",
            ȏ: "o",
            ơ: "o",
            ờ: "o",
            ớ: "o",
            ỡ: "o",
            ở: "o",
            ợ: "o",
            ọ: "o",
            ộ: "o",
            ǫ: "o",
            ǭ: "o",
            ø: "o",
            ǿ: "o",
            ɔ: "o",
            ꝋ: "o",
            ꝍ: "o",
            ɵ: "o",
            ƣ: "oi",
            ȣ: "ou",
            ꝏ: "oo",
            "ⓟ": "p",
            ｐ: "p",
            ṕ: "p",
            ṗ: "p",
            ƥ: "p",
            ᵽ: "p",
            ꝑ: "p",
            ꝓ: "p",
            ꝕ: "p",
            "ⓠ": "q",
            ｑ: "q",
            ɋ: "q",
            ꝗ: "q",
            ꝙ: "q",
            "ⓡ": "r",
            ｒ: "r",
            ŕ: "r",
            ṙ: "r",
            ř: "r",
            ȑ: "r",
            ȓ: "r",
            ṛ: "r",
            ṝ: "r",
            ŗ: "r",
            ṟ: "r",
            ɍ: "r",
            ɽ: "r",
            ꝛ: "r",
            ꞧ: "r",
            ꞃ: "r",
            "ⓢ": "s",
            ｓ: "s",
            ß: "s",
            ś: "s",
            ṥ: "s",
            ŝ: "s",
            ṡ: "s",
            š: "s",
            ṧ: "s",
            ṣ: "s",
            ṩ: "s",
            ș: "s",
            ş: "s",
            ȿ: "s",
            ꞩ: "s",
            ꞅ: "s",
            ẛ: "s",
            "ⓣ": "t",
            ｔ: "t",
            ṫ: "t",
            ẗ: "t",
            ť: "t",
            ṭ: "t",
            ț: "t",
            ţ: "t",
            ṱ: "t",
            ṯ: "t",
            ŧ: "t",
            ƭ: "t",
            ʈ: "t",
            ⱦ: "t",
            ꞇ: "t",
            ꜩ: "tz",
            "ⓤ": "u",
            ｕ: "u",
            ù: "u",
            ú: "u",
            û: "u",
            ũ: "u",
            ṹ: "u",
            ū: "u",
            ṻ: "u",
            ŭ: "u",
            ü: "u",
            ǜ: "u",
            ǘ: "u",
            ǖ: "u",
            ǚ: "u",
            ủ: "u",
            ů: "u",
            ű: "u",
            ǔ: "u",
            ȕ: "u",
            ȗ: "u",
            ư: "u",
            ừ: "u",
            ứ: "u",
            ữ: "u",
            ử: "u",
            ự: "u",
            ụ: "u",
            ṳ: "u",
            ų: "u",
            ṷ: "u",
            ṵ: "u",
            ʉ: "u",
            "ⓥ": "v",
            ｖ: "v",
            ṽ: "v",
            ṿ: "v",
            ʋ: "v",
            ꝟ: "v",
            ʌ: "v",
            ꝡ: "vy",
            "ⓦ": "w",
            ｗ: "w",
            ẁ: "w",
            ẃ: "w",
            ŵ: "w",
            ẇ: "w",
            ẅ: "w",
            ẘ: "w",
            ẉ: "w",
            ⱳ: "w",
            "ⓧ": "x",
            ｘ: "x",
            ẋ: "x",
            ẍ: "x",
            "ⓨ": "y",
            ｙ: "y",
            ỳ: "y",
            ý: "y",
            ŷ: "y",
            ỹ: "y",
            ȳ: "y",
            ẏ: "y",
            ÿ: "y",
            ỷ: "y",
            ẙ: "y",
            ỵ: "y",
            ƴ: "y",
            ɏ: "y",
            ỿ: "y",
            "ⓩ": "z",
            ｚ: "z",
            ź: "z",
            ẑ: "z",
            ż: "z",
            ž: "z",
            ẓ: "z",
            ẕ: "z",
            ƶ: "z",
            ȥ: "z",
            ɀ: "z",
            ⱬ: "z",
            ꝣ: "z",
            Ά: "Α",
            Έ: "Ε",
            Ή: "Η",
            Ί: "Ι",
            Ϊ: "Ι",
            Ό: "Ο",
            Ύ: "Υ",
            Ϋ: "Υ",
            Ώ: "Ω",
            ά: "α",
            έ: "ε",
            ή: "η",
            ί: "ι",
            ϊ: "ι",
            ΐ: "ι",
            ό: "ο",
            ύ: "υ",
            ϋ: "υ",
            ΰ: "υ",
            ω: "ω",
            ς: "σ"
          };
          return a;
        }),
        b.define("select2/data/base", ["../utils"], function(a) {
          function b(a, c) {
            b.__super__.constructor.call(this);
          }
          return (
            a.Extend(b, a.Observable),
            (b.prototype.current = function(a) {
              throw new Error(
                "The `current` method must be defined in child classes."
              );
            }),
            (b.prototype.query = function(a, b) {
              throw new Error(
                "The `query` method must be defined in child classes."
              );
            }),
            (b.prototype.bind = function(a, b) {}),
            (b.prototype.destroy = function() {}),
            (b.prototype.generateResultId = function(b, c) {
              var d = b.id + "-result-";
              return (
                (d += a.generateChars(4)),
                (d +=
                  null != c.id
                    ? "-" + c.id.toString()
                    : "-" + a.generateChars(4))
              );
            }),
            b
          );
        }),
        b.define(
          "select2/data/select",
          ["./base", "../utils", "jquery"],
          function(a, b, c) {
            function d(a, b) {
              (this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this);
            }
            return (
              b.Extend(d, a),
              (d.prototype.current = function(a) {
                var b = [],
                  d = this;
                this.$element.find(":selected").each(function() {
                  var a = c(this),
                    e = d.item(a);
                  b.push(e);
                }),
                  a(b);
              }),
              (d.prototype.select = function(a) {
                var b = this;
                if (((a.selected = !0), c(a.element).is("option")))
                  return (
                    (a.element.selected = !0),
                    void this.$element.trigger("change")
                  );
                if (this.$element.prop("multiple"))
                  this.current(function(d) {
                    var e = [];
                    (a = [a]), a.push.apply(a, d);
                    for (var f = 0; f < a.length; f++) {
                      var g = a[f].id;
                      -1 === c.inArray(g, e) && e.push(g);
                    }
                    b.$element.val(e), b.$element.trigger("change");
                  });
                else {
                  var d = a.id;
                  this.$element.val(d), this.$element.trigger("change");
                }
              }),
              (d.prototype.unselect = function(a) {
                var b = this;
                if (this.$element.prop("multiple"))
                  return (
                    (a.selected = !1),
                    c(a.element).is("option")
                      ? ((a.element.selected = !1),
                        void this.$element.trigger("change"))
                      : void this.current(function(d) {
                          for (var e = [], f = 0; f < d.length; f++) {
                            var g = d[f].id;
                            g !== a.id && -1 === c.inArray(g, e) && e.push(g);
                          }
                          b.$element.val(e), b.$element.trigger("change");
                        })
                  );
              }),
              (d.prototype.bind = function(a, b) {
                var c = this;
                (this.container = a),
                  a.on("select", function(a) {
                    c.select(a.data);
                  }),
                  a.on("unselect", function(a) {
                    c.unselect(a.data);
                  });
              }),
              (d.prototype.destroy = function() {
                this.$element.find("*").each(function() {
                  c.removeData(this, "data");
                });
              }),
              (d.prototype.query = function(a, b) {
                var d = [],
                  e = this,
                  f = this.$element.children();
                f.each(function() {
                  var b = c(this);
                  if (b.is("option") || b.is("optgroup")) {
                    var f = e.item(b),
                      g = e.matches(a, f);
                    null !== g && d.push(g);
                  }
                }),
                  b({ results: d });
              }),
              (d.prototype.addOptions = function(a) {
                b.appendMany(this.$element, a);
              }),
              (d.prototype.option = function(a) {
                var b;
                a.children
                  ? ((b = document.createElement("optgroup")),
                    (b.label = a.text))
                  : ((b = document.createElement("option")),
                    void 0 !== b.textContent
                      ? (b.textContent = a.text)
                      : (b.innerText = a.text)),
                  a.id && (b.value = a.id),
                  a.disabled && (b.disabled = !0),
                  a.selected && (b.selected = !0),
                  a.title && (b.title = a.title);
                var d = c(b),
                  e = this._normalizeItem(a);
                return (e.element = b), c.data(b, "data", e), d;
              }),
              (d.prototype.item = function(a) {
                var b = {};
                if (((b = c.data(a[0], "data")), null != b)) return b;
                if (a.is("option"))
                  b = {
                    id: a.val(),
                    text: a.text(),
                    disabled: a.prop("disabled"),
                    selected: a.prop("selected"),
                    title: a.prop("title")
                  };
                else if (a.is("optgroup")) {
                  b = {
                    text: a.prop("label"),
                    children: [],
                    title: a.prop("title")
                  };
                  for (
                    var d = a.children("option"), e = [], f = 0;
                    f < d.length;
                    f++
                  ) {
                    var g = c(d[f]),
                      h = this.item(g);
                    e.push(h);
                  }
                  b.children = e;
                }
                return (
                  (b = this._normalizeItem(b)),
                  (b.element = a[0]),
                  c.data(a[0], "data", b),
                  b
                );
              }),
              (d.prototype._normalizeItem = function(a) {
                c.isPlainObject(a) || (a = { id: a, text: a }),
                  (a = c.extend({}, { text: "" }, a));
                var b = { selected: !1, disabled: !1 };
                return (
                  null != a.id && (a.id = a.id.toString()),
                  null != a.text && (a.text = a.text.toString()),
                  null == a._resultId &&
                    a.id &&
                    null != this.container &&
                    (a._resultId = this.generateResultId(this.container, a)),
                  c.extend({}, b, a)
                );
              }),
              (d.prototype.matches = function(a, b) {
                var c = this.options.get("matcher");
                return c(a, b);
              }),
              d
            );
          }
        ),
        b.define(
          "select2/data/array",
          ["./select", "../utils", "jquery"],
          function(a, b, c) {
            function d(a, b) {
              var c = b.get("data") || [];
              d.__super__.constructor.call(this, a, b),
                this.addOptions(this.convertToOptions(c));
            }
            return (
              b.Extend(d, a),
              (d.prototype.select = function(a) {
                var b = this.$element.find("option").filter(function(b, c) {
                  return c.value == a.id.toString();
                });
                0 === b.length && ((b = this.option(a)), this.addOptions(b)),
                  d.__super__.select.call(this, a);
              }),
              (d.prototype.convertToOptions = function(a) {
                function d(a) {
                  return function() {
                    return c(this).val() == a.id;
                  };
                }
                for (
                  var e = this,
                    f = this.$element.find("option"),
                    g = f
                      .map(function() {
                        return e.item(c(this)).id;
                      })
                      .get(),
                    h = [],
                    i = 0;
                  i < a.length;
                  i++
                ) {
                  var j = this._normalizeItem(a[i]);
                  if (c.inArray(j.id, g) >= 0) {
                    var k = f.filter(d(j)),
                      l = this.item(k),
                      m = c.extend(!0, {}, j, l),
                      n = this.option(m);
                    k.replaceWith(n);
                  } else {
                    var o = this.option(j);
                    if (j.children) {
                      var p = this.convertToOptions(j.children);
                      b.appendMany(o, p);
                    }
                    h.push(o);
                  }
                }
                return h;
              }),
              d
            );
          }
        ),
        b.define(
          "select2/data/ajax",
          ["./array", "../utils", "jquery"],
          function(a, b, c) {
            function d(a, b) {
              (this.ajaxOptions = this._applyDefaults(b.get("ajax"))),
                null != this.ajaxOptions.processResults &&
                  (this.processResults = this.ajaxOptions.processResults),
                d.__super__.constructor.call(this, a, b);
            }
            return (
              b.Extend(d, a),
              (d.prototype._applyDefaults = function(a) {
                var b = {
                  data: function(a) {
                    return c.extend({}, a, { q: a.term });
                  },
                  transport: function(a, b, d) {
                    var e = c.ajax(a);
                    return e.then(b), e.fail(d), e;
                  }
                };
                return c.extend({}, b, a, !0);
              }),
              (d.prototype.processResults = function(a) {
                return a;
              }),
              (d.prototype.query = function(a, b) {
                function d() {
                  var d = f.transport(
                    f,
                    function(d) {
                      var f = e.processResults(d, a);
                      e.options.get("debug") &&
                        window.console &&
                        console.error &&
                        ((f && f.results && c.isArray(f.results)) ||
                          console.error(
                            "Select2: The AJAX results did not return an array in the `results` key of the response."
                          )),
                        b(f);
                    },
                    function() {
                      (d.status && "0" === d.status) ||
                        e.trigger("results:message", {
                          message: "errorLoading"
                        });
                    }
                  );
                  e._request = d;
                }
                var e = this;
                null != this._request &&
                  (c.isFunction(this._request.abort) && this._request.abort(),
                  (this._request = null));
                var f = c.extend({ type: "GET" }, this.ajaxOptions);
                "function" == typeof f.url &&
                  (f.url = f.url.call(this.$element, a)),
                  "function" == typeof f.data &&
                    (f.data = f.data.call(this.$element, a)),
                  this.ajaxOptions.delay && null != a.term
                    ? (this._queryTimeout &&
                        window.clearTimeout(this._queryTimeout),
                      (this._queryTimeout = window.setTimeout(
                        d,
                        this.ajaxOptions.delay
                      )))
                    : d();
              }),
              d
            );
          }
        ),
        b.define("select2/data/tags", ["jquery"], function(a) {
          function b(b, c, d) {
            var e = d.get("tags"),
              f = d.get("createTag");
            void 0 !== f && (this.createTag = f);
            var g = d.get("insertTag");
            if (
              (void 0 !== g && (this.insertTag = g),
              b.call(this, c, d),
              a.isArray(e))
            )
              for (var h = 0; h < e.length; h++) {
                var i = e[h],
                  j = this._normalizeItem(i),
                  k = this.option(j);
                this.$element.append(k);
              }
          }
          return (
            (b.prototype.query = function(a, b, c) {
              function d(a, f) {
                for (var g = a.results, h = 0; h < g.length; h++) {
                  var i = g[h],
                    j = null != i.children && !d({ results: i.children }, !0),
                    k = i.text === b.term;
                  if (k || j) return f ? !1 : ((a.data = g), void c(a));
                }
                if (f) return !0;
                var l = e.createTag(b);
                if (null != l) {
                  var m = e.option(l);
                  m.attr("data-select2-tag", !0),
                    e.addOptions([m]),
                    e.insertTag(g, l);
                }
                (a.results = g), c(a);
              }
              var e = this;
              return (
                this._removeOldTags(),
                null == b.term || null != b.page
                  ? void a.call(this, b, c)
                  : void a.call(this, b, d)
              );
            }),
            (b.prototype.createTag = function(b, c) {
              var d = a.trim(c.term);
              return "" === d ? null : { id: d, text: d };
            }),
            (b.prototype.insertTag = function(a, b, c) {
              b.unshift(c);
            }),
            (b.prototype._removeOldTags = function(b) {
              var c = (this._lastTag,
              this.$element.find("option[data-select2-tag]"));
              c.each(function() {
                this.selected || a(this).remove();
              });
            }),
            b
          );
        }),
        b.define("select2/data/tokenizer", ["jquery"], function(a) {
          function b(a, b, c) {
            var d = c.get("tokenizer");
            void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
          }
          return (
            (b.prototype.bind = function(a, b, c) {
              a.call(this, b, c),
                (this.$search =
                  b.dropdown.$search ||
                  b.selection.$search ||
                  c.find(".select2-search__field"));
            }),
            (b.prototype.query = function(b, c, d) {
              function e(b) {
                var c = g._normalizeItem(b),
                  d = g.$element.find("option").filter(function() {
                    return a(this).val() === c.id;
                  });
                if (!d.length) {
                  var e = g.option(c);
                  e.attr("data-select2-tag", !0),
                    g._removeOldTags(),
                    g.addOptions([e]);
                }
                f(c);
              }
              function f(a) {
                g.trigger("select", { data: a });
              }
              var g = this;
              c.term = c.term || "";
              var h = this.tokenizer(c, this.options, e);
              h.term !== c.term &&
                (this.$search.length &&
                  (this.$search.val(h.term), this.$search.focus()),
                (c.term = h.term)),
                b.call(this, c, d);
            }),
            (b.prototype.tokenizer = function(b, c, d, e) {
              for (
                var f = d.get("tokenSeparators") || [],
                  g = c.term,
                  h = 0,
                  i =
                    this.createTag ||
                    function(a) {
                      return { id: a.term, text: a.term };
                    };
                h < g.length;

              ) {
                var j = g[h];
                if (-1 !== a.inArray(j, f)) {
                  var k = g.substr(0, h),
                    l = a.extend({}, c, { term: k }),
                    m = i(l);
                  null != m
                    ? (e(m), (g = g.substr(h + 1) || ""), (h = 0))
                    : h++;
                } else h++;
              }
              return { term: g };
            }),
            b
          );
        }),
        b.define("select2/data/minimumInputLength", [], function() {
          function a(a, b, c) {
            (this.minimumInputLength = c.get("minimumInputLength")),
              a.call(this, b, c);
          }
          return (
            (a.prototype.query = function(a, b, c) {
              return (
                (b.term = b.term || ""),
                b.term.length < this.minimumInputLength
                  ? void this.trigger("results:message", {
                      message: "inputTooShort",
                      args: {
                        minimum: this.minimumInputLength,
                        input: b.term,
                        params: b
                      }
                    })
                  : void a.call(this, b, c)
              );
            }),
            a
          );
        }),
        b.define("select2/data/maximumInputLength", [], function() {
          function a(a, b, c) {
            (this.maximumInputLength = c.get("maximumInputLength")),
              a.call(this, b, c);
          }
          return (
            (a.prototype.query = function(a, b, c) {
              return (
                (b.term = b.term || ""),
                this.maximumInputLength > 0 &&
                b.term.length > this.maximumInputLength
                  ? void this.trigger("results:message", {
                      message: "inputTooLong",
                      args: {
                        maximum: this.maximumInputLength,
                        input: b.term,
                        params: b
                      }
                    })
                  : void a.call(this, b, c)
              );
            }),
            a
          );
        }),
        b.define("select2/data/maximumSelectionLength", [], function() {
          function a(a, b, c) {
            (this.maximumSelectionLength = c.get("maximumSelectionLength")),
              a.call(this, b, c);
          }
          return (
            (a.prototype.query = function(a, b, c) {
              var d = this;
              this.current(function(e) {
                var f = null != e ? e.length : 0;
                return d.maximumSelectionLength > 0 &&
                  f >= d.maximumSelectionLength
                  ? void d.trigger("results:message", {
                      message: "maximumSelected",
                      args: { maximum: d.maximumSelectionLength }
                    })
                  : void a.call(d, b, c);
              });
            }),
            a
          );
        }),
        b.define("select2/dropdown", ["jquery", "./utils"], function(a, b) {
          function c(a, b) {
            (this.$element = a),
              (this.options = b),
              c.__super__.constructor.call(this);
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function() {
              var b = a(
                '<span class="select2-dropdown"><span class="select2-results"></span></span>'
              );
              return (
                b.attr("dir", this.options.get("dir")), (this.$dropdown = b), b
              );
            }),
            (c.prototype.bind = function() {}),
            (c.prototype.position = function(a, b) {}),
            (c.prototype.destroy = function() {
              this.$dropdown.remove();
            }),
            c
          );
        }),
        b.define("select2/dropdown/search", ["jquery", "../utils"], function(
          a,
          b
        ) {
          function c() {}
          return (
            (c.prototype.render = function(b) {
              var c = b.call(this),
                d = a(
                  '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>'
                );
              return (
                (this.$searchContainer = d),
                (this.$search = d.find("input")),
                c.prepend(d),
                c
              );
            }),
            (c.prototype.bind = function(b, c, d) {
              var e = this;
              b.call(this, c, d),
                this.$search.on("keydown", function(a) {
                  e.trigger("keypress", a),
                    (e._keyUpPrevented = a.isDefaultPrevented());
                }),
                this.$search.on("input", function(b) {
                  a(this).off("keyup");
                }),
                this.$search.on("keyup input", function(a) {
                  e.handleSearch(a);
                }),
                c.on("open", function() {
                  e.$search.attr("tabindex", 0),
                    e.$search.focus(),
                    window.setTimeout(function() {
                      e.$search.focus();
                    }, 0);
                }),
                c.on("close", function() {
                  e.$search.attr("tabindex", -1), e.$search.val("");
                }),
                c.on("focus", function() {
                  c.isOpen() && e.$search.focus();
                }),
                c.on("results:all", function(a) {
                  if (null == a.query.term || "" === a.query.term) {
                    var b = e.showSearch(a);
                    b
                      ? e.$searchContainer.removeClass("select2-search--hide")
                      : e.$searchContainer.addClass("select2-search--hide");
                  }
                });
            }),
            (c.prototype.handleSearch = function(a) {
              if (!this._keyUpPrevented) {
                var b = this.$search.val();
                this.trigger("query", { term: b });
              }
              this._keyUpPrevented = !1;
            }),
            (c.prototype.showSearch = function(a, b) {
              return !0;
            }),
            c
          );
        }),
        b.define("select2/dropdown/hidePlaceholder", [], function() {
          function a(a, b, c, d) {
            (this.placeholder = this.normalizePlaceholder(
              c.get("placeholder")
            )),
              a.call(this, b, c, d);
          }
          return (
            (a.prototype.append = function(a, b) {
              (b.results = this.removePlaceholder(b.results)), a.call(this, b);
            }),
            (a.prototype.normalizePlaceholder = function(a, b) {
              return "string" == typeof b && (b = { id: "", text: b }), b;
            }),
            (a.prototype.removePlaceholder = function(a, b) {
              for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                var e = b[d];
                this.placeholder.id === e.id && c.splice(d, 1);
              }
              return c;
            }),
            a
          );
        }),
        b.define("select2/dropdown/infiniteScroll", ["jquery"], function(a) {
          function b(a, b, c, d) {
            (this.lastParams = {}),
              a.call(this, b, c, d),
              (this.$loadingMore = this.createLoadingMore()),
              (this.loading = !1);
          }
          return (
            (b.prototype.append = function(a, b) {
              this.$loadingMore.remove(),
                (this.loading = !1),
                a.call(this, b),
                this.showLoadingMore(b) &&
                  this.$results.append(this.$loadingMore);
            }),
            (b.prototype.bind = function(b, c, d) {
              var e = this;
              b.call(this, c, d),
                c.on("query", function(a) {
                  (e.lastParams = a), (e.loading = !0);
                }),
                c.on("query:append", function(a) {
                  (e.lastParams = a), (e.loading = !0);
                }),
                this.$results.on("scroll", function() {
                  var b = a.contains(
                    document.documentElement,
                    e.$loadingMore[0]
                  );
                  if (!e.loading && b) {
                    var c =
                        e.$results.offset().top + e.$results.outerHeight(!1),
                      d =
                        e.$loadingMore.offset().top +
                        e.$loadingMore.outerHeight(!1);
                    c + 50 >= d && e.loadMore();
                  }
                });
            }),
            (b.prototype.loadMore = function() {
              this.loading = !0;
              var b = a.extend({}, { page: 1 }, this.lastParams);
              b.page++, this.trigger("query:append", b);
            }),
            (b.prototype.showLoadingMore = function(a, b) {
              return b.pagination && b.pagination.more;
            }),
            (b.prototype.createLoadingMore = function() {
              var b = a(
                  '<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'
                ),
                c = this.options.get("translations").get("loadingMore");
              return b.html(c(this.lastParams)), b;
            }),
            b
          );
        }),
        b.define(
          "select2/dropdown/attachBody",
          ["jquery", "../utils"],
          function(a, b) {
            function c(b, c, d) {
              (this.$dropdownParent =
                d.get("dropdownParent") || a(document.body)),
                b.call(this, c, d);
            }
            return (
              (c.prototype.bind = function(a, b, c) {
                var d = this,
                  e = !1;
                a.call(this, b, c),
                  b.on("open", function() {
                    d._showDropdown(),
                      d._attachPositioningHandler(b),
                      e ||
                        ((e = !0),
                        b.on("results:all", function() {
                          d._positionDropdown(), d._resizeDropdown();
                        }),
                        b.on("results:append", function() {
                          d._positionDropdown(), d._resizeDropdown();
                        }));
                  }),
                  b.on("close", function() {
                    d._hideDropdown(), d._detachPositioningHandler(b);
                  }),
                  this.$dropdownContainer.on("mousedown", function(a) {
                    a.stopPropagation();
                  });
              }),
              (c.prototype.destroy = function(a) {
                a.call(this), this.$dropdownContainer.remove();
              }),
              (c.prototype.position = function(a, b, c) {
                b.attr("class", c.attr("class")),
                  b.removeClass("select2"),
                  b.addClass("select2-container--open"),
                  b.css({ position: "absolute", top: -999999 }),
                  (this.$container = c);
              }),
              (c.prototype.render = function(b) {
                var c = a("<span></span>"),
                  d = b.call(this);
                return c.append(d), (this.$dropdownContainer = c), c;
              }),
              (c.prototype._hideDropdown = function(a) {
                this.$dropdownContainer.detach();
              }),
              (c.prototype._attachPositioningHandler = function(c, d) {
                var e = this,
                  f = "scroll.select2." + d.id,
                  g = "resize.select2." + d.id,
                  h = "orientationchange.select2." + d.id,
                  i = this.$container.parents().filter(b.hasScroll);
                i.each(function() {
                  a(this).data("select2-scroll-position", {
                    x: a(this).scrollLeft(),
                    y: a(this).scrollTop()
                  });
                }),
                  i.on(f, function(b) {
                    var c = a(this).data("select2-scroll-position");
                    a(this).scrollTop(c.y);
                  }),
                  a(window).on(f + " " + g + " " + h, function(a) {
                    e._positionDropdown(), e._resizeDropdown();
                  });
              }),
              (c.prototype._detachPositioningHandler = function(c, d) {
                var e = "scroll.select2." + d.id,
                  f = "resize.select2." + d.id,
                  g = "orientationchange.select2." + d.id,
                  h = this.$container.parents().filter(b.hasScroll);
                h.off(e), a(window).off(e + " " + f + " " + g);
              }),
              (c.prototype._positionDropdown = function() {
                var b = a(window),
                  c = this.$dropdown.hasClass("select2-dropdown--above"),
                  d = this.$dropdown.hasClass("select2-dropdown--below"),
                  e = null,
                  f = this.$container.offset();
                f.bottom = f.top + this.$container.outerHeight(!1);
                var g = { height: this.$container.outerHeight(!1) };
                (g.top = f.top), (g.bottom = f.top + g.height);
                var h = { height: this.$dropdown.outerHeight(!1) },
                  i = {
                    top: b.scrollTop(),
                    bottom: b.scrollTop() + b.height()
                  },
                  j = i.top < f.top - h.height,
                  k = i.bottom > f.bottom + h.height,
                  l = { left: f.left, top: g.bottom },
                  m = this.$dropdownParent;
                "static" === m.css("position") && (m = m.offsetParent());
                var n = m.offset();
                (l.top -= n.top),
                  (l.left -= n.left),
                  c || d || (e = "below"),
                  k || !j || c ? !j && k && c && (e = "below") : (e = "above"),
                  ("above" == e || (c && "below" !== e)) &&
                    (l.top = g.top - n.top - h.height),
                  null != e &&
                    (this.$dropdown
                      .removeClass(
                        "select2-dropdown--below select2-dropdown--above"
                      )
                      .addClass("select2-dropdown--" + e),
                    this.$container
                      .removeClass(
                        "select2-container--below select2-container--above"
                      )
                      .addClass("select2-container--" + e)),
                  this.$dropdownContainer.css(l);
              }),
              (c.prototype._resizeDropdown = function() {
                var a = { width: this.$container.outerWidth(!1) + "px" };
                this.options.get("dropdownAutoWidth") &&
                  ((a.minWidth = a.width),
                  (a.position = "relative"),
                  (a.width = "auto")),
                  this.$dropdown.css(a);
              }),
              (c.prototype._showDropdown = function(a) {
                this.$dropdownContainer.appendTo(this.$dropdownParent),
                  this._positionDropdown(),
                  this._resizeDropdown();
              }),
              c
            );
          }
        ),
        b.define("select2/dropdown/minimumResultsForSearch", [], function() {
          function a(b) {
            for (var c = 0, d = 0; d < b.length; d++) {
              var e = b[d];
              e.children ? (c += a(e.children)) : c++;
            }
            return c;
          }
          function b(a, b, c, d) {
            (this.minimumResultsForSearch = c.get("minimumResultsForSearch")),
              this.minimumResultsForSearch < 0 &&
                (this.minimumResultsForSearch = 1 / 0),
              a.call(this, b, c, d);
          }
          return (
            (b.prototype.showSearch = function(b, c) {
              return a(c.data.results) < this.minimumResultsForSearch
                ? !1
                : b.call(this, c);
            }),
            b
          );
        }),
        b.define("select2/dropdown/selectOnClose", [], function() {
          function a() {}
          return (
            (a.prototype.bind = function(a, b, c) {
              var d = this;
              a.call(this, b, c),
                b.on("close", function(a) {
                  d._handleSelectOnClose(a);
                });
            }),
            (a.prototype._handleSelectOnClose = function(a, b) {
              if (b && null != b.originalSelect2Event) {
                var c = b.originalSelect2Event;
                if ("select" === c._type || "unselect" === c._type) return;
              }
              var d = this.getHighlightedResults();
              if (!(d.length < 1)) {
                var e = d.data("data");
                (null != e.element && e.element.selected) ||
                  (null == e.element && e.selected) ||
                  this.trigger("select", { data: e });
              }
            }),
            a
          );
        }),
        b.define("select2/dropdown/closeOnSelect", [], function() {
          function a() {}
          return (
            (a.prototype.bind = function(a, b, c) {
              var d = this;
              a.call(this, b, c),
                b.on("select", function(a) {
                  d._selectTriggered(a);
                }),
                b.on("unselect", function(a) {
                  d._selectTriggered(a);
                });
            }),
            (a.prototype._selectTriggered = function(a, b) {
              var c = b.originalEvent;
              (c && c.ctrlKey) ||
                this.trigger("close", {
                  originalEvent: c,
                  originalSelect2Event: b
                });
            }),
            a
          );
        }),
        b.define("select2/i18n/en", [], function() {
          return {
            errorLoading: function() {
              return "The results could not be loaded.";
            },
            inputTooLong: function(a) {
              var b = a.input.length - a.maximum,
                c = "Please delete " + b + " character";
              return 1 != b && (c += "s"), c;
            },
            inputTooShort: function(a) {
              var b = a.minimum - a.input.length,
                c = "Please enter " + b + " or more characters";
              return c;
            },
            loadingMore: function() {
              return "Loading more results…";
            },
            maximumSelected: function(a) {
              var b = "You can only select " + a.maximum + " item";
              return 1 != a.maximum && (b += "s"), b;
            },
            noResults: function() {
              return "No results found";
            },
            searching: function() {
              return "Searching…";
            }
          };
        }),
        b.define(
          "select2/defaults",
          [
            "jquery",
            "require",
            "./results",
            "./selection/single",
            "./selection/multiple",
            "./selection/placeholder",
            "./selection/allowClear",
            "./selection/search",
            "./selection/eventRelay",
            "./utils",
            "./translation",
            "./diacritics",
            "./data/select",
            "./data/array",
            "./data/ajax",
            "./data/tags",
            "./data/tokenizer",
            "./data/minimumInputLength",
            "./data/maximumInputLength",
            "./data/maximumSelectionLength",
            "./dropdown",
            "./dropdown/search",
            "./dropdown/hidePlaceholder",
            "./dropdown/infiniteScroll",
            "./dropdown/attachBody",
            "./dropdown/minimumResultsForSearch",
            "./dropdown/selectOnClose",
            "./dropdown/closeOnSelect",
            "./i18n/en"
          ],
          function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C
          ) {
            function D() {
              this.reset();
            }
            (D.prototype.apply = function(l) {
              if (
                ((l = a.extend(!0, {}, this.defaults, l)),
                null == l.dataAdapter)
              ) {
                if (
                  (null != l.ajax
                    ? (l.dataAdapter = o)
                    : null != l.data
                      ? (l.dataAdapter = n)
                      : (l.dataAdapter = m),
                  l.minimumInputLength > 0 &&
                    (l.dataAdapter = j.Decorate(l.dataAdapter, r)),
                  l.maximumInputLength > 0 &&
                    (l.dataAdapter = j.Decorate(l.dataAdapter, s)),
                  l.maximumSelectionLength > 0 &&
                    (l.dataAdapter = j.Decorate(l.dataAdapter, t)),
                  l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)),
                  (null != l.tokenSeparators || null != l.tokenizer) &&
                    (l.dataAdapter = j.Decorate(l.dataAdapter, q)),
                  null != l.query)
                ) {
                  var C = b(l.amdBase + "compat/query");
                  l.dataAdapter = j.Decorate(l.dataAdapter, C);
                }
                if (null != l.initSelection) {
                  var D = b(l.amdBase + "compat/initSelection");
                  l.dataAdapter = j.Decorate(l.dataAdapter, D);
                }
              }
              if (
                (null == l.resultsAdapter &&
                  ((l.resultsAdapter = c),
                  null != l.ajax &&
                    (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)),
                  null != l.placeholder &&
                    (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)),
                  l.selectOnClose &&
                    (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))),
                null == l.dropdownAdapter)
              ) {
                if (l.multiple) l.dropdownAdapter = u;
                else {
                  var E = j.Decorate(u, v);
                  l.dropdownAdapter = E;
                }
                if (
                  (0 !== l.minimumResultsForSearch &&
                    (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)),
                  l.closeOnSelect &&
                    (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)),
                  null != l.dropdownCssClass ||
                    null != l.dropdownCss ||
                    null != l.adaptDropdownCssClass)
                ) {
                  var F = b(l.amdBase + "compat/dropdownCss");
                  l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
                }
                l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
              }
              if (null == l.selectionAdapter) {
                if (
                  (l.multiple
                    ? (l.selectionAdapter = e)
                    : (l.selectionAdapter = d),
                  null != l.placeholder &&
                    (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)),
                  l.allowClear &&
                    (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)),
                  l.multiple &&
                    (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)),
                  null != l.containerCssClass ||
                    null != l.containerCss ||
                    null != l.adaptContainerCssClass)
                ) {
                  var G = b(l.amdBase + "compat/containerCss");
                  l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
                }
                l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
              }
              if ("string" == typeof l.language)
                if (l.language.indexOf("-") > 0) {
                  var H = l.language.split("-"),
                    I = H[0];
                  l.language = [l.language, I];
                } else l.language = [l.language];
              if (a.isArray(l.language)) {
                var J = new k();
                l.language.push("en");
                for (var K = l.language, L = 0; L < K.length; L++) {
                  var M = K[L],
                    N = {};
                  try {
                    N = k.loadPath(M);
                  } catch (O) {
                    try {
                      (M = this.defaults.amdLanguageBase + M),
                        (N = k.loadPath(M));
                    } catch (P) {
                      l.debug &&
                        window.console &&
                        console.warn &&
                        console.warn(
                          'Select2: The language file for "' +
                            M +
                            '" could not be automatically loaded. A fallback will be used instead.'
                        );
                      continue;
                    }
                  }
                  J.extend(N);
                }
                l.translations = J;
              } else {
                var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
                  R = new k(l.language);
                R.extend(Q), (l.translations = R);
              }
              return l;
            }),
              (D.prototype.reset = function() {
                function b(a) {
                  function b(a) {
                    return l[a] || a;
                  }
                  return a.replace(/[^\u0000-\u007E]/g, b);
                }
                function c(d, e) {
                  if ("" === a.trim(d.term)) return e;
                  if (e.children && e.children.length > 0) {
                    for (
                      var f = a.extend(!0, {}, e), g = e.children.length - 1;
                      g >= 0;
                      g--
                    ) {
                      var h = e.children[g],
                        i = c(d, h);
                      null == i && f.children.splice(g, 1);
                    }
                    return f.children.length > 0 ? f : c(d, f);
                  }
                  var j = b(e.text).toUpperCase(),
                    k = b(d.term).toUpperCase();
                  return j.indexOf(k) > -1 ? e : null;
                }
                this.defaults = {
                  amdBase: "./",
                  amdLanguageBase: "./i18n/",
                  closeOnSelect: !0,
                  debug: !1,
                  dropdownAutoWidth: !1,
                  escapeMarkup: j.escapeMarkup,
                  language: C,
                  matcher: c,
                  minimumInputLength: 0,
                  maximumInputLength: 0,
                  maximumSelectionLength: 0,
                  minimumResultsForSearch: 0,
                  selectOnClose: !1,
                  sorter: function(a) {
                    return a;
                  },
                  templateResult: function(a) {
                    return a.text;
                  },
                  templateSelection: function(a) {
                    return a.text;
                  },
                  theme: "default",
                  width: "resolve"
                };
              }),
              (D.prototype.set = function(b, c) {
                var d = a.camelCase(b),
                  e = {};
                e[d] = c;
                var f = j._convertData(e);
                a.extend(this.defaults, f);
              });
            var E = new D();
            return E;
          }
        ),
        b.define(
          "select2/options",
          ["require", "jquery", "./defaults", "./utils"],
          function(a, b, c, d) {
            function e(b, e) {
              if (
                ((this.options = b),
                null != e && this.fromElement(e),
                (this.options = c.apply(this.options)),
                e && e.is("input"))
              ) {
                var f = a(this.get("amdBase") + "compat/inputData");
                this.options.dataAdapter = d.Decorate(
                  this.options.dataAdapter,
                  f
                );
              }
            }
            return (
              (e.prototype.fromElement = function(a) {
                var c = ["select2"];
                null == this.options.multiple &&
                  (this.options.multiple = a.prop("multiple")),
                  null == this.options.disabled &&
                    (this.options.disabled = a.prop("disabled")),
                  null == this.options.language &&
                    (a.prop("lang")
                      ? (this.options.language = a.prop("lang").toLowerCase())
                      : a.closest("[lang]").prop("lang") &&
                        (this.options.language = a
                          .closest("[lang]")
                          .prop("lang"))),
                  null == this.options.dir &&
                    (a.prop("dir")
                      ? (this.options.dir = a.prop("dir"))
                      : a.closest("[dir]").prop("dir")
                        ? (this.options.dir = a.closest("[dir]").prop("dir"))
                        : (this.options.dir = "ltr")),
                  a.prop("disabled", this.options.disabled),
                  a.prop("multiple", this.options.multiple),
                  a.data("select2Tags") &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                      ),
                    a.data("data", a.data("select2Tags")),
                    a.data("tags", !0)),
                  a.data("ajaxUrl") &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                      ),
                    a.attr("ajax--url", a.data("ajaxUrl")),
                    a.data("ajax--url", a.data("ajaxUrl")));
                var e = {};
                e =
                  b.fn.jquery &&
                  "1." == b.fn.jquery.substr(0, 2) &&
                  a[0].dataset
                    ? b.extend(!0, {}, a[0].dataset, a.data())
                    : a.data();
                var f = b.extend(!0, {}, e);
                f = d._convertData(f);
                for (var g in f)
                  b.inArray(g, c) > -1 ||
                    (b.isPlainObject(this.options[g])
                      ? b.extend(this.options[g], f[g])
                      : (this.options[g] = f[g]));
                return this;
              }),
              (e.prototype.get = function(a) {
                return this.options[a];
              }),
              (e.prototype.set = function(a, b) {
                this.options[a] = b;
              }),
              e
            );
          }
        ),
        b.define(
          "select2/core",
          ["jquery", "./options", "./utils", "./keys"],
          function(a, b, c, d) {
            var e = function(a, c) {
              null != a.data("select2") && a.data("select2").destroy(),
                (this.$element = a),
                (this.id = this._generateId(a)),
                (c = c || {}),
                (this.options = new b(c, a)),
                e.__super__.constructor.call(this);
              var d = a.attr("tabindex") || 0;
              a.data("old-tabindex", d), a.attr("tabindex", "-1");
              var f = this.options.get("dataAdapter");
              this.dataAdapter = new f(a, this.options);
              var g = this.render();
              this._placeContainer(g);
              var h = this.options.get("selectionAdapter");
              (this.selection = new h(a, this.options)),
                (this.$selection = this.selection.render()),
                this.selection.position(this.$selection, g);
              var i = this.options.get("dropdownAdapter");
              (this.dropdown = new i(a, this.options)),
                (this.$dropdown = this.dropdown.render()),
                this.dropdown.position(this.$dropdown, g);
              var j = this.options.get("resultsAdapter");
              (this.results = new j(a, this.options, this.dataAdapter)),
                (this.$results = this.results.render()),
                this.results.position(this.$results, this.$dropdown);
              var k = this;
              this._bindAdapters(),
                this._registerDomEvents(),
                this._registerDataEvents(),
                this._registerSelectionEvents(),
                this._registerDropdownEvents(),
                this._registerResultsEvents(),
                this._registerEvents(),
                this.dataAdapter.current(function(a) {
                  k.trigger("selection:update", { data: a });
                }),
                a.addClass("select2-hidden-accessible"),
                a.attr("aria-hidden", "true"),
                this._syncAttributes(),
                a.data("select2", this);
            };
            return (
              c.Extend(e, c.Observable),
              (e.prototype._generateId = function(a) {
                var b = "";
                return (
                  (b =
                    null != a.attr("id")
                      ? a.attr("id")
                      : null != a.attr("name")
                        ? a.attr("name") + "-" + c.generateChars(2)
                        : c.generateChars(4)),
                  (b = b.replace(/(:|\.|\[|\]|,)/g, "")),
                  (b = "select2-" + b)
                );
              }),
              (e.prototype._placeContainer = function(a) {
                a.insertAfter(this.$element);
                var b = this._resolveWidth(
                  this.$element,
                  this.options.get("width")
                );
                null != b && a.css("width", b);
              }),
              (e.prototype._resolveWidth = function(a, b) {
                var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if ("resolve" == b) {
                  var d = this._resolveWidth(a, "style");
                  return null != d ? d : this._resolveWidth(a, "element");
                }
                if ("element" == b) {
                  var e = a.outerWidth(!1);
                  return 0 >= e ? "auto" : e + "px";
                }
                if ("style" == b) {
                  var f = a.attr("style");
                  if ("string" != typeof f) return null;
                  for (
                    var g = f.split(";"), h = 0, i = g.length;
                    i > h;
                    h += 1
                  ) {
                    var j = g[h].replace(/\s/g, ""),
                      k = j.match(c);
                    if (null !== k && k.length >= 1) return k[1];
                  }
                  return null;
                }
                return b;
              }),
              (e.prototype._bindAdapters = function() {
                this.dataAdapter.bind(this, this.$container),
                  this.selection.bind(this, this.$container),
                  this.dropdown.bind(this, this.$container),
                  this.results.bind(this, this.$container);
              }),
              (e.prototype._registerDomEvents = function() {
                var b = this;
                this.$element.on("change.select2", function() {
                  b.dataAdapter.current(function(a) {
                    b.trigger("selection:update", { data: a });
                  });
                }),
                  this.$element.on("focus.select2", function(a) {
                    b.trigger("focus", a);
                  }),
                  (this._syncA = c.bind(this._syncAttributes, this)),
                  (this._syncS = c.bind(this._syncSubtree, this)),
                  this.$element[0].attachEvent &&
                    this.$element[0].attachEvent(
                      "onpropertychange",
                      this._syncA
                    );
                var d =
                  window.MutationObserver ||
                  window.WebKitMutationObserver ||
                  window.MozMutationObserver;
                null != d
                  ? ((this._observer = new d(function(c) {
                      a.each(c, b._syncA), a.each(c, b._syncS);
                    })),
                    this._observer.observe(this.$element[0], {
                      attributes: !0,
                      childList: !0,
                      subtree: !1
                    }))
                  : this.$element[0].addEventListener &&
                    (this.$element[0].addEventListener(
                      "DOMAttrModified",
                      b._syncA,
                      !1
                    ),
                    this.$element[0].addEventListener(
                      "DOMNodeInserted",
                      b._syncS,
                      !1
                    ),
                    this.$element[0].addEventListener(
                      "DOMNodeRemoved",
                      b._syncS,
                      !1
                    ));
              }),
              (e.prototype._registerDataEvents = function() {
                var a = this;
                this.dataAdapter.on("*", function(b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerSelectionEvents = function() {
                var b = this,
                  c = ["toggle", "focus"];
                this.selection.on("toggle", function() {
                  b.toggleDropdown();
                }),
                  this.selection.on("focus", function(a) {
                    b.focus(a);
                  }),
                  this.selection.on("*", function(d, e) {
                    -1 === a.inArray(d, c) && b.trigger(d, e);
                  });
              }),
              (e.prototype._registerDropdownEvents = function() {
                var a = this;
                this.dropdown.on("*", function(b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerResultsEvents = function() {
                var a = this;
                this.results.on("*", function(b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerEvents = function() {
                var a = this;
                this.on("open", function() {
                  a.$container.addClass("select2-container--open");
                }),
                  this.on("close", function() {
                    a.$container.removeClass("select2-container--open");
                  }),
                  this.on("enable", function() {
                    a.$container.removeClass("select2-container--disabled");
                  }),
                  this.on("disable", function() {
                    a.$container.addClass("select2-container--disabled");
                  }),
                  this.on("blur", function() {
                    a.$container.removeClass("select2-container--focus");
                  }),
                  this.on("query", function(b) {
                    a.isOpen() || a.trigger("open", {}),
                      this.dataAdapter.query(b, function(c) {
                        a.trigger("results:all", { data: c, query: b });
                      });
                  }),
                  this.on("query:append", function(b) {
                    this.dataAdapter.query(b, function(c) {
                      a.trigger("results:append", { data: c, query: b });
                    });
                  }),
                  this.on("keypress", function(b) {
                    var c = b.which;
                    a.isOpen()
                      ? c === d.ESC || c === d.TAB || (c === d.UP && b.altKey)
                        ? (a.close(), b.preventDefault())
                        : c === d.ENTER
                          ? (a.trigger("results:select", {}),
                            b.preventDefault())
                          : c === d.SPACE && b.ctrlKey
                            ? (a.trigger("results:toggle", {}),
                              b.preventDefault())
                            : c === d.UP
                              ? (a.trigger("results:previous", {}),
                                b.preventDefault())
                              : c === d.DOWN &&
                                (a.trigger("results:next", {}),
                                b.preventDefault())
                      : (c === d.ENTER ||
                          c === d.SPACE ||
                          (c === d.DOWN && b.altKey)) &&
                        (a.open(), b.preventDefault());
                  });
              }),
              (e.prototype._syncAttributes = function() {
                this.options.set("disabled", this.$element.prop("disabled")),
                  this.options.get("disabled")
                    ? (this.isOpen() && this.close(),
                      this.trigger("disable", {}))
                    : this.trigger("enable", {});
              }),
              (e.prototype._syncSubtree = function(a, b) {
                var c = !1,
                  d = this;
                if (
                  !a ||
                  !a.target ||
                  "OPTION" === a.target.nodeName ||
                  "OPTGROUP" === a.target.nodeName
                ) {
                  if (b)
                    if (b.addedNodes && b.addedNodes.length > 0)
                      for (var e = 0; e < b.addedNodes.length; e++) {
                        var f = b.addedNodes[e];
                        f.selected && (c = !0);
                      }
                    else
                      b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                  else c = !0;
                  c &&
                    this.dataAdapter.current(function(a) {
                      d.trigger("selection:update", { data: a });
                    });
                }
              }),
              (e.prototype.trigger = function(a, b) {
                var c = e.__super__.trigger,
                  d = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting"
                  };
                if ((void 0 === b && (b = {}), a in d)) {
                  var f = d[a],
                    g = { prevented: !1, name: a, args: b };
                  if ((c.call(this, f, g), g.prevented))
                    return void (b.prevented = !0);
                }
                c.call(this, a, b);
              }),
              (e.prototype.toggleDropdown = function() {
                this.options.get("disabled") ||
                  (this.isOpen() ? this.close() : this.open());
              }),
              (e.prototype.open = function() {
                this.isOpen() || this.trigger("query", {});
              }),
              (e.prototype.close = function() {
                this.isOpen() && this.trigger("close", {});
              }),
              (e.prototype.isOpen = function() {
                return this.$container.hasClass("select2-container--open");
              }),
              (e.prototype.hasFocus = function() {
                return this.$container.hasClass("select2-container--focus");
              }),
              (e.prototype.focus = function(a) {
                this.hasFocus() ||
                  (this.$container.addClass("select2-container--focus"),
                  this.trigger("focus", {}));
              }),
              (e.prototype.enable = function(a) {
                this.options.get("debug") &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                  ),
                  (null == a || 0 === a.length) && (a = [!0]);
                var b = !a[0];
                this.$element.prop("disabled", b);
              }),
              (e.prototype.data = function() {
                this.options.get("debug") &&
                  arguments.length > 0 &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                  );
                var a = [];
                return (
                  this.dataAdapter.current(function(b) {
                    a = b;
                  }),
                  a
                );
              }),
              (e.prototype.val = function(b) {
                if (
                  (this.options.get("debug") &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                    ),
                  null == b || 0 === b.length)
                )
                  return this.$element.val();
                var c = b[0];
                a.isArray(c) &&
                  (c = a.map(c, function(a) {
                    return a.toString();
                  })),
                  this.$element.val(c).trigger("change");
              }),
              (e.prototype.destroy = function() {
                this.$container.remove(),
                  this.$element[0].detachEvent &&
                    this.$element[0].detachEvent(
                      "onpropertychange",
                      this._syncA
                    ),
                  null != this._observer
                    ? (this._observer.disconnect(), (this._observer = null))
                    : this.$element[0].removeEventListener &&
                      (this.$element[0].removeEventListener(
                        "DOMAttrModified",
                        this._syncA,
                        !1
                      ),
                      this.$element[0].removeEventListener(
                        "DOMNodeInserted",
                        this._syncS,
                        !1
                      ),
                      this.$element[0].removeEventListener(
                        "DOMNodeRemoved",
                        this._syncS,
                        !1
                      )),
                  (this._syncA = null),
                  (this._syncS = null),
                  this.$element.off(".select2"),
                  this.$element.attr(
                    "tabindex",
                    this.$element.data("old-tabindex")
                  ),
                  this.$element.removeClass("select2-hidden-accessible"),
                  this.$element.attr("aria-hidden", "false"),
                  this.$element.removeData("select2"),
                  this.dataAdapter.destroy(),
                  this.selection.destroy(),
                  this.dropdown.destroy(),
                  this.results.destroy(),
                  (this.dataAdapter = null),
                  (this.selection = null),
                  (this.dropdown = null),
                  (this.results = null);
              }),
              (e.prototype.render = function() {
                var b = a(
                  '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
                );
                return (
                  b.attr("dir", this.options.get("dir")),
                  (this.$container = b),
                  this.$container.addClass(
                    "select2-container--" + this.options.get("theme")
                  ),
                  b.data("element", this.$element),
                  b
                );
              }),
              e
            );
          }
        ),
        b.define("select2/compat/utils", ["jquery"], function(a) {
          function b(b, c, d) {
            var e,
              f,
              g = [];
            (e = a.trim(b.attr("class"))),
              e &&
                ((e = "" + e),
                a(e.split(/\s+/)).each(function() {
                  0 === this.indexOf("select2-") && g.push(this);
                })),
              (e = a.trim(c.attr("class"))),
              e &&
                ((e = "" + e),
                a(e.split(/\s+/)).each(function() {
                  0 !== this.indexOf("select2-") &&
                    ((f = d(this)), null != f && g.push(f));
                })),
              b.attr("class", g.join(" "));
          }
          return { syncCssClasses: b };
        }),
        b.define("select2/compat/containerCss", ["jquery", "./utils"], function(
          a,
          b
        ) {
          function c(a) {
            return null;
          }
          function d() {}
          return (
            (d.prototype.render = function(d) {
              var e = d.call(this),
                f = this.options.get("containerCssClass") || "";
              a.isFunction(f) && (f = f(this.$element));
              var g = this.options.get("adaptContainerCssClass");
              if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                f = f.replace(":all:", "");
                var h = g;
                g = function(a) {
                  var b = h(a);
                  return null != b ? b + " " + a : a;
                };
              }
              var i = this.options.get("containerCss") || {};
              return (
                a.isFunction(i) && (i = i(this.$element)),
                b.syncCssClasses(e, this.$element, g),
                e.css(i),
                e.addClass(f),
                e
              );
            }),
            d
          );
        }),
        b.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(
          a,
          b
        ) {
          function c(a) {
            return null;
          }
          function d() {}
          return (
            (d.prototype.render = function(d) {
              var e = d.call(this),
                f = this.options.get("dropdownCssClass") || "";
              a.isFunction(f) && (f = f(this.$element));
              var g = this.options.get("adaptDropdownCssClass");
              if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                f = f.replace(":all:", "");
                var h = g;
                g = function(a) {
                  var b = h(a);
                  return null != b ? b + " " + a : a;
                };
              }
              var i = this.options.get("dropdownCss") || {};
              return (
                a.isFunction(i) && (i = i(this.$element)),
                b.syncCssClasses(e, this.$element, g),
                e.css(i),
                e.addClass(f),
                e
              );
            }),
            d
          );
        }),
        b.define("select2/compat/initSelection", ["jquery"], function(a) {
          function b(a, b, c) {
            c.get("debug") &&
              window.console &&
              console.warn &&
              console.warn(
                "Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"
              ),
              (this.initSelection = c.get("initSelection")),
              (this._isInitialized = !1),
              a.call(this, b, c);
          }
          return (
            (b.prototype.current = function(b, c) {
              var d = this;
              return this._isInitialized
                ? void b.call(this, c)
                : void this.initSelection.call(null, this.$element, function(
                    b
                  ) {
                    (d._isInitialized = !0), a.isArray(b) || (b = [b]), c(b);
                  });
            }),
            b
          );
        }),
        b.define("select2/compat/inputData", ["jquery"], function(a) {
          function b(a, b, c) {
            (this._currentData = []),
              (this._valueSeparator = c.get("valueSeparator") || ","),
              "hidden" === b.prop("type") &&
                c.get("debug") &&
                console &&
                console.warn &&
                console.warn(
                  "Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."
                ),
              a.call(this, b, c);
          }
          return (
            (b.prototype.current = function(b, c) {
              function d(b, c) {
                var e = [];
                return (
                  b.selected || -1 !== a.inArray(b.id, c)
                    ? ((b.selected = !0), e.push(b))
                    : (b.selected = !1),
                  b.children && e.push.apply(e, d(b.children, c)),
                  e
                );
              }
              for (var e = [], f = 0; f < this._currentData.length; f++) {
                var g = this._currentData[f];
                e.push.apply(
                  e,
                  d(g, this.$element.val().split(this._valueSeparator))
                );
              }
              c(e);
            }),
            (b.prototype.select = function(b, c) {
              if (this.options.get("multiple")) {
                var d = this.$element.val();
                (d += this._valueSeparator + c.id),
                  this.$element.val(d),
                  this.$element.trigger("change");
              } else
                this.current(function(b) {
                  a.map(b, function(a) {
                    a.selected = !1;
                  });
                }),
                  this.$element.val(c.id),
                  this.$element.trigger("change");
            }),
            (b.prototype.unselect = function(a, b) {
              var c = this;
              (b.selected = !1),
                this.current(function(a) {
                  for (var d = [], e = 0; e < a.length; e++) {
                    var f = a[e];
                    b.id != f.id && d.push(f.id);
                  }
                  c.$element.val(d.join(c._valueSeparator)),
                    c.$element.trigger("change");
                });
            }),
            (b.prototype.query = function(a, b, c) {
              for (var d = [], e = 0; e < this._currentData.length; e++) {
                var f = this._currentData[e],
                  g = this.matches(b, f);
                null !== g && d.push(g);
              }
              c({ results: d });
            }),
            (b.prototype.addOptions = function(b, c) {
              var d = a.map(c, function(b) {
                return a.data(b[0], "data");
              });
              this._currentData.push.apply(this._currentData, d);
            }),
            b
          );
        }),
        b.define("select2/compat/matcher", ["jquery"], function(a) {
          function b(b) {
            function c(c, d) {
              var e = a.extend(!0, {}, d);
              if (null == c.term || "" === a.trim(c.term)) return e;
              if (d.children) {
                for (var f = d.children.length - 1; f >= 0; f--) {
                  var g = d.children[f],
                    h = b(c.term, g.text, g);
                  h || e.children.splice(f, 1);
                }
                if (e.children.length > 0) return e;
              }
              return b(c.term, d.text, d) ? e : null;
            }
            return c;
          }
          return b;
        }),
        b.define("select2/compat/query", [], function() {
          function a(a, b, c) {
            c.get("debug") &&
              window.console &&
              console.warn &&
              console.warn(
                "Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."
              ),
              a.call(this, b, c);
          }
          return (
            (a.prototype.query = function(a, b, c) {
              b.callback = c;
              var d = this.options.get("query");
              d.call(null, b);
            }),
            a
          );
        }),
        b.define("select2/dropdown/attachContainer", [], function() {
          function a(a, b, c) {
            a.call(this, b, c);
          }
          return (
            (a.prototype.position = function(a, b, c) {
              var d = c.find(".dropdown-wrapper");
              d.append(b),
                b.addClass("select2-dropdown--below"),
                c.addClass("select2-container--below");
            }),
            a
          );
        }),
        b.define("select2/dropdown/stopPropagation", [], function() {
          function a() {}
          return (
            (a.prototype.bind = function(a, b, c) {
              a.call(this, b, c);
              var d = [
                "blur",
                "change",
                "click",
                "dblclick",
                "focus",
                "focusin",
                "focusout",
                "input",
                "keydown",
                "keyup",
                "keypress",
                "mousedown",
                "mouseenter",
                "mouseleave",
                "mousemove",
                "mouseover",
                "mouseup",
                "search",
                "touchend",
                "touchstart"
              ];
              this.$dropdown.on(d.join(" "), function(a) {
                a.stopPropagation();
              });
            }),
            a
          );
        }),
        b.define("select2/selection/stopPropagation", [], function() {
          function a() {}
          return (
            (a.prototype.bind = function(a, b, c) {
              a.call(this, b, c);
              var d = [
                "blur",
                "change",
                "click",
                "dblclick",
                "focus",
                "focusin",
                "focusout",
                "input",
                "keydown",
                "keyup",
                "keypress",
                "mousedown",
                "mouseenter",
                "mouseleave",
                "mousemove",
                "mouseover",
                "mouseup",
                "search",
                "touchend",
                "touchstart"
              ];
              this.$selection.on(d.join(" "), function(a) {
                a.stopPropagation();
              });
            }),
            a
          );
        }),
        (function(c) {
          "function" == typeof b.define && b.define.amd
            ? b.define("jquery-mousewheel", ["jquery"], c)
            : "object" == typeof exports
              ? (module.exports = c)
              : c(a);
        })(function(a) {
          function b(b) {
            var g = b || window.event,
              h = i.call(arguments, 1),
              j = 0,
              l = 0,
              m = 0,
              n = 0,
              o = 0,
              p = 0;
            if (
              ((b = a.event.fix(g)),
              (b.type = "mousewheel"),
              "detail" in g && (m = -1 * g.detail),
              "wheelDelta" in g && (m = g.wheelDelta),
              "wheelDeltaY" in g && (m = g.wheelDeltaY),
              "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
              "axis" in g &&
                g.axis === g.HORIZONTAL_AXIS &&
                ((l = -1 * m), (m = 0)),
              (j = 0 === m ? l : m),
              "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
              "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
              0 !== m || 0 !== l)
            ) {
              if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
              } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                (j *= r), (m *= r), (l *= r);
              }
              if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                k.settings.normalizeOffset && this.getBoundingClientRect)
              ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
              }
              return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
              );
            }
          }
          function c() {
            f = null;
          }
          function d(a, b) {
            return (
              k.settings.adjustOldDeltas &&
              "mousewheel" === a.type &&
              b % 120 === 0
            );
          }
          var e,
            f,
            g = [
              "wheel",
              "mousewheel",
              "DOMMouseScroll",
              "MozMousePixelScroll"
            ],
            h =
              "onwheel" in document || document.documentMode >= 9
                ? ["wheel"]
                : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            i = Array.prototype.slice;
          if (a.event.fixHooks)
            for (var j = g.length; j; )
              a.event.fixHooks[g[--j]] = a.event.mouseHooks;
          var k = (a.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
              if (this.addEventListener)
                for (var c = h.length; c; )
                  this.addEventListener(h[--c], b, !1);
              else this.onmousewheel = b;
              a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
                a.data(this, "mousewheel-page-height", k.getPageHeight(this));
            },
            teardown: function() {
              if (this.removeEventListener)
                for (var c = h.length; c; )
                  this.removeEventListener(h[--c], b, !1);
              else this.onmousewheel = null;
              a.removeData(this, "mousewheel-line-height"),
                a.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function(b) {
              var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
              return (
                d.length || (d = a("body")),
                parseInt(d.css("fontSize"), 10) ||
                  parseInt(c.css("fontSize"), 10) ||
                  16
              );
            },
            getPageHeight: function(b) {
              return a(b).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
          });
          a.fn.extend({
            mousewheel: function(a) {
              return a
                ? this.bind("mousewheel", a)
                : this.trigger("mousewheel");
            },
            unmousewheel: function(a) {
              return this.unbind("mousewheel", a);
            }
          });
        }),
        b.define(
          "jquery.select2",
          [
            "jquery",
            "jquery-mousewheel",
            "./select2/core",
            "./select2/defaults"
          ],
          function(a, b, c, d) {
            if (null == a.fn.select2) {
              var e = ["open", "close", "destroy"];
              a.fn.select2 = function(b) {
                if (((b = b || {}), "object" == typeof b))
                  return (
                    this.each(function() {
                      var d = a.extend(!0, {}, b);
                      new c(a(this), d);
                    }),
                    this
                  );
                if ("string" == typeof b) {
                  var d,
                    f = Array.prototype.slice.call(arguments, 1);
                  return (
                    this.each(function() {
                      var c = a(this).data("select2");
                      null == c &&
                        window.console &&
                        console.error &&
                        console.error(
                          "The select2('" +
                            b +
                            "') method was called on an element that is not using Select2."
                        ),
                        (d = c[b].apply(c, f));
                    }),
                    a.inArray(b, e) > -1 ? this : d
                  );
                }
                throw new Error("Invalid arguments for Select2: " + b);
              };
            }
            return (
              null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c
            );
          }
        ),
        { define: b.define, require: b.require }
      );
    })(),
    c = b.require("jquery.select2");
  return (a.fn.select2.amd = b), c;
});
!(function(o) {
  o(document).ready(function() {
    var e = { formatNoMatches: ghtk_array.formatNoMatches },
      t = (loading_shipping = !1),
      s = o("#billing_city_field"),
      d = o("#billing_address_2_field"),
      l = o("#shipping_city_field"),
      c = o("#shipping_address_2_field");
    o("#billing_state").select2(e),
      o("#billing_city").select2(e),
      o("#billing_address_2").select2(e),
      o("body #billing_state").on("select2:select", function(a) {
        o("#billing_city option").val("");
        var i = a.val;
        i || (i = o("#billing_state option:selected").val()),
          i &&
            !t &&
            ((t = !0),
            o.ajax({
              type: "post",
              dataType: "json",
              url: ghtk_array.admin_ajax,
              data: { action: "load_diagioihanhchinh", matp: i },
              context: this,
              beforeSend: function() {
                s.addClass("devvn_loading"), d.addClass("devvn_loading");
              },
              success: function(a) {
                if (
                  ((t = !1),
                  o("#billing_city,#billing_address_2")
                    .html("")
                    .select2(),
                  a.success)
                ) {
                  var i = a.data,
                    n = new Option("", "");
                  o("#billing_city").append(n),
                    o.each(i, function(a, i) {
                      var n = new Option(i.name, i.maqh);
                      o("#billing_city").append(n);
                    });
                }
                s.removeClass("devvn_loading"), d.removeClass("devvn_loading");
              }
            }));
      }),
      0 < o("#billing_address_2").length &&
        o("#billing_city").on("select2:select", function(a) {
          var i = a.val;
          i || (i = o("#billing_city option:selected").val()),
            i &&
              o.ajax({
                type: "post",
                dataType: "json",
                url: ghtk_array.admin_ajax,
                data: { action: "load_diagioihanhchinh", maqh: i },
                context: this,
                beforeSend: function() {
                  d.addClass("devvn_loading");
                },
                success: function(a) {
                  if (
                    (o("#billing_address_2")
                      .html("")
                      .select2(e),
                    a.success)
                  ) {
                    var i = a.data,
                      n = new Option("", "");
                    o("#billing_address_2").append(n),
                      o.each(i, function(a, i) {
                        var n = new Option(i.name, i.xaid);
                        o("#billing_address_2").append(n);
                      });
                  }
                  d.removeClass("devvn_loading");
                }
              });
        }),
      o("#shipping_state").select2(e),
      o("#shipping_city").select2(e),
      o("#shipping_address_2").select2(e),
      o("body #shipping_state").on("select2:select", function(a) {
        o("#shipping_city option").val("");
        var i = a.val;
        i || (i = o("#shipping_state option:selected").val()),
          i &&
            !loading_shipping &&
            ((loading_shipping = !0),
            o.ajax({
              type: "post",
              dataType: "json",
              url: ghtk_array.admin_ajax,
              data: { action: "load_diagioihanhchinh", matp: i },
              context: this,
              beforeSend: function() {
                l.addClass("devvn_loading"), c.addClass("devvn_loading");
              },
              success: function(a) {
                if (
                  ((loading_shipping = !1),
                  o("#shipping_city,#shipping_address_2")
                    .html("")
                    .select2(),
                  a.success)
                ) {
                  var i = a.data,
                    n = new Option("", "");
                  o("#shipping_city").append(n),
                    o.each(i, function(a, i) {
                      var n = new Option(i.name, i.maqh);
                      o("#shipping_city").append(n);
                    });
                }
                l.removeClass("devvn_loading"), c.removeClass("devvn_loading");
              }
            }));
      }),
      0 < o("#shipping_address_2").length &&
        o("#shipping_city").on("select2:select", function(a) {
          var i = a.val;
          i || (i = o("#shipping_city option:selected").val()),
            i &&
              o.ajax({
                type: "post",
                dataType: "json",
                url: ghtk_array.admin_ajax,
                data: { action: "load_diagioihanhchinh", maqh: i },
                context: this,
                beforeSend: function() {
                  c.addClass("devvn_loading");
                },
                success: function(a) {
                  if (
                    (o("#shipping_address_2")
                      .html("")
                      .select2(e),
                    a.success)
                  ) {
                    var i = a.data,
                      n = new Option("", "");
                    o("#shipping_address_2").append(n),
                      o.each(i, function(a, i) {
                        var n = new Option(i.name, i.xaid);
                        o("#shipping_address_2").append(n);
                      });
                  }
                  c.removeClass("devvn_loading");
                }
              });
        }),
      0 < o("#calc_shipping_city_field").length &&
        o(document.body).bind(
          "country_to_state_changed updated_wc_div",
          function() {
            var e = o("#calc_shipping_city_field #calc_shipping_city");
            e.val(), o("#calc_shipping_state").val();
            e.select2();
            var t = !1,
              a = function(a) {
                a &&
                  !t &&
                  o.ajax({
                    type: "post",
                    dataType: "json",
                    url: ghtk_array.admin_ajax,
                    data: { action: "load_diagioihanhchinh", matp: a },
                    context: this,
                    beforeSend: function() {
                      t = !0;
                    },
                    success: function(a) {
                      if (((t = !1), a.success)) {
                        var i = a.data,
                          n = [];
                        o.each(i, function(a, i) {
                          n.push({ id: i.maqh, text: i.name });
                        }),
                          e.html("").select2({
                            placeholder: "Chọn quận/huyện",
                            data: n
                          });
                      }
                    }
                  });
              };
            o("body select.state_select:visible").each(function() {
              a(o(this).val()),
                o(this, "body").on("select2:select", function() {
                  a(o(this).val());
                });
            });
          }
        ),
      o("#devvn_ghtk_tracking").on("submit", function() {
        var a = o(this).serialize(),
          e = o(this).closest(".devvn_ghtk_tracking_form");
        return (
          o.ajax({
            type: "post",
            dataType: "json",
            url: ghtk_array.admin_ajax,
            data: { action: "ghtk_tracking", data: a },
            context: this,
            beforeSend: function() {
              e.addClass("devvn_loading");
            },
            success: function(a) {
              var i = a.data;
              i &&
                o.each(i.fragments, function(a, i) {
                  o(a, e).html(i);
                }),
                e.removeClass("devvn_loading");
            },
            error: function(a, i, n) {
              e.removeClass("devvn_loading");
            }
          }),
          !1
        );
      });
  });
})(jQuery);
!(function(a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports && "function" == typeof require
          ? require("jquery")
          : jQuery
      );
})(function(a) {
  "use strict";
  function b(c, d) {
    var e = function() {},
      f = this,
      g = {
        ajaxSettings: {},
        autoSelectFirst: !1,
        appendTo: document.body,
        serviceUrl: null,
        lookup: null,
        onSelect: null,
        width: "auto",
        minChars: 1,
        maxHeight: 300,
        deferRequestBy: 0,
        params: {},
        formatResult: b.formatResult,
        delimiter: null,
        zIndex: 9999,
        type: "GET",
        noCache: !1,
        onSearchStart: e,
        onSearchComplete: e,
        onSearchError: e,
        preserveInput: !1,
        containerClass: "autocomplete-suggestions",
        tabDisabled: !1,
        dataType: "text",
        currentRequest: null,
        triggerSelectOnValidInput: !0,
        preventBadQueries: !0,
        lookupFilter: function(a, b, c) {
          return -1 !== a.value.toLowerCase().indexOf(c);
        },
        paramName: "query",
        transformResult: function(b) {
          return "string" == typeof b ? a.parseJSON(b) : b;
        },
        showNoSuggestionNotice: !1,
        noSuggestionNotice: "No results",
        orientation: "bottom",
        forceFixPosition: !1
      };
    (f.element = c),
      (f.el = a(c)),
      (f.suggestions = []),
      (f.badQueries = []),
      (f.selectedIndex = -1),
      (f.currentValue = f.element.value),
      (f.intervalId = 0),
      (f.cachedResponse = {}),
      (f.onChangeInterval = null),
      (f.onChange = null),
      (f.isLocal = !1),
      (f.suggestionsContainer = null),
      (f.noSuggestionsContainer = null),
      (f.options = a.extend({}, g, d)),
      (f.classes = {
        selected: "autocomplete-selected",
        suggestion: "autocomplete-suggestion"
      }),
      (f.hint = null),
      (f.hintValue = ""),
      (f.selection = null),
      f.initialize(),
      f.setOptions(d);
  }
  var c = (function() {
      return {
        escapeRegExChars: function(a) {
          return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        createNode: function(a) {
          var b = document.createElement("div");
          return (
            (b.className = a),
            (b.style.position = "absolute"),
            (b.style.display = "none"),
            b
          );
        }
      };
    })(),
    d = { ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
  (b.utils = c),
    (a.Autocomplete = b),
    (b.formatResult = function(a, b) {
      var d = "(" + c.escapeRegExChars(b) + ")";
      return a.value
        .replace(new RegExp(d, "gi"), "<strong>$1</strong>")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/&lt;(\/?strong)&gt;/g, "<$1>");
    }),
    (b.prototype = {
      killerFn: null,
      initialize: function() {
        var c,
          d = this,
          e = "." + d.classes.suggestion,
          f = d.classes.selected,
          g = d.options;
        d.element.setAttribute("autocomplete", "off"),
          (d.killerFn = function(b) {
            0 === a(b.target).closest("." + d.options.containerClass).length &&
              (d.killSuggestions(), d.disableKillerFn());
          }),
          (d.noSuggestionsContainer = a(
            '<div class="autocomplete-no-suggestion"></div>'
          )
            .html(this.options.noSuggestionNotice)
            .get(0)),
          (d.suggestionsContainer = b.utils.createNode(g.containerClass)),
          (c = a(d.suggestionsContainer)),
          c.appendTo(g.appendTo),
          "auto" !== g.width && c.width(g.width),
          c.on("mouseover.autocomplete", e, function() {
            d.activate(a(this).data("index"));
          }),
          c.on("mouseout.autocomplete", function() {
            (d.selectedIndex = -1), c.children("." + f).removeClass(f);
          }),
          c.on("click.autocomplete", e, function() {
            d.select(a(this).data("index"));
          }),
          (d.fixPositionCapture = function() {
            d.visible && d.fixPosition();
          }),
          a(window).on("resize.autocomplete", d.fixPositionCapture),
          d.el.on("keydown.autocomplete", function(a) {
            d.onKeyPress(a);
          }),
          d.el.on("keyup.autocomplete", function(a) {
            d.onKeyUp(a);
          }),
          d.el.on("blur.autocomplete", function() {
            d.onBlur();
          }),
          d.el.on("focus.autocomplete", function() {
            d.onFocus();
          }),
          d.el.on("change.autocomplete", function(a) {
            d.onKeyUp(a);
          }),
          d.el.on("input.autocomplete", function(a) {
            d.onKeyUp(a);
          });
      },
      onFocus: function() {
        var a = this;
        a.fixPosition(),
          0 === a.options.minChars &&
            0 === a.el.val().length &&
            a.onValueChange();
      },
      onBlur: function() {
        this.enableKillerFn();
      },
      abortAjax: function() {
        var a = this;
        a.currentRequest &&
          (a.currentRequest.abort(), (a.currentRequest = null));
      },
      setOptions: function(b) {
        var c = this,
          d = c.options;
        a.extend(d, b),
          (c.isLocal = a.isArray(d.lookup)),
          c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
          (d.orientation = c.validateOrientation(d.orientation, "bottom")),
          a(c.suggestionsContainer).css({
            "max-height": d.maxHeight + "px",
            width: d.width + "px",
            "z-index": d.zIndex
          });
      },
      clearCache: function() {
        (this.cachedResponse = {}), (this.badQueries = []);
      },
      clear: function() {
        this.clearCache(), (this.currentValue = ""), (this.suggestions = []);
      },
      disable: function() {
        var a = this;
        (a.disabled = !0), clearInterval(a.onChangeInterval), a.abortAjax();
      },
      enable: function() {
        this.disabled = !1;
      },
      fixPosition: function() {
        var b = this,
          c = a(b.suggestionsContainer),
          d = c.parent().get(0);
        if (d === document.body || b.options.forceFixPosition) {
          var e = b.options.orientation,
            f = c.outerHeight(),
            g = b.el.outerHeight(),
            h = b.el.offset(),
            i = { top: h.top, left: h.left };
          if ("auto" === e) {
            var j = a(window).height(),
              k = a(window).scrollTop(),
              l = -k + h.top - f,
              m = k + j - (h.top + g + f);
            e = Math.max(l, m) === l ? "top" : "bottom";
          }
          if (
            ("top" === e ? (i.top += -f) : (i.top += g), d !== document.body)
          ) {
            var n,
              o = c.css("opacity");
            b.visible || c.css("opacity", 0).show(),
              (n = c.offsetParent().offset()),
              (i.top -= n.top),
              (i.left -= n.left),
              b.visible || c.css("opacity", o).hide();
          }
          "auto" === b.options.width &&
            (i.width = b.el.outerWidth() - 2 + "px"),
            c.css(i);
        }
      },
      enableKillerFn: function() {
        var b = this;
        a(document).on("click.autocomplete", b.killerFn);
      },
      disableKillerFn: function() {
        var b = this;
        a(document).off("click.autocomplete", b.killerFn);
      },
      killSuggestions: function() {
        var a = this;
        a.stopKillSuggestions(),
          (a.intervalId = window.setInterval(function() {
            a.visible && (a.el.val(a.currentValue), a.hide()),
              a.stopKillSuggestions();
          }, 50));
      },
      stopKillSuggestions: function() {
        window.clearInterval(this.intervalId);
      },
      isCursorAtEnd: function() {
        var a,
          b = this,
          c = b.el.val().length,
          d = b.element.selectionStart;
        return "number" == typeof d
          ? d === c
          : document.selection
            ? ((a = document.selection.createRange()),
              a.moveStart("character", -c),
              c === a.text.length)
            : !0;
      },
      onKeyPress: function(a) {
        var b = this;
        if (!b.disabled && !b.visible && a.which === d.DOWN && b.currentValue)
          return void b.suggest();
        if (!b.disabled && b.visible) {
          switch (a.which) {
            case d.ESC:
              b.el.val(b.currentValue), b.hide();
              break;
            case d.RIGHT:
              if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                b.selectHint();
                break;
              }
              return;
            case d.TAB:
              if (b.hint && b.options.onHint) return void b.selectHint();
              if (-1 === b.selectedIndex) return void b.hide();
              if ((b.select(b.selectedIndex), b.options.tabDisabled === !1))
                return;
              break;
            case d.RETURN:
              if (-1 === b.selectedIndex) return void b.hide();
              b.select(b.selectedIndex);
              break;
            case d.UP:
              b.moveUp();
              break;
            case d.DOWN:
              b.moveDown();
              break;
            default:
              return;
          }
          a.stopImmediatePropagation(), a.preventDefault();
        }
      },
      onKeyUp: function(a) {
        var b = this;
        if (!b.disabled) {
          switch (a.which) {
            case d.UP:
            case d.DOWN:
              return;
          }
          clearInterval(b.onChangeInterval),
            b.currentValue !== b.el.val() &&
              (b.findBestHint(),
              b.options.deferRequestBy > 0
                ? (b.onChangeInterval = setInterval(function() {
                    b.onValueChange();
                  }, b.options.deferRequestBy))
                : b.onValueChange());
        }
      },
      onValueChange: function() {
        var b = this,
          c = b.options,
          d = b.el.val(),
          e = b.getQuery(d);
        return (
          b.selection &&
            b.currentValue !== e &&
            ((b.selection = null),
            (c.onInvalidateSelection || a.noop).call(b.element)),
          clearInterval(b.onChangeInterval),
          (b.currentValue = d),
          (b.selectedIndex = -1),
          c.triggerSelectOnValidInput && b.isExactMatch(e)
            ? void b.select(0)
            : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e))
        );
      },
      isExactMatch: function(a) {
        var b = this.suggestions;
        return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase();
      },
      getQuery: function(b) {
        var c,
          d = this.options.delimiter;
        return d ? ((c = b.split(d)), a.trim(c[c.length - 1])) : b;
      },
      getSuggestionsLocal: function(b) {
        var c,
          d = this,
          e = d.options,
          f = b.toLowerCase(),
          g = e.lookupFilter,
          h = parseInt(e.lookupLimit, 10);
        return (
          (c = {
            suggestions: a.grep(e.lookup, function(a) {
              return g(a, b, f);
            })
          }),
          h &&
            c.suggestions.length > h &&
            (c.suggestions = c.suggestions.slice(0, h)),
          c
        );
      },
      getSuggestions: function(b) {
        var c,
          d,
          e,
          f,
          g = this,
          h = g.options,
          i = h.serviceUrl;
        if (
          ((h.params[h.paramName] = b),
          (d = h.ignoreParams ? null : h.params),
          h.onSearchStart.call(g.element, h.params) !== !1)
        ) {
          if (a.isFunction(h.lookup))
            return void h.lookup(b, function(a) {
              (g.suggestions = a.suggestions),
                g.suggest(),
                h.onSearchComplete.call(g.element, b, a.suggestions);
            });
          g.isLocal
            ? (c = g.getSuggestionsLocal(b))
            : (a.isFunction(i) && (i = i.call(g.element, b)),
              (e = i + "?" + a.param(d || {})),
              (c = g.cachedResponse[e])),
            c && a.isArray(c.suggestions)
              ? ((g.suggestions = c.suggestions),
                g.suggest(),
                h.onSearchComplete.call(g.element, b, c.suggestions))
              : g.isBadQuery(b)
                ? h.onSearchComplete.call(g.element, b, [])
                : (g.abortAjax(),
                  (f = { url: i, data: d, type: h.type, dataType: h.dataType }),
                  a.extend(f, h.ajaxSettings),
                  (g.currentRequest = a
                    .ajax(f)
                    .done(function(a) {
                      var c;
                      (g.currentRequest = null),
                        (c = h.transformResult(a, b)),
                        g.processResponse(c, b, e),
                        h.onSearchComplete.call(g.element, b, c.suggestions);
                    })
                    .fail(function(a, c, d) {
                      h.onSearchError.call(g.element, b, a, c, d);
                    })));
        }
      },
      isBadQuery: function(a) {
        if (!this.options.preventBadQueries) return !1;
        for (var b = this.badQueries, c = b.length; c--; )
          if (0 === a.indexOf(b[c])) return !0;
        return !1;
      },
      hide: function() {
        var b = this,
          c = a(b.suggestionsContainer);
        a.isFunction(b.options.onHide) &&
          b.visible &&
          b.options.onHide.call(b.element, c),
          (b.visible = !1),
          (b.selectedIndex = -1),
          clearInterval(b.onChangeInterval),
          a(b.suggestionsContainer).hide(),
          b.signalHint(null);
      },
      suggest: function() {
        if (0 === this.suggestions.length)
          return void (this.options.showNoSuggestionNotice
            ? this.noSuggestions()
            : this.hide());
        var b,
          c = this,
          d = c.options,
          e = d.groupBy,
          f = d.formatResult,
          g = c.getQuery(c.currentValue),
          h = c.classes.suggestion,
          i = c.classes.selected,
          j = a(c.suggestionsContainer),
          k = a(c.noSuggestionsContainer),
          l = d.beforeRender,
          m = "",
          n = function(a, c) {
            var d = a.data[e];
            return b === d
              ? ""
              : ((b = d),
                '<div class="autocomplete-group"><strong>' +
                  b +
                  "</strong></div>");
          };
        return d.triggerSelectOnValidInput && c.isExactMatch(g)
          ? void c.select(0)
          : (a.each(c.suggestions, function(a, b) {
              e && (m += n(b, g, a)),
                (m +=
                  '<div class="' +
                  h +
                  '" data-index="' +
                  a +
                  '">' +
                  f(b, g) +
                  "</div>");
            }),
            this.adjustContainerWidth(),
            k.detach(),
            j.html(m),
            a.isFunction(l) && l.call(c.element, j),
            c.fixPosition(),
            j.show(),
            d.autoSelectFirst &&
              ((c.selectedIndex = 0),
              j.scrollTop(0),
              j
                .children("." + h)
                .first()
                .addClass(i)),
            (c.visible = !0),
            void c.findBestHint());
      },
      noSuggestions: function() {
        var b = this,
          c = a(b.suggestionsContainer),
          d = a(b.noSuggestionsContainer);
        this.adjustContainerWidth(),
          d.detach(),
          c.empty(),
          c.append(d),
          b.fixPosition(),
          c.show(),
          (b.visible = !0);
      },
      adjustContainerWidth: function() {
        var b,
          c = this,
          d = c.options,
          e = a(c.suggestionsContainer);
        "auto" === d.width &&
          ((b = c.el.outerWidth() - 2), e.width(b > 0 ? b : 300));
      },
      findBestHint: function() {
        var b = this,
          c = b.el.val().toLowerCase(),
          d = null;
        c &&
          (a.each(b.suggestions, function(a, b) {
            var e = 0 === b.value.toLowerCase().indexOf(c);
            return e && (d = b), !e;
          }),
          b.signalHint(d));
      },
      signalHint: function(b) {
        var c = "",
          d = this;
        b && (c = d.currentValue + b.value.substr(d.currentValue.length)),
          d.hintValue !== c &&
            ((d.hintValue = c),
            (d.hint = b),
            (this.options.onHint || a.noop)(c));
      },
      verifySuggestionsFormat: function(b) {
        return b.length && "string" == typeof b[0]
          ? a.map(b, function(a) {
              return { value: a, data: null };
            })
          : b;
      },
      validateOrientation: function(b, c) {
        return (
          (b = a.trim(b || "").toLowerCase()),
          -1 === a.inArray(b, ["auto", "bottom", "top"]) && (b = c),
          b
        );
      },
      processResponse: function(a, b, c) {
        var d = this,
          e = d.options;
        (a.suggestions = d.verifySuggestionsFormat(a.suggestions)),
          e.noCache ||
            ((d.cachedResponse[c] = a),
            e.preventBadQueries &&
              0 === a.suggestions.length &&
              d.badQueries.push(b)),
          b === d.getQuery(d.currentValue) &&
            ((d.suggestions = a.suggestions), d.suggest());
      },
      activate: function(b) {
        var c,
          d = this,
          e = d.classes.selected,
          f = a(d.suggestionsContainer),
          g = f.find("." + d.classes.suggestion);
        return (
          f.find("." + e).removeClass(e),
          (d.selectedIndex = b),
          -1 !== d.selectedIndex && g.length > d.selectedIndex
            ? ((c = g.get(d.selectedIndex)), a(c).addClass(e), c)
            : null
        );
      },
      selectHint: function() {
        var b = this,
          c = a.inArray(b.hint, b.suggestions);
        b.select(c);
      },
      select: function(a) {
        var b = this;
        b.hide(), b.onSelect(a);
      },
      moveUp: function() {
        var b = this;
        if (-1 !== b.selectedIndex)
          return 0 === b.selectedIndex
            ? (a(b.suggestionsContainer)
                .children()
                .first()
                .removeClass(b.classes.selected),
              (b.selectedIndex = -1),
              b.el.val(b.currentValue),
              void b.findBestHint())
            : void b.adjustScroll(b.selectedIndex - 1);
      },
      moveDown: function() {
        var a = this;
        a.selectedIndex !== a.suggestions.length - 1 &&
          a.adjustScroll(a.selectedIndex + 1);
      },
      adjustScroll: function(b) {
        var c = this,
          d = c.activate(b);
        if (d) {
          var e,
            f,
            g,
            h = a(d).outerHeight();
          (e = d.offsetTop),
            (f = a(c.suggestionsContainer).scrollTop()),
            (g = f + c.options.maxHeight - h),
            f > e
              ? a(c.suggestionsContainer).scrollTop(e)
              : e > g &&
                a(c.suggestionsContainer).scrollTop(
                  e - c.options.maxHeight + h
                ),
            c.options.preserveInput ||
              c.el.val(c.getValue(c.suggestions[b].value)),
            c.signalHint(null);
        }
      },
      onSelect: function(b) {
        var c = this,
          d = c.options.onSelect,
          e = c.suggestions[b];
        (c.currentValue = c.getValue(e.value)),
          c.currentValue === c.el.val() ||
            c.options.preserveInput ||
            c.el.val(c.currentValue),
          c.signalHint(null),
          (c.suggestions = []),
          (c.selection = e),
          a.isFunction(d) && d.call(c.element, e);
      },
      getValue: function(a) {
        var b,
          c,
          d = this,
          e = d.options.delimiter;
        return e
          ? ((b = d.currentValue),
            (c = b.split(e)),
            1 === c.length
              ? a
              : b.substr(0, b.length - c[c.length - 1].length) + a)
          : a;
      },
      dispose: function() {
        var b = this;
        b.el.off(".autocomplete").removeData("autocomplete"),
          b.disableKillerFn(),
          a(window).off("resize.autocomplete", b.fixPositionCapture),
          a(b.suggestionsContainer).remove();
      }
    }),
    (a.fn.autocomplete = a.fn.devbridgeAutocomplete = function(c, d) {
      var e = "autocomplete";
      return 0 === arguments.length
        ? this.first().data(e)
        : this.each(function() {
            var f = a(this),
              g = f.data(e);
            "string" == typeof c
              ? g && "function" == typeof g[c] && g[c](d)
              : (g && g.dispose && g.dispose(),
                (g = new b(this, c)),
                f.data(e, g));
          });
    });
});
jQuery(document).ready(function($) {
  "use strict";
  $(".searchform").each(function() {
    var append = $(this).find(".live-search-results");
    var search_categories = $(this).find(".search_categories");
    var serviceUrl =
      flatsomeVars.ajaxurl + "?action=flatsome_ajax_search_products";
    var product_cat = "";
    if (search_categories.length && search_categories.val() !== "") {
      serviceUrl += "&product_cat=" + search_categories.val();
    }
    $(this)
      .find(".search-field")
      .devbridgeAutocomplete({
        minChars: 3,
        appendTo: append,
        triggerSelectOnValidInput: false,
        serviceUrl: serviceUrl,
        onSearchStart: function() {
          $(".submit-button").removeClass("loading");
          $(".submit-button").addClass("loading");
        },
        onSelect: function(suggestion) {
          if (suggestion.id != -1) {
            window.location.href = suggestion.url;
          }
        },
        onSearchComplete: function() {
          $(".submit-button").removeClass("loading");
        },
        beforeRender: function(container) {
          $(container).removeAttr("style");
        },
        formatResult: function(suggestion, currentValue) {
          var pattern =
            "(" + $.Autocomplete.utils.escapeRegExChars(currentValue) + ")";
          var html = "";
          if (suggestion.img)
            html += '<img class="search-image" src="' + suggestion.img + '">';
          html +=
            '<div class="search-name">' +
            suggestion.value.replace(
              new RegExp(pattern, "gi"),
              "<strong>$1</strong>"
            ) +
            "</div>";
          if (suggestion.price)
            html += '<span class="search-price">' + suggestion.price + "<span>";
          return html;
        }
      });
    if (search_categories.length) {
      var searchForm = $(this)
        .find(".search-field")
        .devbridgeAutocomplete();
      search_categories.on("change", function(e) {
        if (search_categories.val() != "") {
          searchForm.setOptions({
            serviceUrl:
              flatsomeVars.ajaxurl +
              "?action=flatsome_ajax_search_products&product_cat=" +
              search_categories.val()
          });
        } else {
          searchForm.setOptions({
            serviceUrl:
              flatsomeVars.ajaxurl + "?action=flatsome_ajax_search_products"
          });
        }
        searchForm.hide();
        searchForm.onValueChange();
      });
    }
  });
});
!(function(a) {
  a.fn.hoverIntent = function(b, c, d) {
    var e = { interval: 100, sensitivity: 6, timeout: 0 };
    e =
      "object" == typeof b
        ? a.extend(e, b)
        : a.isFunction(c)
          ? a.extend(e, { over: b, out: c, selector: d })
          : a.extend(e, { over: b, out: b, selector: c });
    var f,
      g,
      h,
      i,
      j = function(a) {
        (f = a.pageX), (g = a.pageY);
      },
      k = function(b, c) {
        return (
          (c.hoverIntent_t = clearTimeout(c.hoverIntent_t)),
          Math.sqrt((h - f) * (h - f) + (i - g) * (i - g)) < e.sensitivity
            ? (a(c).off("mousemove.hoverIntent", j),
              (c.hoverIntent_s = !0),
              e.over.apply(c, [b]))
            : ((h = f),
              (i = g),
              (c.hoverIntent_t = setTimeout(function() {
                k(b, c);
              }, e.interval)),
              void 0)
        );
      },
      l = function(a, b) {
        return (
          (b.hoverIntent_t = clearTimeout(b.hoverIntent_t)),
          (b.hoverIntent_s = !1),
          e.out.apply(b, [a])
        );
      },
      m = function(b) {
        var c = a.extend({}, b),
          d = this;
        d.hoverIntent_t && (d.hoverIntent_t = clearTimeout(d.hoverIntent_t)),
          "mouseenter" === b.type
            ? ((h = c.pageX),
              (i = c.pageY),
              a(d).on("mousemove.hoverIntent", j),
              d.hoverIntent_s ||
                (d.hoverIntent_t = setTimeout(function() {
                  k(c, d);
                }, e.interval)))
            : (a(d).off("mousemove.hoverIntent", j),
              d.hoverIntent_s &&
                (d.hoverIntent_t = setTimeout(function() {
                  l(c, d);
                }, e.timeout)));
      };
    return this.on(
      { "mouseenter.hoverIntent": m, "mouseleave.hoverIntent": m },
      e.selector
    );
  };
})(jQuery);
!(function(t) {
  function e(n) {
    if (i[n]) return i[n].exports;
    var o = (i[n] = { exports: {}, id: n, loaded: !1 });
    return t[n].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
  }
  var i = {};
  return (e.m = t), (e.c = i), (e.p = ""), e(0);
})([
  function(t, e, i) {
    t.exports = i(13);
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function(t, e, i) {
    (function(t) {
      "use strict";
      function e(t) {
        return t && t.__esModule ? t : { default: t };
      }
      var n = i(14),
        o = e(n);
      i(15),
        i(17),
        i(18),
        i(19),
        i(20),
        i(21),
        i(22),
        i(23),
        i(24),
        i(92),
        i(93),
        i(94),
        i(95),
        i(96),
        i(98),
        i(99),
        i(100),
        i(102),
        i(103),
        i(104),
        i(105),
        i(106),
        i(107),
        i(108),
        i(109),
        i(110),
        i(111),
        i(112),
        i(113),
        i(114),
        i(115),
        i(116),
        i(117),
        i(118),
        jQuery(function() {
          return t.Flatsome.attach(document);
        }),
        (t.cookie = o.default);
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e, i) {
    (function(e) {
      /*! cookie function. get, set, or forget a cookie. [c]2014 @scottjehl, Filament Group, Inc. Licensed MIT */
      !(function(e) {
        var i = function(t, i, n) {
          if (void 0 === i) {
            var o = "; " + e.document.cookie,
              r = o.split("; " + t + "=");
            return 2 === r.length
              ? r
                  .pop()
                  .split(";")
                  .shift()
              : null;
          }
          i === !1 && (n = -1);
          var s = "";
          if (n) {
            var a = new Date();
            a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3),
              (s = "; expires=" + a.toGMTString());
          }
          e.document.cookie = t + "=" + i + s + "; path=/";
        };
        t.exports = i;
      })("undefined" != typeof e ? e : this);
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e, i) {
    var n,
      o,
      r,
      s,
      r,
      a,
      r,
      l,
      n,
      c,
      n,
      u,
      r,
      d,
      n,
      h,
      n,
      p,
      n,
      f,
      n,
      m,
      n,
      g,
      n,
      v,
      n,
      y,
      n,
      b,
      n,
      w,
      n,
      x,
      n,
      S,
      n,
      r,
      C,
      r,
      n,
      o,
      n,
      k,
      n,
      o;
    /*!
     * Flickity PACKAGED v2.1.2
     * Touch, responsive, flickable carousels
     *
     * Licensed GPLv3 for open source use
     * or Flickity Commercial License for commercial use
     *
     * https://flickity.metafizzy.co
     * Copyright 2015-2018 Metafizzy
     */
    !(function(r, s) {
      (n = [i(16)]),
        (o = function(t) {
          return s(r, t);
        }.apply(e, n)),
        !(void 0 !== o && (t.exports = o));
    })(window, function(t, e) {
      "use strict";
      function i(i, r, a) {
        function l(t, e, n) {
          var o,
            r = "$()." + i + '("' + e + '")';
          return (
            t.each(function(t, l) {
              var c = a.data(l, i);
              if (!c)
                return void s(
                  i + " not initialized. Cannot call methods, i.e. " + r
                );
              var u = c[e];
              if (!u || "_" == e.charAt(0))
                return void s(r + " is not a valid method");
              var d = u.apply(c, n);
              o = void 0 === o ? d : o;
            }),
            void 0 !== o ? o : t
          );
        }
        function c(t, e) {
          t.each(function(t, n) {
            var o = a.data(n, i);
            o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
          });
        }
        (a = a || e || t.jQuery),
          a &&
            (r.prototype.option ||
              (r.prototype.option = function(t) {
                a.isPlainObject(t) &&
                  (this.options = a.extend(!0, this.options, t));
              }),
            (a.fn[i] = function(t) {
              if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return l(this, t, e);
              }
              return c(this, t), this;
            }),
            n(a));
      }
      function n(t) {
        !t || (t && t.bridget) || (t.bridget = i);
      }
      var o = Array.prototype.slice,
        r = t.console,
        s =
          "undefined" == typeof r
            ? function() {}
            : function(t) {
                r.error(t);
              };
      return n(e || t.jQuery), i;
    }),
      (function(n, o) {
        (r = o), !(s = "function" == typeof r ? r.call(e, i, e, t) : r);
      })("undefined" != typeof window ? window : this, function() {
        function t() {}
        var e = t.prototype;
        return (
          (e.on = function(t, e) {
            if (t && e) {
              var i = (this._events = this._events || {}),
                n = (i[t] = i[t] || []);
              return n.indexOf(e) == -1 && n.push(e), this;
            }
          }),
          (e.once = function(t, e) {
            if (t && e) {
              this.on(t, e);
              var i = (this._onceEvents = this._onceEvents || {}),
                n = (i[t] = i[t] || {});
              return (n[e] = !0), this;
            }
          }),
          (e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
              var n = i.indexOf(e);
              return n != -1 && i.splice(n, 1), this;
            }
          }),
          (e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
              (i = i.slice(0)), (e = e || []);
              for (
                var n = this._onceEvents && this._onceEvents[t], o = 0;
                o < i.length;
                o++
              ) {
                var r = i[o],
                  s = n && n[r];
                s && (this.off(t, r), delete n[r]), r.apply(this, e);
              }
              return this;
            }
          }),
          (e.allOff = function() {
            delete this._events, delete this._onceEvents;
          }),
          t
        );
      }),
      /*!
       * getSize v2.0.3
       * measure size of elements
       * MIT license
       */
      (function(n, o) {
        (r = o), !(a = "function" == typeof r ? r.call(e, i, e, t) : r);
      })(window, function() {
        "use strict";
        function t(t) {
          var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
          return i && e;
        }
        function e() {}
        function i() {
          for (
            var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
              },
              e = 0;
            e < c;
            e++
          ) {
            var i = l[e];
            t[i] = 0;
          }
          return t;
        }
        function n(t) {
          var e = getComputedStyle(t);
          return (
            e ||
              a(
                "Style returned " +
                  e +
                  ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
              ),
            e
          );
        }
        function o() {
          if (!u) {
            u = !0;
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style.boxSizing = "border-box");
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            (s = 200 == Math.round(t(o.width))),
              (r.isBoxSizeOuter = s),
              i.removeChild(e);
          }
        }
        function r(e) {
          if (
            (o(),
            "string" == typeof e && (e = document.querySelector(e)),
            e && "object" == typeof e && e.nodeType)
          ) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            (a.width = e.offsetWidth), (a.height = e.offsetHeight);
            for (
              var u = (a.isBorderBox = "border-box" == r.boxSizing), d = 0;
              d < c;
              d++
            ) {
              var h = l[d],
                p = r[h],
                f = parseFloat(p);
              a[h] = isNaN(f) ? 0 : f;
            }
            var m = a.paddingLeft + a.paddingRight,
              g = a.paddingTop + a.paddingBottom,
              v = a.marginLeft + a.marginRight,
              y = a.marginTop + a.marginBottom,
              b = a.borderLeftWidth + a.borderRightWidth,
              w = a.borderTopWidth + a.borderBottomWidth,
              x = u && s,
              S = t(r.width);
            S !== !1 && (a.width = S + (x ? 0 : m + b));
            var C = t(r.height);
            return (
              C !== !1 && (a.height = C + (x ? 0 : g + w)),
              (a.innerWidth = a.width - (m + b)),
              (a.innerHeight = a.height - (g + w)),
              (a.outerWidth = a.width + v),
              (a.outerHeight = a.height + y),
              a
            );
          }
        }
        var s,
          a =
            "undefined" == typeof console
              ? e
              : function(t) {
                  console.error(t);
                },
          l = [
            "paddingLeft",
            "paddingRight",
            "paddingTop",
            "paddingBottom",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
            "borderLeftWidth",
            "borderRightWidth",
            "borderTopWidth",
            "borderBottomWidth"
          ],
          c = l.length,
          u = !1;
        return r;
      }),
      (function(n, o) {
        "use strict";
        (r = o), !(l = "function" == typeof r ? r.call(e, i, e, t) : r);
      })(window, function() {
        "use strict";
        var t = (function() {
          var t = window.Element.prototype;
          if (t.matches) return "matches";
          if (t.matchesSelector) return "matchesSelector";
          for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
              o = n + "MatchesSelector";
            if (t[o]) return o;
          }
        })();
        return function(e, i) {
          return e[t](i);
        };
      }),
      (function(t, i) {
        (n = [l]),
          !(c = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        var i = {};
        (i.extend = function(t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        }),
          (i.modulo = function(t, e) {
            return (t % e + e) % e;
          });
        var n = Array.prototype.slice;
        (i.makeArray = function(t) {
          if (Array.isArray(t)) return t;
          if (null === t || void 0 === t) return [];
          var e = "object" == typeof t && "number" == typeof t.length;
          return e ? n.call(t) : [t];
        }),
          (i.removeFrom = function(t, e) {
            var i = t.indexOf(e);
            i != -1 && t.splice(i, 1);
          }),
          (i.getParent = function(t, i) {
            for (; t.parentNode && t != document.body; )
              if (((t = t.parentNode), e(t, i))) return t;
          }),
          (i.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t;
          }),
          (i.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (i.filterFindElements = function(t, n) {
            t = i.makeArray(t);
            var o = [];
            return (
              t.forEach(function(t) {
                if (t instanceof HTMLElement) {
                  if (!n) return void o.push(t);
                  e(t, n) && o.push(t);
                  for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                    o.push(i[r]);
                }
              }),
              o
            );
          }),
          (i.debounceMethod = function(t, e, i) {
            i = i || 100;
            var n = t.prototype[e],
              o = e + "Timeout";
            t.prototype[e] = function() {
              var t = this[o];
              clearTimeout(t);
              var e = arguments,
                r = this;
              this[o] = setTimeout(function() {
                n.apply(r, e), delete r[o];
              }, i);
            };
          }),
          (i.docReady = function(t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e
              ? setTimeout(t)
              : document.addEventListener("DOMContentLoaded", t);
          }),
          (i.toDashed = function(t) {
            return t
              .replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i;
              })
              .toLowerCase();
          });
        var o = t.console;
        return (
          (i.htmlInit = function(e, n) {
            i.docReady(function() {
              var r = i.toDashed(n),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                l = document.querySelectorAll(".js-" + r),
                c = i.makeArray(a).concat(i.makeArray(l)),
                u = s + "-options",
                d = t.jQuery;
              c.forEach(function(t) {
                var i,
                  r = t.getAttribute(s) || t.getAttribute(u);
                try {
                  i = r && JSON.parse(r);
                } catch (e) {
                  return void (
                    o &&
                    o.error(
                      "Error parsing " + s + " on " + t.className + ": " + e
                    )
                  );
                }
                var a = new e(t, i);
                d && d.data(t, n, a);
              });
            });
          }),
          i
        );
      }),
      (function(t, i) {
        (n = [a]),
          !(u = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        function i(t, e) {
          (this.element = t), (this.parent = e), this.create();
        }
        var n = i.prototype;
        return (
          (n.create = function() {
            (this.element.style.position = "absolute"),
              this.element.setAttribute("aria-selected", "false"),
              (this.x = 0),
              (this.shift = 0);
          }),
          (n.destroy = function() {
            this.element.style.position = "";
            var t = this.parent.originSide;
            this.element.removeAttribute("aria-selected"),
              (this.element.style[t] = "");
          }),
          (n.getSize = function() {
            this.size = e(this.element);
          }),
          (n.setPosition = function(t) {
            (this.x = t), this.updateTarget(), this.renderPosition(t);
          }),
          (n.updateTarget = n.setDefaultTarget = function() {
            var t =
              "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target =
              this.x + this.size[t] + this.size.width * this.parent.cellAlign;
          }),
          (n.renderPosition = function(t) {
            var e = this.parent.originSide;
            this.element.style[e] = this.parent.getPositionValue(t);
          }),
          (n.wrapShift = function(t) {
            (this.shift = t),
              this.renderPosition(this.x + this.parent.slideableWidth * t);
          }),
          (n.remove = function() {
            this.element.parentNode.removeChild(this.element);
          }),
          i
        );
      }),
      (function(n, o) {
        (r = o), !(d = "function" == typeof r ? r.call(e, i, e, t) : r);
      })(window, function() {
        "use strict";
        function t(t) {
          (this.parent = t),
            (this.isOriginLeft = "left" == t.originSide),
            (this.cells = []),
            (this.outerWidth = 0),
            (this.height = 0);
        }
        var e = t.prototype;
        return (
          (e.addCell = function(t) {
            if (
              (this.cells.push(t),
              (this.outerWidth += t.size.outerWidth),
              (this.height = Math.max(t.size.outerHeight, this.height)),
              1 == this.cells.length)
            ) {
              this.x = t.x;
              var e = this.isOriginLeft ? "marginLeft" : "marginRight";
              this.firstMargin = t.size[e];
            }
          }),
          (e.updateTarget = function() {
            var t = this.isOriginLeft ? "marginRight" : "marginLeft",
              e = this.getLastCell(),
              i = e ? e.size[t] : 0,
              n = this.outerWidth - (this.firstMargin + i);
            this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
          }),
          (e.getLastCell = function() {
            return this.cells[this.cells.length - 1];
          }),
          (e.select = function() {
            this.changeSelected(!0);
          }),
          (e.unselect = function() {
            this.changeSelected(!1);
          }),
          (e.changeSelected = function(t) {
            var e = t ? "add" : "remove";
            this.cells.forEach(function(i) {
              i.element.classList[e]("is-selected"),
                i.element.setAttribute("aria-selected", t.toString());
            });
          }),
          (e.getCellElements = function() {
            return this.cells.map(function(t) {
              return t.element;
            });
          }),
          t
        );
      }),
      (function(t, i) {
        (n = [c]),
          !(h = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        var i = {};
        return (
          (i.startAnimation = function() {
            this.isAnimating ||
              ((this.isAnimating = !0),
              (this.restingFrames = 0),
              this.animate());
          }),
          (i.animate = function() {
            this.applyDragForce(), this.applySelectedAttraction();
            var t = this.x;
            if (
              (this.integratePhysics(),
              this.positionSlider(),
              this.settle(t),
              this.isAnimating)
            ) {
              var e = this;
              requestAnimationFrame(function() {
                e.animate();
              });
            }
          }),
          (i.positionSlider = function() {
            var t = this.x;
            this.options.wrapAround &&
              this.cells.length > 1 &&
              ((t = e.modulo(t, this.slideableWidth)),
              (t -= this.slideableWidth),
              this.shiftWrapCells(t)),
              (t += this.cursorPosition),
              (t = this.options.rightToLeft ? -t : t);
            var i = this.getPositionValue(t);
            this.slider.style.transform = this.isAnimating
              ? "translate3d(" + i + ",0,0)"
              : "translateX(" + i + ")";
            var n = this.slides[0];
            if (n) {
              var o = -this.x - n.target,
                r = o / this.slidesWidth;
              this.dispatchEvent("scroll", null, [r, o]);
            }
          }),
          (i.positionSliderAtSelected = function() {
            this.cells.length &&
              ((this.x = -this.selectedSlide.target),
              (this.velocity = 0),
              this.positionSlider());
          }),
          (i.getPositionValue = function(t) {
            return this.options.percentPosition
              ? 0.01 * Math.round(t / this.size.innerWidth * 1e4) + "%"
              : Math.round(t) + "px";
          }),
          (i.settle = function(t) {
            this.isPointerDown ||
              Math.round(100 * this.x) != Math.round(100 * t) ||
              this.restingFrames++,
              this.restingFrames > 2 &&
                ((this.isAnimating = !1),
                delete this.isFreeScrolling,
                this.positionSlider(),
                this.dispatchEvent("settle", null, [this.selectedIndex]));
          }),
          (i.shiftWrapCells = function(t) {
            var e = this.cursorPosition + t;
            this._shiftCells(this.beforeShiftCells, e, -1);
            var i =
              this.size.innerWidth -
              (t + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1);
          }),
          (i._shiftCells = function(t, e, i) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n],
                r = e > 0 ? i : 0;
              o.wrapShift(r), (e -= o.size.outerWidth);
            }
          }),
          (i._unshiftCells = function(t) {
            if (t && t.length)
              for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
          }),
          (i.integratePhysics = function() {
            (this.x += this.velocity),
              (this.velocity *= this.getFrictionFactor());
          }),
          (i.applyForce = function(t) {
            this.velocity += t;
          }),
          (i.getFrictionFactor = function() {
            return (
              1 -
              this.options[
                this.isFreeScrolling ? "freeScrollFriction" : "friction"
              ]
            );
          }),
          (i.getRestingPosition = function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor());
          }),
          (i.applyDragForce = function() {
            if (this.isDraggable && this.isPointerDown) {
              var t = this.dragX - this.x,
                e = t - this.velocity;
              this.applyForce(e);
            }
          }),
          (i.applySelectedAttraction = function() {
            var t = this.isDraggable && this.isPointerDown;
            if (!t && !this.isFreeScrolling && this.slides.length) {
              var e = this.selectedSlide.target * -1 - this.x,
                i = e * this.options.selectedAttraction;
              this.applyForce(i);
            }
          }),
          i
        );
      }),
      (function(t, i) {
        (n = [s, a, c, u, d, h]),
          !(p = function(e, n, o, r, s, a) {
            return i(t, e, n, o, r, s, a);
          }.apply(e, n));
      })(window, function(t, e, i, n, o, r, s) {
        function a(t, e) {
          for (t = n.makeArray(t); t.length; ) e.appendChild(t.shift());
        }
        function l(t, e) {
          var i = n.getQueryElement(t);
          if (!i)
            return void (d && d.error("Bad element for Flickity: " + (i || t)));
          if (((this.element = i), this.element.flickityGUID)) {
            var o = p[this.element.flickityGUID];
            return o.option(e), o;
          }
          c && (this.$element = c(this.element)),
            (this.options = n.extend({}, this.constructor.defaults)),
            this.option(e),
            this._create();
        }
        var c = t.jQuery,
          u = t.getComputedStyle,
          d = t.console,
          h = 0,
          p = {};
        (l.defaults = {
          accessibility: !0,
          cellAlign: "center",
          freeScrollFriction: 0.075,
          friction: 0.28,
          namespaceJQueryEvents: !0,
          percentPosition: !0,
          resize: !0,
          selectedAttraction: 0.025,
          setGallerySize: !0
        }),
          (l.createMethods = []);
        var f = l.prototype;
        n.extend(f, e.prototype),
          (f._create = function() {
            var e = (this.guid = ++h);
            (this.element.flickityGUID = e),
              (p[e] = this),
              (this.selectedIndex = 0),
              (this.restingFrames = 0),
              (this.x = 0),
              (this.velocity = 0),
              (this.originSide = this.options.rightToLeft ? "right" : "left"),
              (this.viewport = document.createElement("div")),
              (this.viewport.className = "flickity-viewport"),
              this._createSlider(),
              (this.options.resize || this.options.watchCSS) &&
                t.addEventListener("resize", this);
            for (var i in this.options.on) {
              var n = this.options.on[i];
              this.on(i, n);
            }
            l.createMethods.forEach(function(t) {
              this[t]();
            }, this),
              this.options.watchCSS ? this.watchCSS() : this.activate();
          }),
          (f.option = function(t) {
            n.extend(this.options, t);
          }),
          (f.activate = function() {
            if (!this.isActive) {
              (this.isActive = !0),
                this.element.classList.add("flickity-enabled"),
                this.options.rightToLeft &&
                  this.element.classList.add("flickity-rtl"),
                this.getSize();
              var t = this._filterFindCellElements(this.element.children);
              a(t, this.slider),
                this.viewport.appendChild(this.slider),
                this.element.appendChild(this.viewport),
                this.reloadCells(),
                this.options.accessibility &&
                  ((this.element.tabIndex = 0),
                  this.element.addEventListener("keydown", this)),
                this.emitEvent("activate");
              var e,
                i = this.options.initialIndex;
              (e = this.isInitActivated
                ? this.selectedIndex
                : void 0 !== i && this.cells[i]
                  ? i
                  : 0),
                this.select(e, !1, !0),
                (this.isInitActivated = !0),
                this.dispatchEvent("ready");
            }
          }),
          (f._createSlider = function() {
            var t = document.createElement("div");
            (t.className = "flickity-slider"),
              (t.style[this.originSide] = 0),
              (this.slider = t);
          }),
          (f._filterFindCellElements = function(t) {
            return n.filterFindElements(t, this.options.cellSelector);
          }),
          (f.reloadCells = function() {
            (this.cells = this._makeCells(this.slider.children)),
              this.positionCells(),
              this._getWrapShiftCells(),
              this.setGallerySize();
          }),
          (f._makeCells = function(t) {
            var e = this._filterFindCellElements(t),
              i = e.map(function(t) {
                return new o(t, this);
              }, this);
            return i;
          }),
          (f.getLastCell = function() {
            return this.cells[this.cells.length - 1];
          }),
          (f.getLastSlide = function() {
            return this.slides[this.slides.length - 1];
          }),
          (f.positionCells = function() {
            this._sizeCells(this.cells), this._positionCells(0);
          }),
          (f._positionCells = function(t) {
            (t = t || 0),
              (this.maxCellHeight = t ? this.maxCellHeight || 0 : 0);
            var e = 0;
            if (t > 0) {
              var i = this.cells[t - 1];
              e = i.x + i.size.outerWidth;
            }
            for (var n = this.cells.length, o = t; o < n; o++) {
              var r = this.cells[o];
              r.setPosition(e),
                (e += r.size.outerWidth),
                (this.maxCellHeight = Math.max(
                  r.size.outerHeight,
                  this.maxCellHeight
                ));
            }
            (this.slideableWidth = e),
              this.updateSlides(),
              this._containSlides(),
              (this.slidesWidth = n
                ? this.getLastSlide().target - this.slides[0].target
                : 0);
          }),
          (f._sizeCells = function(t) {
            t.forEach(function(t) {
              t.getSize();
            });
          }),
          (f.updateSlides = function() {
            if (((this.slides = []), this.cells.length)) {
              var t = new r(this);
              this.slides.push(t);
              var e = "left" == this.originSide,
                i = e ? "marginRight" : "marginLeft",
                n = this._getCanCellFit();
              this.cells.forEach(function(e, o) {
                if (!t.cells.length) return void t.addCell(e);
                var s =
                  t.outerWidth -
                  t.firstMargin +
                  (e.size.outerWidth - e.size[i]);
                n.call(this, o, s)
                  ? t.addCell(e)
                  : (t.updateTarget(),
                    (t = new r(this)),
                    this.slides.push(t),
                    t.addCell(e));
              }, this),
                t.updateTarget(),
                this.updateSelectedSlide();
            }
          }),
          (f._getCanCellFit = function() {
            var t = this.options.groupCells;
            if (!t)
              return function() {
                return !1;
              };
            if ("number" == typeof t) {
              var e = parseInt(t, 10);
              return function(t) {
                return t % e !== 0;
              };
            }
            var i = "string" == typeof t && t.match(/^(\d+)%$/),
              n = i ? parseInt(i[1], 10) / 100 : 1;
            return function(t, e) {
              return e <= (this.size.innerWidth + 1) * n;
            };
          }),
          (f._init = f.reposition = function() {
            this.positionCells(), this.positionSliderAtSelected();
          }),
          (f.getSize = function() {
            (this.size = i(this.element)),
              this.setCellAlign(),
              (this.cursorPosition = this.size.innerWidth * this.cellAlign);
          });
        var m = {
          center: { left: 0.5, right: 0.5 },
          left: { left: 0, right: 1 },
          right: { right: 0, left: 1 }
        };
        return (
          (f.setCellAlign = function() {
            var t = m[this.options.cellAlign];
            this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
          }),
          (f.setGallerySize = function() {
            if (this.options.setGallerySize) {
              var t =
                this.options.adaptiveHeight && this.selectedSlide
                  ? this.selectedSlide.height
                  : this.maxCellHeight;
              this.viewport.style.height = t + "px";
            }
          }),
          (f._getWrapShiftCells = function() {
            if (this.options.wrapAround) {
              this._unshiftCells(this.beforeShiftCells),
                this._unshiftCells(this.afterShiftCells);
              var t = this.cursorPosition,
                e = this.cells.length - 1;
              (this.beforeShiftCells = this._getGapCells(t, e, -1)),
                (t = this.size.innerWidth - this.cursorPosition),
                (this.afterShiftCells = this._getGapCells(t, 0, 1));
            }
          }),
          (f._getGapCells = function(t, e, i) {
            for (var n = []; t > 0; ) {
              var o = this.cells[e];
              if (!o) break;
              n.push(o), (e += i), (t -= o.size.outerWidth);
            }
            return n;
          }),
          (f._containSlides = function() {
            if (
              this.options.contain &&
              !this.options.wrapAround &&
              this.cells.length
            ) {
              var t = this.options.rightToLeft,
                e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight",
                n = this.slideableWidth - this.getLastCell().size[i],
                o = n < this.size.innerWidth,
                r = this.cursorPosition + this.cells[0].size[e],
                s = n - this.size.innerWidth * (1 - this.cellAlign);
              this.slides.forEach(function(t) {
                o
                  ? (t.target = n * this.cellAlign)
                  : ((t.target = Math.max(t.target, r)),
                    (t.target = Math.min(t.target, s)));
              }, this);
            }
          }),
          (f.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if ((this.emitEvent(t, n), c && this.$element)) {
              t += this.options.namespaceJQueryEvents ? ".flickity" : "";
              var o = t;
              if (e) {
                var r = c.Event(e);
                (r.type = t), (o = r);
              }
              this.$element.trigger(o, i);
            }
          }),
          (f.select = function(t, e, i) {
            if (
              this.isActive &&
              ((t = parseInt(t, 10)),
              this._wrapSelect(t),
              (this.options.wrapAround || e) &&
                (t = n.modulo(t, this.slides.length)),
              this.slides[t])
            ) {
              var o = this.selectedIndex;
              (this.selectedIndex = t),
                this.updateSelectedSlide(),
                i ? this.positionSliderAtSelected() : this.startAnimation(),
                this.options.adaptiveHeight && this.setGallerySize(),
                this.dispatchEvent("select", null, [t]),
                t != o && this.dispatchEvent("change", null, [t]),
                this.dispatchEvent("cellSelect");
            }
          }),
          (f._wrapSelect = function(t) {
            var e = this.slides.length,
              i = this.options.wrapAround && e > 1;
            if (!i) return t;
            var o = n.modulo(t, e),
              r = Math.abs(o - this.selectedIndex),
              s = Math.abs(o + e - this.selectedIndex),
              a = Math.abs(o - e - this.selectedIndex);
            !this.isDragSelect && s < r
              ? (t += e)
              : !this.isDragSelect && a < r && (t -= e),
              t < 0
                ? (this.x -= this.slideableWidth)
                : t >= e && (this.x += this.slideableWidth);
          }),
          (f.previous = function(t, e) {
            this.select(this.selectedIndex - 1, t, e);
          }),
          (f.next = function(t, e) {
            this.select(this.selectedIndex + 1, t, e);
          }),
          (f.updateSelectedSlide = function() {
            var t = this.slides[this.selectedIndex];
            t &&
              (this.unselectSelectedSlide(),
              (this.selectedSlide = t),
              t.select(),
              (this.selectedCells = t.cells),
              (this.selectedElements = t.getCellElements()),
              (this.selectedCell = t.cells[0]),
              (this.selectedElement = this.selectedElements[0]));
          }),
          (f.unselectSelectedSlide = function() {
            this.selectedSlide && this.selectedSlide.unselect();
          }),
          (f.selectCell = function(t, e, i) {
            var n = this.queryCell(t);
            if (n) {
              var o = this.getCellSlideIndex(n);
              this.select(o, e, i);
            }
          }),
          (f.getCellSlideIndex = function(t) {
            for (var e = 0; e < this.slides.length; e++) {
              var i = this.slides[e],
                n = i.cells.indexOf(t);
              if (n != -1) return e;
            }
          }),
          (f.getCell = function(t) {
            for (var e = 0; e < this.cells.length; e++) {
              var i = this.cells[e];
              if (i.element == t) return i;
            }
          }),
          (f.getCells = function(t) {
            t = n.makeArray(t);
            var e = [];
            return (
              t.forEach(function(t) {
                var i = this.getCell(t);
                i && e.push(i);
              }, this),
              e
            );
          }),
          (f.getCellElements = function() {
            return this.cells.map(function(t) {
              return t.element;
            });
          }),
          (f.getParentCell = function(t) {
            var e = this.getCell(t);
            return e
              ? e
              : ((t = n.getParent(t, ".flickity-slider > *")), this.getCell(t));
          }),
          (f.getAdjacentCellElements = function(t, e) {
            if (!t) return this.selectedSlide.getCellElements();
            e = void 0 === e ? this.selectedIndex : e;
            var i = this.slides.length;
            if (1 + 2 * t >= i) return this.getCellElements();
            for (var o = [], r = e - t; r <= e + t; r++) {
              var s = this.options.wrapAround ? n.modulo(r, i) : r,
                a = this.slides[s];
              a && (o = o.concat(a.getCellElements()));
            }
            return o;
          }),
          (f.queryCell = function(t) {
            return "number" == typeof t
              ? this.cells[t]
              : ("string" == typeof t && (t = this.element.querySelector(t)),
                this.getCell(t));
          }),
          (f.uiChange = function() {
            this.emitEvent("uiChange");
          }),
          (f.childUIPointerDown = function(t) {
            this.emitEvent("childUIPointerDown", [t]);
          }),
          (f.onresize = function() {
            this.watchCSS(), this.resize();
          }),
          n.debounceMethod(l, "onresize", 150),
          (f.resize = function() {
            if (this.isActive) {
              this.getSize(),
                this.options.wrapAround &&
                  (this.x = n.modulo(this.x, this.slideableWidth)),
                this.positionCells(),
                this._getWrapShiftCells(),
                this.setGallerySize(),
                this.emitEvent("resize");
              var t = this.selectedElements && this.selectedElements[0];
              this.selectCell(t, !1, !0);
            }
          }),
          (f.watchCSS = function() {
            var t = this.options.watchCSS;
            if (t) {
              var e = u(this.element, ":after").content;
              e.indexOf("flickity") != -1 ? this.activate() : this.deactivate();
            }
          }),
          (f.onkeydown = function(t) {
            var e =
              document.activeElement && document.activeElement != this.element;
            if (this.options.accessibility && !e) {
              var i = l.keyboardHandlers[t.keyCode];
              i && i.call(this);
            }
          }),
          (l.keyboardHandlers = {
            37: function() {
              var t = this.options.rightToLeft ? "next" : "previous";
              this.uiChange(), this[t]();
            },
            39: function() {
              var t = this.options.rightToLeft ? "previous" : "next";
              this.uiChange(), this[t]();
            }
          }),
          (f.focus = function() {
            var e = t.pageYOffset;
            this.element.focus({ preventScroll: !0 }),
              t.pageYOffset != e && t.scrollTo(t.pageXOffset, e);
          }),
          (f.deactivate = function() {
            this.isActive &&
              (this.element.classList.remove("flickity-enabled"),
              this.element.classList.remove("flickity-rtl"),
              this.unselectSelectedSlide(),
              this.cells.forEach(function(t) {
                t.destroy();
              }),
              this.element.removeChild(this.viewport),
              a(this.slider.children, this.element),
              this.options.accessibility &&
                (this.element.removeAttribute("tabIndex"),
                this.element.removeEventListener("keydown", this)),
              (this.isActive = !1),
              this.emitEvent("deactivate"));
          }),
          (f.destroy = function() {
            this.deactivate(),
              t.removeEventListener("resize", this),
              this.emitEvent("destroy"),
              c && this.$element && c.removeData(this.element, "flickity"),
              delete this.element.flickityGUID,
              delete p[this.guid];
          }),
          n.extend(f, s),
          (l.data = function(t) {
            t = n.getQueryElement(t);
            var e = t && t.flickityGUID;
            return e && p[e];
          }),
          n.htmlInit(l, "flickity"),
          c && c.bridget && c.bridget("flickity", l),
          (l.setJQuery = function(t) {
            c = t;
          }),
          (l.Cell = o),
          l
        );
      }),
      /*!
       * Unipointer v2.3.0
       * base class for doing one thing with pointer event
       * MIT license
       */
      (function(t, i) {
        (n = [s]),
          !(f = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        function i() {}
        function n() {}
        var o = (n.prototype = Object.create(e.prototype));
        (o.bindStartEvent = function(t) {
          this._bindStartEvent(t, !0);
        }),
          (o.unbindStartEvent = function(t) {
            this._bindStartEvent(t, !1);
          }),
          (o._bindStartEvent = function(e, i) {
            i = void 0 === i || i;
            var n = i ? "addEventListener" : "removeEventListener",
              o = "mousedown";
            t.PointerEvent
              ? (o = "pointerdown")
              : "ontouchstart" in t && (o = "touchstart"),
              e[n](o, this);
          }),
          (o.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (o.getTouch = function(t) {
            for (var e = 0; e < t.length; e++) {
              var i = t[e];
              if (i.identifier == this.pointerIdentifier) return i;
            }
          }),
          (o.onmousedown = function(t) {
            var e = t.button;
            (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
          }),
          (o.ontouchstart = function(t) {
            this._pointerDown(t, t.changedTouches[0]);
          }),
          (o.onpointerdown = function(t) {
            this._pointerDown(t, t);
          }),
          (o._pointerDown = function(t, e) {
            t.button ||
              this.isPointerDown ||
              ((this.isPointerDown = !0),
              (this.pointerIdentifier =
                void 0 !== e.pointerId ? e.pointerId : e.identifier),
              this.pointerDown(t, e));
          }),
          (o.pointerDown = function(t, e) {
            this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
          });
        var r = {
          mousedown: ["mousemove", "mouseup"],
          touchstart: ["touchmove", "touchend", "touchcancel"],
          pointerdown: ["pointermove", "pointerup", "pointercancel"]
        };
        return (
          (o._bindPostStartEvents = function(e) {
            if (e) {
              var i = r[e.type];
              i.forEach(function(e) {
                t.addEventListener(e, this);
              }, this),
                (this._boundPointerEvents = i);
            }
          }),
          (o._unbindPostStartEvents = function() {
            this._boundPointerEvents &&
              (this._boundPointerEvents.forEach(function(e) {
                t.removeEventListener(e, this);
              }, this),
              delete this._boundPointerEvents);
          }),
          (o.onmousemove = function(t) {
            this._pointerMove(t, t);
          }),
          (o.onpointermove = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
          }),
          (o.ontouchmove = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerMove(t, e);
          }),
          (o._pointerMove = function(t, e) {
            this.pointerMove(t, e);
          }),
          (o.pointerMove = function(t, e) {
            this.emitEvent("pointerMove", [t, e]);
          }),
          (o.onmouseup = function(t) {
            this._pointerUp(t, t);
          }),
          (o.onpointerup = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
          }),
          (o.ontouchend = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerUp(t, e);
          }),
          (o._pointerUp = function(t, e) {
            this._pointerDone(), this.pointerUp(t, e);
          }),
          (o.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e]);
          }),
          (o._pointerDone = function() {
            this._pointerReset(),
              this._unbindPostStartEvents(),
              this.pointerDone();
          }),
          (o._pointerReset = function() {
            (this.isPointerDown = !1), delete this.pointerIdentifier;
          }),
          (o.pointerDone = i),
          (o.onpointercancel = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
          }),
          (o.ontouchcancel = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerCancel(t, e);
          }),
          (o._pointerCancel = function(t, e) {
            this._pointerDone(), this.pointerCancel(t, e);
          }),
          (o.pointerCancel = function(t, e) {
            this.emitEvent("pointerCancel", [t, e]);
          }),
          (n.getPointerPoint = function(t) {
            return { x: t.pageX, y: t.pageY };
          }),
          n
        );
      }),
      /*!
       * Unidragger v2.3.0
       * Draggable base class
       * MIT license
       */
      (function(t, i) {
        (n = [f]),
          !(m = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        function i() {}
        var n = (i.prototype = Object.create(e.prototype));
        (n.bindHandles = function() {
          this._bindHandles(!0);
        }),
          (n.unbindHandles = function() {
            this._bindHandles(!1);
          }),
          (n._bindHandles = function(e) {
            e = void 0 === e || e;
            for (
              var i = e ? "addEventListener" : "removeEventListener",
                n = e ? this._touchActionValue : "",
                o = 0;
              o < this.handles.length;
              o++
            ) {
              var r = this.handles[o];
              this._bindStartEvent(r, e),
                r[i]("click", this),
                t.PointerEvent && (r.style.touchAction = n);
            }
          }),
          (n._touchActionValue = "none"),
          (n.pointerDown = function(t, e) {
            var i = this.okayPointerDown(t);
            i &&
              ((this.pointerDownPointer = e),
              t.preventDefault(),
              this.pointerDownBlur(),
              this._bindPostStartEvents(t),
              this.emitEvent("pointerDown", [t, e]));
          });
        var o = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
          r = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
          };
        return (
          (n.okayPointerDown = function(t) {
            var e = o[t.target.nodeName],
              i = r[t.target.type],
              n = !e || i;
            return n || this._pointerReset(), n;
          }),
          (n.pointerDownBlur = function() {
            var t = document.activeElement,
              e = t && t.blur && t != document.body;
            e && t.blur();
          }),
          (n.pointerMove = function(t, e) {
            var i = this._dragPointerMove(t, e);
            this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
          }),
          (n._dragPointerMove = function(t, e) {
            var i = {
              x: e.pageX - this.pointerDownPointer.pageX,
              y: e.pageY - this.pointerDownPointer.pageY
            };
            return (
              !this.isDragging &&
                this.hasDragStarted(i) &&
                this._dragStart(t, e),
              i
            );
          }),
          (n.hasDragStarted = function(t) {
            return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
          }),
          (n.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
          }),
          (n._dragPointerUp = function(t, e) {
            this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
          }),
          (n._dragStart = function(t, e) {
            (this.isDragging = !0),
              (this.isPreventingClicks = !0),
              this.dragStart(t, e);
          }),
          (n.dragStart = function(t, e) {
            this.emitEvent("dragStart", [t, e]);
          }),
          (n._dragMove = function(t, e, i) {
            this.isDragging && this.dragMove(t, e, i);
          }),
          (n.dragMove = function(t, e, i) {
            t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
          }),
          (n._dragEnd = function(t, e) {
            (this.isDragging = !1),
              setTimeout(
                function() {
                  delete this.isPreventingClicks;
                }.bind(this)
              ),
              this.dragEnd(t, e);
          }),
          (n.dragEnd = function(t, e) {
            this.emitEvent("dragEnd", [t, e]);
          }),
          (n.onclick = function(t) {
            this.isPreventingClicks && t.preventDefault();
          }),
          (n._staticClick = function(t, e) {
            (this.isIgnoringMouseUp && "mouseup" == t.type) ||
              (this.staticClick(t, e),
              "mouseup" != t.type &&
                ((this.isIgnoringMouseUp = !0),
                setTimeout(
                  function() {
                    delete this.isIgnoringMouseUp;
                  }.bind(this),
                  400
                )));
          }),
          (n.staticClick = function(t, e) {
            this.emitEvent("staticClick", [t, e]);
          }),
          (i.getPointerPoint = e.getPointerPoint),
          i
        );
      }),
      (function(t, i) {
        (n = [p, m, c]),
          !(g = function(e, n, o) {
            return i(t, e, n, o);
          }.apply(e, n));
      })(window, function(t, e, i, n) {
        function o() {
          return { x: t.pageXOffset, y: t.pageYOffset };
        }
        n.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }),
          e.createMethods.push("_createDrag");
        var r = e.prototype;
        n.extend(r, i.prototype), (r._touchActionValue = "pan-y");
        var s = "createTouch" in document,
          a = !1;
        (r._createDrag = function() {
          this.on("activate", this.onActivateDrag),
            this.on("uiChange", this._uiChangeDrag),
            this.on("childUIPointerDown", this._childUIPointerDownDrag),
            this.on("deactivate", this.onDeactivateDrag),
            this.on("cellChange", this.updateDraggable),
            s &&
              !a &&
              (t.addEventListener("touchmove", function() {}), (a = !0));
        }),
          (r.onActivateDrag = function() {
            (this.handles = [this.viewport]),
              this.bindHandles(),
              this.updateDraggable();
          }),
          (r.onDeactivateDrag = function() {
            this.unbindHandles(), this.element.classList.remove("is-draggable");
          }),
          (r.updateDraggable = function() {
            ">1" == this.options.draggable
              ? (this.isDraggable = this.slides.length > 1)
              : (this.isDraggable = this.options.draggable),
              this.isDraggable
                ? this.element.classList.add("is-draggable")
                : this.element.classList.remove("is-draggable");
          }),
          (r.bindDrag = function() {
            (this.options.draggable = !0), this.updateDraggable();
          }),
          (r.unbindDrag = function() {
            (this.options.draggable = !1), this.updateDraggable();
          }),
          (r._uiChangeDrag = function() {
            delete this.isFreeScrolling;
          }),
          (r._childUIPointerDownDrag = function(t) {
            t.preventDefault(), this.pointerDownFocus(t);
          }),
          (r.pointerDown = function(e, i) {
            if (!this.isDraggable) return void this._pointerDownDefault(e, i);
            var n = this.okayPointerDown(e);
            n &&
              (this._pointerDownPreventDefault(e),
              this.pointerDownFocus(e),
              document.activeElement != this.element && this.pointerDownBlur(),
              (this.dragX = this.x),
              this.viewport.classList.add("is-pointer-down"),
              (this.pointerDownScroll = o()),
              t.addEventListener("scroll", this),
              this._pointerDownDefault(e, i));
          }),
          (r._pointerDownDefault = function(t, e) {
            (this.pointerDownPointer = e),
              this._bindPostStartEvents(t),
              this.dispatchEvent("pointerDown", t, [e]);
          });
        var l = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
        return (
          (r.pointerDownFocus = function(t) {
            var e = l[t.target.nodeName];
            e || this.focus();
          }),
          (r._pointerDownPreventDefault = function(t) {
            var e = "touchstart" == t.type,
              i = "touch" == t.pointerType,
              n = l[t.target.nodeName];
            e || i || n || t.preventDefault();
          }),
          (r.hasDragStarted = function(t) {
            return Math.abs(t.x) > this.options.dragThreshold;
          }),
          (r.pointerUp = function(t, e) {
            delete this.isTouchScrolling,
              this.viewport.classList.remove("is-pointer-down"),
              this.dispatchEvent("pointerUp", t, [e]),
              this._dragPointerUp(t, e);
          }),
          (r.pointerDone = function() {
            t.removeEventListener("scroll", this),
              delete this.pointerDownScroll;
          }),
          (r.dragStart = function(e, i) {
            this.isDraggable &&
              ((this.dragStartPosition = this.x),
              this.startAnimation(),
              t.removeEventListener("scroll", this),
              this.dispatchEvent("dragStart", e, [i]));
          }),
          (r.pointerMove = function(t, e) {
            var i = this._dragPointerMove(t, e);
            this.dispatchEvent("pointerMove", t, [e, i]),
              this._dragMove(t, e, i);
          }),
          (r.dragMove = function(t, e, i) {
            if (this.isDraggable) {
              t.preventDefault(), (this.previousDragX = this.dragX);
              var n = this.options.rightToLeft ? -1 : 1;
              this.options.wrapAround && (i.x = i.x % this.slideableWidth);
              var o = this.dragStartPosition + i.x * n;
              if (!this.options.wrapAround && this.slides.length) {
                var r = Math.max(
                  -this.slides[0].target,
                  this.dragStartPosition
                );
                o = o > r ? 0.5 * (o + r) : o;
                var s = Math.min(
                  -this.getLastSlide().target,
                  this.dragStartPosition
                );
                o = o < s ? 0.5 * (o + s) : o;
              }
              (this.dragX = o),
                (this.dragMoveTime = new Date()),
                this.dispatchEvent("dragMove", t, [e, i]);
            }
          }),
          (r.dragEnd = function(t, e) {
            if (this.isDraggable) {
              this.options.freeScroll && (this.isFreeScrolling = !0);
              var i = this.dragEndRestingSelect();
              if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling =
                  -n > this.slides[0].target && -n < this.getLastSlide().target;
              } else
                this.options.freeScroll ||
                  i != this.selectedIndex ||
                  (i += this.dragEndBoostSelect());
              delete this.previousDragX,
                (this.isDragSelect = this.options.wrapAround),
                this.select(i),
                delete this.isDragSelect,
                this.dispatchEvent("dragEnd", t, [e]);
            }
          }),
          (r.dragEndRestingSelect = function() {
            var t = this.getRestingPosition(),
              e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
              i = this._getClosestResting(t, e, 1),
              n = this._getClosestResting(t, e, -1),
              o = i.distance < n.distance ? i.index : n.index;
            return o;
          }),
          (r._getClosestResting = function(t, e, i) {
            for (
              var n = this.selectedIndex,
                o = 1 / 0,
                r =
                  this.options.contain && !this.options.wrapAround
                    ? function(t, e) {
                        return t <= e;
                      }
                    : function(t, e) {
                        return t < e;
                      };
              r(e, o) &&
              ((n += i),
              (o = e),
              (e = this.getSlideDistance(-t, n)),
              null !== e);

            )
              e = Math.abs(e);
            return { distance: o, index: n - i };
          }),
          (r.getSlideDistance = function(t, e) {
            var i = this.slides.length,
              o = this.options.wrapAround && i > 1,
              r = o ? n.modulo(e, i) : e,
              s = this.slides[r];
            if (!s) return null;
            var a = o ? this.slideableWidth * Math.floor(e / i) : 0;
            return t - (s.target + a);
          }),
          (r.dragEndBoostSelect = function() {
            if (
              void 0 === this.previousDragX ||
              !this.dragMoveTime ||
              new Date() - this.dragMoveTime > 100
            )
              return 0;
            var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
              e = this.previousDragX - this.dragX;
            return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0;
          }),
          (r.staticClick = function(t, e) {
            var i = this.getParentCell(t.target),
              n = i && i.element,
              o = i && this.cells.indexOf(i);
            this.dispatchEvent("staticClick", t, [e, n, o]);
          }),
          (r.onscroll = function() {
            var t = o(),
              e = this.pointerDownScroll.x - t.x,
              i = this.pointerDownScroll.y - t.y;
            (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone();
          }),
          e
        );
      }),
      /*!
       * Tap listener v2.0.0
       * listens to taps
       * MIT license
       */
      (function(t, i) {
        (n = [f]),
          !(v = function(e) {
            return i(t, e);
          }.apply(e, n));
      })(window, function(t, e) {
        function i(t) {
          this.bindTap(t);
        }
        var n = (i.prototype = Object.create(e.prototype));
        return (
          (n.bindTap = function(t) {
            t &&
              (this.unbindTap(),
              (this.tapElement = t),
              this._bindStartEvent(t, !0));
          }),
          (n.unbindTap = function() {
            this.tapElement &&
              (this._bindStartEvent(this.tapElement, !0),
              delete this.tapElement);
          }),
          (n.pointerUp = function(i, n) {
            if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
              var o = e.getPointerPoint(n),
                r = this.tapElement.getBoundingClientRect(),
                s = t.pageXOffset,
                a = t.pageYOffset,
                l =
                  o.x >= r.left + s &&
                  o.x <= r.right + s &&
                  o.y >= r.top + a &&
                  o.y <= r.bottom + a;
              if ((l && this.emitEvent("tap", [i, n]), "mouseup" != i.type)) {
                this.isIgnoringMouseUp = !0;
                var c = this;
                setTimeout(function() {
                  delete c.isIgnoringMouseUp;
                }, 400);
              }
            }
          }),
          (n.destroy = function() {
            this.pointerDone(), this.unbindTap();
          }),
          i
        );
      }),
      (function(t, i) {
        (n = [p, v, c]),
          !(y = function(e, n, o) {
            return i(t, e, n, o);
          }.apply(e, n));
      })(window, function(t, e, i, n) {
        "use strict";
        function o(t, e) {
          (this.direction = t), (this.parent = e), this._create();
        }
        function r(t) {
          return "string" == typeof t
            ? t
            : "M " +
                t.x0 +
                ",50 L " +
                t.x1 +
                "," +
                (t.y1 + 50) +
                " L " +
                t.x2 +
                "," +
                (t.y2 + 50) +
                " L " +
                t.x3 +
                ",50  L " +
                t.x2 +
                "," +
                (50 - t.y2) +
                " L " +
                t.x1 +
                "," +
                (50 - t.y1) +
                " Z";
        }
        var s = "http://www.w3.org/2000/svg";
        (o.prototype = Object.create(i.prototype)),
          (o.prototype._create = function() {
            (this.isEnabled = !0), (this.isPrevious = this.direction == -1);
            var t = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == t;
            var e = (this.element = document.createElement("button"));
            (e.className = "flickity-button flickity-prev-next-button"),
              (e.className += this.isPrevious ? " previous" : " next"),
              e.setAttribute("type", "button"),
              this.disable(),
              e.setAttribute(
                "aria-label",
                this.isPrevious ? "Previous" : "Next"
              );
            var i = this.createSVG();
            e.appendChild(i),
              this.on("tap", this.onTap),
              this.parent.on("select", this.update.bind(this)),
              this.on(
                "pointerDown",
                this.parent.childUIPointerDown.bind(this.parent)
              );
          }),
          (o.prototype.activate = function() {
            this.bindTap(this.element),
              this.element.addEventListener("click", this),
              this.parent.element.appendChild(this.element);
          }),
          (o.prototype.deactivate = function() {
            this.parent.element.removeChild(this.element),
              i.prototype.destroy.call(this),
              this.element.removeEventListener("click", this);
          }),
          (o.prototype.createSVG = function() {
            var t = document.createElementNS(s, "svg");
            t.setAttribute("class", "flickity-button-icon"),
              t.setAttribute("viewBox", "0 0 100 100");
            var e = document.createElementNS(s, "path"),
              i = r(this.parent.options.arrowShape);
            return (
              e.setAttribute("d", i),
              e.setAttribute("class", "arrow"),
              this.isLeft ||
                e.setAttribute("transform", "translate(100, 100) rotate(180) "),
              t.appendChild(e),
              t
            );
          }),
          (o.prototype.onTap = function() {
            if (this.isEnabled) {
              this.parent.uiChange();
              var t = this.isPrevious ? "previous" : "next";
              this.parent[t]();
            }
          }),
          (o.prototype.handleEvent = n.handleEvent),
          (o.prototype.onclick = function(t) {
            var e = document.activeElement;
            e && e == this.element && this.onTap(t, t);
          }),
          (o.prototype.enable = function() {
            this.isEnabled ||
              ((this.element.disabled = !1), (this.isEnabled = !0));
          }),
          (o.prototype.disable = function() {
            this.isEnabled &&
              ((this.element.disabled = !0), (this.isEnabled = !1));
          }),
          (o.prototype.update = function() {
            var t = this.parent.slides;
            if (this.parent.options.wrapAround && t.length > 1)
              return void this.enable();
            var e = t.length ? t.length - 1 : 0,
              i = this.isPrevious ? 0 : e,
              n = this.parent.selectedIndex == i ? "disable" : "enable";
            this[n]();
          }),
          (o.prototype.destroy = function() {
            this.deactivate();
          }),
          n.extend(e.defaults, {
            prevNextButtons: !0,
            arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 }
          }),
          e.createMethods.push("_createPrevNextButtons");
        var a = e.prototype;
        return (
          (a._createPrevNextButtons = function() {
            this.options.prevNextButtons &&
              ((this.prevButton = new o(-1, this)),
              (this.nextButton = new o(1, this)),
              this.on("activate", this.activatePrevNextButtons));
          }),
          (a.activatePrevNextButtons = function() {
            this.prevButton.activate(),
              this.nextButton.activate(),
              this.on("deactivate", this.deactivatePrevNextButtons);
          }),
          (a.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate(),
              this.nextButton.deactivate(),
              this.off("deactivate", this.deactivatePrevNextButtons);
          }),
          (e.PrevNextButton = o),
          e
        );
      }),
      (function(t, i) {
        (n = [p, v, c]),
          !(b = function(e, n, o) {
            return i(t, e, n, o);
          }.apply(e, n));
      })(window, function(t, e, i, n) {
        function o(t) {
          (this.parent = t), this._create();
        }
        (o.prototype = new i()),
          (o.prototype._create = function() {
            (this.holder = document.createElement("ol")),
              (this.holder.className = "flickity-page-dots"),
              (this.dots = []),
              this.on("tap", this.onTap),
              this.on(
                "pointerDown",
                this.parent.childUIPointerDown.bind(this.parent)
              );
          }),
          (o.prototype.activate = function() {
            this.setDots(),
              this.bindTap(this.holder),
              this.parent.element.appendChild(this.holder);
          }),
          (o.prototype.deactivate = function() {
            this.parent.element.removeChild(this.holder),
              i.prototype.destroy.call(this);
          }),
          (o.prototype.setDots = function() {
            var t = this.parent.slides.length - this.dots.length;
            t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t);
          }),
          (o.prototype.addDots = function(t) {
            for (
              var e = document.createDocumentFragment(),
                i = [],
                n = this.dots.length,
                o = n + t,
                r = n;
              r < o;
              r++
            ) {
              var s = document.createElement("li");
              (s.className = "dot"),
                s.setAttribute("aria-label", "Page dot " + (r + 1)),
                e.appendChild(s),
                i.push(s);
            }
            this.holder.appendChild(e), (this.dots = this.dots.concat(i));
          }),
          (o.prototype.removeDots = function(t) {
            var e = this.dots.splice(this.dots.length - t, t);
            e.forEach(function(t) {
              this.holder.removeChild(t);
            }, this);
          }),
          (o.prototype.updateSelected = function() {
            this.selectedDot &&
              ((this.selectedDot.className = "dot"),
              this.selectedDot.removeAttribute("aria-current")),
              this.dots.length &&
                ((this.selectedDot = this.dots[this.parent.selectedIndex]),
                (this.selectedDot.className = "dot is-selected"),
                this.selectedDot.setAttribute("aria-current", "step"));
          }),
          (o.prototype.onTap = function(t) {
            var e = t.target;
            if ("LI" == e.nodeName) {
              this.parent.uiChange();
              var i = this.dots.indexOf(e);
              this.parent.select(i);
            }
          }),
          (o.prototype.destroy = function() {
            this.deactivate();
          }),
          (e.PageDots = o),
          n.extend(e.defaults, { pageDots: !0 }),
          e.createMethods.push("_createPageDots");
        var r = e.prototype;
        return (
          (r._createPageDots = function() {
            this.options.pageDots &&
              ((this.pageDots = new o(this)),
              this.on("activate", this.activatePageDots),
              this.on("select", this.updateSelectedPageDots),
              this.on("cellChange", this.updatePageDots),
              this.on("resize", this.updatePageDots),
              this.on("deactivate", this.deactivatePageDots));
          }),
          (r.activatePageDots = function() {
            this.pageDots.activate();
          }),
          (r.updateSelectedPageDots = function() {
            this.pageDots.updateSelected();
          }),
          (r.updatePageDots = function() {
            this.pageDots.setDots();
          }),
          (r.deactivatePageDots = function() {
            this.pageDots.deactivate();
          }),
          (e.PageDots = o),
          e
        );
      }),
      (function(t, i) {
        (n = [s, c, p]),
          !(w = function(t, e, n) {
            return i(t, e, n);
          }.apply(e, n));
      })(window, function(t, e, i) {
        function n(t) {
          (this.parent = t),
            (this.state = "stopped"),
            (this.onVisibilityChange = this.visibilityChange.bind(this)),
            (this.onVisibilityPlay = this.visibilityPlay.bind(this));
        }
        (n.prototype = Object.create(t.prototype)),
          (n.prototype.play = function() {
            if ("playing" != this.state) {
              var t = document.hidden;
              if (t)
                return void document.addEventListener(
                  "visibilitychange",
                  this.onVisibilityPlay
                );
              (this.state = "playing"),
                document.addEventListener(
                  "visibilitychange",
                  this.onVisibilityChange
                ),
                this.tick();
            }
          }),
          (n.prototype.tick = function() {
            if ("playing" == this.state) {
              var t = this.parent.options.autoPlay;
              t = "number" == typeof t ? t : 3e3;
              var e = this;
              this.clear(),
                (this.timeout = setTimeout(function() {
                  e.parent.next(!0), e.tick();
                }, t));
            }
          }),
          (n.prototype.stop = function() {
            (this.state = "stopped"),
              this.clear(),
              document.removeEventListener(
                "visibilitychange",
                this.onVisibilityChange
              );
          }),
          (n.prototype.clear = function() {
            clearTimeout(this.timeout);
          }),
          (n.prototype.pause = function() {
            "playing" == this.state && ((this.state = "paused"), this.clear());
          }),
          (n.prototype.unpause = function() {
            "paused" == this.state && this.play();
          }),
          (n.prototype.visibilityChange = function() {
            var t = document.hidden;
            this[t ? "pause" : "unpause"]();
          }),
          (n.prototype.visibilityPlay = function() {
            this.play(),
              document.removeEventListener(
                "visibilitychange",
                this.onVisibilityPlay
              );
          }),
          e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
          i.createMethods.push("_createPlayer");
        var o = i.prototype;
        return (
          (o._createPlayer = function() {
            (this.player = new n(this)),
              this.on("activate", this.activatePlayer),
              this.on("uiChange", this.stopPlayer),
              this.on("pointerDown", this.stopPlayer),
              this.on("deactivate", this.deactivatePlayer);
          }),
          (o.activatePlayer = function() {
            this.options.autoPlay &&
              (this.player.play(),
              this.element.addEventListener("mouseenter", this));
          }),
          (o.playPlayer = function() {
            this.player.play();
          }),
          (o.stopPlayer = function() {
            this.player.stop();
          }),
          (o.pausePlayer = function() {
            this.player.pause();
          }),
          (o.unpausePlayer = function() {
            this.player.unpause();
          }),
          (o.deactivatePlayer = function() {
            this.player.stop(),
              this.element.removeEventListener("mouseenter", this);
          }),
          (o.onmouseenter = function() {
            this.options.pauseAutoPlayOnHover &&
              (this.player.pause(),
              this.element.addEventListener("mouseleave", this));
          }),
          (o.onmouseleave = function() {
            this.player.unpause(),
              this.element.removeEventListener("mouseleave", this);
          }),
          (i.Player = n),
          i
        );
      }),
      (function(t, i) {
        (n = [p, c]),
          !(x = function(e, n) {
            return i(t, e, n);
          }.apply(e, n));
      })(window, function(t, e, i) {
        function n(t) {
          var e = document.createDocumentFragment();
          return (
            t.forEach(function(t) {
              e.appendChild(t.element);
            }),
            e
          );
        }
        var o = e.prototype;
        return (
          (o.insert = function(t, e) {
            var i = this._makeCells(t);
            if (i && i.length) {
              var o = this.cells.length;
              e = void 0 === e ? o : e;
              var r = n(i),
                s = e == o;
              if (s) this.slider.appendChild(r);
              else {
                var a = this.cells[e].element;
                this.slider.insertBefore(r, a);
              }
              if (0 === e) this.cells = i.concat(this.cells);
              else if (s) this.cells = this.cells.concat(i);
              else {
                var l = this.cells.splice(e, o - e);
                this.cells = this.cells.concat(i).concat(l);
              }
              this._sizeCells(i), this.cellChange(e, !0);
            }
          }),
          (o.append = function(t) {
            this.insert(t, this.cells.length);
          }),
          (o.prepend = function(t) {
            this.insert(t, 0);
          }),
          (o.remove = function(t) {
            var e = this.getCells(t);
            if (e && e.length) {
              var n = this.cells.length - 1;
              e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                (n = Math.min(e, n)), i.removeFrom(this.cells, t);
              }, this),
                this.cellChange(n, !0);
            }
          }),
          (o.cellSizeChange = function(t) {
            var e = this.getCell(t);
            if (e) {
              e.getSize();
              var i = this.cells.indexOf(e);
              this.cellChange(i);
            }
          }),
          (o.cellChange = function(t, e) {
            var i = this.selectedElement;
            this._positionCells(t),
              this._getWrapShiftCells(),
              this.setGallerySize();
            var n = this.getCell(i);
            n && (this.selectedIndex = this.getCellSlideIndex(n)),
              (this.selectedIndex = Math.min(
                this.slides.length - 1,
                this.selectedIndex
              )),
              this.emitEvent("cellChange", [t]),
              this.select(this.selectedIndex),
              e && this.positionSliderAtSelected();
          }),
          e
        );
      }),
      (function(t, i) {
        (n = [p, c]),
          !(S = function(e, n) {
            return i(t, e, n);
          }.apply(e, n));
      })(window, function(t, e, i) {
        "use strict";
        function n(t) {
          if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"),
              n = t.getAttribute("data-flickity-lazyload-src"),
              o = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || n || o) return [t];
          }
          var r =
              "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]",
            s = t.querySelectorAll(r);
          return i.makeArray(s);
        }
        function o(t, e) {
          (this.img = t), (this.flickity = e), this.load();
        }
        e.createMethods.push("_createLazyload");
        var r = e.prototype;
        return (
          (r._createLazyload = function() {
            this.on("select", this.lazyLoad);
          }),
          (r.lazyLoad = function() {
            var t = this.options.lazyLoad;
            if (t) {
              var e = "number" == typeof t ? t : 0,
                i = this.getAdjacentCellElements(e),
                r = [];
              i.forEach(function(t) {
                var e = n(t);
                r = r.concat(e);
              }),
                r.forEach(function(t) {
                  new o(t, this);
                }, this);
            }
          }),
          (o.prototype.handleEvent = i.handleEvent),
          (o.prototype.load = function() {
            this.img.addEventListener("load", this),
              this.img.addEventListener("error", this);
            var t =
                this.img.getAttribute("data-flickity-lazyload") ||
                this.img.getAttribute("data-flickity-lazyload-src"),
              e = this.img.getAttribute("data-flickity-lazyload-srcset");
            (this.img.src = t),
              e && this.img.setAttribute("srcset", e),
              this.img.removeAttribute("data-flickity-lazyload"),
              this.img.removeAttribute("data-flickity-lazyload-src"),
              this.img.removeAttribute("data-flickity-lazyload-srcset");
          }),
          (o.prototype.onload = function(t) {
            this.complete(t, "flickity-lazyloaded");
          }),
          (o.prototype.onerror = function(t) {
            this.complete(t, "flickity-lazyerror");
          }),
          (o.prototype.complete = function(t, e) {
            this.img.removeEventListener("load", this),
              this.img.removeEventListener("error", this);
            var i = this.flickity.getParentCell(this.img),
              n = i && i.element;
            this.flickity.cellSizeChange(n),
              this.img.classList.add(e),
              this.flickity.dispatchEvent("lazyLoad", t, n);
          }),
          (e.LazyLoader = o),
          e
        );
      }),
      /*!
       * Flickity v2.1.2
       * Touch, responsive, flickable carousels
       *
       * Licensed GPLv3 for open source use
       * or Flickity Commercial License for commercial use
       *
       * https://flickity.metafizzy.co
       * Copyright 2015-2018 Metafizzy
       */
      (function(t, i) {
        (n = [p, g, y, b, w, x, S]),
          (r = i),
          !(C = "function" == typeof r ? r.apply(e, n) : r);
      })(window, function(t) {
        return t;
      }),
      /*!
       * Flickity asNavFor v2.0.1
       * enable asNavFor for Flickity
       */
      (function(i, s) {
        (n = [C, c]),
          (r = s),
          (o = "function" == typeof r ? r.apply(e, n) : r),
          !(void 0 !== o && (t.exports = o));
      })(window, function(t, e) {
        function i(t, e, i) {
          return (e - t) * i + t;
        }
        t.createMethods.push("_createAsNavFor");
        var n = t.prototype;
        return (
          (n._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor),
              this.on("deactivate", this.deactivateAsNavFor),
              this.on("destroy", this.destroyAsNavFor);
            var t = this.options.asNavFor;
            if (t) {
              var e = this;
              setTimeout(function() {
                e.setNavCompanion(t);
              });
            }
          }),
          (n.setNavCompanion = function(i) {
            i = e.getQueryElement(i);
            var n = t.data(i);
            if (n && n != this) {
              this.navCompanion = n;
              var o = this;
              (this.onNavCompanionSelect = function() {
                o.navCompanionSelect();
              }),
                n.on("select", this.onNavCompanionSelect),
                this.on("staticClick", this.onNavStaticClick),
                this.navCompanionSelect(!0);
            }
          }),
          (n.navCompanionSelect = function(t) {
            if (this.navCompanion) {
              var e = this.navCompanion.selectedCells[0],
                n = this.navCompanion.cells.indexOf(e),
                o = n + this.navCompanion.selectedCells.length - 1,
                r = Math.floor(i(n, o, this.navCompanion.cellAlign));
              if (
                (this.selectCell(r, !1, t),
                this.removeNavSelectedElements(),
                !(r >= this.cells.length))
              ) {
                var s = this.cells.slice(n, o + 1);
                (this.navSelectedElements = s.map(function(t) {
                  return t.element;
                })),
                  this.changeNavSelectedClass("add");
              }
            }
          }),
          (n.changeNavSelectedClass = function(t) {
            this.navSelectedElements.forEach(function(e) {
              e.classList[t]("is-nav-selected");
            });
          }),
          (n.activateAsNavFor = function() {
            this.navCompanionSelect(!0);
          }),
          (n.removeNavSelectedElements = function() {
            this.navSelectedElements &&
              (this.changeNavSelectedClass("remove"),
              delete this.navSelectedElements);
          }),
          (n.onNavStaticClick = function(t, e, i, n) {
            "number" == typeof n && this.navCompanion.selectCell(n);
          }),
          (n.deactivateAsNavFor = function() {
            this.removeNavSelectedElements();
          }),
          (n.destroyAsNavFor = function() {
            this.navCompanion &&
              (this.navCompanion.off("select", this.onNavCompanionSelect),
              this.off("staticClick", this.onNavStaticClick),
              delete this.navCompanion);
          }),
          t
        );
      }),
      /*!
       * imagesLoaded v4.1.4
       * JavaScript is all like "You images are done yet or what?"
       * MIT License
       */
      (function(t, i) {
        "use strict";
        (n = [s]),
          !(k = function(e) {
            return i(t, e);
          }.apply(e, n));
      })("undefined" != typeof window ? window : this, function(t, e) {
        function i(t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        }
        function n(t) {
          if (Array.isArray(t)) return t;
          var e = "object" == typeof t && "number" == typeof t.length;
          return e ? c.call(t) : [t];
        }
        function o(t, e, r) {
          if (!(this instanceof o)) return new o(t, e, r);
          var s = t;
          return (
            "string" == typeof t && (s = document.querySelectorAll(t)),
            s
              ? ((this.elements = n(s)),
                (this.options = i({}, this.options)),
                "function" == typeof e ? (r = e) : i(this.options, e),
                r && this.on("always", r),
                this.getImages(),
                a && (this.jqDeferred = new a.Deferred()),
                void setTimeout(this.check.bind(this)))
              : void l.error("Bad element for imagesLoaded " + (s || t))
          );
        }
        function r(t) {
          this.img = t;
        }
        function s(t, e) {
          (this.url = t), (this.element = e), (this.img = new Image());
        }
        var a = t.jQuery,
          l = t.console,
          c = Array.prototype.slice;
        (o.prototype = Object.create(e.prototype)),
          (o.prototype.options = {}),
          (o.prototype.getImages = function() {
            (this.images = []),
              this.elements.forEach(this.addElementImages, this);
          }),
          (o.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t),
              this.options.background === !0 &&
                this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && u[e]) {
              for (
                var i = t.querySelectorAll("img"), n = 0;
                n < i.length;
                n++
              ) {
                var o = i[n];
                this.addImage(o);
              }
              if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                  var s = r[n];
                  this.addElementBackgroundImages(s);
                }
              }
            }
          });
        var u = { 1: !0, 9: !0, 11: !0 };
        return (
          (o.prototype.addElementBackgroundImages = function(t) {
            var e = getComputedStyle(t);
            if (e)
              for (
                var i = /url\((['"])?(.*?)\1\)/gi,
                  n = i.exec(e.backgroundImage);
                null !== n;

              ) {
                var o = n && n[2];
                o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
              }
          }),
          (o.prototype.addImage = function(t) {
            var e = new r(t);
            this.images.push(e);
          }),
          (o.prototype.addBackground = function(t, e) {
            var i = new s(t, e);
            this.images.push(i);
          }),
          (o.prototype.check = function() {
            function t(t, i, n) {
              setTimeout(function() {
                e.progress(t, i, n);
              });
            }
            var e = this;
            return (
              (this.progressedCount = 0),
              (this.hasAnyBroken = !1),
              this.images.length
                ? void this.images.forEach(function(e) {
                    e.once("progress", t), e.check();
                  })
                : void this.complete()
            );
          }),
          (o.prototype.progress = function(t, e, i) {
            this.progressedCount++,
              (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
              this.emitEvent("progress", [this, t, e]),
              this.jqDeferred &&
                this.jqDeferred.notify &&
                this.jqDeferred.notify(this, t),
              this.progressedCount == this.images.length && this.complete(),
              this.options.debug && l && l.log("progress: " + i, t, e);
          }),
          (o.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (
              ((this.isComplete = !0),
              this.emitEvent(t, [this]),
              this.emitEvent("always", [this]),
              this.jqDeferred)
            ) {
              var e = this.hasAnyBroken ? "reject" : "resolve";
              this.jqDeferred[e](this);
            }
          }),
          (r.prototype = Object.create(e.prototype)),
          (r.prototype.check = function() {
            var t = this.getIsImageComplete();
            return t
              ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
              : ((this.proxyImage = new Image()),
                this.proxyImage.addEventListener("load", this),
                this.proxyImage.addEventListener("error", this),
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                void (this.proxyImage.src = this.img.src));
          }),
          (r.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth;
          }),
          (r.prototype.confirm = function(t, e) {
            (this.isLoaded = t),
              this.emitEvent("progress", [this, this.img, e]);
          }),
          (r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (r.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents();
          }),
          (r.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents();
          }),
          (r.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this),
              this.proxyImage.removeEventListener("error", this),
              this.img.removeEventListener("load", this),
              this.img.removeEventListener("error", this);
          }),
          (s.prototype = Object.create(r.prototype)),
          (s.prototype.check = function() {
            this.img.addEventListener("load", this),
              this.img.addEventListener("error", this),
              (this.img.src = this.url);
            var t = this.getIsImageComplete();
            t &&
              (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
              this.unbindEvents());
          }),
          (s.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this),
              this.img.removeEventListener("error", this);
          }),
          (s.prototype.confirm = function(t, e) {
            (this.isLoaded = t),
              this.emitEvent("progress", [this, this.element, e]);
          }),
          (o.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery),
              e &&
                ((a = e),
                (a.fn.imagesLoaded = function(t, e) {
                  var i = new o(this, t, e);
                  return i.jqDeferred.promise(a(this));
                }));
          }),
          o.makeJQueryPlugin(),
          o
        );
      }),
      /*!
       * Flickity imagesLoaded v2.0.0
       * enables imagesLoaded option for Flickity
       */
      (function(i, r) {
        (n = [C, k]),
          (o = function(t, e) {
            return r(i, t, e);
          }.apply(e, n)),
          !(void 0 !== o && (t.exports = o));
      })(window, function(t, e, i) {
        "use strict";
        e.createMethods.push("_createImagesLoaded");
        var n = e.prototype;
        return (
          (n._createImagesLoaded = function() {
            this.on("activate", this.imagesLoaded);
          }),
          (n.imagesLoaded = function() {
            function t(t, i) {
              var n = e.getParentCell(i.img);
              e.cellSizeChange(n && n.element),
                e.options.freeScroll || e.positionSliderAtSelected();
            }
            if (this.options.imagesLoaded) {
              var e = this;
              i(this.slider).on("progress", t);
            }
          }),
          e
        );
      });
  },
  function(t, e) {
    t.exports = window.jQuery;
  },
  function(t, e) {
    !(function() {
      var t = window.MutationObserver || window.WebKitMutationObserver,
        e =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof DocumentTouch),
        i =
          void 0 !== document.documentElement.style["touch-action"] ||
          document.documentElement.style["-ms-touch-action"];
      if (!i && e && t) {
        window.Hammer = window.Hammer || {};
        var n = /touch-action[:][\s]*(none)[^;'"]*/,
          o = /touch-action[:][\s]*(manipulation)[^;'"]*/,
          r = /touch-action/,
          s =
            /(iP(ad|hone|od))/.test(navigator.userAgent) &&
            ("indexedDB" in window || !!window.performance);
        (window.Hammer.time = {
          getTouchAction: function(t) {
            return this.checkStyleString(t.getAttribute("style"));
          },
          checkStyleString: function(t) {
            if (r.test(t))
              return n.test(t) ? "none" : !o.test(t) || "manipulation";
          },
          shouldHammer: function(t) {
            var e = t.target.hasParent;
            return (
              !(!e || (s && !(Date.now() - t.target.lastStart < 125))) && e
            );
          },
          touchHandler: function(t) {
            var e = this.shouldHammer(t);
            if ("none" === e) this.dropHammer(t);
            else if ("manipulation" === e) {
              var i = t.target.getBoundingClientRect(),
                n = i.top !== this.pos.top || i.left !== this.pos.left;
              !n && this.dropHammer(t);
            }
            (this.scrolled = !1),
              delete t.target.lastStart,
              delete t.target.hasParent;
          },
          dropHammer: function(t) {
            "touchend" === t.type &&
              (t.target.focus(),
              setTimeout(function() {
                t.target.click();
              }, 0)),
              t.preventDefault();
          },
          touchStart: function(t) {
            (this.pos = t.target.getBoundingClientRect()),
              (t.target.hasParent = this.hasParent(t.target)),
              s && t.target.hasParent && (t.target.lastStart = Date.now());
          },
          styleWatcher: function(t) {
            t.forEach(this.styleUpdater, this);
          },
          styleUpdater: function(t) {
            if (t.target.updateNext) return void (t.target.updateNext = !1);
            var e = this.getTouchAction(t.target);
            return e
              ? void ("none" !== e && (t.target.hadTouchNone = !1))
              : void (
                  !e &&
                  ((t.oldValue && this.checkStyleString(t.oldValue)) ||
                    t.target.hadTouchNone) &&
                  ((t.target.hadTouchNone = !0),
                  (t.target.updateNext = !1),
                  t.target.setAttribute(
                    "style",
                    t.target.getAttribute("style") + " touch-action: none;"
                  ))
                );
          },
          hasParent: function(t) {
            for (var e, i = t; i && i.parentNode; i = i.parentNode)
              if ((e = this.getTouchAction(i))) return e;
            return !1;
          },
          installStartEvents: function() {
            document.addEventListener("touchstart", this.touchStart.bind(this)),
              document.addEventListener(
                "mousedown",
                this.touchStart.bind(this)
              );
          },
          installEndEvents: function() {
            document.addEventListener(
              "touchend",
              this.touchHandler.bind(this),
              !0
            ),
              document.addEventListener(
                "mouseup",
                this.touchHandler.bind(this),
                !0
              );
          },
          installObserver: function() {
            this.observer = new t(this.styleWatcher.bind(this)).observe(
              document,
              {
                subtree: !0,
                attributes: !0,
                attributeOldValue: !0,
                attributeFilter: ["style"]
              }
            );
          },
          install: function() {
            this.installEndEvents(),
              this.installStartEvents(),
              this.installObserver();
          }
        }),
          window.Hammer.time.install();
      }
    })();
  },
  function(t, e, i) {
    !(function(t, e) {
      e();
    })(0, function() {
      "use strict";
      function t(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      var e = (function() {
          function t(t, e) {
            for (var i = 0; i < e.length; i++) {
              var n = e[i];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
            }
          }
          return function(e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e;
          };
        })(),
        i = (function() {
          var i = ".stickySidebar",
            n = {
              topSpacing: 0,
              bottomSpacing: 0,
              containerSelector: !1,
              innerWrapperSelector: ".inner-wrapper-sticky",
              stickyClass: "is-affixed",
              resizeSensor: !0,
              minWidth: !1
            };
          return (function() {
            function o(e) {
              var i = this,
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              if (
                (t(this, o),
                (this.options = o.extend(n, r)),
                (this.sidebar =
                  "string" == typeof e ? document.querySelector(e) : e),
                void 0 === this.sidebar)
              )
                throw new Error("There is no specific sidebar element.");
              (this.sidebarInner = !1),
                (this.container = this.sidebar.parentElement),
                (this.affixedType = "STATIC"),
                (this.direction = "down"),
                (this.support = { transform: !1, transform3d: !1 }),
                (this._initialized = !1),
                (this._reStyle = !1),
                (this._breakpoint = !1),
                (this._resizeListeners = []),
                (this.dimensions = {
                  translateY: 0,
                  topSpacing: 0,
                  lastTopSpacing: 0,
                  bottomSpacing: 0,
                  lastBottomSpacing: 0,
                  sidebarHeight: 0,
                  sidebarWidth: 0,
                  containerTop: 0,
                  containerHeight: 0,
                  viewportHeight: 0,
                  viewportTop: 0,
                  lastViewportTop: 0
                }),
                ["handleEvent"].forEach(function(t) {
                  i[t] = i[t].bind(i);
                }),
                this.initialize();
            }
            return (
              e(
                o,
                [
                  {
                    key: "initialize",
                    value: function() {
                      var t = this;
                      if (
                        (this._setSupportFeatures(),
                        this.options.innerWrapperSelector &&
                          ((this.sidebarInner = this.sidebar.querySelector(
                            this.options.innerWrapperSelector
                          )),
                          null === this.sidebarInner &&
                            (this.sidebarInner = !1)),
                        !this.sidebarInner)
                      ) {
                        var e = document.createElement("div");
                        for (
                          e.setAttribute("class", "inner-wrapper-sticky"),
                            this.sidebar.appendChild(e);
                          this.sidebar.firstChild != e;

                        )
                          e.appendChild(this.sidebar.firstChild);
                        this.sidebarInner = this.sidebar.querySelector(
                          ".inner-wrapper-sticky"
                        );
                      }
                      if (this.options.containerSelector) {
                        var i = document.querySelectorAll(
                          this.options.containerSelector
                        );
                        if (
                          ((i = Array.prototype.slice.call(i)).forEach(function(
                            e,
                            i
                          ) {
                            e.contains(t.sidebar) && (t.container = e);
                          }),
                          !i.length)
                        )
                          throw new Error(
                            "The container does not contains on the sidebar."
                          );
                      }
                      "function" != typeof this.options.topSpacing &&
                        (this.options.topSpacing =
                          parseInt(this.options.topSpacing) || 0),
                        "function" != typeof this.options.bottomSpacing &&
                          (this.options.bottomSpacing =
                            parseInt(this.options.bottomSpacing) || 0),
                        this._widthBreakpoint(),
                        this.calcDimensions(),
                        this.stickyPosition(),
                        this.bindEvents(),
                        (this._initialized = !0);
                    }
                  },
                  {
                    key: "bindEvents",
                    value: function() {
                      window.addEventListener("resize", this, {
                        passive: !0,
                        capture: !1
                      }),
                        window.addEventListener("scroll", this, {
                          passive: !0,
                          capture: !1
                        }),
                        this.sidebar.addEventListener("update" + i, this),
                        this.options.resizeSensor &&
                          "undefined" != typeof ResizeSensor &&
                          (new ResizeSensor(
                            this.sidebarInner,
                            this.handleEvent
                          ),
                          new ResizeSensor(this.container, this.handleEvent));
                    }
                  },
                  {
                    key: "handleEvent",
                    value: function(t) {
                      this.updateSticky(t);
                    }
                  },
                  {
                    key: "calcDimensions",
                    value: function() {
                      if (!this._breakpoint) {
                        var t = this.dimensions;
                        (t.containerTop = o.offsetRelative(this.container).top),
                          (t.containerHeight = this.container.clientHeight),
                          (t.containerBottom =
                            t.containerTop + t.containerHeight),
                          (t.sidebarHeight = this.sidebarInner.offsetHeight),
                          (t.sidebarWidth = this.sidebar.offsetWidth),
                          (t.viewportHeight = window.innerHeight),
                          this._calcDimensionsWithScroll();
                      }
                    }
                  },
                  {
                    key: "_calcDimensionsWithScroll",
                    value: function() {
                      var t = this.dimensions;
                      (t.sidebarLeft = o.offsetRelative(this.sidebar).left),
                        (t.viewportTop =
                          document.documentElement.scrollTop ||
                          document.body.scrollTop),
                        (t.viewportBottom = t.viewportTop + t.viewportHeight),
                        (t.viewportLeft =
                          document.documentElement.scrollLeft ||
                          document.body.scrollLeft),
                        (t.topSpacing = this.options.topSpacing),
                        (t.bottomSpacing = this.options.bottomSpacing),
                        "function" == typeof t.topSpacing &&
                          (t.topSpacing =
                            parseInt(t.topSpacing(this.sidebar)) || 0),
                        "function" == typeof t.bottomSpacing &&
                          (t.bottomSpacing =
                            parseInt(t.bottomSpacing(this.sidebar)) || 0),
                        "VIEWPORT-TOP" === this.affixedType
                          ? t.topSpacing < t.lastTopSpacing &&
                            ((t.translateY += t.lastTopSpacing - t.topSpacing),
                            (this._reStyle = !0))
                          : "VIEWPORT-BOTTOM" === this.affixedType &&
                            t.bottomSpacing < t.lastBottomSpacing &&
                            ((t.translateY +=
                              t.lastBottomSpacing - t.bottomSpacing),
                            (this._reStyle = !0)),
                        (t.lastTopSpacing = t.topSpacing),
                        (t.lastBottomSpacing = t.bottomSpacing);
                    }
                  },
                  {
                    key: "isSidebarFitsViewport",
                    value: function() {
                      return (
                        this.dimensions.sidebarHeight <
                        this.dimensions.viewportHeight
                      );
                    }
                  },
                  {
                    key: "observeScrollDir",
                    value: function() {
                      var t = this.dimensions;
                      if (t.lastViewportTop !== t.viewportTop) {
                        var e = "down" === this.direction ? Math.min : Math.max;
                        t.viewportTop === e(t.viewportTop, t.lastViewportTop) &&
                          (this.direction =
                            "down" === this.direction ? "up" : "down");
                      }
                    }
                  },
                  {
                    key: "getAffixType",
                    value: function() {
                      var t = this.dimensions,
                        e = !1;
                      this._calcDimensionsWithScroll();
                      var i = t.sidebarHeight + t.containerTop,
                        n = t.viewportTop + t.topSpacing,
                        o = t.viewportBottom - t.bottomSpacing;
                      return (
                        "up" === this.direction
                          ? n <= t.containerTop
                            ? ((t.translateY = 0), (e = "STATIC"))
                            : n <= t.translateY + t.containerTop
                              ? ((t.translateY = n - t.containerTop),
                                (e = "VIEWPORT-TOP"))
                              : !this.isSidebarFitsViewport() &&
                                t.containerTop <= n &&
                                (e = "VIEWPORT-UNBOTTOM")
                          : this.isSidebarFitsViewport()
                            ? t.sidebarHeight + n >= t.containerBottom
                              ? ((t.translateY = t.containerBottom - i),
                                (e = "CONTAINER-BOTTOM"))
                              : n >= t.containerTop &&
                                ((t.translateY = n - t.containerTop),
                                (e = "VIEWPORT-TOP"))
                            : t.containerBottom <= o
                              ? ((t.translateY = t.containerBottom - i),
                                (e = "CONTAINER-BOTTOM"))
                              : i + t.translateY <= o
                                ? ((t.translateY = o - i),
                                  (e = "VIEWPORT-BOTTOM"))
                                : t.containerTop + t.translateY <= n &&
                                  (e = "VIEWPORT-UNBOTTOM"),
                        (t.translateY = Math.max(0, t.translateY)),
                        (t.translateY = Math.min(
                          t.containerHeight,
                          t.translateY
                        )),
                        (t.lastViewportTop = t.viewportTop),
                        e
                      );
                    }
                  },
                  {
                    key: "_getStyle",
                    value: function(t) {
                      if (void 0 !== t) {
                        var e = { inner: {}, outer: {} },
                          i = this.dimensions;
                        switch (t) {
                          case "VIEWPORT-TOP":
                            e.inner = {
                              position: "fixed",
                              top: i.topSpacing,
                              left: i.sidebarLeft - i.viewportLeft,
                              width: i.sidebarWidth
                            };
                            break;
                          case "VIEWPORT-BOTTOM":
                            e.inner = {
                              position: "fixed",
                              top: "auto",
                              left: i.sidebarLeft,
                              bottom: i.bottomSpacing,
                              width: i.sidebarWidth
                            };
                            break;
                          case "CONTAINER-BOTTOM":
                          case "VIEWPORT-UNBOTTOM":
                            var n = this._getTranslate(0, i.translateY + "px");
                            e.inner = n
                              ? { transform: n }
                              : {
                                  position: "absolute",
                                  top: i.translateY,
                                  width: i.sidebarWidth
                                };
                        }
                        switch (t) {
                          case "VIEWPORT-TOP":
                          case "VIEWPORT-BOTTOM":
                          case "VIEWPORT-UNBOTTOM":
                          case "CONTAINER-BOTTOM":
                            e.outer = {
                              height: i.sidebarHeight,
                              position: "relative"
                            };
                        }
                        return (
                          (e.outer = o.extend(
                            { height: "", position: "" },
                            e.outer
                          )),
                          (e.inner = o.extend(
                            {
                              position: "relative",
                              top: "",
                              left: "",
                              bottom: "",
                              width: "",
                              transform: this._getTranslate()
                            },
                            e.inner
                          )),
                          e
                        );
                      }
                    }
                  },
                  {
                    key: "stickyPosition",
                    value: function(t) {
                      if (!this._breakpoint) {
                        t = this._reStyle || t || !1;
                        var e = this.getAffixType(),
                          n = this._getStyle(e);
                        if ((this.affixedType != e || t) && e) {
                          var r =
                            "affix." +
                            e.toLowerCase().replace("viewport-", "") +
                            i;
                          o.eventTrigger(this.sidebar, r),
                            "STATIC" === e
                              ? o.removeClass(
                                  this.sidebar,
                                  this.options.stickyClass
                                )
                              : o.addClass(
                                  this.sidebar,
                                  this.options.stickyClass
                                );
                          for (var s in n.outer)
                            this.sidebar.style[s] = n.outer[s];
                          for (var a in n.inner) {
                            var l = "number" == typeof n.inner[a] ? "px" : "";
                            this.sidebarInner.style[a] = n.inner[a] + l;
                          }
                          var c =
                            "affixed." +
                            e.toLowerCase().replace("viewport-", "") +
                            i;
                          o.eventTrigger(this.sidebar, c);
                        } else
                          this._initialized &&
                            (this.sidebarInner.style.left = n.inner.left);
                        this.affixedType = e;
                      }
                    }
                  },
                  {
                    key: "_widthBreakpoint",
                    value: function() {
                      window.innerWidth <= this.options.minWidth
                        ? ((this._breakpoint = !0),
                          (this.affixedType = "STATIC"),
                          this.sidebar.removeAttribute("style"),
                          o.removeClass(this.sidebar, this.options.stickyClass),
                          this.sidebarInner.removeAttribute("style"))
                        : (this._breakpoint = !1);
                    }
                  },
                  {
                    key: "updateSticky",
                    value: function() {
                      var t = this,
                        e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                      this._running ||
                        ((this._running = !0),
                        (function(e) {
                          requestAnimationFrame(function() {
                            switch (e) {
                              case "scroll":
                                t._calcDimensionsWithScroll(),
                                  t.observeScrollDir(),
                                  t.stickyPosition();
                                break;
                              case "resize":
                              default:
                                t._widthBreakpoint(),
                                  t.calcDimensions(),
                                  t.stickyPosition(!0);
                            }
                            t._running = !1;
                          });
                        })(e.type));
                    }
                  },
                  {
                    key: "_setSupportFeatures",
                    value: function() {
                      var t = this.support;
                      (t.transform = o.supportTransform()),
                        (t.transform3d = o.supportTransform(!0));
                    }
                  },
                  {
                    key: "_getTranslate",
                    value: function() {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : 0,
                        e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        i =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : 0;
                      return this.support.transform3d
                        ? "translate3d(" + t + ", " + e + ", " + i + ")"
                        : !!this.support.translate &&
                            "translate(" + t + ", " + e + ")";
                    }
                  },
                  {
                    key: "destroy",
                    value: function() {
                      window.removeEventListener("resize", this, {
                        caption: !1
                      }),
                        window.removeEventListener("scroll", this, {
                          caption: !1
                        }),
                        this.sidebar.classList.remove(this.options.stickyClass),
                        (this.sidebar.style.minHeight = ""),
                        this.sidebar.removeEventListener("update" + i, this);
                      var t = { inner: {}, outer: {} };
                      (t.inner = {
                        position: "",
                        top: "",
                        left: "",
                        bottom: "",
                        width: "",
                        transform: ""
                      }),
                        (t.outer = { height: "", position: "" });
                      for (var e in t.outer) this.sidebar.style[e] = t.outer[e];
                      for (var n in t.inner)
                        this.sidebarInner.style[n] = t.inner[n];
                      this.options.resizeSensor &&
                        "undefined" != typeof ResizeSensor &&
                        (ResizeSensor.detach(
                          this.sidebarInner,
                          this.handleEvent
                        ),
                        ResizeSensor.detach(this.container, this.handleEvent));
                    }
                  }
                ],
                [
                  {
                    key: "supportTransform",
                    value: function(t) {
                      var e = !1,
                        i = t ? "perspective" : "transform",
                        n = i.charAt(0).toUpperCase() + i.slice(1),
                        o = ["Webkit", "Moz", "O", "ms"],
                        r = document.createElement("support").style;
                      return (
                        (i + " " + o.join(n + " ") + n)
                          .split(" ")
                          .forEach(function(t, i) {
                            if (void 0 !== r[t]) return (e = t), !1;
                          }),
                        e
                      );
                    }
                  },
                  {
                    key: "eventTrigger",
                    value: function(t, e, i) {
                      try {
                        var n = new CustomEvent(e, { detail: i });
                      } catch (t) {
                        (n = document.createEvent(
                          "CustomEvent"
                        )).initCustomEvent(e, !0, !0, i);
                      }
                      t.dispatchEvent(n);
                    }
                  },
                  {
                    key: "extend",
                    value: function(t, e) {
                      var i = {};
                      for (var n in t)
                        void 0 !== e[n] ? (i[n] = e[n]) : (i[n] = t[n]);
                      return i;
                    }
                  },
                  {
                    key: "offsetRelative",
                    value: function(t) {
                      var e = { left: 0, top: 0 };
                      do {
                        var i = t.offsetTop,
                          n = t.offsetLeft;
                        isNaN(i) || (e.top += i),
                          isNaN(n) || (e.left += n),
                          (t =
                            "BODY" === t.tagName
                              ? t.parentElement
                              : t.offsetParent);
                      } while (t);
                      return e;
                    }
                  },
                  {
                    key: "addClass",
                    value: function(t, e) {
                      o.hasClass(t, e) ||
                        (t.classList
                          ? t.classList.add(e)
                          : (t.className += " " + e));
                    }
                  },
                  {
                    key: "removeClass",
                    value: function(t, e) {
                      o.hasClass(t, e) &&
                        (t.classList
                          ? t.classList.remove(e)
                          : (t.className = t.className.replace(
                              new RegExp(
                                "(^|\\b)" + e.split(" ").join("|") + "(\\b|$)",
                                "gi"
                              ),
                              " "
                            )));
                    }
                  },
                  {
                    key: "hasClass",
                    value: function(t, e) {
                      return t.classList
                        ? t.classList.contains(e)
                        : new RegExp("(^| )" + e + "( |$)", "gi").test(
                            t.className
                          );
                    }
                  }
                ]
              ),
              o
            );
          })();
        })();
      (window.StickySidebar = i),
        (function() {
          if ("undefined" != typeof window) {
            var t = window.$ || window.jQuery || window.Zepto;
            if (t) {
              (t.fn.stickySidebar = function(e) {
                return this.each(function() {
                  var n = t(this),
                    o = t(this).data("stickySidebar");
                  if (
                    (o ||
                      ((o = new i(this, "object" == typeof e && e)),
                      n.data("stickySidebar", o)),
                    "string" == typeof e)
                  ) {
                    if (
                      void 0 === o[e] &&
                      -1 === ["destroy", "updateSticky"].indexOf(e)
                    )
                      throw new Error('No method named "' + e + '"');
                    o[e]();
                  }
                });
              }),
                (t.fn.stickySidebar.Constructor = i);
              var e = t.fn.stickySidebar;
              t.fn.stickySidebar.noConflict = function() {
                return (t.fn.stickySidebar = e), this;
              };
            }
          }
        })();
    });
  },
  function(t, e, i) {
    var n, o, r;
    !(function(s) {
      "use strict";
      (o = [i(16)]),
        (n = s),
        (r = "function" == typeof n ? n.apply(e, o) : n),
        !(void 0 !== r && (t.exports = r));
    })(function(t) {
      "use strict";
      function e(e) {
        return (
          !e.nodeName ||
          t.inArray(e.nodeName.toLowerCase(), [
            "iframe",
            "#document",
            "html",
            "body"
          ]) !== -1
        );
      }
      function i(e) {
        return t.isFunction(e) || t.isPlainObject(e) ? e : { top: e, left: e };
      }
      var n = (t.scrollTo = function(e, i, n) {
        return t(window).scrollTo(e, i, n);
      });
      return (
        (n.defaults = { axis: "xy", duration: 0, limit: !0 }),
        (t.fn.scrollTo = function(o, r, s) {
          "object" == typeof r && ((s = r), (r = 0)),
            "function" == typeof s && (s = { onAfter: s }),
            "max" === o && (o = 9e9),
            (s = t.extend({}, n.defaults, s)),
            (r = r || s.duration);
          var a = s.queue && s.axis.length > 1;
          return (
            a && (r /= 2),
            (s.offset = i(s.offset)),
            (s.over = i(s.over)),
            this.each(function() {
              function l(e) {
                var i = t.extend({}, s, {
                  queue: !0,
                  duration: r,
                  complete:
                    e &&
                    function() {
                      e.call(d, p, s);
                    }
                });
                h.animate(f, i);
              }
              if (null !== o) {
                var c,
                  u = e(this),
                  d = u ? this.contentWindow || window : this,
                  h = t(d),
                  p = o,
                  f = {};
                switch (typeof p) {
                  case "number":
                  case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(p)) {
                      p = i(p);
                      break;
                    }
                    p = u ? t(p) : t(p, d);
                  case "object":
                    if (0 === p.length) return;
                    (p.is || p.style) && (c = (p = t(p)).offset());
                }
                var m = (t.isFunction(s.offset) && s.offset(d, p)) || s.offset;
                t.each(s.axis.split(""), function(t, e) {
                  var i = "x" === e ? "Left" : "Top",
                    o = i.toLowerCase(),
                    r = "scroll" + i,
                    g = h[r](),
                    v = n.max(d, e);
                  if (c)
                    (f[r] = c[o] + (u ? 0 : g - h.offset()[o])),
                      s.margin &&
                        ((f[r] -= parseInt(p.css("margin" + i), 10) || 0),
                        (f[r] -=
                          parseInt(p.css("border" + i + "Width"), 10) || 0)),
                      (f[r] += m[o] || 0),
                      s.over[o] &&
                        (f[r] +=
                          p["x" === e ? "width" : "height"]() * s.over[o]);
                  else {
                    var y = p[o];
                    f[r] =
                      y.slice && "%" === y.slice(-1)
                        ? parseFloat(y) / 100 * v
                        : y;
                  }
                  s.limit &&
                    /^\d+$/.test(f[r]) &&
                    (f[r] = f[r] <= 0 ? 0 : Math.min(f[r], v)),
                    !t &&
                      s.axis.length > 1 &&
                      (g === f[r]
                        ? (f = {})
                        : a && (l(s.onAfterFirst), (f = {})));
                }),
                  l(s.onAfter);
              }
            })
          );
        }),
        (n.max = function(i, n) {
          var o = "x" === n ? "Width" : "Height",
            r = "scroll" + o;
          if (!e(i)) return i[r] - t(i)[o.toLowerCase()]();
          var s = "client" + o,
            a = i.ownerDocument || i.document,
            l = a.documentElement,
            c = a.body;
          return Math.max(l[r], c[r]) - Math.min(l[s], c[s]);
        }),
        (t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
          get: function(e) {
            return t(e.elem)[e.prop]();
          },
          set: function(e) {
            var i = this.get(e);
            if (e.options.interrupt && e._last && e._last !== i)
              return t(e.elem).stop();
            var n = Math.round(e.now);
            i !== n && (t(e.elem)[e.prop](n), (e._last = this.get(e)));
          }
        }),
        n
      );
    });
  },
  function(t, e, i) {
    var n, o, r;
    !(function(s) {
      (o = [i(16)]),
        (n = s),
        (r = "function" == typeof n ? n.apply(e, o) : n),
        !(void 0 !== r && (t.exports = r));
    })(function(t) {
      var e,
        i,
        n,
        o,
        r,
        s,
        a = "Close",
        l = "BeforeClose",
        c = "AfterClose",
        u = "BeforeAppend",
        d = "MarkupParse",
        h = "Open",
        p = "Change",
        f = "mfp",
        m = "." + f,
        g = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        b = function() {},
        w = !!window.jQuery,
        x = t(window),
        S = function(t, i) {
          e.ev.on(f + t + m, i);
        },
        C = function(e, i, n, o) {
          var r = document.createElement("div");
          return (
            (r.className = "mfp-" + e),
            n && (r.innerHTML = n),
            o ? i && i.appendChild(r) : ((r = t(r)), i && r.appendTo(i)),
            r
          );
        },
        k = function(i, n) {
          e.ev.triggerHandler(f + i, n),
            e.st.callbacks &&
              ((i = i.charAt(0).toLowerCase() + i.slice(1)),
              e.st.callbacks[i] &&
                e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]));
        },
        E = function(i) {
          return (
            (i === s && e.currTemplate.closeBtn) ||
              ((e.currTemplate.closeBtn = t(
                e.st.closeMarkup.replace("%title%", e.st.tClose)
              )),
              (s = i)),
            e.currTemplate.closeBtn
          );
        },
        T = function() {
          t.magnificPopup.instance ||
            ((e = new b()), e.init(), (t.magnificPopup.instance = e));
        },
        P = function() {
          var t = document.createElement("p").style,
            e = ["ms", "O", "Moz", "Webkit"];
          if (void 0 !== t.transition) return !0;
          for (; e.length; ) if (e.pop() + "Transition" in t) return !0;
          return !1;
        };
      (b.prototype = {
        constructor: b,
        init: function() {
          var i = navigator.appVersion;
          (e.isLowIE = e.isIE8 = document.all && !document.addEventListener),
            (e.isAndroid = /android/gi.test(i)),
            (e.isIOS = /iphone|ipad|ipod/gi.test(i)),
            (e.supportsTransition = P()),
            (e.probablyMobile =
              e.isAndroid ||
              e.isIOS ||
              /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                navigator.userAgent
              )),
            (n = t(document)),
            (e.popupsCache = {});
        },
        open: function(i) {
          var o;
          if (i.isObj === !1) {
            (e.items = i.items.toArray()), (e.index = 0);
            var s,
              a = i.items;
            for (o = 0; o < a.length; o++)
              if (((s = a[o]), s.parsed && (s = s.el[0]), s === i.el[0])) {
                e.index = o;
                break;
              }
          } else
            (e.items = t.isArray(i.items) ? i.items : [i.items]),
              (e.index = i.index || 0);
          if (e.isOpen) return void e.updateItemHTML();
          (e.types = []),
            (r = ""),
            i.mainEl && i.mainEl.length ? (e.ev = i.mainEl.eq(0)) : (e.ev = n),
            i.key
              ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}),
                (e.currTemplate = e.popupsCache[i.key]))
              : (e.currTemplate = {}),
            (e.st = t.extend(!0, {}, t.magnificPopup.defaults, i)),
            (e.fixedContentPos =
              "auto" === e.st.fixedContentPos
                ? !e.probablyMobile
                : e.st.fixedContentPos),
            e.st.modal &&
              ((e.st.closeOnContentClick = !1),
              (e.st.closeOnBgClick = !1),
              (e.st.showCloseBtn = !1),
              (e.st.enableEscapeKey = !1)),
            e.bgOverlay ||
              ((e.bgOverlay = C("bg").on("click" + m, function() {
                e.close();
              })),
              (e.wrap = C("wrap")
                .attr("tabindex", -1)
                .on("click" + m, function(t) {
                  e._checkIfClose(t.target) && e.close();
                })),
              (e.container = C("container", e.wrap))),
            (e.contentContainer = C("content")),
            e.st.preloader &&
              (e.preloader = C("preloader", e.container, e.st.tLoading));
          var l = t.magnificPopup.modules;
          for (o = 0; o < l.length; o++) {
            var c = l[o];
            (c = c.charAt(0).toUpperCase() + c.slice(1)), e["init" + c].call(e);
          }
          k("BeforeOpen"),
            e.st.showCloseBtn &&
              (e.st.closeBtnInside
                ? (S(d, function(t, e, i, n) {
                    i.close_replaceWith = E(n.type);
                  }),
                  (r += " mfp-close-btn-in"))
                : e.wrap.append(E())),
            e.st.alignTop && (r += " mfp-align-top"),
            e.fixedContentPos
              ? e.wrap.css({
                  overflow: e.st.overflowY,
                  overflowX: "hidden",
                  overflowY: e.st.overflowY
                })
              : e.wrap.css({ top: x.scrollTop(), position: "absolute" }),
            (e.st.fixedBgPos === !1 ||
              ("auto" === e.st.fixedBgPos && !e.fixedContentPos)) &&
              e.bgOverlay.css({ height: n.height(), position: "absolute" }),
            e.st.enableEscapeKey &&
              n.on("keyup" + m, function(t) {
                27 === t.keyCode && e.close();
              }),
            x.on("resize" + m, function() {
              e.updateSize();
            }),
            e.st.closeOnContentClick || (r += " mfp-auto-cursor"),
            r && e.wrap.addClass(r);
          var u = (e.wH = x.height()),
            p = {};
          if (e.fixedContentPos && e._hasScrollBar(u)) {
            var f = e._getScrollbarSize();
            f && (p.marginRight = f);
          }
          e.fixedContentPos &&
            (e.isIE7
              ? t("body, html").css("overflow", "hidden")
              : (p.overflow = "hidden"));
          var v = e.st.mainClass;
          return (
            e.isIE7 && (v += " mfp-ie7"),
            v && e._addClassToMFP(v),
            e.updateItemHTML(),
            k("BuildControls"),
            t("html").css(p),
            e.bgOverlay
              .add(e.wrap)
              .prependTo(e.st.prependTo || t(document.body)),
            (e._lastFocusedEl = document.activeElement),
            setTimeout(function() {
              e.content
                ? (e._addClassToMFP(g), e._setFocus())
                : e.bgOverlay.addClass(g),
                n.on("focusin" + m, e._onFocusIn);
            }, 16),
            (e.isOpen = !0),
            e.updateSize(u),
            k(h),
            i
          );
        },
        close: function() {
          e.isOpen &&
            (k(l),
            (e.isOpen = !1),
            e.st.removalDelay && !e.isLowIE && e.supportsTransition
              ? (e._addClassToMFP(v),
                setTimeout(function() {
                  e._close();
                }, e.st.removalDelay))
              : e._close());
        },
        _close: function() {
          k(a);
          var i = v + " " + g + " ";
          if (
            (e.bgOverlay.detach(),
            e.wrap.detach(),
            e.container.empty(),
            e.st.mainClass && (i += e.st.mainClass + " "),
            e._removeClassFromMFP(i),
            e.fixedContentPos)
          ) {
            var o = { marginRight: "" };
            e.isIE7 ? t("body, html").css("overflow", "") : (o.overflow = ""),
              t("html").css(o);
          }
          n.off("keyup" + m + " focusin" + m),
            e.ev.off(m),
            e.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            e.bgOverlay.attr("class", "mfp-bg"),
            e.container.attr("class", "mfp-container"),
            !e.st.showCloseBtn ||
              (e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0) ||
              (e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach()),
            e.st.autoFocusLast &&
              e._lastFocusedEl &&
              t(e._lastFocusedEl).focus(),
            (e.currItem = null),
            (e.content = null),
            (e.currTemplate = null),
            (e.prevHeight = 0),
            k(c);
        },
        updateSize: function(t) {
          if (e.isIOS) {
            var i = document.documentElement.clientWidth / window.innerWidth,
              n = window.innerHeight * i;
            e.wrap.css("height", n), (e.wH = n);
          } else e.wH = t || x.height();
          e.fixedContentPos || e.wrap.css("height", e.wH), k("Resize");
        },
        updateItemHTML: function() {
          var i = e.items[e.index];
          e.contentContainer.detach(),
            e.content && e.content.detach(),
            i.parsed || (i = e.parseEl(e.index));
          var n = i.type;
          if (
            (k("BeforeChange", [e.currItem ? e.currItem.type : "", n]),
            (e.currItem = i),
            !e.currTemplate[n])
          ) {
            var r = !!e.st[n] && e.st[n].markup;
            k("FirstMarkupParse", r),
              r ? (e.currTemplate[n] = t(r)) : (e.currTemplate[n] = !0);
          }
          o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
          var s = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](
            i,
            e.currTemplate[n]
          );
          e.appendContent(s, n),
            (i.preloaded = !0),
            k(p, i),
            (o = i.type),
            e.container.prepend(e.contentContainer),
            k("AfterChange");
        },
        appendContent: function(t, i) {
          (e.content = t),
            t
              ? e.st.showCloseBtn &&
                e.st.closeBtnInside &&
                e.currTemplate[i] === !0
                ? e.content.find(".mfp-close").length || e.content.append(E())
                : (e.content = t)
              : (e.content = ""),
            k(u),
            e.container.addClass("mfp-" + i + "-holder"),
            e.contentContainer.append(e.content);
        },
        parseEl: function(i) {
          var n,
            o = e.items[i];
          if (
            (o.tagName
              ? (o = { el: t(o) })
              : ((n = o.type), (o = { data: o, src: o.src })),
            o.el)
          ) {
            for (var r = e.types, s = 0; s < r.length; s++)
              if (o.el.hasClass("mfp-" + r[s])) {
                n = r[s];
                break;
              }
            (o.src = o.el.attr("data-mfp-src")),
              o.src || (o.src = o.el.attr("href"));
          }
          return (
            (o.type = n || e.st.type || "inline"),
            (o.index = i),
            (o.parsed = !0),
            (e.items[i] = o),
            k("ElementParse", o),
            e.items[i]
          );
        },
        addGroup: function(t, i) {
          var n = function(n) {
            (n.mfpEl = this), e._openClick(n, t, i);
          };
          i || (i = {});
          var o = "click.magnificPopup";
          (i.mainEl = t),
            i.items
              ? ((i.isObj = !0), t.off(o).on(o, n))
              : ((i.isObj = !1),
                i.delegate
                  ? t.off(o).on(o, i.delegate, n)
                  : ((i.items = t), t.off(o).on(o, n)));
        },
        _openClick: function(i, n, o) {
          var r =
            void 0 !== o.midClick
              ? o.midClick
              : t.magnificPopup.defaults.midClick;
          if (
            r ||
            !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)
          ) {
            var s =
              void 0 !== o.disableOn
                ? o.disableOn
                : t.magnificPopup.defaults.disableOn;
            if (s)
              if (t.isFunction(s)) {
                if (!s.call(e)) return !0;
              } else if (x.width() < s) return !0;
            i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()),
              (o.el = t(i.mfpEl)),
              o.delegate && (o.items = n.find(o.delegate)),
              e.open(o);
          }
        },
        updateStatus: function(t, n) {
          if (e.preloader) {
            i !== t && e.container.removeClass("mfp-s-" + i),
              n || "loading" !== t || (n = e.st.tLoading);
            var o = { status: t, text: n };
            k("UpdateStatus", o),
              (t = o.status),
              (n = o.text),
              e.preloader.html(n),
              e.preloader.find("a").on("click", function(t) {
                t.stopImmediatePropagation();
              }),
              e.container.addClass("mfp-s-" + t),
              (i = t);
          }
        },
        _checkIfClose: function(i) {
          if (!t(i).hasClass(y)) {
            var n = e.st.closeOnContentClick,
              o = e.st.closeOnBgClick;
            if (n && o) return !0;
            if (
              !e.content ||
              t(i).hasClass("mfp-close") ||
              (e.preloader && i === e.preloader[0])
            )
              return !0;
            if (i === e.content[0] || t.contains(e.content[0], i)) {
              if (n) return !0;
            } else if (o && t.contains(document, i)) return !0;
            return !1;
          }
        },
        _addClassToMFP: function(t) {
          e.bgOverlay.addClass(t), e.wrap.addClass(t);
        },
        _removeClassFromMFP: function(t) {
          this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
        },
        _hasScrollBar: function(t) {
          return (
            (e.isIE7 ? n.height() : document.body.scrollHeight) >
            (t || x.height())
          );
        },
        _setFocus: function() {
          (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
        },
        _onFocusIn: function(i) {
          if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target))
            return e._setFocus(), !1;
        },
        _parseMarkup: function(e, i, n) {
          var o;
          n.data && (i = t.extend(n.data, i)),
            k(d, [e, i, n]),
            t.each(i, function(i, n) {
              if (void 0 === n || n === !1) return !0;
              if (((o = i.split("_")), o.length > 1)) {
                var r = e.find(m + "-" + o[0]);
                if (r.length > 0) {
                  var s = o[1];
                  "replaceWith" === s
                    ? r[0] !== n[0] && r.replaceWith(n)
                    : "img" === s
                      ? r.is("img")
                        ? r.attr("src", n)
                        : r.replaceWith(
                            t("<img>")
                              .attr("src", n)
                              .attr("class", r.attr("class"))
                          )
                      : r.attr(o[1], n);
                }
              } else e.find(m + "-" + i).html(n);
            });
        },
        _getScrollbarSize: function() {
          if (void 0 === e.scrollbarSize) {
            var t = document.createElement("div");
            (t.style.cssText =
              "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
              document.body.appendChild(t),
              (e.scrollbarSize = t.offsetWidth - t.clientWidth),
              document.body.removeChild(t);
          }
          return e.scrollbarSize;
        }
      }),
        (t.magnificPopup = {
          instance: null,
          proto: b.prototype,
          modules: [],
          open: function(e, i) {
            return (
              T(),
              (e = e ? t.extend(!0, {}, e) : {}),
              (e.isObj = !0),
              (e.index = i || 0),
              this.instance.open(e)
            );
          },
          close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close();
          },
          registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options),
              t.extend(this.proto, i.proto),
              this.modules.push(e);
          },
          defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup:
              '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
          }
        }),
        (t.fn.magnificPopup = function(i) {
          T();
          var n = t(this);
          if ("string" == typeof i)
            if ("open" === i) {
              var o,
                r = w ? n.data("magnificPopup") : n[0].magnificPopup,
                s = parseInt(arguments[1], 10) || 0;
              r.items
                ? (o = r.items[s])
                : ((o = n),
                  r.delegate && (o = o.find(r.delegate)),
                  (o = o.eq(s))),
                e._openClick({ mfpEl: o }, n, r);
            } else
              e.isOpen &&
                e[i].apply(e, Array.prototype.slice.call(arguments, 1));
          else
            (i = t.extend(!0, {}, i)),
              w ? n.data("magnificPopup", i) : (n[0].magnificPopup = i),
              e.addGroup(n, i);
          return n;
        });
      var _,
        j,
        I,
        A = "inline",
        O = function() {
          I && (j.after(I.addClass(_)).detach(), (I = null));
        };
      t.magnificPopup.registerModule(A, {
        options: {
          hiddenClass: "hide",
          markup: "",
          tNotFound: "Content not found"
        },
        proto: {
          initInline: function() {
            e.types.push(A),
              S(a + "." + A, function() {
                O();
              });
          },
          getInline: function(i, n) {
            if ((O(), i.src)) {
              var o = e.st.inline,
                r = t(i.src);
              if (r.length) {
                var s = r[0].parentNode;
                s &&
                  s.tagName &&
                  (j || ((_ = o.hiddenClass), (j = C(_)), (_ = "mfp-" + _)),
                  (I = r
                    .after(j)
                    .detach()
                    .removeClass(_))),
                  e.updateStatus("ready");
              } else e.updateStatus("error", o.tNotFound), (r = t("<div>"));
              return (i.inlineElement = r), r;
            }
            return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n;
          }
        }
      });
      var D,
        L = "ajax",
        M = function() {
          D && t(document.body).removeClass(D);
        },
        z = function() {
          M(), e.req && e.req.abort();
        };
      t.magnificPopup.registerModule(L, {
        options: {
          settings: null,
          cursor: "mfp-ajax-cur",
          tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
          initAjax: function() {
            e.types.push(L),
              (D = e.st.ajax.cursor),
              S(a + "." + L, z),
              S("BeforeChange." + L, z);
          },
          getAjax: function(i) {
            D && t(document.body).addClass(D), e.updateStatus("loading");
            var n = t.extend(
              {
                url: i.src,
                success: function(n, o, r) {
                  var s = { data: n, xhr: r };
                  k("ParseAjax", s),
                    e.appendContent(t(s.data), L),
                    (i.finished = !0),
                    M(),
                    e._setFocus(),
                    setTimeout(function() {
                      e.wrap.addClass(g);
                    }, 16),
                    e.updateStatus("ready"),
                    k("AjaxContentAdded");
                },
                error: function() {
                  M(),
                    (i.finished = i.loadError = !0),
                    e.updateStatus(
                      "error",
                      e.st.ajax.tError.replace("%url%", i.src)
                    );
                }
              },
              e.st.ajax.settings
            );
            return (e.req = t.ajax(n)), "";
          }
        }
      });
      var Q,
        F = function(i) {
          if (i.data && void 0 !== i.data.title) return i.data.title;
          var n = e.st.image.titleSrc;
          if (n) {
            if (t.isFunction(n)) return n.call(e, i);
            if (i.el) return i.el.attr(n) || "";
          }
          return "";
        };
      t.magnificPopup.registerModule("image", {
        options: {
          markup:
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
          cursor: "mfp-zoom-out-cur",
          titleSrc: "title",
          verticalFit: !0,
          tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
          initImage: function() {
            var i = e.st.image,
              n = ".image";
            e.types.push("image"),
              S(h + n, function() {
                "image" === e.currItem.type &&
                  i.cursor &&
                  t(document.body).addClass(i.cursor);
              }),
              S(a + n, function() {
                i.cursor && t(document.body).removeClass(i.cursor),
                  x.off("resize" + m);
              }),
              S("Resize" + n, e.resizeImage),
              e.isLowIE && S("AfterChange", e.resizeImage);
          },
          resizeImage: function() {
            var t = e.currItem;
            if (t && t.img && e.st.image.verticalFit) {
              var i = 0;
              e.isLowIE &&
                (i =
                  parseInt(t.img.css("padding-top"), 10) +
                  parseInt(t.img.css("padding-bottom"), 10)),
                t.img.css("max-height", e.wH - i);
            }
          },
          _onImageHasSize: function(t) {
            t.img &&
              ((t.hasSize = !0),
              Q && clearInterval(Q),
              (t.isCheckingImgSize = !1),
              k("ImageHasSize", t),
              t.imgHidden &&
                (e.content && e.content.removeClass("mfp-loading"),
                (t.imgHidden = !1)));
          },
          findImageSize: function(t) {
            var i = 0,
              n = t.img[0],
              o = function(r) {
                Q && clearInterval(Q),
                  (Q = setInterval(function() {
                    return n.naturalWidth > 0
                      ? void e._onImageHasSize(t)
                      : (i > 200 && clearInterval(Q),
                        i++,
                        void (3 === i
                          ? o(10)
                          : 40 === i
                            ? o(50)
                            : 100 === i && o(500)));
                  }, r));
              };
            o(1);
          },
          getImage: function(i, n) {
            var o = 0,
              r = function() {
                i &&
                  (i.img[0].complete
                    ? (i.img.off(".mfploader"),
                      i === e.currItem &&
                        (e._onImageHasSize(i), e.updateStatus("ready")),
                      (i.hasSize = !0),
                      (i.loaded = !0),
                      k("ImageLoadComplete"))
                    : (o++, o < 200 ? setTimeout(r, 100) : s()));
              },
              s = function() {
                i &&
                  (i.img.off(".mfploader"),
                  i === e.currItem &&
                    (e._onImageHasSize(i),
                    e.updateStatus("error", a.tError.replace("%url%", i.src))),
                  (i.hasSize = !0),
                  (i.loaded = !0),
                  (i.loadError = !0));
              },
              a = e.st.image,
              l = n.find(".mfp-img");
            if (l.length) {
              var c = document.createElement("img");
              (c.className = "mfp-img"),
                i.el &&
                  i.el.find("img").length &&
                  (c.alt = i.el.find("img").attr("alt")),
                (i.img = t(c)
                  .on("load.mfploader", r)
                  .on("error.mfploader", s)),
                (c.src = i.src),
                l.is("img") && (i.img = i.img.clone()),
                (c = i.img[0]),
                c.naturalWidth > 0
                  ? (i.hasSize = !0)
                  : c.width || (i.hasSize = !1);
            }
            return (
              e._parseMarkup(n, { title: F(i), img_replaceWith: i.img }, i),
              e.resizeImage(),
              i.hasSize
                ? (Q && clearInterval(Q),
                  i.loadError
                    ? (n.addClass("mfp-loading"),
                      e.updateStatus("error", a.tError.replace("%url%", i.src)))
                    : (n.removeClass("mfp-loading"), e.updateStatus("ready")),
                  n)
                : (e.updateStatus("loading"),
                  (i.loading = !0),
                  i.hasSize ||
                    ((i.imgHidden = !0),
                    n.addClass("mfp-loading"),
                    e.findImageSize(i)),
                  n)
            );
          }
        }
      });
      var W,
        N = function() {
          return (
            void 0 === W &&
              (W = void 0 !== document.createElement("p").style.MozTransform),
            W
          );
        };
      t.magnificPopup.registerModule("zoom", {
        options: {
          enabled: !1,
          easing: "ease-in-out",
          duration: 300,
          opener: function(t) {
            return t.is("img") ? t : t.find("img");
          }
        },
        proto: {
          initZoom: function() {
            var t,
              i = e.st.zoom,
              n = ".zoom";
            if (i.enabled && e.supportsTransition) {
              var o,
                r,
                s = i.duration,
                c = function(t) {
                  var e = t
                      .clone()
                      .removeAttr("style")
                      .removeAttr("class")
                      .addClass("mfp-animated-image"),
                    n = "all " + i.duration / 1e3 + "s " + i.easing,
                    o = {
                      position: "fixed",
                      zIndex: 9999,
                      left: 0,
                      top: 0,
                      "-webkit-backface-visibility": "hidden"
                    },
                    r = "transition";
                  return (
                    (o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[
                      r
                    ] = n),
                    e.css(o),
                    e
                  );
                },
                u = function() {
                  e.content.css("visibility", "visible");
                };
              S("BuildControls" + n, function() {
                if (e._allowZoom()) {
                  if (
                    (clearTimeout(o),
                    e.content.css("visibility", "hidden"),
                    (t = e._getItemToZoom()),
                    !t)
                  )
                    return void u();
                  (r = c(t)),
                    r.css(e._getOffset()),
                    e.wrap.append(r),
                    (o = setTimeout(function() {
                      r.css(e._getOffset(!0)),
                        (o = setTimeout(function() {
                          u(),
                            setTimeout(function() {
                              r.remove(),
                                (t = r = null),
                                k("ZoomAnimationEnded");
                            }, 16);
                        }, s));
                    }, 16));
                }
              }),
                S(l + n, function() {
                  if (e._allowZoom()) {
                    if ((clearTimeout(o), (e.st.removalDelay = s), !t)) {
                      if (((t = e._getItemToZoom()), !t)) return;
                      r = c(t);
                    }
                    r.css(e._getOffset(!0)),
                      e.wrap.append(r),
                      e.content.css("visibility", "hidden"),
                      setTimeout(function() {
                        r.css(e._getOffset());
                      }, 16);
                  }
                }),
                S(a + n, function() {
                  e._allowZoom() && (u(), r && r.remove(), (t = null));
                });
            }
          },
          _allowZoom: function() {
            return "image" === e.currItem.type;
          },
          _getItemToZoom: function() {
            return !!e.currItem.hasSize && e.currItem.img;
          },
          _getOffset: function(i) {
            var n;
            n = i
              ? e.currItem.img
              : e.st.zoom.opener(e.currItem.el || e.currItem);
            var o = n.offset(),
              r = parseInt(n.css("padding-top"), 10),
              s = parseInt(n.css("padding-bottom"), 10);
            o.top -= t(window).scrollTop() - r;
            var a = {
              width: n.width(),
              height: (w ? n.innerHeight() : n[0].offsetHeight) - s - r
            };
            return (
              N()
                ? (a["-moz-transform"] = a.transform =
                    "translate(" + o.left + "px," + o.top + "px)")
                : ((a.left = o.left), (a.top = o.top)),
              a
            );
          }
        }
      });
      var B = "iframe",
        H = "//about:blank",
        $ = function(t) {
          if (e.currTemplate[B]) {
            var i = e.currTemplate[B].find("iframe");
            i.length &&
              (t || (i[0].src = H),
              e.isIE8 && i.css("display", t ? "block" : "none"));
          }
        };
      t.magnificPopup.registerModule(B, {
        options: {
          markup:
            '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
          srcAction: "iframe_src",
          patterns: {
            youtube: {
              index: "youtube.com",
              id: "v=",
              src: "https://www.youtube.com/embed/%id%?autoplay=1"
            },
            vimeo: {
              index: "vimeo.com/",
              id: "/",
              src: "//player.vimeo.com/video/%id%?autoplay=1"
            },
            gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
          }
        },
        proto: {
          initIframe: function() {
            e.types.push(B),
              S("BeforeChange", function(t, e, i) {
                e !== i && (e === B ? $() : i === B && $(!0));
              }),
              S(a + "." + B, function() {
                $();
              });
          },
          getIframe: function(i, n) {
            var o = i.src,
              r = e.st.iframe;
            t.each(r.patterns, function() {
              if (o.indexOf(this.index) > -1)
                return (
                  this.id &&
                    (o =
                      "string" == typeof this.id
                        ? o.substr(
                            o.lastIndexOf(this.id) + this.id.length,
                            o.length
                          )
                        : this.id.call(this, o)),
                  (o = this.src.replace("%id%", o)),
                  !1
                );
            });
            var s = {};
            return (
              r.srcAction && (s[r.srcAction] = o),
              e._parseMarkup(n, s, i),
              e.updateStatus("ready"),
              n
            );
          }
        }
      });
      var V = function(t) {
          var i = e.items.length;
          return t > i - 1 ? t - i : t < 0 ? i + t : t;
        },
        R = function(t, e, i) {
          return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
        };
      t.magnificPopup.registerModule("gallery", {
        options: {
          enabled: !1,
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          preload: [0, 2],
          navigateByImgClick: !0,
          arrows: !0,
          tPrev: "Previous (Left arrow key)",
          tNext: "Next (Right arrow key)",
          tCounter: "%curr% of %total%"
        },
        proto: {
          initGallery: function() {
            var i = e.st.gallery,
              o = ".mfp-gallery";
            return (
              (e.direction = !0),
              !(!i || !i.enabled) &&
                ((r += " mfp-gallery"),
                S(h + o, function() {
                  i.navigateByImgClick &&
                    e.wrap.on("click" + o, ".mfp-img", function() {
                      if (e.items.length > 1) return e.next(), !1;
                    }),
                    n.on("keydown" + o, function(t) {
                      37 === t.keyCode
                        ? e.prev()
                        : 39 === t.keyCode && e.next();
                    });
                }),
                S("UpdateStatus" + o, function(t, i) {
                  i.text &&
                    (i.text = R(i.text, e.currItem.index, e.items.length));
                }),
                S(d + o, function(t, n, o, r) {
                  var s = e.items.length;
                  o.counter = s > 1 ? R(i.tCounter, r.index, s) : "";
                }),
                S("BuildControls" + o, function() {
                  if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                    var n = i.arrowMarkup,
                      o = (e.arrowLeft = t(
                        n
                          .replace(/%title%/gi, i.tPrev)
                          .replace(/%dir%/gi, "left")
                      ).addClass(y)),
                      r = (e.arrowRight = t(
                        n
                          .replace(/%title%/gi, i.tNext)
                          .replace(/%dir%/gi, "right")
                      ).addClass(y));
                    o.click(function() {
                      e.prev();
                    }),
                      r.click(function() {
                        e.next();
                      }),
                      e.container.append(o.add(r));
                  }
                }),
                S(p + o, function() {
                  e._preloadTimeout && clearTimeout(e._preloadTimeout),
                    (e._preloadTimeout = setTimeout(function() {
                      e.preloadNearbyImages(), (e._preloadTimeout = null);
                    }, 16));
                }),
                void S(a + o, function() {
                  n.off(o),
                    e.wrap.off("click" + o),
                    (e.arrowRight = e.arrowLeft = null);
                }))
            );
          },
          next: function() {
            (e.direction = !0), (e.index = V(e.index + 1)), e.updateItemHTML();
          },
          prev: function() {
            (e.direction = !1), (e.index = V(e.index - 1)), e.updateItemHTML();
          },
          goTo: function(t) {
            (e.direction = t >= e.index), (e.index = t), e.updateItemHTML();
          },
          preloadNearbyImages: function() {
            var t,
              i = e.st.gallery.preload,
              n = Math.min(i[0], e.items.length),
              o = Math.min(i[1], e.items.length);
            for (t = 1; t <= (e.direction ? o : n); t++)
              e._preloadItem(e.index + t);
            for (t = 1; t <= (e.direction ? n : o); t++)
              e._preloadItem(e.index - t);
          },
          _preloadItem: function(i) {
            if (((i = V(i)), !e.items[i].preloaded)) {
              var n = e.items[i];
              n.parsed || (n = e.parseEl(i)),
                k("LazyLoad", n),
                "image" === n.type &&
                  (n.img = t('<img class="mfp-img" />')
                    .on("load.mfploader", function() {
                      n.hasSize = !0;
                    })
                    .on("error.mfploader", function() {
                      (n.hasSize = !0),
                        (n.loadError = !0),
                        k("LazyLoadError", n);
                    })
                    .attr("src", n.src)),
                (n.preloaded = !0);
            }
          }
        }
      });
      var q = "retina";
      t.magnificPopup.registerModule(q, {
        options: {
          replaceSrc: function(t) {
            return t.src.replace(/\.\w+$/, function(t) {
              return "@2x" + t;
            });
          },
          ratio: 1
        },
        proto: {
          initRetina: function() {
            if (window.devicePixelRatio > 1) {
              var t = e.st.retina,
                i = t.ratio;
              (i = isNaN(i) ? i() : i),
                i > 1 &&
                  (S("ImageHasSize." + q, function(t, e) {
                    e.img.css({
                      "max-width": e.img[0].naturalWidth / i,
                      width: "100%"
                    });
                  }),
                  S("ElementParse." + q, function(e, n) {
                    n.src = t.replaceSrc(n, i);
                  }));
            }
          }
        }
      }),
        T();
    });
  },
  function(t, e) {
    /*!
 Waypoints - 4.0.1
 Copyright © 2011-2016 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
 */
    !(function() {
      "use strict";
      function t(n) {
        if (!n) throw new Error("No options passed to Waypoint constructor");
        if (!n.element)
          throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler)
          throw new Error("No handler option passed to Waypoint constructor");
        (this.key = "waypoint-" + e),
          (this.options = t.Adapter.extend({}, t.defaults, n)),
          (this.element = this.options.element),
          (this.adapter = new t.Adapter(this.element)),
          (this.callback = n.handler),
          (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
          (this.enabled = this.options.enabled),
          (this.triggerPoint = null),
          (this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
          })),
          (this.context = t.Context.findOrCreateByElement(
            this.options.context
          )),
          t.offsetAliases[this.options.offset] &&
            (this.options.offset = t.offsetAliases[this.options.offset]),
          this.group.add(this),
          this.context.add(this),
          (i[this.key] = this),
          (e += 1);
      }
      var e = 0,
        i = {};
      (t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t);
      }),
        (t.prototype.trigger = function(t) {
          this.enabled && this.callback && this.callback.apply(this, t);
        }),
        (t.prototype.destroy = function() {
          this.context.remove(this),
            this.group.remove(this),
            delete i[this.key];
        }),
        (t.prototype.disable = function() {
          return (this.enabled = !1), this;
        }),
        (t.prototype.enable = function() {
          return this.context.refresh(), (this.enabled = !0), this;
        }),
        (t.prototype.next = function() {
          return this.group.next(this);
        }),
        (t.prototype.previous = function() {
          return this.group.previous(this);
        }),
        (t.invokeAll = function(t) {
          var e = [];
          for (var n in i) e.push(i[n]);
          for (var o = 0, r = e.length; o < r; o++) e[o][t]();
        }),
        (t.destroyAll = function() {
          t.invokeAll("destroy");
        }),
        (t.disableAll = function() {
          t.invokeAll("disable");
        }),
        (t.enableAll = function() {
          t.Context.refreshAll();
          for (var e in i) i[e].enabled = !0;
          return this;
        }),
        (t.refreshAll = function() {
          t.Context.refreshAll();
        }),
        (t.viewportHeight = function() {
          return window.innerHeight || document.documentElement.clientHeight;
        }),
        (t.viewportWidth = function() {
          return document.documentElement.clientWidth;
        }),
        (t.adapters = []),
        (t.defaults = {
          context: window,
          continuous: !0,
          enabled: !0,
          group: "default",
          horizontal: !1,
          offset: 0
        }),
        (t.offsetAliases = {
          "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight();
          },
          "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth();
          }
        }),
        (window.Waypoint = t);
    })(),
      (function() {
        "use strict";
        function t(t) {
          window.setTimeout(t, 1e3 / 60);
        }
        function e(t) {
          (this.element = t),
            (this.Adapter = o.Adapter),
            (this.adapter = new this.Adapter(t)),
            (this.key = "waypoint-context-" + i),
            (this.didScroll = !1),
            (this.didResize = !1),
            (this.oldScroll = {
              x: this.adapter.scrollLeft(),
              y: this.adapter.scrollTop()
            }),
            (this.waypoints = { vertical: {}, horizontal: {} }),
            (t.waypointContextKey = this.key),
            (n[t.waypointContextKey] = this),
            (i += 1),
            o.windowContext ||
              ((o.windowContext = !0), (o.windowContext = new e(window))),
            this.createThrottledScrollHandler(),
            this.createThrottledResizeHandler();
        }
        var i = 0,
          n = {},
          o = window.Waypoint,
          r = window.onload;
        (e.prototype.add = function(t) {
          var e = t.options.horizontal ? "horizontal" : "vertical";
          (this.waypoints[e][t.key] = t), this.refresh();
        }),
          (e.prototype.checkEmpty = function() {
            var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
              e = this.Adapter.isEmptyObject(this.waypoints.vertical),
              i = this.element == this.element.window;
            t &&
              e &&
              !i &&
              (this.adapter.off(".waypoints"), delete n[this.key]);
          }),
          (e.prototype.createThrottledResizeHandler = function() {
            function t() {
              e.handleResize(), (e.didResize = !1);
            }
            var e = this;
            this.adapter.on("resize.waypoints", function() {
              e.didResize || ((e.didResize = !0), o.requestAnimationFrame(t));
            });
          }),
          (e.prototype.createThrottledScrollHandler = function() {
            function t() {
              e.handleScroll(), (e.didScroll = !1);
            }
            var e = this;
            this.adapter.on("scroll.waypoints", function() {
              (e.didScroll && !o.isTouch) ||
                ((e.didScroll = !0), o.requestAnimationFrame(t));
            });
          }),
          (e.prototype.handleResize = function() {
            o.Context.refreshAll();
          }),
          (e.prototype.handleScroll = function() {
            var t = {},
              e = {
                horizontal: {
                  newScroll: this.adapter.scrollLeft(),
                  oldScroll: this.oldScroll.x,
                  forward: "right",
                  backward: "left"
                },
                vertical: {
                  newScroll: this.adapter.scrollTop(),
                  oldScroll: this.oldScroll.y,
                  forward: "down",
                  backward: "up"
                }
              };
            for (var i in e) {
              var n = e[i],
                o = n.newScroll > n.oldScroll,
                r = o ? n.forward : n.backward;
              for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                  var l = n.oldScroll < a.triggerPoint,
                    c = n.newScroll >= a.triggerPoint,
                    u = l && c,
                    d = !l && !c;
                  (u || d) && (a.queueTrigger(r), (t[a.group.id] = a.group));
                }
              }
            }
            for (var h in t) t[h].flushTriggers();
            this.oldScroll = {
              x: e.horizontal.newScroll,
              y: e.vertical.newScroll
            };
          }),
          (e.prototype.innerHeight = function() {
            return this.element == this.element.window
              ? o.viewportHeight()
              : this.adapter.innerHeight();
          }),
          (e.prototype.remove = function(t) {
            delete this.waypoints[t.axis][t.key], this.checkEmpty();
          }),
          (e.prototype.innerWidth = function() {
            return this.element == this.element.window
              ? o.viewportWidth()
              : this.adapter.innerWidth();
          }),
          (e.prototype.destroy = function() {
            var t = [];
            for (var e in this.waypoints)
              for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
            for (var n = 0, o = t.length; n < o; n++) t[n].destroy();
          }),
          (e.prototype.refresh = function() {
            var t,
              e = this.element == this.element.window,
              i = e ? void 0 : this.adapter.offset(),
              n = {};
            this.handleScroll(),
              (t = {
                horizontal: {
                  contextOffset: e ? 0 : i.left,
                  contextScroll: e ? 0 : this.oldScroll.x,
                  contextDimension: this.innerWidth(),
                  oldScroll: this.oldScroll.x,
                  forward: "right",
                  backward: "left",
                  offsetProp: "left"
                },
                vertical: {
                  contextOffset: e ? 0 : i.top,
                  contextScroll: e ? 0 : this.oldScroll.y,
                  contextDimension: this.innerHeight(),
                  oldScroll: this.oldScroll.y,
                  forward: "down",
                  backward: "up",
                  offsetProp: "top"
                }
              });
            for (var r in t) {
              var s = t[r];
              for (var a in this.waypoints[r]) {
                var l,
                  c,
                  u,
                  d,
                  h,
                  p = this.waypoints[r][a],
                  f = p.options.offset,
                  m = p.triggerPoint,
                  g = 0,
                  v = null == m;
                p.element !== p.element.window &&
                  (g = p.adapter.offset()[s.offsetProp]),
                  "function" == typeof f
                    ? (f = f.apply(p))
                    : "string" == typeof f &&
                      ((f = parseFloat(f)),
                      p.options.offset.indexOf("%") > -1 &&
                        (f = Math.ceil(s.contextDimension * f / 100))),
                  (l = s.contextScroll - s.contextOffset),
                  (p.triggerPoint = Math.floor(g + l - f)),
                  (c = m < s.oldScroll),
                  (u = p.triggerPoint >= s.oldScroll),
                  (d = c && u),
                  (h = !c && !u),
                  !v && d
                    ? (p.queueTrigger(s.backward), (n[p.group.id] = p.group))
                    : !v && h
                      ? (p.queueTrigger(s.forward), (n[p.group.id] = p.group))
                      : v &&
                        s.oldScroll >= p.triggerPoint &&
                        (p.queueTrigger(s.forward), (n[p.group.id] = p.group));
              }
            }
            return (
              o.requestAnimationFrame(function() {
                for (var t in n) n[t].flushTriggers();
              }),
              this
            );
          }),
          (e.findOrCreateByElement = function(t) {
            return e.findByElement(t) || new e(t);
          }),
          (e.refreshAll = function() {
            for (var t in n) n[t].refresh();
          }),
          (e.findByElement = function(t) {
            return n[t.waypointContextKey];
          }),
          (window.onload = function() {
            r && r(), e.refreshAll();
          }),
          (o.requestAnimationFrame = function(e) {
            var i =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              t;
            i.call(window, e);
          }),
          (o.Context = e);
      })(),
      (function() {
        "use strict";
        function t(t, e) {
          return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
          return e.triggerPoint - t.triggerPoint;
        }
        function i(t) {
          (this.name = t.name),
            (this.axis = t.axis),
            (this.id = this.name + "-" + this.axis),
            (this.waypoints = []),
            this.clearTriggerQueues(),
            (n[this.axis][this.name] = this);
        }
        var n = { vertical: {}, horizontal: {} },
          o = window.Waypoint;
        (i.prototype.add = function(t) {
          this.waypoints.push(t);
        }),
          (i.prototype.clearTriggerQueues = function() {
            this.triggerQueues = { up: [], down: [], left: [], right: [] };
          }),
          (i.prototype.flushTriggers = function() {
            for (var i in this.triggerQueues) {
              var n = this.triggerQueues[i],
                o = "up" === i || "left" === i;
              n.sort(o ? e : t);
              for (var r = 0, s = n.length; r < s; r += 1) {
                var a = n[r];
                (a.options.continuous || r === n.length - 1) && a.trigger([i]);
              }
            }
            this.clearTriggerQueues();
          }),
          (i.prototype.next = function(e) {
            this.waypoints.sort(t);
            var i = o.Adapter.inArray(e, this.waypoints),
              n = i === this.waypoints.length - 1;
            return n ? null : this.waypoints[i + 1];
          }),
          (i.prototype.previous = function(e) {
            this.waypoints.sort(t);
            var i = o.Adapter.inArray(e, this.waypoints);
            return i ? this.waypoints[i - 1] : null;
          }),
          (i.prototype.queueTrigger = function(t, e) {
            this.triggerQueues[e].push(t);
          }),
          (i.prototype.remove = function(t) {
            var e = o.Adapter.inArray(t, this.waypoints);
            e > -1 && this.waypoints.splice(e, 1);
          }),
          (i.prototype.first = function() {
            return this.waypoints[0];
          }),
          (i.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1];
          }),
          (i.findOrCreate = function(t) {
            return n[t.axis][t.name] || new i(t);
          }),
          (o.Group = i);
      })(),
      (function() {
        "use strict";
        function t(t) {
          this.$element = e(t);
        }
        var e = window.jQuery,
          i = window.Waypoint;
        e.each(
          [
            "innerHeight",
            "innerWidth",
            "off",
            "offset",
            "on",
            "outerHeight",
            "outerWidth",
            "scrollLeft",
            "scrollTop"
          ],
          function(e, i) {
            t.prototype[i] = function() {
              var t = Array.prototype.slice.call(arguments);
              return this.$element[i].apply(this.$element, t);
            };
          }
        ),
          e.each(["extend", "inArray", "isEmptyObject"], function(i, n) {
            t[n] = e[n];
          }),
          i.adapters.push({ name: "jquery", Adapter: t }),
          (i.Adapter = t);
      })(),
      (function() {
        "use strict";
        function t(t) {
          return function() {
            var i = [],
              n = arguments[0];
            return (
              t.isFunction(arguments[0]) &&
                ((n = t.extend({}, arguments[1])), (n.handler = arguments[0])),
              this.each(function() {
                var o = t.extend({}, n, { element: this });
                "string" == typeof o.context &&
                  (o.context = t(this).closest(o.context)[0]),
                  i.push(new e(o));
              }),
              i
            );
          };
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
          window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
      })();
  },
  function(t, e) {
    /*! npm.im/object-fit-images 3.2.4 */
    "use strict";
    function i(t, e) {
      return (
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
        t +
        "' height='" +
        e +
        "'%3E%3C/svg%3E"
      );
    }
    function n(t) {
      if (t.srcset && !v && window.picturefill) {
        var e = window.picturefill._;
        (t[e.ns] && t[e.ns].evaled) || e.fillImg(t, { reselect: !0 }),
          t[e.ns].curSrc ||
            ((t[e.ns].supported = !1), e.fillImg(t, { reselect: !0 })),
          (t.currentSrc = t[e.ns].curSrc || t.src);
      }
    }
    function o(t) {
      for (
        var e, i = getComputedStyle(t).fontFamily, n = {};
        null !== (e = h.exec(i));

      )
        n[e[1]] = e[2];
      return n;
    }
    function r(t, e, n) {
      var o = i(e || 1, n || 0);
      y.call(t, "src") !== o && b.call(t, "src", o);
    }
    function s(t, e) {
      t.naturalWidth ? e(t) : setTimeout(s, 100, t, e);
    }
    function a(t) {
      var e = o(t),
        i = t[d];
      if (((e["object-fit"] = e["object-fit"] || "fill"), !i.img)) {
        if ("fill" === e["object-fit"]) return;
        if (!i.skipTest && f && !e["object-position"]) return;
      }
      if (!i.img) {
        (i.img = new Image(t.width, t.height)),
          (i.img.srcset = y.call(t, "data-ofi-srcset") || t.srcset),
          (i.img.src = y.call(t, "data-ofi-src") || t.src),
          b.call(t, "data-ofi-src", t.src),
          t.srcset && b.call(t, "data-ofi-srcset", t.srcset),
          r(t, t.naturalWidth || t.width, t.naturalHeight || t.height),
          t.srcset && (t.srcset = "");
        try {
          l(t);
        } catch (t) {
          window.console && console.warn("https://bit.ly/ofi-old-browser");
        }
      }
      n(i.img),
        (t.style.backgroundImage =
          'url("' +
          (i.img.currentSrc || i.img.src).replace(/"/g, '\\"') +
          '")'),
        (t.style.backgroundPosition = e["object-position"] || "center"),
        (t.style.backgroundRepeat = "no-repeat"),
        (t.style.backgroundOrigin = "content-box"),
        /scale-down/.test(e["object-fit"])
          ? s(i.img, function() {
              i.img.naturalWidth > t.width || i.img.naturalHeight > t.height
                ? (t.style.backgroundSize = "contain")
                : (t.style.backgroundSize = "auto");
            })
          : (t.style.backgroundSize = e["object-fit"]
              .replace("none", "auto")
              .replace("fill", "100% 100%")),
        s(i.img, function(e) {
          r(t, e.naturalWidth, e.naturalHeight);
        });
    }
    function l(t) {
      var e = {
        get: function(e) {
          return t[d].img[e ? e : "src"];
        },
        set: function(e, i) {
          return (
            (t[d].img[i ? i : "src"] = e),
            b.call(t, "data-ofi-" + i, e),
            a(t),
            e
          );
        }
      };
      Object.defineProperty(t, "src", e),
        Object.defineProperty(t, "currentSrc", {
          get: function() {
            return e.get("currentSrc");
          }
        }),
        Object.defineProperty(t, "srcset", {
          get: function() {
            return e.get("srcset");
          },
          set: function(t) {
            return e.set(t, "srcset");
          }
        });
    }
    function c() {
      function t(t, e) {
        return t[d] && t[d].img && ("src" === e || "srcset" === e)
          ? t[d].img
          : t;
      }
      m ||
        ((HTMLImageElement.prototype.getAttribute = function(e) {
          return y.call(t(this, e), e);
        }),
        (HTMLImageElement.prototype.setAttribute = function(e, i) {
          return b.call(t(this, e), e, String(i));
        }));
    }
    function u(t, e) {
      var i = !w && !t;
      if (((e = e || {}), (t = t || "img"), (m && !e.skipTest) || !g))
        return !1;
      "img" === t
        ? (t = document.getElementsByTagName("img"))
        : "string" == typeof t
          ? (t = document.querySelectorAll(t))
          : "length" in t || (t = [t]);
      for (var n = 0; n < t.length; n++)
        (t[n][d] = t[n][d] || { skipTest: e.skipTest }), a(t[n]);
      i &&
        (document.body.addEventListener(
          "load",
          function(t) {
            "IMG" === t.target.tagName && u(t.target, { skipTest: e.skipTest });
          },
          !0
        ),
        (w = !0),
        (t = "img")),
        e.watchMQ &&
          window.addEventListener(
            "resize",
            u.bind(null, t, { skipTest: e.skipTest })
          );
    }
    var d = "bfred-it:object-fit-images",
      h = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
      p =
        "undefined" == typeof Image
          ? { style: { "object-position": 1 } }
          : new Image(),
      f = "object-fit" in p.style,
      m = "object-position" in p.style,
      g = "background-size" in p.style,
      v = "string" == typeof p.currentSrc,
      y = p.getAttribute,
      b = p.setAttribute,
      w = !1;
    (u.supportsObjectFit = f),
      (u.supportsObjectPosition = m),
      c(),
      (t.exports = u);
  },
  function(t, e) {
    !(function(t, e, i) {
      function n(e, i) {
        this.bodyOverflowX,
          (this.callbacks = { hide: [], show: [] }),
          (this.checkInterval = null),
          this.Content,
          (this.$el = t(e)),
          this.$elProxy,
          this.elProxyPosition,
          (this.enabled = !0),
          (this.options = t.extend({}, l, i)),
          (this.mouseIsOverProxy = !1),
          (this.namespace = "tooltipster-" + Math.round(1e5 * Math.random())),
          (this.Status = "hidden"),
          (this.timerHide = null),
          (this.timerShow = null),
          this.$tooltip,
          (this.options.iconTheme = this.options.iconTheme.replace(".", "")),
          (this.options.theme = this.options.theme.replace(".", "")),
          this._init();
      }
      function o(e, i) {
        var n = !0;
        return (
          t.each(e, function(t, o) {
            if ("undefined" == typeof i[t] || e[t] !== i[t])
              return (n = !1), !1;
          }),
          n
        );
      }
      function r() {
        return !u && c;
      }
      function s() {
        var t = i.body || i.documentElement,
          e = t.style,
          n = "transition";
        if ("string" == typeof e[n]) return !0;
        (v = ["Moz", "Webkit", "Khtml", "O", "ms"]),
          (n = n.charAt(0).toUpperCase() + n.substr(1));
        for (var o = 0; o < v.length; o++)
          if ("string" == typeof e[v[o] + n]) return !0;
        return !1;
      }
      var a = "tooltipster",
        l = {
          animation: "fade",
          arrow: !0,
          arrowColor: "",
          autoClose: !0,
          content: null,
          contentAsHTML: !1,
          contentCloning: !0,
          debug: !0,
          delay: 200,
          minWidth: 0,
          maxWidth: null,
          functionInit: function(t, e) {},
          functionBefore: function(t, e) {
            e();
          },
          functionReady: function(t, e) {},
          functionAfter: function(t) {},
          hideOnClick: !1,
          icon: "(?)",
          iconCloning: !0,
          iconDesktop: !1,
          iconTouch: !1,
          iconTheme: "tooltipster-icon",
          interactive: !1,
          interactiveTolerance: 350,
          multiple: !1,
          offsetX: 0,
          offsetY: 0,
          onlyOne: !1,
          position: "top",
          positionTracker: !1,
          positionTrackerCallback: function(t) {
            "hover" == this.option("trigger") &&
              this.option("autoClose") &&
              this.hide();
          },
          restoration: "current",
          speed: 350,
          timer: 0,
          theme: "tooltipster-default",
          touchDevices: !0,
          trigger: "hover",
          updateAnimation: !0
        };
      (n.prototype = {
        _init: function() {
          var e = this;
          if (i.querySelector) {
            var n = null;
            void 0 === e.$el.data("tooltipster-initialTitle") &&
              ((n = e.$el.attr("title")),
              void 0 === n && (n = null),
              e.$el.data("tooltipster-initialTitle", n)),
              null !== e.options.content
                ? e._content_set(e.options.content)
                : e._content_set(n);
            var o = e.options.functionInit.call(e.$el, e.$el, e.Content);
            "undefined" != typeof o && e._content_set(o),
              e.$el.removeAttr("title").addClass("tooltipstered"),
              (!c && e.options.iconDesktop) || (c && e.options.iconTouch)
                ? ("string" == typeof e.options.icon
                    ? ((e.$elProxy = t(
                        '<span class="' + e.options.iconTheme + '"></span>'
                      )),
                      e.$elProxy.text(e.options.icon))
                    : e.options.iconCloning
                      ? (e.$elProxy = e.options.icon.clone(!0))
                      : (e.$elProxy = e.options.icon),
                  e.$elProxy.insertAfter(e.$el))
                : (e.$elProxy = e.$el),
              "hover" == e.options.trigger
                ? (e.$elProxy
                    .on("mouseenter." + e.namespace, function() {
                      (r() && !e.options.touchDevices) ||
                        ((e.mouseIsOverProxy = !0), e._show());
                    })
                    .on("mouseleave." + e.namespace, function() {
                      (r() && !e.options.touchDevices) ||
                        (e.mouseIsOverProxy = !1);
                    }),
                  c &&
                    e.options.touchDevices &&
                    e.$elProxy.on("touchstart." + e.namespace, function() {
                      e._showNow();
                    }))
                : "click" == e.options.trigger &&
                  e.$elProxy.on("click." + e.namespace, function() {
                    (r() && !e.options.touchDevices) || e._show();
                  });
          }
        },
        _show: function() {
          var t = this;
          "shown" != t.Status &&
            "appearing" != t.Status &&
            (t.options.delay
              ? (t.timerShow = setTimeout(function() {
                  ("click" == t.options.trigger ||
                    ("hover" == t.options.trigger && t.mouseIsOverProxy)) &&
                    t._showNow();
                }, t.options.delay))
              : t._showNow());
        },
        _showNow: function(i) {
          var n = this;
          n.options.functionBefore.call(n.$el, n.$el, function() {
            if (n.enabled && null !== n.Content) {
              i && n.callbacks.show.push(i),
                (n.callbacks.hide = []),
                clearTimeout(n.timerShow),
                (n.timerShow = null),
                clearTimeout(n.timerHide),
                (n.timerHide = null),
                n.options.onlyOne &&
                  t(".tooltipstered")
                    .not(n.$el)
                    .each(function(e, i) {
                      var n = t(i),
                        o = n.data("tooltipster-ns");
                      t.each(o, function(t, e) {
                        var i = n.data(e),
                          o = i.status(),
                          r = i.option("autoClose");
                        "hidden" !== o && "disappearing" !== o && r && i.hide();
                      });
                    });
              var o = function() {
                (n.Status = "shown"),
                  t.each(n.callbacks.show, function(t, e) {
                    e.call(n.$el);
                  }),
                  (n.callbacks.show = []);
              };
              if ("hidden" !== n.Status) {
                var r = 0;
                "disappearing" === n.Status
                  ? ((n.Status = "appearing"),
                    s()
                      ? (n.$tooltip
                          .clearQueue()
                          .removeClass("tooltipster-dying")
                          .addClass(
                            "tooltipster-" + n.options.animation + "-show"
                          ),
                        n.options.speed > 0 &&
                          n.$tooltip.delay(n.options.speed),
                        n.$tooltip.queue(o))
                      : n.$tooltip.stop().fadeIn(o))
                  : "shown" === n.Status && o();
              } else {
                n.Status = "appearing";
                var r = n.options.speed;
                (n.bodyOverflowX = t("body").css("overflow-x")),
                  t("body").css("overflow-x", "hidden");
                var a = "tooltipster-" + n.options.animation,
                  l =
                    "-webkit-transition-duration: " +
                    n.options.speed +
                    "ms; -webkit-animation-duration: " +
                    n.options.speed +
                    "ms; -moz-transition-duration: " +
                    n.options.speed +
                    "ms; -moz-animation-duration: " +
                    n.options.speed +
                    "ms; -o-transition-duration: " +
                    n.options.speed +
                    "ms; -o-animation-duration: " +
                    n.options.speed +
                    "ms; -ms-transition-duration: " +
                    n.options.speed +
                    "ms; -ms-animation-duration: " +
                    n.options.speed +
                    "ms; transition-duration: " +
                    n.options.speed +
                    "ms; animation-duration: " +
                    n.options.speed +
                    "ms;",
                  u = n.options.minWidth
                    ? "min-width:" + Math.round(n.options.minWidth) + "px;"
                    : "",
                  d = n.options.maxWidth
                    ? "max-width:" + Math.round(n.options.maxWidth) + "px;"
                    : "",
                  h = n.options.interactive ? "pointer-events: auto;" : "";
                if (
                  ((n.$tooltip = t(
                    '<div class="tooltipster-base ' +
                      n.options.theme +
                      '" style="' +
                      u +
                      " " +
                      d +
                      " " +
                      h +
                      " " +
                      l +
                      '"><div class="tooltipster-content"></div></div>'
                  )),
                  s() && n.$tooltip.addClass(a),
                  n._content_insert(),
                  n.$tooltip.appendTo("body"),
                  n.reposition(),
                  n.options.functionReady.call(n.$el, n.$el, n.$tooltip),
                  s()
                    ? (n.$tooltip.addClass(a + "-show"),
                      n.options.speed > 0 && n.$tooltip.delay(n.options.speed),
                      n.$tooltip.queue(o))
                    : n.$tooltip
                        .css("display", "none")
                        .fadeIn(n.options.speed, o),
                  n._interval_set(),
                  t(e).on(
                    "scroll." + n.namespace + " resize." + n.namespace,
                    function() {
                      n.reposition();
                    }
                  ),
                  n.options.autoClose)
                )
                  if (
                    (t("body").off("." + n.namespace),
                    "hover" == n.options.trigger)
                  ) {
                    if (
                      (c &&
                        setTimeout(function() {
                          t("body").on("touchstart." + n.namespace, function() {
                            n.hide();
                          });
                        }, 0),
                      n.options.interactive)
                    ) {
                      c &&
                        n.$tooltip.on("touchstart." + n.namespace, function(t) {
                          t.stopPropagation();
                        });
                      var p = null;
                      n.$elProxy
                        .add(n.$tooltip)
                        .on(
                          "mouseleave." + n.namespace + "-autoClose",
                          function() {
                            clearTimeout(p),
                              (p = setTimeout(function() {
                                n.hide();
                              }, n.options.interactiveTolerance));
                          }
                        )
                        .on(
                          "mouseenter." + n.namespace + "-autoClose",
                          function() {
                            clearTimeout(p);
                          }
                        );
                    } else
                      n.$elProxy.on(
                        "mouseleave." + n.namespace + "-autoClose",
                        function() {
                          n.hide();
                        }
                      );
                    n.options.hideOnClick &&
                      n.$elProxy.on(
                        "click." + n.namespace + "-autoClose",
                        function() {
                          n.hide();
                        }
                      );
                  } else
                    "click" == n.options.trigger &&
                      (setTimeout(function() {
                        t("body").on(
                          "click." + n.namespace + " touchstart." + n.namespace,
                          function() {
                            n.hide();
                          }
                        );
                      }, 0),
                      n.options.interactive &&
                        n.$tooltip.on(
                          "click." + n.namespace + " touchstart." + n.namespace,
                          function(t) {
                            t.stopPropagation();
                          }
                        ));
              }
              n.options.timer > 0 &&
                (n.timerHide = setTimeout(function() {
                  (n.timerHide = null), n.hide();
                }, n.options.timer + r));
            }
          });
        },
        _interval_set: function() {
          var e = this;
          e.checkInterval = setInterval(function() {
            if (
              0 === t("body").find(e.$el).length ||
              0 === t("body").find(e.$elProxy).length ||
              "hidden" == e.Status ||
              0 === t("body").find(e.$tooltip).length
            )
              ("shown" != e.Status && "appearing" != e.Status) || e.hide(),
                e._interval_cancel();
            else if (e.options.positionTracker) {
              var i = e._repositionInfo(e.$elProxy),
                n = !1;
              o(i.dimension, e.elProxyPosition.dimension) &&
                ("fixed" === e.$elProxy.css("position")
                  ? o(i.position, e.elProxyPosition.position) && (n = !0)
                  : o(i.offset, e.elProxyPosition.offset) && (n = !0)),
                n ||
                  (e.reposition(),
                  e.options.positionTrackerCallback.call(e, e.$el));
            }
          }, 200);
        },
        _interval_cancel: function() {
          clearInterval(this.checkInterval), (this.checkInterval = null);
        },
        _content_set: function(t) {
          "object" == typeof t &&
            null !== t &&
            this.options.contentCloning &&
            (t = t.clone(!0)),
            (this.Content = t);
        },
        _content_insert: function() {
          var t = this,
            e = this.$tooltip.find(".tooltipster-content");
          "string" != typeof t.Content || t.options.contentAsHTML
            ? e.empty().append(t.Content)
            : e.text(t.Content);
        },
        _update: function(t) {
          var e = this;
          e._content_set(t),
            null !== e.Content
              ? "hidden" !== e.Status &&
                (e._content_insert(),
                e.reposition(),
                e.options.updateAnimation &&
                  (s()
                    ? (e.$tooltip
                        .css({
                          width: "",
                          "-webkit-transition":
                            "all " +
                            e.options.speed +
                            "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                          "-moz-transition":
                            "all " +
                            e.options.speed +
                            "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                          "-o-transition":
                            "all " +
                            e.options.speed +
                            "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                          "-ms-transition":
                            "all " +
                            e.options.speed +
                            "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                          transition:
                            "all " +
                            e.options.speed +
                            "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                        })
                        .addClass("tooltipster-content-changing"),
                      setTimeout(function() {
                        "hidden" != e.Status &&
                          (e.$tooltip.removeClass(
                            "tooltipster-content-changing"
                          ),
                          setTimeout(function() {
                            "hidden" !== e.Status &&
                              e.$tooltip.css({
                                "-webkit-transition": e.options.speed + "ms",
                                "-moz-transition": e.options.speed + "ms",
                                "-o-transition": e.options.speed + "ms",
                                "-ms-transition": e.options.speed + "ms",
                                transition: e.options.speed + "ms"
                              });
                          }, e.options.speed));
                      }, e.options.speed))
                    : e.$tooltip.fadeTo(e.options.speed, 0.5, function() {
                        "hidden" != e.Status &&
                          e.$tooltip.fadeTo(e.options.speed, 1);
                      })))
              : e.hide();
        },
        _repositionInfo: function(t) {
          return {
            dimension: { height: t.outerHeight(!1), width: t.outerWidth(!1) },
            offset: t.offset(),
            position: {
              left: parseInt(t.css("left")),
              top: parseInt(t.css("top"))
            }
          };
        },
        hide: function(i) {
          var n = this;
          i && n.callbacks.hide.push(i),
            (n.callbacks.show = []),
            clearTimeout(n.timerShow),
            (n.timerShow = null),
            clearTimeout(n.timerHide),
            (n.timerHide = null);
          var o = function() {
            t.each(n.callbacks.hide, function(t, e) {
              e.call(n.$el);
            }),
              (n.callbacks.hide = []);
          };
          if ("shown" == n.Status || "appearing" == n.Status) {
            n.Status = "disappearing";
            var r = function() {
              (n.Status = "hidden"),
                "object" == typeof n.Content &&
                  null !== n.Content &&
                  n.Content.detach(),
                n.$tooltip.remove(),
                (n.$tooltip = null),
                t(e).off("." + n.namespace),
                t("body")
                  .off("." + n.namespace)
                  .css("overflow-x", n.bodyOverflowX),
                t("body").off("." + n.namespace),
                n.$elProxy.off("." + n.namespace + "-autoClose"),
                n.options.functionAfter.call(n.$el, n.$el),
                o();
            };
            s()
              ? (n.$tooltip
                  .clearQueue()
                  .removeClass("tooltipster-" + n.options.animation + "-show")
                  .addClass("tooltipster-dying"),
                n.options.speed > 0 && n.$tooltip.delay(n.options.speed),
                n.$tooltip.queue(r))
              : n.$tooltip.stop().fadeOut(n.options.speed, r);
          } else "hidden" == n.Status && o();
          return n;
        },
        show: function(t) {
          return this._showNow(t), this;
        },
        update: function(t) {
          return this.content(t);
        },
        content: function(t) {
          return "undefined" == typeof t
            ? this.Content
            : (this._update(t), this);
        },
        reposition: function() {
          function i() {
            var i = t(e).scrollLeft();
            _ - i < 0 && ((r = _ - i), (_ = i)),
              _ + l - i > s && ((r = _ - (s + i - l)), (_ = s + i - l));
          }
          function n(i, n) {
            a.offset.top - t(e).scrollTop() - c - A - 12 < 0 &&
              n.indexOf("top") > -1 &&
              (D = i),
              a.offset.top + a.dimension.height + c + 12 + A >
                t(e).scrollTop() + t(e).height() &&
                n.indexOf("bottom") > -1 &&
                ((D = i), (I = a.offset.top - c - A - 12));
          }
          var o = this;
          if (0 !== t("body").find(o.$tooltip).length) {
            o.$tooltip.css("width", ""),
              (o.elProxyPosition = o._repositionInfo(o.$elProxy));
            var r = null,
              s = t(e).width(),
              a = o.elProxyPosition,
              l = o.$tooltip.outerWidth(!1),
              c = (o.$tooltip.innerWidth() + 1, o.$tooltip.outerHeight(!1));
            if (o.$elProxy.is("area")) {
              var u = o.$elProxy.attr("shape"),
                d = o.$elProxy.parent().attr("name"),
                h = t('img[usemap="#' + d + '"]'),
                p = h.offset().left,
                f = h.offset().top,
                m =
                  void 0 !== o.$elProxy.attr("coords")
                    ? o.$elProxy.attr("coords").split(",")
                    : void 0;
              if ("circle" == u) {
                var g = parseInt(m[0]),
                  v = parseInt(m[1]),
                  y = parseInt(m[2]);
                (a.dimension.height = 2 * y),
                  (a.dimension.width = 2 * y),
                  (a.offset.top = f + v - y),
                  (a.offset.left = p + g - y);
              } else if ("rect" == u) {
                var g = parseInt(m[0]),
                  v = parseInt(m[1]),
                  b = parseInt(m[2]),
                  w = parseInt(m[3]);
                (a.dimension.height = w - v),
                  (a.dimension.width = b - g),
                  (a.offset.top = f + v),
                  (a.offset.left = p + g);
              } else if ("poly" == u) {
                for (
                  var x = 0, S = 0, C = 0, k = 0, E = "even", T = 0;
                  T < m.length;
                  T++
                ) {
                  var P = parseInt(m[T]);
                  "even" == E
                    ? (P > C && ((C = P), 0 === T && (x = C)),
                      P < x && (x = P),
                      (E = "odd"))
                    : (P > k && ((k = P), 1 == T && (S = k)),
                      P < S && (S = P),
                      (E = "even"));
                }
                (a.dimension.height = k - S),
                  (a.dimension.width = C - x),
                  (a.offset.top = f + S),
                  (a.offset.left = p + x);
              } else
                (a.dimension.height = h.outerHeight(!1)),
                  (a.dimension.width = h.outerWidth(!1)),
                  (a.offset.top = f),
                  (a.offset.left = p);
            }
            var _ = 0,
              j = 0,
              I = 0,
              A = parseInt(o.options.offsetY),
              O = parseInt(o.options.offsetX),
              D = o.options.position;
            if ("top" == D) {
              var L = a.offset.left + l - (a.offset.left + a.dimension.width);
              (_ = a.offset.left + O - L / 2),
                (I = a.offset.top - c - A - 12),
                i(),
                n("bottom", "top");
            }
            if (
              ("top-left" == D &&
                ((_ = a.offset.left + O),
                (I = a.offset.top - c - A - 12),
                i(),
                n("bottom-left", "top-left")),
              "top-right" == D &&
                ((_ = a.offset.left + a.dimension.width + O - l),
                (I = a.offset.top - c - A - 12),
                i(),
                n("bottom-right", "top-right")),
              "bottom" == D)
            ) {
              var L = a.offset.left + l - (a.offset.left + a.dimension.width);
              (_ = a.offset.left - L / 2 + O),
                (I = a.offset.top + a.dimension.height + A + 12),
                i(),
                n("top", "bottom");
            }
            if (
              ("bottom-left" == D &&
                ((_ = a.offset.left + O),
                (I = a.offset.top + a.dimension.height + A + 12),
                i(),
                n("top-left", "bottom-left")),
              "bottom-right" == D &&
                ((_ = a.offset.left + a.dimension.width + O - l),
                (I = a.offset.top + a.dimension.height + A + 12),
                i(),
                n("top-right", "bottom-right")),
              "left" == D)
            ) {
              (_ = a.offset.left - O - l - 12),
                (j = a.offset.left + O + a.dimension.width + 12);
              var M = a.offset.top + c - (a.offset.top + a.dimension.height);
              if (((I = a.offset.top - M / 2 - A), _ < 0 && j + l > s)) {
                var z = 2 * parseFloat(o.$tooltip.css("border-width")),
                  Q = l + _ - z;
                o.$tooltip.css("width", Q + "px"),
                  (c = o.$tooltip.outerHeight(!1)),
                  (_ = a.offset.left - O - Q - 12 - z),
                  (M = a.offset.top + c - (a.offset.top + a.dimension.height)),
                  (I = a.offset.top - M / 2 - A);
              } else
                _ < 0 &&
                  ((_ = a.offset.left + O + a.dimension.width + 12),
                  (r = "left"));
            }
            if ("right" == D) {
              (_ = a.offset.left + O + a.dimension.width + 12),
                (j = a.offset.left - O - l - 12);
              var M = a.offset.top + c - (a.offset.top + a.dimension.height);
              if (((I = a.offset.top - M / 2 - A), _ + l > s && j < 0)) {
                var z = 2 * parseFloat(o.$tooltip.css("border-width")),
                  Q = s - _ - z;
                o.$tooltip.css("width", Q + "px"),
                  (c = o.$tooltip.outerHeight(!1)),
                  (M = a.offset.top + c - (a.offset.top + a.dimension.height)),
                  (I = a.offset.top - M / 2 - A);
              } else
                _ + l > s && ((_ = a.offset.left - O - l - 12), (r = "right"));
            }
            if (o.options.arrow) {
              var F = "tooltipster-arrow-" + D;
              if (o.options.arrowColor.length < 1)
                var W = o.$tooltip.css("background-color");
              else var W = o.options.arrowColor;
              if (
                (r
                  ? "left" == r
                    ? ((F = "tooltipster-arrow-right"), (r = ""))
                    : "right" == r
                      ? ((F = "tooltipster-arrow-left"), (r = ""))
                      : (r = "left:" + Math.round(r) + "px;")
                  : (r = ""),
                "top" == D || "top-left" == D || "top-right" == D)
              )
                var N = parseFloat(o.$tooltip.css("border-bottom-width")),
                  B = o.$tooltip.css("border-bottom-color");
              else if (
                "bottom" == D ||
                "bottom-left" == D ||
                "bottom-right" == D
              )
                var N = parseFloat(o.$tooltip.css("border-top-width")),
                  B = o.$tooltip.css("border-top-color");
              else if ("left" == D)
                var N = parseFloat(o.$tooltip.css("border-right-width")),
                  B = o.$tooltip.css("border-right-color");
              else if ("right" == D)
                var N = parseFloat(o.$tooltip.css("border-left-width")),
                  B = o.$tooltip.css("border-left-color");
              else
                var N = parseFloat(o.$tooltip.css("border-bottom-width")),
                  B = o.$tooltip.css("border-bottom-color");
              N > 1 && N++;
              var H = "";
              if (0 !== N) {
                var $ = "",
                  V = "border-color: " + B + ";";
                F.indexOf("bottom") !== -1
                  ? ($ = "margin-top: -" + Math.round(N) + "px;")
                  : F.indexOf("top") !== -1
                    ? ($ = "margin-bottom: -" + Math.round(N) + "px;")
                    : F.indexOf("left") !== -1
                      ? ($ = "margin-right: -" + Math.round(N) + "px;")
                      : F.indexOf("right") !== -1 &&
                        ($ = "margin-left: -" + Math.round(N) + "px;"),
                  (H =
                    '<span class="tooltipster-arrow-border" style="' +
                    $ +
                    " " +
                    V +
                    ';"></span>');
              }
              o.$tooltip.find(".tooltipster-arrow").remove();
              var R =
                '<div class="' +
                F +
                ' tooltipster-arrow" style="' +
                r +
                '">' +
                H +
                '<span style="border-color:' +
                W +
                ';"></span></div>';
              o.$tooltip.append(R);
            }
            o.$tooltip.css({
              top: Math.round(I) + "px",
              left: Math.round(_) + "px"
            });
          }
          return o;
        },
        enable: function() {
          return (this.enabled = !0), this;
        },
        disable: function() {
          return this.hide(), (this.enabled = !1), this;
        },
        destroy: function() {
          var e = this;
          e.hide(),
            e.$el[0] !== e.$elProxy[0] && e.$elProxy.remove(),
            e.$el.removeData(e.namespace).off("." + e.namespace);
          var i = e.$el.data("tooltipster-ns");
          if (1 === i.length) {
            var n = null;
            "previous" === e.options.restoration
              ? (n = e.$el.data("tooltipster-initialTitle"))
              : "current" === e.options.restoration &&
                (n =
                  "string" == typeof e.Content
                    ? e.Content
                    : t("<div></div>")
                        .append(e.Content)
                        .html()),
              n && e.$el.attr("title", n),
              e.$el
                .removeClass("tooltipstered")
                .removeData("tooltipster-ns")
                .removeData("tooltipster-initialTitle");
          } else
            (i = t.grep(i, function(t, i) {
              return t !== e.namespace;
            })),
              e.$el.data("tooltipster-ns", i);
          return e;
        },
        elementIcon: function() {
          return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : void 0;
        },
        elementTooltip: function() {
          return this.$tooltip ? this.$tooltip[0] : void 0;
        },
        option: function(t, e) {
          return "undefined" == typeof e
            ? this.options[t]
            : ((this.options[t] = e), this);
        },
        status: function() {
          return this.Status;
        }
      }),
        (t.fn[a] = function() {
          var e = arguments;
          if (0 === this.length) {
            if ("string" == typeof e[0]) {
              var i = !0;
              switch (e[0]) {
                case "setDefaults":
                  t.extend(l, e[1]);
                  break;
                default:
                  i = !1;
              }
              return !!i || this;
            }
            return this;
          }
          if ("string" == typeof e[0]) {
            var o = "#*$~&";
            return (
              this.each(function() {
                var i = t(this).data("tooltipster-ns"),
                  n = i ? t(this).data(i[0]) : null;
                if (!n)
                  throw new Error(
                    "You called Tooltipster's \"" +
                      e[0] +
                      '" method on an uninitialized element'
                  );
                if ("function" != typeof n[e[0]])
                  throw new Error(
                    'Unknown method .tooltipster("' + e[0] + '")'
                  );
                var r = n[e[0]](e[1], e[2]);
                if (r !== n) return (o = r), !1;
              }),
              "#*$~&" !== o ? o : this
            );
          }
          var r = [],
            s = e[0] && "undefined" != typeof e[0].multiple,
            a = (s && e[0].multiple) || (!s && l.multiple),
            c = e[0] && "undefined" != typeof e[0].debug,
            u = (c && e[0].debug) || (!c && l.debug);
          return (
            this.each(function() {
              var i = !1,
                o = t(this).data("tooltipster-ns"),
                s = null;
              o
                ? a
                  ? (i = !0)
                  : u &&
                    console.log(
                      'Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.'
                    )
                : (i = !0),
                i &&
                  ((s = new n(this, e[0])),
                  o || (o = []),
                  o.push(s.namespace),
                  t(this).data("tooltipster-ns", o),
                  t(this).data(s.namespace, s)),
                r.push(s);
            }),
            a ? r : this
          );
        });
      var c = !!("ontouchstart" in e),
        u = !1;
      t("body").one("mousemove", function() {
        u = !0;
      });
    })(jQuery, window, document);
  },
  function(t, e, i) {
    (function(t) {
      "use strict";
      function e(t) {
        return t && t.__esModule ? t : { default: t };
      }
      var n = i(25),
        o = e(n);
      t.Flatsome = {
        behaviors: {},
        plugin: function(t, e, i) {
          (i = i || {}),
            (jQuery.fn[t] = function(n) {
              if ("string" == typeof arguments[0]) {
                var r = null,
                  s = arguments[0],
                  a = Array.prototype.slice.call(arguments, 1);
                return (
                  this.each(function() {
                    if (
                      !jQuery.data(this, "plugin_" + t) ||
                      "function" != typeof jQuery.data(this, "plugin_" + t)[s]
                    )
                      throw new Error(
                        "Method " + s + " does not exist on jQuery." + t
                      );
                    r = jQuery.data(this, "plugin_" + t)[s].apply(this, a);
                  }),
                  "destroy" === s &&
                    this.each(function() {
                      jQuery(this).removeData("plugin_" + t);
                    }),
                  void 0 !== r ? r : this
                );
              }
              if (
                "object" ===
                  ("undefined" == typeof n ? "undefined" : (0, o.default)(n)) ||
                !n
              )
                return this.each(function() {
                  jQuery.data(this, "plugin_" + t) ||
                    ((n = jQuery.extend({}, i, n)),
                    jQuery.data(this, "plugin_" + t, new e(this, n)));
                });
            });
        },
        behavior: function(t, e) {
          (this.behaviors[t] = e),
            e.arrive &&
              jQuery(document).arrive(
                e.arrive.selector,
                e.arrive.handler ||
                  function() {
                    Flatsome.attach(t, this.parentNode);
                  }
              );
        },
        attach: function(t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
          if ("string" == typeof t)
            return this.behaviors.hasOwnProperty(t) &&
              "function" == typeof this.behaviors[t].attach
              ? this.behaviors[t].attach(e || document)
              : null;
          for (var i in this.behaviors)
            "function" == typeof this.behaviors[i].attach &&
              this.behaviors[i].attach(e || document);
        },
        detach: function(t) {
          for (var e in this.behaviors)
            "function" == typeof this.behaviors[e].detach &&
              this.behaviors[e].detach(t || document);
        }
      };
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e, i) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    e.__esModule = !0;
    var o = i(26),
      r = n(o),
      s = i(77),
      a = n(s),
      l =
        "function" == typeof a.default && "symbol" == typeof r.default
          ? function(t) {
              return typeof t;
            }
          : function(t) {
              return t &&
                "function" == typeof a.default &&
                t.constructor === a.default &&
                t !== a.default.prototype
                ? "symbol"
                : typeof t;
            };
    e.default =
      "function" == typeof a.default && "symbol" === l(r.default)
        ? function(t) {
            return "undefined" == typeof t ? "undefined" : l(t);
          }
        : function(t) {
            return t &&
              "function" == typeof a.default &&
              t.constructor === a.default &&
              t !== a.default.prototype
              ? "symbol"
              : "undefined" == typeof t
                ? "undefined"
                : l(t);
          };
  },
  function(t, e, i) {
    t.exports = { default: i(27), __esModule: !0 };
  },
  function(t, e, i) {
    i(28), i(72), (t.exports = i(76).f("iterator"));
  },
  function(t, e, i) {
    "use strict";
    var n = i(29)(!0);
    i(32)(
      String,
      "String",
      function(t) {
        (this._t = String(t)), (this._i = 0);
      },
      function() {
        var t,
          e = this._t,
          i = this._i;
        return i >= e.length
          ? { value: void 0, done: !0 }
          : ((t = n(e, i)), (this._i += t.length), { value: t, done: !1 });
      }
    );
  },
  function(t, e, i) {
    var n = i(30),
      o = i(31);
    t.exports = function(t) {
      return function(e, i) {
        var r,
          s,
          a = String(o(e)),
          l = n(i),
          c = a.length;
        return l < 0 || l >= c
          ? t
            ? ""
            : void 0
          : ((r = a.charCodeAt(l)),
            r < 55296 ||
            r > 56319 ||
            l + 1 === c ||
            (s = a.charCodeAt(l + 1)) < 56320 ||
            s > 57343
              ? t
                ? a.charAt(l)
                : r
              : t
                ? a.slice(l, l + 2)
                : ((r - 55296) << 10) + (s - 56320) + 65536);
      };
    };
  },
  function(t, e) {
    var i = Math.ceil,
      n = Math.floor;
    t.exports = function(t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? n : i)(t);
    };
  },
  function(t, e) {
    t.exports = function(t) {
      if (void 0 == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  },
  function(t, e, i) {
    "use strict";
    var n = i(33),
      o = i(34),
      r = i(49),
      s = i(39),
      a = i(50),
      l = i(51),
      c = i(52),
      u = i(68),
      d = i(70),
      h = i(69)("iterator"),
      p = !([].keys && "next" in [].keys()),
      f = "@@iterator",
      m = "keys",
      g = "values",
      v = function() {
        return this;
      };
    t.exports = function(t, e, i, y, b, w, x) {
      c(i, e, y);
      var S,
        C,
        k,
        E = function(t) {
          if (!p && t in j) return j[t];
          switch (t) {
            case m:
              return function() {
                return new i(this, t);
              };
            case g:
              return function() {
                return new i(this, t);
              };
          }
          return function() {
            return new i(this, t);
          };
        },
        T = e + " Iterator",
        P = b == g,
        _ = !1,
        j = t.prototype,
        I = j[h] || j[f] || (b && j[b]),
        A = I || E(b),
        O = b ? (P ? E("entries") : A) : void 0,
        D = "Array" == e ? j.entries || I : I;
      if (
        (D &&
          ((k = d(D.call(new t()))),
          k !== Object.prototype &&
            k.next &&
            (u(k, T, !0), n || a(k, h) || s(k, h, v))),
        P &&
          I &&
          I.name !== g &&
          ((_ = !0),
          (A = function() {
            return I.call(this);
          })),
        (n && !x) || (!p && !_ && j[h]) || s(j, h, A),
        (l[e] = A),
        (l[T] = v),
        b)
      )
        if (((S = { values: P ? A : E(g), keys: w ? A : E(m), entries: O }), x))
          for (C in S) C in j || r(j, C, S[C]);
        else o(o.P + o.F * (p || _), e, S);
      return S;
    };
  },
  function(t, e) {
    t.exports = !0;
  },
  function(t, e, i) {
    var n = i(35),
      o = i(36),
      r = i(37),
      s = i(39),
      a = "prototype",
      l = function(t, e, i) {
        var c,
          u,
          d,
          h = t & l.F,
          p = t & l.G,
          f = t & l.S,
          m = t & l.P,
          g = t & l.B,
          v = t & l.W,
          y = p ? o : o[e] || (o[e] = {}),
          b = y[a],
          w = p ? n : f ? n[e] : (n[e] || {})[a];
        p && (i = e);
        for (c in i)
          (u = !h && w && void 0 !== w[c]),
            (u && c in y) ||
              ((d = u ? w[c] : i[c]),
              (y[c] =
                p && "function" != typeof w[c]
                  ? i[c]
                  : g && u
                    ? r(d, n)
                    : v && w[c] == d
                      ? (function(t) {
                          var e = function(e, i, n) {
                            if (this instanceof t) {
                              switch (arguments.length) {
                                case 0:
                                  return new t();
                                case 1:
                                  return new t(e);
                                case 2:
                                  return new t(e, i);
                              }
                              return new t(e, i, n);
                            }
                            return t.apply(this, arguments);
                          };
                          return (e[a] = t[a]), e;
                        })(d)
                      : m && "function" == typeof d
                        ? r(Function.call, d)
                        : d),
              m &&
                (((y.virtual || (y.virtual = {}))[c] = d),
                t & l.R && b && !b[c] && s(b, c, d)));
      };
    (l.F = 1),
      (l.G = 2),
      (l.S = 4),
      (l.P = 8),
      (l.B = 16),
      (l.W = 32),
      (l.U = 64),
      (l.R = 128),
      (t.exports = l);
  },
  function(t, e) {
    var i = (t.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
    "number" == typeof __g && (__g = i);
  },
  function(t, e) {
    var i = (t.exports = { version: "2.5.1" });
    "number" == typeof __e && (__e = i);
  },
  function(t, e, i) {
    var n = i(38);
    t.exports = function(t, e, i) {
      if ((n(t), void 0 === e)) return t;
      switch (i) {
        case 1:
          return function(i) {
            return t.call(e, i);
          };
        case 2:
          return function(i, n) {
            return t.call(e, i, n);
          };
        case 3:
          return function(i, n, o) {
            return t.call(e, i, n, o);
          };
      }
      return function() {
        return t.apply(e, arguments);
      };
    };
  },
  function(t, e) {
    t.exports = function(t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t;
    };
  },
  function(t, e, i) {
    var n = i(40),
      o = i(48);
    t.exports = i(44)
      ? function(t, e, i) {
          return n.f(t, e, o(1, i));
        }
      : function(t, e, i) {
          return (t[e] = i), t;
        };
  },
  function(t, e, i) {
    var n = i(41),
      o = i(43),
      r = i(47),
      s = Object.defineProperty;
    e.f = i(44)
      ? Object.defineProperty
      : function(t, e, i) {
          if ((n(t), (e = r(e, !0)), n(i), o))
            try {
              return s(t, e, i);
            } catch (t) {}
          if ("get" in i || "set" in i)
            throw TypeError("Accessors not supported!");
          return "value" in i && (t[e] = i.value), t;
        };
  },
  function(t, e, i) {
    var n = i(42);
    t.exports = function(t) {
      if (!n(t)) throw TypeError(t + " is not an object!");
      return t;
    };
  },
  function(t, e) {
    t.exports = function(t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  },
  function(t, e, i) {
    t.exports =
      !i(44) &&
      !i(45)(function() {
        return (
          7 !=
          Object.defineProperty(i(46)("div"), "a", {
            get: function() {
              return 7;
            }
          }).a
        );
      });
  },
  function(t, e, i) {
    t.exports = !i(45)(function() {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  function(t, e) {
    t.exports = function(t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  },
  function(t, e, i) {
    var n = i(42),
      o = i(35).document,
      r = n(o) && n(o.createElement);
    t.exports = function(t) {
      return r ? o.createElement(t) : {};
    };
  },
  function(t, e, i) {
    var n = i(42);
    t.exports = function(t, e) {
      if (!n(t)) return t;
      var i, o;
      if (e && "function" == typeof (i = t.toString) && !n((o = i.call(t))))
        return o;
      if ("function" == typeof (i = t.valueOf) && !n((o = i.call(t)))) return o;
      if (!e && "function" == typeof (i = t.toString) && !n((o = i.call(t))))
        return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function(t, e) {
    t.exports = function(t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e
      };
    };
  },
  function(t, e, i) {
    t.exports = i(39);
  },
  function(t, e) {
    var i = {}.hasOwnProperty;
    t.exports = function(t, e) {
      return i.call(t, e);
    };
  },
  function(t, e) {
    t.exports = {};
  },
  function(t, e, i) {
    "use strict";
    var n = i(53),
      o = i(48),
      r = i(68),
      s = {};
    i(39)(s, i(69)("iterator"), function() {
      return this;
    }),
      (t.exports = function(t, e, i) {
        (t.prototype = n(s, { next: o(1, i) })), r(t, e + " Iterator");
      });
  },
  function(t, e, i) {
    var n = i(41),
      o = i(54),
      r = i(66),
      s = i(63)("IE_PROTO"),
      a = function() {},
      l = "prototype",
      c = function() {
        var t,
          e = i(46)("iframe"),
          n = r.length,
          o = "<",
          s = ">";
        for (
          e.style.display = "none",
            i(67).appendChild(e),
            e.src = "javascript:",
            t = e.contentWindow.document,
            t.open(),
            t.write(o + "script" + s + "document.F=Object" + o + "/script" + s),
            t.close(),
            c = t.F;
          n--;

        )
          delete c[l][r[n]];
        return c();
      };
    t.exports =
      Object.create ||
      function(t, e) {
        var i;
        return (
          null !== t
            ? ((a[l] = n(t)), (i = new a()), (a[l] = null), (i[s] = t))
            : (i = c()),
          void 0 === e ? i : o(i, e)
        );
      };
  },
  function(t, e, i) {
    var n = i(40),
      o = i(41),
      r = i(55);
    t.exports = i(44)
      ? Object.defineProperties
      : function(t, e) {
          o(t);
          for (var i, s = r(e), a = s.length, l = 0; a > l; )
            n.f(t, (i = s[l++]), e[i]);
          return t;
        };
  },
  function(t, e, i) {
    var n = i(56),
      o = i(66);
    t.exports =
      Object.keys ||
      function(t) {
        return n(t, o);
      };
  },
  function(t, e, i) {
    var n = i(50),
      o = i(57),
      r = i(60)(!1),
      s = i(63)("IE_PROTO");
    t.exports = function(t, e) {
      var i,
        a = o(t),
        l = 0,
        c = [];
      for (i in a) i != s && n(a, i) && c.push(i);
      for (; e.length > l; ) n(a, (i = e[l++])) && (~r(c, i) || c.push(i));
      return c;
    };
  },
  function(t, e, i) {
    var n = i(58),
      o = i(31);
    t.exports = function(t) {
      return n(o(t));
    };
  },
  function(t, e, i) {
    var n = i(59);
    t.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function(t) {
          return "String" == n(t) ? t.split("") : Object(t);
        };
  },
  function(t, e) {
    var i = {}.toString;
    t.exports = function(t) {
      return i.call(t).slice(8, -1);
    };
  },
  function(t, e, i) {
    var n = i(57),
      o = i(61),
      r = i(62);
    t.exports = function(t) {
      return function(e, i, s) {
        var a,
          l = n(e),
          c = o(l.length),
          u = r(s, c);
        if (t && i != i) {
          for (; c > u; ) if (((a = l[u++]), a != a)) return !0;
        } else
          for (; c > u; u++)
            if ((t || u in l) && l[u] === i) return t || u || 0;
        return !t && -1;
      };
    };
  },
  function(t, e, i) {
    var n = i(30),
      o = Math.min;
    t.exports = function(t) {
      return t > 0 ? o(n(t), 9007199254740991) : 0;
    };
  },
  function(t, e, i) {
    var n = i(30),
      o = Math.max,
      r = Math.min;
    t.exports = function(t, e) {
      return (t = n(t)), t < 0 ? o(t + e, 0) : r(t, e);
    };
  },
  function(t, e, i) {
    var n = i(64)("keys"),
      o = i(65);
    t.exports = function(t) {
      return n[t] || (n[t] = o(t));
    };
  },
  function(t, e, i) {
    var n = i(35),
      o = "__core-js_shared__",
      r = n[o] || (n[o] = {});
    t.exports = function(t) {
      return r[t] || (r[t] = {});
    };
  },
  function(t, e) {
    var i = 0,
      n = Math.random();
    t.exports = function(t) {
      return "Symbol(".concat(
        void 0 === t ? "" : t,
        ")_",
        (++i + n).toString(36)
      );
    };
  },
  function(t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function(t, e, i) {
    var n = i(35).document;
    t.exports = n && n.documentElement;
  },
  function(t, e, i) {
    var n = i(40).f,
      o = i(50),
      r = i(69)("toStringTag");
    t.exports = function(t, e, i) {
      t &&
        !o((t = i ? t : t.prototype), r) &&
        n(t, r, { configurable: !0, value: e });
    };
  },
  function(t, e, i) {
    var n = i(64)("wks"),
      o = i(65),
      r = i(35).Symbol,
      s = "function" == typeof r,
      a = (t.exports = function(t) {
        return n[t] || (n[t] = (s && r[t]) || (s ? r : o)("Symbol." + t));
      });
    a.store = n;
  },
  function(t, e, i) {
    var n = i(50),
      o = i(71),
      r = i(63)("IE_PROTO"),
      s = Object.prototype;
    t.exports =
      Object.getPrototypeOf ||
      function(t) {
        return (
          (t = o(t)),
          n(t, r)
            ? t[r]
            : "function" == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
                ? s
                : null
        );
      };
  },
  function(t, e, i) {
    var n = i(31);
    t.exports = function(t) {
      return Object(n(t));
    };
  },
  function(t, e, i) {
    i(73);
    for (
      var n = i(35),
        o = i(39),
        r = i(51),
        s = i(69)("toStringTag"),
        a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(
          ","
        ),
        l = 0;
      l < a.length;
      l++
    ) {
      var c = a[l],
        u = n[c],
        d = u && u.prototype;
      d && !d[s] && o(d, s, c), (r[c] = r.Array);
    }
  },
  function(t, e, i) {
    "use strict";
    var n = i(74),
      o = i(75),
      r = i(51),
      s = i(57);
    (t.exports = i(32)(
      Array,
      "Array",
      function(t, e) {
        (this._t = s(t)), (this._i = 0), (this._k = e);
      },
      function() {
        var t = this._t,
          e = this._k,
          i = this._i++;
        return !t || i >= t.length
          ? ((this._t = void 0), o(1))
          : "keys" == e
            ? o(0, i)
            : "values" == e
              ? o(0, t[i])
              : o(0, [i, t[i]]);
      },
      "values"
    )),
      (r.Arguments = r.Array),
      n("keys"),
      n("values"),
      n("entries");
  },
  function(t, e) {
    t.exports = function() {};
  },
  function(t, e) {
    t.exports = function(t, e) {
      return { value: e, done: !!t };
    };
  },
  function(t, e, i) {
    e.f = i(69);
  },
  function(t, e, i) {
    t.exports = { default: i(78), __esModule: !0 };
  },
  function(t, e, i) {
    i(79), i(89), i(90), i(91), (t.exports = i(36).Symbol);
  },
  function(t, e, i) {
    "use strict";
    var n = i(35),
      o = i(50),
      r = i(44),
      s = i(34),
      a = i(49),
      l = i(80).KEY,
      c = i(45),
      u = i(64),
      d = i(68),
      h = i(65),
      p = i(69),
      f = i(76),
      m = i(81),
      g = i(82),
      v = i(85),
      y = i(41),
      b = i(57),
      w = i(47),
      x = i(48),
      S = i(53),
      C = i(86),
      k = i(88),
      E = i(40),
      T = i(55),
      P = k.f,
      _ = E.f,
      j = C.f,
      I = n.Symbol,
      A = n.JSON,
      O = A && A.stringify,
      D = "prototype",
      L = p("_hidden"),
      M = p("toPrimitive"),
      z = {}.propertyIsEnumerable,
      Q = u("symbol-registry"),
      F = u("symbols"),
      W = u("op-symbols"),
      N = Object[D],
      B = "function" == typeof I,
      H = n.QObject,
      $ = !H || !H[D] || !H[D].findChild,
      V =
        r &&
        c(function() {
          return (
            7 !=
            S(
              _({}, "a", {
                get: function() {
                  return _(this, "a", { value: 7 }).a;
                }
              })
            ).a
          );
        })
          ? function(t, e, i) {
              var n = P(N, e);
              n && delete N[e], _(t, e, i), n && t !== N && _(N, e, n);
            }
          : _,
      R = function(t) {
        var e = (F[t] = S(I[D]));
        return (e._k = t), e;
      },
      q =
        B && "symbol" == typeof I.iterator
          ? function(t) {
              return "symbol" == typeof t;
            }
          : function(t) {
              return t instanceof I;
            },
      U = function(t, e, i) {
        return (
          t === N && U(W, e, i),
          y(t),
          (e = w(e, !0)),
          y(i),
          o(F, e)
            ? (i.enumerable
                ? (o(t, L) && t[L][e] && (t[L][e] = !1),
                  (i = S(i, { enumerable: x(0, !1) })))
                : (o(t, L) || _(t, L, x(1, {})), (t[L][e] = !0)),
              V(t, e, i))
            : _(t, e, i)
        );
      },
      G = function(t, e) {
        y(t);
        for (var i, n = g((e = b(e))), o = 0, r = n.length; r > o; )
          U(t, (i = n[o++]), e[i]);
        return t;
      },
      Y = function(t, e) {
        return void 0 === e ? S(t) : G(S(t), e);
      },
      X = function(t) {
        var e = z.call(this, (t = w(t, !0)));
        return (
          !(this === N && o(F, t) && !o(W, t)) &&
          (!(e || !o(this, t) || !o(F, t) || (o(this, L) && this[L][t])) || e)
        );
      },
      K = function(t, e) {
        if (((t = b(t)), (e = w(e, !0)), t !== N || !o(F, e) || o(W, e))) {
          var i = P(t, e);
          return (
            !i || !o(F, e) || (o(t, L) && t[L][e]) || (i.enumerable = !0), i
          );
        }
      },
      Z = function(t) {
        for (var e, i = j(b(t)), n = [], r = 0; i.length > r; )
          o(F, (e = i[r++])) || e == L || e == l || n.push(e);
        return n;
      },
      J = function(t) {
        for (
          var e, i = t === N, n = j(i ? W : b(t)), r = [], s = 0;
          n.length > s;

        )
          !o(F, (e = n[s++])) || (i && !o(N, e)) || r.push(F[e]);
        return r;
      };
    B ||
      ((I = function() {
        if (this instanceof I) throw TypeError("Symbol is not a constructor!");
        var t = h(arguments.length > 0 ? arguments[0] : void 0),
          e = function(i) {
            this === N && e.call(W, i),
              o(this, L) && o(this[L], t) && (this[L][t] = !1),
              V(this, t, x(1, i));
          };
        return r && $ && V(N, t, { configurable: !0, set: e }), R(t);
      }),
      a(I[D], "toString", function() {
        return this._k;
      }),
      (k.f = K),
      (E.f = U),
      (i(87).f = C.f = Z),
      (i(84).f = X),
      (i(83).f = J),
      r && !i(33) && a(N, "propertyIsEnumerable", X, !0),
      (f.f = function(t) {
        return R(p(t));
      })),
      s(s.G + s.W + s.F * !B, { Symbol: I });
    for (
      var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
          ","
        ),
        et = 0;
      tt.length > et;

    )
      p(tt[et++]);
    for (var it = T(p.store), nt = 0; it.length > nt; ) m(it[nt++]);
    s(s.S + s.F * !B, "Symbol", {
      for: function(t) {
        return o(Q, (t += "")) ? Q[t] : (Q[t] = I(t));
      },
      keyFor: function(t) {
        if (!q(t)) throw TypeError(t + " is not a symbol!");
        for (var e in Q) if (Q[e] === t) return e;
      },
      useSetter: function() {
        $ = !0;
      },
      useSimple: function() {
        $ = !1;
      }
    }),
      s(s.S + s.F * !B, "Object", {
        create: Y,
        defineProperty: U,
        defineProperties: G,
        getOwnPropertyDescriptor: K,
        getOwnPropertyNames: Z,
        getOwnPropertySymbols: J
      }),
      A &&
        s(
          s.S +
            s.F *
              (!B ||
                c(function() {
                  var t = I();
                  return (
                    "[null]" != O([t]) ||
                    "{}" != O({ a: t }) ||
                    "{}" != O(Object(t))
                  );
                })),
          "JSON",
          {
            stringify: function(t) {
              if (void 0 !== t && !q(t)) {
                for (var e, i, n = [t], o = 1; arguments.length > o; )
                  n.push(arguments[o++]);
                return (
                  (e = n[1]),
                  "function" == typeof e && (i = e),
                  (!i && v(e)) ||
                    (e = function(t, e) {
                      if ((i && (e = i.call(this, t, e)), !q(e))) return e;
                    }),
                  (n[1] = e),
                  O.apply(A, n)
                );
              }
            }
          }
        ),
      I[D][M] || i(39)(I[D], M, I[D].valueOf),
      d(I, "Symbol"),
      d(Math, "Math", !0),
      d(n.JSON, "JSON", !0);
  },
  function(t, e, i) {
    var n = i(65)("meta"),
      o = i(42),
      r = i(50),
      s = i(40).f,
      a = 0,
      l =
        Object.isExtensible ||
        function() {
          return !0;
        },
      c = !i(45)(function() {
        return l(Object.preventExtensions({}));
      }),
      u = function(t) {
        s(t, n, { value: { i: "O" + ++a, w: {} } });
      },
      d = function(t, e) {
        if (!o(t))
          return "symbol" == typeof t
            ? t
            : ("string" == typeof t ? "S" : "P") + t;
        if (!r(t, n)) {
          if (!l(t)) return "F";
          if (!e) return "E";
          u(t);
        }
        return t[n].i;
      },
      h = function(t, e) {
        if (!r(t, n)) {
          if (!l(t)) return !0;
          if (!e) return !1;
          u(t);
        }
        return t[n].w;
      },
      p = function(t) {
        return c && f.NEED && l(t) && !r(t, n) && u(t), t;
      },
      f = (t.exports = {
        KEY: n,
        NEED: !1,
        fastKey: d,
        getWeak: h,
        onFreeze: p
      });
  },
  function(t, e, i) {
    var n = i(35),
      o = i(36),
      r = i(33),
      s = i(76),
      a = i(40).f;
    t.exports = function(t) {
      var e = o.Symbol || (o.Symbol = r ? {} : n.Symbol || {});
      "_" == t.charAt(0) || t in e || a(e, t, { value: s.f(t) });
    };
  },
  function(t, e, i) {
    var n = i(55),
      o = i(83),
      r = i(84);
    t.exports = function(t) {
      var e = n(t),
        i = o.f;
      if (i)
        for (var s, a = i(t), l = r.f, c = 0; a.length > c; )
          l.call(t, (s = a[c++])) && e.push(s);
      return e;
    };
  },
  function(t, e) {
    e.f = Object.getOwnPropertySymbols;
  },
  function(t, e) {
    e.f = {}.propertyIsEnumerable;
  },
  function(t, e, i) {
    var n = i(59);
    t.exports =
      Array.isArray ||
      function(t) {
        return "Array" == n(t);
      };
  },
  function(t, e, i) {
    var n = i(57),
      o = i(87).f,
      r = {}.toString,
      s =
        "object" == typeof window && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window)
          : [],
      a = function(t) {
        try {
          return o(t);
        } catch (t) {
          return s.slice();
        }
      };
    t.exports.f = function(t) {
      return s && "[object Window]" == r.call(t) ? a(t) : o(n(t));
    };
  },
  function(t, e, i) {
    var n = i(56),
      o = i(66).concat("length", "prototype");
    e.f =
      Object.getOwnPropertyNames ||
      function(t) {
        return n(t, o);
      };
  },
  function(t, e, i) {
    var n = i(84),
      o = i(48),
      r = i(57),
      s = i(47),
      a = i(50),
      l = i(43),
      c = Object.getOwnPropertyDescriptor;
    e.f = i(44)
      ? c
      : function(t, e) {
          if (((t = r(t)), (e = s(e, !0)), l))
            try {
              return c(t, e);
            } catch (t) {}
          if (a(t, e)) return o(!n.f.call(t, e), t[e]);
        };
  },
  function(t, e) {},
  function(t, e, i) {
    i(81)("asyncIterator");
  },
  function(t, e, i) {
    i(81)("observable");
  },
  function(t, e) {
    "use strict";
    var i = jQuery("#wrapper"),
      n = jQuery("#header"),
      o = -jQuery(".header-wrapper").height() - 100,
      r = -jQuery(".header-top.hide-for-sticky").height() - 1,
      s = n.hasClass("has-sticky");
    if (jQuery(".sticky-shrink .header-wrapper").length) {
      var a = jQuery(".header-top.hide-for-sticky").height();
      (a += jQuery("#wpadminbar").height()), (o = -1 - a), (r = -1 - a);
    }
    s &&
      (n.find(".header-wrapper").waypoint(
        function(t) {
          var e = jQuery(this.element),
            i = n.height();
          "down" === t &&
            (e.addClass("stuck"),
            n.height(i),
            jQuery(".has-transparent").removeClass("transparent"),
            jQuery(".toggle-nav-dark").removeClass("nav-dark"));
        },
        { offset: o }
      ),
      i.waypoint(
        function(t) {
          "up" === t &&
            (n.height(""),
            jQuery(".header-wrapper").removeClass("stuck"),
            jQuery(".has-transparent").addClass("transparent"),
            jQuery(".toggle-nav-dark").addClass("nav-dark"));
        },
        { offset: r }
      ));
  },
  function(t, e, i) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var o = i(22),
      r = n(o);
    (0, r.default)();
  },
  function(t, e) {
    "use strict";
    function i(t) {
      t.classList.add("parallax-active"),
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
          navigator.userAgent
        ) ||
          (t.classList &&
            t.dataset &&
            (f.push({ element: t, type: a(t) }), o(f[f.length - 1])));
    }
    function n() {
      for (var t = 0; t < f.length; t++)
        f[t].element.offsetParent ? o(f[t]) : f.splice(t, 1);
    }
    function o(t) {
      r(t), s(t);
    }
    function r(t) {
      var e = t.element,
        i = t.type,
        n = e.dataset.parallax,
        o = p(n),
        r = c(e),
        s = (window.innerHeight - r.offsetHeight) * o;
      switch (i) {
        case "backgroundImage":
          e.style.backgroundSize = o ? "100% auto" : null;
          break;
        case "backgroundElement":
          e.style.height = o ? r.offsetHeight + s + "px" : null;
      }
    }
    function s(t) {
      var e = t.element,
        i = t.type,
        n = e.dataset.parallax || e.dataset.parallaxBackground,
        o = p(n),
        r = window.innerHeight,
        s = c(e),
        a = e.offsetHeight - s.offsetHeight,
        u = e.getBoundingClientRect(),
        d = s !== e ? s.getBoundingClientRect() : u,
        f = u.top + e.offsetHeight / 2,
        m = d.top + s.offsetHeight / 2,
        g = r / 2 - f,
        v = r / 2 - m,
        y = f + l() < r / 2,
        b = y ? l() : g,
        w = (r / 2 - Math.abs(g), Math.abs(b) / (r / 2)),
        x = 0;
      if (!(d.top > r || d.top + s.offsetHeight < 0))
        switch (i) {
          case "backgroundImage":
            (x = d.top * o),
              (e.style.backgroundPosition = o
                ? "50% " + x.toFixed(0) + "px"
                : null),
              (e.style.backgroundAttachment = o ? "fixed" : null);
            break;
          case "backgroundElement":
            (x = v * o - a / 2),
              (e.style.transform = o
                ? "translate3d(0, " + x.toFixed(2) + "px, 0)"
                : null),
              (e.style.backfaceVisibility = o ? "hidden" : null);
            break;
          case "element":
            (x = b * o),
              (e.style.transform = o
                ? "translate3d(0, " + x.toFixed(2) + "px, 0)"
                : null),
              (e.style.backfaceVisibility = o ? "hidden" : null),
              "undefined" != typeof e.dataset.parallaxFade &&
                (e.style.opacity = o ? h(1 - w).toFixed(2) : null);
        }
    }
    function a(t) {
      return "undefined" != typeof t.dataset.parallaxBackground
        ? "backgroundElement"
        : "undefined" != typeof t.dataset.parallaxElemenet
          ? "element"
          : "" !== t.style.backgroundImage
            ? "backgroundImage"
            : "element";
    }
    function l() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function c(t) {
      return (
        u(t, t.dataset.parallaxContainer || "[data-parallax-container]") || t
      );
    }
    function u(t) {
      for (
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        t && !d(t).call(t, e);

      )
        t = t.parentElement;
      return t;
    }
    function d(t) {
      return (
        t.matches ||
        t.webkitMatchesSelector ||
        t.mozMatchesSelector ||
        t.msMatchesSelector
      );
    }
    function h(t) {
      return t * (2 - t);
    }
    function p(t) {
      var e = t / 10 * -1,
        i = Math.abs(t) / 10;
      return e / (2 - i);
    }
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = i);
    var f = [];
    window.addEventListener("scroll", function() {
      return window.requestAnimationFrame(n);
    }),
      window.addEventListener("resize", function() {
        return window.requestAnimationFrame(n);
      }),
      window.addEventListener("DOMNodeInserted", function() {
        return window.requestAnimationFrame(n);
      }),
      window.jQuery &&
        (window.jQuery.fn.flatsomeParallax = function(t) {
          "destroy" !== t &&
            this.each(function(t, e) {
              return i(e);
            });
        });
  },
  function(t, e) {
    "use strict";
    Flatsome.plugin("resizeselect", function(t, e) {
      var i = jQuery(t);
      i
        .change(function() {
          var t = jQuery(this),
            e = t.find("option:selected").val(),
            i = t.find("option:selected").text(),
            n = jQuery('<span class="select-resize-ghost">').html(i);
          n.appendTo(t.parent());
          var o = n.width();
          n.remove(),
            t.width(o + 7),
            e &&
              t
                .parent()
                .parent()
                .find("input.search-field")
                .focus();
        })
        .change();
    });
  },
  function(t, e, i) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var o = i(97),
      r = n(o);
    jQuery(
      ".section .loading-spin, .banner .loading-spin, .page-loader"
    ).fadeOut(),
      jQuery("#top-link").click(function(t) {
        jQuery.scrollTo(0, 300), t.preventDefault();
      }),
      jQuery(".scroll-for-more").click(function() {
        jQuery.scrollTo(jQuery(this), { duration: 300 });
      }),
      jQuery(".search-dropdown button").click(function(t) {
        jQuery(this)
          .parent()
          .find("input")
          .focus(),
          t.preventDefault();
      }),
      jQuery(".current-cat").addClass("active"),
      jQuery("html").removeClass("loading-site"),
      setTimeout(function() {
        jQuery(".page-loader").remove();
      }, 1e3),
      jQuery(".resize-select").resizeselect(),
      flatsomeVars.user.can_edit_pages &&
        jQuery(".block-edit-link").each(function() {
          var t = jQuery(this).data("link"),
            e = jQuery(this).data("backend"),
            i = jQuery(this).data("title");
          jQuery(this)
            .next()
            .addClass("has-block")
            .tooltipster({
              animationDuration: 100,
              distance: -15,
              delay: 0,
              repositionOnScroll: !0,
              interactive: !0,
              contentAsHTML: !0,
              content:
                "" +
                i +
                ' <br/> <a class="button edit-block-button edit-block-button-builder" href="' +
                t +
                '">UX Builder</a> <a class="button edit-block-button edit-block-button edit-block-button-backend" href="' +
                e +
                '">WP Editor</a>'
            }),
            jQuery(this).remove();
        }),
      jQuery("#hotspot").click(function(t) {
        t.preventDefault();
      }),
      jQuery(".wpcf7-form .wpcf7-submit").on("click", function() {
        jQuery(this)
          .parent()
          .parent()
          .addClass("processing");
      }),
      jQuery(document).ajaxComplete(function(t, e, i) {
        jQuery(".processing").removeClass("processing");
      }),
      jQuery(document).ready(function() {
        (0, r.default)();
      });
  },
  function(t, e) {
    var i = function(t) {
      "use strict";
      function e(t) {
        for (
          var e = getComputedStyle(t).fontFamily, i = null, n = {};
          null !== (i = u.exec(e));

        )
          n[i[1]] = i[2];
        return n["object-position"] ? o(n) : n;
      }
      function i(t) {
        var i = -1;
        t
          ? "length" in t || (t = [t])
          : (t = document.querySelectorAll("video"));
        for (; t[++i]; ) {
          var o = e(t[i]);
          (o["object-fit"] || o["object-position"]) &&
            ((o["object-fit"] = o["object-fit"] || "fill"), n(t[i], o));
        }
      }
      function n(t, e) {
        function i() {
          var i = t.videoWidth,
            o = t.videoHeight,
            s = i / o,
            a = r.clientWidth,
            l = r.clientHeight,
            c = a / l,
            u = 0,
            d = 0;
          (n.marginLeft = n.marginTop = 0),
            (s < c
            ? "contain" === e["object-fit"]
            : "cover" === e["object-fit"])
              ? ((u = l * s),
                (d = a / s),
                (n.width = Math.round(u) + "px"),
                (n.height = l + "px"),
                "left" === e["object-position-x"]
                  ? (n.marginLeft = 0)
                  : "right" === e["object-position-x"]
                    ? (n.marginLeft = Math.round(a - u) + "px")
                    : (n.marginLeft = Math.round((a - u) / 2) + "px"))
              : ((d = a / s),
                (n.width = a + "px"),
                (n.height = Math.round(d) + "px"),
                "top" === e["object-position-y"]
                  ? (n.marginTop = 0)
                  : "bottom" === e["object-position-y"]
                    ? (n.marginTop = Math.round(l - d) + "px")
                    : (n.marginTop = Math.round((l - d) / 2) + "px")),
            t.autoplay && t.play();
        }
        if ("fill" !== e["object-fit"]) {
          var n = t.style,
            o = window.getComputedStyle(t),
            r = document.createElement("object-fit");
          r.appendChild(t.parentNode.replaceChild(r, t));
          var s = {
            height: "100%",
            width: "100%",
            boxSizing: "content-box",
            display: "inline-block",
            overflow: "hidden"
          };
          "backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight left opacity margin position right top visibility".replace(
            /\w+/g,
            function(t) {
              s[t] = o[t];
            }
          );
          for (var a in s) r.style[a] = s[a];
          (n.border = n.margin = n.padding = 0),
            (n.display = "block"),
            (n.opacity = 1),
            t.addEventListener("loadedmetadata", i),
            window.addEventListener("optimizedResize", i),
            t.readyState >= 1 &&
              (t.removeEventListener("loadedmetadata", i), i());
        }
      }
      function o(t) {
        return (
          ~t["object-position"].indexOf("left")
            ? (t["object-position-x"] = "left")
            : ~t["object-position"].indexOf("right")
              ? (t["object-position-x"] = "right")
              : (t["object-position-x"] = "center"),
          ~t["object-position"].indexOf("top")
            ? (t["object-position-y"] = "top")
            : ~t["object-position"].indexOf("bottom")
              ? (t["object-position-y"] = "bottom")
              : (t["object-position-y"] = "center"),
          t
        );
      }
      function r(t, e, i) {
        i = i || window;
        var n = !1,
          o = null;
        try {
          o = new CustomEvent(e);
        } catch (t) {
          (o = document.createEvent("Event")), o.initEvent(e, !0, !0);
        }
        var r = function() {
          n ||
            ((n = !0),
            requestAnimationFrame(function() {
              i.dispatchEvent(o), (n = !1);
            }));
        };
        i.addEventListener(t, r);
      }
      var s = navigator.userAgent.indexOf("Edge/") >= 0,
        a = new Image(),
        l = "object-fit" in a.style && !s,
        c = "object-position" in a.style && !s,
        u = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
      (l && c) || (i(t), r("resize", "optimizedResize"));
    };
    "undefined" != typeof t &&
      "undefined" != typeof t.exports &&
      (t.exports = i);
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("animate", {
      attach: function(t) {
        jQuery("[data-animate]", t).each(function(t, e) {
          var i = jQuery(e),
            n = i.data("animate");
          if (0 === n.length) return i.attr("data-animated", "true");
          i.waypoint(
            function(t) {
              if ("down" === t) {
                if ("true" == i.data("animated")) return;
                setTimeout(function() {
                  i.attr("data-animated", "true");
                }, 300);
              }
            },
            { offset: "101%" }
          );
        });
      },
      detach: function(t) {
        jQuery("[data-animate]", t).each(function(t, e) {
          jQuery(e).attr("data-animated", "false");
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("commons", {
      attach: function(t) {
        jQuery("select.resizeselect").resizeselect(),
          jQuery("[data-parallax]", t).flatsomeParallax(),
          jQuery.fn.packery &&
            (jQuery("[data-packery-options], .has-packery", t).each(function() {
              var t = jQuery(this);
              t.packery(),
                setTimeout(function() {
                  t.imagesLoaded(function() {
                    t.packery("layout");
                  });
                }, 100);
            }),
            jQuery(".banner-grid-wrapper").imagesLoaded(function() {
              jQuery(this.elements).removeClass("processing");
            }));
      },
      detach: function(t) {}
    });
  },
  function(t, e, i) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var o = i(101),
      r = n(o);
    Flatsome.behavior("count-up", {
      attach: function(t) {
        jQuery("span.count-up", t).each(function(t, e) {
          var i = jQuery(e);
          i.waypoint({
            handler: function(t) {
              if (!jQuery(this.element).hasClass("active")) {
                var e = parseInt(i.text()),
                  n = new r.default(i.get(0), 0, e, 0, 4);
                n.start(), i.addClass("active");
              }
            },
            offset: "100%"
          });
        });
      }
    });
  },
  function(t, e, i) {
    var n, o;
    !(function(r, s) {
      (n = s),
        (o = "function" == typeof n ? n.call(e, i, e, t) : n),
        !(void 0 !== o && (t.exports = o));
    })(this, function(t, e, i) {
      var n = function(t, e, i, n, o, r) {
        function s(t) {
          var e,
            i,
            n,
            o,
            r,
            s,
            a = t < 0;
          if (
            ((t = Math.abs(t).toFixed(c.decimals)),
            (t += ""),
            (e = t.split(".")),
            (i = e[0]),
            (n = e.length > 1 ? c.options.decimal + e[1] : ""),
            c.options.useGrouping)
          ) {
            for (o = "", r = 0, s = i.length; r < s; ++r)
              0 !== r && r % 3 === 0 && (o = c.options.separator + o),
                (o = i[s - r - 1] + o);
            i = o;
          }
          return (
            c.options.numerals.length &&
              ((i = i.replace(/[0-9]/g, function(t) {
                return c.options.numerals[+t];
              })),
              (n = n.replace(/[0-9]/g, function(t) {
                return c.options.numerals[+t];
              }))),
            (a ? "-" : "") + c.options.prefix + i + n + c.options.suffix
          );
        }
        function a(t, e, i, n) {
          return i * (-Math.pow(2, -10 * t / n) + 1) * 1024 / 1023 + e;
        }
        function l(t) {
          return "number" == typeof t && !isNaN(t);
        }
        var c = this;
        if (
          ((c.version = function() {
            return "1.9.3";
          }),
          (c.options = {
            useEasing: !0,
            useGrouping: !0,
            separator: ",",
            decimal: ".",
            easingFn: a,
            formattingFn: s,
            prefix: "",
            suffix: "",
            numerals: []
          }),
          r && "object" == typeof r)
        )
          for (var u in c.options)
            r.hasOwnProperty(u) && null !== r[u] && (c.options[u] = r[u]);
        "" === c.options.separator
          ? (c.options.useGrouping = !1)
          : (c.options.separator = "" + c.options.separator);
        for (
          var d = 0, h = ["webkit", "moz", "ms", "o"], p = 0;
          p < h.length && !window.requestAnimationFrame;
          ++p
        )
          (window.requestAnimationFrame =
            window[h[p] + "RequestAnimationFrame"]),
            (window.cancelAnimationFrame =
              window[h[p] + "CancelAnimationFrame"] ||
              window[h[p] + "CancelRequestAnimationFrame"]);
        window.requestAnimationFrame ||
          (window.requestAnimationFrame = function(t, e) {
            var i = new Date().getTime(),
              n = Math.max(0, 16 - (i - d)),
              o = window.setTimeout(function() {
                t(i + n);
              }, n);
            return (d = i + n), o;
          }),
          window.cancelAnimationFrame ||
            (window.cancelAnimationFrame = function(t) {
              clearTimeout(t);
            }),
          (c.initialize = function() {
            return !(
              !c.initialized &&
              ((c.error = ""),
              (c.d = "string" == typeof t ? document.getElementById(t) : t),
              c.d
                ? ((c.startVal = Number(e)),
                  (c.endVal = Number(i)),
                  l(c.startVal) && l(c.endVal)
                    ? ((c.decimals = Math.max(0, n || 0)),
                      (c.dec = Math.pow(10, c.decimals)),
                      (c.duration = 1e3 * Number(o) || 2e3),
                      (c.countDown = c.startVal > c.endVal),
                      (c.frameVal = c.startVal),
                      (c.initialized = !0),
                      0)
                    : ((c.error =
                        "[CountUp] startVal (" +
                        e +
                        ") or endVal (" +
                        i +
                        ") is not a number"),
                      1))
                : ((c.error = "[CountUp] target is null or undefined"), 1))
            );
          }),
          (c.printValue = function(t) {
            var e = c.options.formattingFn(t);
            "INPUT" === c.d.tagName
              ? (this.d.value = e)
              : "text" === c.d.tagName || "tspan" === c.d.tagName
                ? (this.d.textContent = e)
                : (this.d.innerHTML = e);
          }),
          (c.count = function(t) {
            c.startTime || (c.startTime = t), (c.timestamp = t);
            var e = t - c.startTime;
            (c.remaining = c.duration - e),
              c.options.useEasing
                ? c.countDown
                  ? (c.frameVal =
                      c.startVal -
                      c.options.easingFn(
                        e,
                        0,
                        c.startVal - c.endVal,
                        c.duration
                      ))
                  : (c.frameVal = c.options.easingFn(
                      e,
                      c.startVal,
                      c.endVal - c.startVal,
                      c.duration
                    ))
                : c.countDown
                  ? (c.frameVal =
                      c.startVal - (c.startVal - c.endVal) * (e / c.duration))
                  : (c.frameVal =
                      c.startVal + (c.endVal - c.startVal) * (e / c.duration)),
              c.countDown
                ? (c.frameVal = c.frameVal < c.endVal ? c.endVal : c.frameVal)
                : (c.frameVal = c.frameVal > c.endVal ? c.endVal : c.frameVal),
              (c.frameVal = Math.round(c.frameVal * c.dec) / c.dec),
              c.printValue(c.frameVal),
              e < c.duration
                ? (c.rAF = requestAnimationFrame(c.count))
                : c.callback && c.callback();
          }),
          (c.start = function(t) {
            c.initialize() &&
              ((c.callback = t), (c.rAF = requestAnimationFrame(c.count)));
          }),
          (c.pauseResume = function() {
            c.paused
              ? ((c.paused = !1),
                delete c.startTime,
                (c.duration = c.remaining),
                (c.startVal = c.frameVal),
                requestAnimationFrame(c.count))
              : ((c.paused = !0), cancelAnimationFrame(c.rAF));
          }),
          (c.reset = function() {
            (c.paused = !1),
              delete c.startTime,
              (c.initialized = !1),
              c.initialize() &&
                (cancelAnimationFrame(c.rAF), c.printValue(c.startVal));
          }),
          (c.update = function(t) {
            if (c.initialize()) {
              if (((t = Number(t)), !l(t)))
                return void (c.error =
                  "[CountUp] update() - new endVal is not a number: " + t);
              (c.error = ""),
                t !== c.frameVal &&
                  (cancelAnimationFrame(c.rAF),
                  (c.paused = !1),
                  delete c.startTime,
                  (c.startVal = c.frameVal),
                  (c.endVal = t),
                  (c.countDown = c.startVal > c.endVal),
                  (c.rAF = requestAnimationFrame(c.count)));
            }
          }),
          c.initialize() && c.printValue(c.startVal);
      };
      return n;
    });
  },
  function(t, e) {
    (function(t) {
      "use strict";
      function e(e) {
        var i = e,
          n = jQuery(".header-inner").width();
        if (n < 750) return !1;
        var o = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
          ),
          r = i.offset().left - (o - n) / 2;
        t.flatsomeVars.rtl &&
          (r =
            jQuery(window).width() -
            (i.offset().left + i.outerWidth()) -
            (o - n) / 2);
        var s = i.width(),
          a = n - (r + s),
          l = !1;
        r > a && r < s && (l = (r + a) / 3),
          a < 0 && (l = -a),
          l && t.flatsomeVars.rtl
            ? i.css("margin-right", -l)
            : l && i.css("margin-left", -l),
          s > n && i.addClass("nav-dropdown-full");
      }
      Flatsome.behavior("dropdown", {
        attach: function(t) {
          jQuery(".nav li.has-dropdown", t).each(function(t, i) {
            var n = jQuery(i),
              o = !1,
              r = !1;
            n.on("touchstart click", function(t) {
              "touchstart" === t.type && (o = !0),
                "click" === t.type &&
                  o &&
                  (o && !r && t.preventDefault(), (r = !0));
            }),
              n.hoverIntent({
                sensitivity: 3,
                interval: 20,
                timeout: 70,
                over: function(t) {
                  n.addClass("current-dropdown"), e(n.find(".nav-dropdown"));
                },
                out: function() {
                  (r = !1),
                    (o = !1),
                    n.find(".nav-dropdown").attr("style", ""),
                    n.removeClass("current-dropdown");
                }
              });
          });
        }
      });
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lightbox-gallery", {
      attach: function(t) {
        jQuery(
          '.lightbox .gallery a[href*=".jpg"], .lightbox .gallery a[href*=".jpeg"], .lightbox a.lightbox-gallery',
          t
        )
          .parent()
          .magnificPopup({
            delegate: "a",
            type: "image",
            closeBtnInside: !1,
            tLoading: '<div class="loading-spin centered dark"></div>',
            removalDelay: 300,
            gallery: {
              enabled: !0,
              navigateByImgClick: !0,
              arrowMarkup:
                '<button class="mfp-arrow mfp-arrow-%dir%" title="%title%"><i class="icon-angle-%dir%"></i></button>',
              preload: [0, 1]
            },
            image: {
              tError:
                '<a href="%url%">The image #%curr%</a> could not be loaded.',
              verticalFit: !1
            }
          });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lightbox-image", {
      attach: function(t) {
        jQuery(
          '.lightbox *[id^="attachment"] a,.lightbox a.image-lightbox,.lightbox .entry-content a[href*=".jpg"],.lightbox .entry-content a[href*=".jpeg"]',
          t
        )
          .not(
            '.lightbox a.lightbox-gallery, .lightbox .gallery a[href*=".jpg"],.lightbox .gallery a[href*=".jpeg"]'
          )
          .magnificPopup({
            type: "image",
            tLoading: '<div class="loading-spin centered dark"></div>',
            closeOnContentClick: !0,
            closeBtnInside: !1,
            removalDelay: 300,
            image: { verticalFit: !1 }
          });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lightboxes-link", {
      attach: function(t) {
        jQuery(".lightbox-by-id", t).each(function() {
          var e = jQuery(this).attr("id");
          jQuery('a[href="#' + e + '"]', t).on("click", function(t) {
            var e = jQuery(t.currentTarget),
              i = e.attr("href").substring(1),
              n = jQuery("#" + i + ".lightbox-by-id");
            if (i && n.length > 0) {
              var o = n[0],
                r = jQuery.magnificPopup.open ? 300 : 0;
              r && jQuery.magnificPopup.close(),
                setTimeout(function() {
                  jQuery.magnificPopup.open({
                    removalDelay: 300,
                    closeBtnInside: !1,
                    items: {
                      src: o,
                      type: "inline",
                      tLoading: '<div class="loading-spin dark"></div>'
                    }
                  });
                }, r),
                t.preventDefault();
            }
          });
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lightbox-video", {
      attach: function(t) {
        jQuery(
          'a.open-video, a.button[href*="vimeo"], a.button[href*="youtube.com/watch"]',
          t
        ).magnificPopup({
          type: "iframe",
          closeBtnInside: !1,
          mainClass: "my-mfp-video",
          tLoading: '<div class="loading-spin centered dark"></div>',
          removalDelay: 300,
          preloader: !0,
          callbacks: {
            open: function() {
              jQuery(".slider .is-selected .video").trigger("pause");
            },
            close: function() {
              jQuery(".slider .is-selected .video").trigger("play");
            }
          }
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lightboxes", {
      attach: function(t) {
        jQuery("[data-open]", t).on("click", function(t) {
          var e = jQuery(t.currentTarget),
            i = e.data("open"),
            n = e.data("color"),
            o = e.data("bg"),
            r = e.data("pos"),
            s = e.data("visible-after"),
            a = e.data("class"),
            l = e.attr("data-focus");
          e.offset();
          e.addClass("current-lightbox-clicked"),
            jQuery.magnificPopup.open({
              items: {
                src: i,
                type: "inline",
                tLoading: '<div class="loading-spin dark"></div>'
              },
              removalDelay: 300,
              closeBtnInside: !1,
              focus: l,
              callbacks: {
                beforeOpen: function() {
                  this.st.mainClass = "off-canvas " + n + " off-canvas-" + r;
                },
                open: function() {
                  jQuery("html").addClass("has-off-canvas"),
                    jQuery("html").addClass("has-off-canvas-" + r),
                    a && jQuery(".mfp-content").addClass(a),
                    o && jQuery(".mfp-bg").addClass(o),
                    jQuery(".mfp-content .resize-select").change(),
                    jQuery.fn.packery &&
                      jQuery("[data-packery-options], .has-packery").packery(
                        "layout"
                      );
                },
                beforeClose: function() {
                  jQuery("html").removeClass("has-off-canvas");
                },
                afterClose: function() {
                  jQuery("html").removeClass("has-off-canvas-" + r),
                    jQuery(".current-lightbox-clicked").removeClass(
                      "current-lightbox-clicked"
                    ),
                    s && jQuery(i).removeClass("mfp-hide");
                }
              }
            }),
            t.preventDefault();
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("slider", {
      attach: function(t) {
        var e;
        (e = jQuery(t).data("flickityOptions")
          ? jQuery(t)
          : jQuery("[data-flickity-options]", t)),
          e.each(function(t, e) {
            var i = jQuery(e),
              n = i.closest(".slider-wrapper"),
              o = i.data("flickity-options");
            if (
              ("undefined" != typeof UxBuilder && (o.draggable = !1),
              o.watchCSS !== !0)
            ) {
              var r = i.flickity(o);
              if (
                (i.imagesLoaded(function() {
                  n.find(".loading-spin").fadeOut();
                }),
                i.on("cellSelect.flickity", function() {
                  i
                    .find(".banner:not(.is-selected) .video-bg")
                    .trigger("pause"),
                    i.find(".banner.is-selected .video-bg").trigger("play");
                }),
                i.on("dragStart.flickity", function() {
                  i.addClass("is-dragging");
                }),
                i.on("dragEnd.flickity", function() {
                  i.removeClass("is-dragging");
                }),
                o.parallax)
              ) {
                var s = r.data("flickity"),
                  a = i.find(".bg, .flickity-slider > .img img");
                i.addClass("slider-has-parallax"),
                  i.on("scroll.flickity", function(t, e) {
                    s.slides.forEach(function(t, e) {
                      var i = a[e],
                        n = (t.target + s.x) * -1 / o.parallax;
                      i && (i.style.transform = "translateX( " + n + "px)");
                    });
                  });
              }
            }
          });
      },
      detach: function(t) {
        jQuery(t).data("flickityOptions")
          ? jQuery(t).flickity("destroy")
          : jQuery("[data-flickity-options]", t).flickity("destroy");
      }
    });
  },
  function(t, e) {
    "use strict";
    function i(t, e, i) {
      e.each(function(e, i) {
        return jQuery(i)
          .parent()
          .toggleClass("active", e === t);
      }),
        i.each(function(e, i) {
          return jQuery(i).toggleClass("active", e === t);
        }),
        jQuery("[data-flickity-options]", i[t]).flickity("resize");
    }
    Flatsome.behavior("tabs", {
      attach: function(t) {
        jQuery(".tabbed-content", t).each(function(t, e) {
          var n = jQuery(e),
            o = n.find("> .nav > li > a"),
            r = n.find("> .tab-panels > .panel");
          r.removeAttr("style"),
            o.each(function(t, e) {
              location.hash.substr(1).length &&
                "reviews" === location.hash.substr(1) &&
                (jQuery.scrollTo(".reviews_tab", {
                  duration: 300,
                  offset: -150
                }),
                i(t, o, r)),
                location.hash.substr(1).length &&
                  location.hash.substr(1) === e.hash.substr(1) &&
                  i(t, o, r),
                jQuery(e).on("click", function(e) {
                  i(t, o, r), e.preventDefault(), e.stopPropagation();
                });
            });
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("toggle", {
      attach: function(t) {
        jQuery(
          ".widget ul.children, .nav ul.children, .menu .sub-menu",
          t
        ).each(function() {
          jQuery(this)
            .parent()
            .addClass("has-child")
            .attr("aria-expanded", "false"),
            jQuery(this).before(
              '<button class="toggle"><i class="icon-angle-down"></i></button>'
            );
        }),
          jQuery(".current-cat-parent", t)
            .addClass("active")
            .attr("aria-expanded", "true")
            .removeClass("current-cat-parent"),
          jQuery(".toggle", t).click(function(t) {
            var e = jQuery(this);
            e.parent().toggleClass("active"),
              e
                .parent()
                .attr(
                  "aria-expanded",
                  "false" === e.parent().attr("aria-expanded")
                    ? "true"
                    : "false"
                ),
              t.preventDefault();
          }),
          jQuery(".sidebar-menu li.menu-item.has-child", t).each(function() {
            var t = jQuery(this),
              e = t.find("> a:first");
            "#" === e.attr("href") &&
              e.click(function(e) {
                e.preventDefault(),
                  t.toggleClass("active"),
                  t.attr(
                    "aria-expanded",
                    "false" === t.attr("aria-expanded") ? "true" : "false"
                  );
              });
          });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("back-to-top", {
      attach: function(t) {
        jQuery("body", t).waypoint({
          handler: function(e) {
            jQuery(".back-to-top", t).toggleClass("active");
          },
          offset: "-100%"
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("scroll-to", {
      attach: function() {
        var t = jQuery("span.scroll-to"),
          e = jQuery(".scroll-to-bullets"),
          i = flatsomeVars.sticky_height;
        if (
          (e.length && (e.children().tooltipster("destroy"), e.remove()),
          jQuery("li.scroll-to-link").remove(),
          t.length &&
            ((e = jQuery('<div class="scroll-to-bullets hide-for-medium"/>')),
            jQuery("body").append(e),
            t.each(function(t, e) {
              var n = jQuery(e),
                o = n.data("link"),
                r = n.data("title"),
                s = n.data("bullet"),
                a = 'a[href*="' + (o || "<nolink>") + '"]';
              if (s) {
                var l = jQuery(
                  '\n          <a href="' +
                    o +
                    '" data-title="' +
                    r +
                    '" title="' +
                    r +
                    '">\n          <strong></strong>\n          </a>\n        '
                );
                l.tooltipster({
                  position: "left",
                  delay: 50,
                  contentAsHTML: !0,
                  touchDevices: !1
                }),
                  jQuery(".scroll-to-bullets").append(l);
              }
              var c = jQuery(
                '\n          <li class="scroll-to-link"><a data-animate="fadeIn" href="' +
                  o +
                  '" data-title="' +
                  r +
                  '" title="' +
                  r +
                  '">\n          ' +
                  r +
                  "\n          </a></li>\n        "
              );
              jQuery("li.nav-single-page").before(c),
                setTimeout(function() {
                  jQuery(".scroll-to-link a").attr("data-animated", "true");
                }, 300),
                n.waypoint(
                  function(t) {
                    jQuery(".scroll-to-bullets a, .scroll-to-link").removeClass(
                      "active"
                    ),
                      jQuery(".scroll-to-bullets")
                        .find(a)
                        .addClass("active"),
                      jQuery(".nav-single-page")
                        .parent()
                        .find(a)
                        .parent()
                        .addClass("active"),
                      "up" === t &&
                        jQuery(".scroll-to-bullets, .nav-single-page")
                          .find(a)
                          .removeClass("active")
                          .prev()
                          .addClass("active");
                  },
                  { offset: i }
                ),
                jQuery(a)
                  .off("click")
                  .on("click", function(t) {
                    var e = jQuery(this)
                      .attr("href")
                      .split("#")[1];
                    if (e) {
                      var n = "\\#" + e,
                        o = "span.scroll-to[data-link=" + n + "]",
                        r = jQuery(o).offset().top - i;
                      jQuery.scrollTo(r, { duration: 500, axis: "y" }),
                        jQuery.magnificPopup.close(),
                        t.preventDefault();
                    }
                  });
            }),
            location.hash))
        ) {
          var n = location.hash.replace("#", "");
          jQuery.scrollTo("a[name=" + n + "]", {
            duration: 500,
            axis: "y",
            offset: -i
          });
        }
      },
      detach: function() {
        jQuery("span.scroll-to").length && setTimeout(this.attach, 0);
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("accordion", {
      attach: function(t) {
        jQuery(".accordion", t).each(function() {
          var t = jQuery(this).attr("rel");
          t > 0 &&
            (jQuery(this)
              .find(".accordion-item:nth-child(" + t + ") .accordion-inner")
              .show(),
            jQuery(this)
              .find(".accordion-item:nth-child(" + t + ") .accordion-inner")
              .prev()
              .addClass("active"));
        });
      }
    }),
      Flatsome.behavior("accordion-title", {
        attach: function(t) {
          jQuery(".accordion-title", t).each(function(t) {
            jQuery(this).click(function(t) {
              jQuery(this)
                .next()
                .is(":hidden")
                ? (jQuery(this)
                    .parent()
                    .parent()
                    .find(".accordion-title")
                    .removeClass("active")
                    .next()
                    .slideUp(200),
                  jQuery(this)
                    .toggleClass("active")
                    .next()
                    .slideDown(200, function() {
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                        navigator.userAgent
                      ) &&
                        jQuery.scrollTo(jQuery(this).prev(), {
                          duration: 300,
                          offset: -100
                        });
                    }),
                  jQuery(this)
                    .parent()
                    .parent()
                    .find("[data-flickity-options]")
                    .flickity("resize"))
                : jQuery(this)
                    .parent()
                    .parent()
                    .find(".accordion-title")
                    .removeClass("active")
                    .next()
                    .slideUp(200),
                t.preventDefault();
            });
          });
        }
      });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("tooltips", {
      attach: function(t) {
        jQuery(
          ".tooltip, .has-tooltip, .tip-top, li.chosen a",
          t
        ).tooltipster(),
          jQuery(".tooltip-as-html", t).tooltipster({
            interactive: !0,
            contentAsHTML: !0
          });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("lazy-load-bg", {
      attach: function(t) {
        jQuery(".bg", t).each(function(t, e) {
          var i = jQuery(e);
          i.waypoint(
            function(t) {
              i.addClass("bg-loaded");
            },
            { offset: "110%" }
          );
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("sticky-section", {
      attach: function(t) {
        jQuery(".sticky-section", t).each(function(t, e) {
          var i = jQuery(e);
          i.waypoint(
            function(t) {
              "down" === t &&
                (i.addClass("is-sticky-section"),
                i.after('<div class="sticky-section-helper"></div>')),
                "up" === t &&
                  (i.removeClass("is-sticky-section"),
                  i.next(".sticky-section-helper").remove());
            },
            { offset: "0.1px" }
          ),
            i.waypoint(
              function(t) {
                "down" === t &&
                  (i.removeClass("is-sticky-section"),
                  i.next(".sticky-section-helper").remove()),
                  "up" === t &&
                    (i.addClass("is-sticky-section"),
                    i.after('<div class="sticky-section-helper"></div>'));
              },
              { offset: "-100%" }
            );
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("sticky-sidebar", {
      attach: function(t) {
        var e = parseInt(flatsomeVars.sticky_height) + 15;
        jQuery(".is-sticky-column", t).each(function(t, i) {
          jQuery(i).stickySidebar({
            topSpacing: e,
            bottomSpacing: 15,
            minWidth: 850,
            innerWrapperSelector: ".is-sticky-column__inner"
          }),
            jQuery(document).on("updated_checkout", function() {
              jQuery(i).stickySidebar("updateSticky");
            });
        });
      }
    });
  },
  function(t, e) {
    "use strict";
    Flatsome.behavior("youtube", {
      attach: function(t) {
        var e = jQuery(".ux-youtube", t);
        0 !== e.length &&
          ((window.onYouTubePlayerAPIReady = function() {
            e.each(function() {
              var t = jQuery(this),
                e = t.attr("id"),
                i = t.data("videoid"),
                n = t.data("loop"),
                o = t.data("audio");
              new YT.Player(e, {
                height: "100%",
                width: "100%",
                playerVars: {
                  html5: 1,
                  autoplay: 1,
                  controls: 0,
                  rel: 0,
                  modestbranding: 1,
                  playsinline: 1,
                  showinfo: 0,
                  fs: 0,
                  loop: n,
                  el: 0,
                  playlist: n ? i : void 0
                },
                videoId: i,
                events: {
                  onReady: function(t) {
                    0 === o && t.target.mute();
                  }
                }
              });
            });
          }),
          (function(t, e, i) {
            var n,
              o = t.getElementsByTagName(e)[0];
            t.getElementById(i) ||
              ((n = t.createElement(e)),
              (n.id = i),
              (n.src = "https://www.youtube.com/player_api"),
              o.parentNode.insertBefore(n, o));
          })(document, "script", "youtube-jssdk"));
      }
    });
  }
]);
!(function(t) {
  function e(o) {
    if (i[o]) return i[o].exports;
    var r = (i[o] = { exports: {}, id: o, loaded: !1 });
    return t[o].call(r.exports, r, r.exports, e), (r.loaded = !0), r.exports;
  }
  var i = {};
  return (e.m = t), (e.c = i), (e.p = ""), e(0);
})({
  0: function(t, e, i) {
    t.exports = i(119);
  },
  16: function(t, e) {
    t.exports = window.jQuery;
  },
  119: function(t, e, i) {
    "use strict";
    function o(t) {
      if (jQuery(".cart-item .nav-dropdown").length)
        jQuery(".cart-item").addClass("current-dropdown cart-active"),
          jQuery(".shop-container").click(function() {
            jQuery(".cart-item").removeClass("current-dropdown cart-active");
          }),
          jQuery(".cart-item").hover(function() {
            jQuery(".cart-active").removeClass("cart-active");
          }),
          setTimeout(function() {
            jQuery(".cart-active").removeClass("current-dropdown");
          }, t);
      else {
        var e = jQuery.magnificPopup.open ? 0 : 300;
        e && jQuery.magnificPopup.close(),
          setTimeout(function() {
            jQuery(".cart-item .off-canvas-toggle").click();
          }, e);
      }
    }
    i(120), i(121), i(122), i(123), i(124);
    var r = !1;
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
      (r = jQuery(".has-image-zoom .slide").easyZoom({
        loadingNotice: "",
        preventClicks: !1
      })),
      jQuery("table.my_account_orders").wrap(
        '<div class="touch-scroll-table"/>'
      ),
      jQuery("a.woocommerce-review-link").click(function(t) {
        jQuery.scrollTo(".reviews_tab", { duration: 300, offset: -150 });
      }),
      jQuery(".single_add_to_cart_button").click(function() {
        var t = jQuery(this),
          e = t.closest("form.cart");
        e
          ? e.on("submit", function() {
              t.addClass("loading");
            })
          : t.hasClass("disabled") || t.addClass("loading");
      });
    var a = jQuery(".product-thumbnails .first img").attr("data-src")
        ? jQuery(".product-thumbnails .first img").attr("data-src")
        : jQuery(".product-thumbnails .first img").attr("src"),
      s = jQuery("form.variations_form"),
      n = null,
      c = {
        setImageZoomSrc: function() {
          r &&
            r.length &&
            ((n = r.filter(".has-image-zoom .slide.first").data("easyZoom")),
            n.swap(
              jQuery(".has-image-zoom .slide.first img").attr("src"),
              jQuery(".has-image-zoom .slide.first img").attr(
                "data-large_image"
              )
            ));
        },
        selectSliderFirstImage: function() {
          jQuery(".product-gallery-slider").data("flickity") &&
            jQuery(".product-gallery-slider").flickity("select", 0);
        }
      };
    s.on("show_variation", function(t, e) {
      e.hasOwnProperty("image") && e.image.thumb_src
        ? (jQuery(
            ".product-gallery-slider-old .slide.first img, .sticky-add-to-cart-img, .product-thumbnails .first img, .product-gallery-slider .slide.first .zoomImg"
          )
            .attr("src", e.image.thumb_src)
            .attr("srcset", ""),
          c.selectSliderFirstImage(),
          c.setImageZoomSrc())
        : jQuery(".product-thumbnails .first img").attr("src", a);
    }),
      s.on("click", ".reset_variations", function() {
        jQuery(".product-thumbnails .first img, .sticky-add-to-cart-img").attr(
          "src",
          a
        ),
          c.selectSliderFirstImage(),
          c.setImageZoomSrc();
      }),
      jQuery(document).ready(function() {
        jQuery(".has-lightbox .product-gallery-slider").each(function() {
          jQuery(this).magnificPopup({
            delegate: "a",
            type: "image",
            tLoading: '<div class="loading-spin centered dark"></div>',
            closeBtnInside: !1,
            gallery: {
              enabled: !0,
              navigateByImgClick: !0,
              preload: [0, 1],
              arrowMarkup:
                '<button class="mfp-arrow mfp-arrow-%dir%" title="%title%"><i class="icon-angle-%dir%"></i></button>'
            },
            image: {
              tError:
                '<a href="%url%">The image #%curr%</a> could not be loaded.',
              verticalFit: !1
            }
          });
        });
      }),
      jQuery(".zoom-button").click(function(t) {
        jQuery(".product-gallery-slider")
          .find(".is-selected a")
          .click(),
          t.preventDefault();
      }),
      jQuery("body").on("added_to_cart", function() {
        o("5000");
      }),
      jQuery(document.body).on("updated_cart_totals", function() {
        var t = jQuery(".cart-wrapper");
        Flatsome.attach("lazy-load-images", t),
          Flatsome.attach("quick-view", t),
          Flatsome.attach("wishlist", t),
          Flatsome.attach("cart-refresh", t);
      }),
      jQuery(document).ajaxComplete(function() {
        Flatsome.attach(jQuery(".quantity").parent());
      }),
      jQuery(document).on("yith_infs_adding_elem", function(t) {
        Flatsome.attach(jQuery(".shop-container"));
      }),
      jQuery(document).ready(function() {
        jQuery("span.added-to-cart").length && o("5000");
      }),
      jQuery(".disable-lightbox a").click(function(t) {
        t.preventDefault();
      }),
      jQuery(document).ready(function() {
        jQuery("body").hasClass("single-product") &&
          window.location.hash.indexOf("#comment-") >= 0 &&
          jQuery("a", ".reviews_tab.active").trigger("click");
      }),
      jQuery(document).ready(function() {
        if (jQuery(".custom-product-page").length) {
          var t = jQuery("#respond p.stars");
          if (t.length > 1) {
            var e = t[0].outerHTML;
            t.remove(),
              jQuery('select[id="rating"]')
                .hide()
                .before(e);
          }
        }
      }),
      jQuery(".sticky-add-to-cart-wrapper").waypoint(function(t) {
        var e = jQuery(this.element),
          i = jQuery(this.element).find(".sticky-add-to-cart");
        jQuery(".wc-variation-selection-needed").click(function() {
          jQuery.scrollTo(".sticky-add-to-cart-wrapper", {
            duration: 0,
            offset: -200
          });
        }),
          "down" === t &&
            (e.css({ height: e.outerHeight() }),
            i.addClass("sticky-add-to-cart--active"),
            jQuery("body").addClass("has-sticky-product-cart")),
          "up" === t &&
            (i.removeClass("sticky-add-to-cart--active"),
            e.css({ height: "auto" }),
            jQuery("body").removeClass("has-sticky-product-cart"));
      }),
      setTimeout(function() {
        jQuery(document.body).on("country_to_state_changed", function() {
          "undefined" != typeof floatlabels && floatlabels.rebuild();
        });
      }, 500);
  },
  120: function(t, e, i) {
    var o, r;
    /*!
     * @name        easyzoom
     * @author       <>
     * @modified    Wednesday, October 3rd, 2018
     * @version     2.5.0
     */
    !(function(a, s) {
      "use strict";
      (o = [i(16)]),
        (r = function(t) {
          s(t);
        }.apply(e, o)),
        !(void 0 !== r && (t.exports = r));
    })(this, function(t) {
      "use strict";
      function e(e, i) {
        (this.$target = t(e)),
          (this.opts = t.extend({}, c, i, this.$target.data())),
          void 0 === this.isOpen && this._init();
      }
      var i,
        o,
        r,
        a,
        s,
        n,
        c = {
          loadingNotice: "Loading image",
          errorNotice: "The image could not be loaded",
          errorDuration: 2500,
          linkAttribute: "href",
          preventClicks: !0,
          beforeShow: t.noop,
          beforeHide: t.noop,
          onShow: t.noop,
          onHide: t.noop,
          onMove: t.noop
        };
      (e.prototype._init = function() {
        (this.$link = this.$target.find("a")),
          (this.$image = this.$target.find("img")),
          (this.$flyout = t('<div class="easyzoom-flyout" />')),
          (this.$notice = t('<div class="easyzoom-notice" />')),
          this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": t.proxy(
              this._onMove,
              this
            ),
            "mouseleave.easyzoom touchend.easyzoom": t.proxy(
              this._onLeave,
              this
            ),
            "mouseenter.easyzoom touchstart.easyzoom": t.proxy(
              this._onEnter,
              this
            )
          }),
          this.opts.preventClicks &&
            this.$target.on("click.easyzoom", function(t) {
              t.preventDefault();
            });
      }),
        (e.prototype.show = function(t, e) {
          var s = this;
          if (!1 !== this.opts.beforeShow.call(this)) {
            if (!this.isReady)
              return this._loadImage(
                this.$link.attr(this.opts.linkAttribute),
                function() {
                  (!s.isMouseOver && e) || s.show(t);
                }
              );
            this.$target.append(this.$flyout);
            var n = this.$target.outerWidth(),
              c = this.$target.outerHeight(),
              u = this.$flyout.width(),
              l = this.$flyout.height(),
              d = this.$zoom.width(),
              h = this.$zoom.height();
            (i = d - u) < 0 && (i = 0),
              (o = h - l) < 0 && (o = 0),
              (r = i / n),
              (a = o / c),
              (this.isOpen = !0),
              this.opts.onShow.call(this),
              t && this._move(t);
          }
        }),
        (e.prototype._onEnter = function(t) {
          var e = t.originalEvent.touches;
          (this.isMouseOver = !0),
            (e && 1 != e.length) || (t.preventDefault(), this.show(t, !0));
        }),
        (e.prototype._onMove = function(t) {
          this.isOpen && (t.preventDefault(), this._move(t));
        }),
        (e.prototype._onLeave = function() {
          (this.isMouseOver = !1), this.isOpen && this.hide();
        }),
        (e.prototype._onLoad = function(t) {
          t.currentTarget.width &&
            ((this.isReady = !0),
            this.$notice.detach(),
            this.$flyout.html(this.$zoom),
            this.$target.removeClass("is-loading").addClass("is-ready"),
            t.data.call && t.data());
        }),
        (e.prototype._onError = function() {
          var t = this;
          this.$notice.text(this.opts.errorNotice),
            this.$target.removeClass("is-loading").addClass("is-error"),
            (this.detachNotice = setTimeout(function() {
              t.$notice.detach(), (t.detachNotice = null);
            }, this.opts.errorDuration));
        }),
        (e.prototype._loadImage = function(e, i) {
          var o = new Image();
          this.$target
            .addClass("is-loading")
            .append(this.$notice.text(this.opts.loadingNotice)),
            (this.$zoom = t(o)
              .on("error", t.proxy(this._onError, this))
              .on("load", i, t.proxy(this._onLoad, this))),
            (o.style.position = "absolute"),
            (o.src = e);
        }),
        (e.prototype._move = function(t) {
          if (0 === t.type.indexOf("touch")) {
            var e = t.touches || t.originalEvent.touches;
            (s = e[0].pageX), (n = e[0].pageY);
          } else (s = t.pageX || s), (n = t.pageY || n);
          var c = this.$target.offset(),
            u = n - c.top,
            l = s - c.left,
            d = Math.ceil(u * a),
            h = Math.ceil(l * r);
          if (h < 0 || d < 0 || i < h || o < d) this.hide();
          else {
            var p = -1 * d,
              m = -1 * h;
            this.$zoom.css({ top: p, left: m }),
              this.opts.onMove.call(this, p, m);
          }
        }),
        (e.prototype.hide = function() {
          this.isOpen &&
            !1 !== this.opts.beforeHide.call(this) &&
            (this.$flyout.detach(),
            (this.isOpen = !1),
            this.opts.onHide.call(this));
        }),
        (e.prototype.swap = function(e, i, o) {
          this.hide(),
            (this.isReady = !1),
            this.detachNotice && clearTimeout(this.detachNotice),
            this.$notice.parent().length && this.$notice.detach(),
            this.$target.removeClass("is-loading is-ready is-error"),
            this.$image.attr({ src: e, srcset: t.isArray(o) ? o.join() : o }),
            this.$link.attr(this.opts.linkAttribute, i);
        }),
        (e.prototype.teardown = function() {
          this.hide(),
            this.$target
              .off(".easyzoom")
              .removeClass("is-loading is-ready is-error"),
            this.detachNotice && clearTimeout(this.detachNotice),
            delete this.$link,
            delete this.$zoom,
            delete this.$image,
            delete this.$notice,
            delete this.$flyout,
            delete this.isOpen,
            delete this.isReady;
        }),
        (t.fn.easyZoom = function(i) {
          return this.each(function() {
            var o = t.data(this, "easyZoom");
            o
              ? void 0 === o.isOpen && o._init()
              : t.data(this, "easyZoom", new e(this, i));
          });
        });
    });
  },
  121: function(t, e) {
    "use strict";
    Flatsome.plugin("addQty", function(t, e) {
      var i = jQuery(t);
      i.on("click", ".plus, .minus", function() {
        var t = jQuery(this),
          e = t.closest(".quantity").find(".qty"),
          i = parseFloat(e.val()),
          o = parseFloat(e.attr("max")),
          r = parseFloat(e.attr("min")),
          a = e.attr("step");
        (i && "" !== i && "NaN" !== i) || (i = 0),
          ("" !== o && "NaN" !== o) || (o = ""),
          ("" !== r && "NaN" !== r) || (r = 0),
          ("any" !== a &&
            "" !== a &&
            void 0 !== a &&
            "NaN" !== parseFloat(a)) ||
            (a = 1),
          t.is(".plus")
            ? o && (o === i || i > o)
              ? e.val(o)
              : e.val(i + parseFloat(a))
            : r && (r === i || i < r)
              ? e.val(r)
              : i > 0 && e.val(i - parseFloat(a)),
          e.trigger("change");
      });
    });
  },
  122: function(t, e) {
    "use strict";
    Flatsome.behavior("add-qty", {
      attach: function(t) {
        jQuery(".quantity", t).addQty();
      }
    });
  },
  123: function(t, e) {
    "use strict";
    Flatsome.behavior("equalize-box", {
      attach: function() {
        var t = {
          productCount: 0,
          ScreenSize: { LARGE: 1, MEDIUM: 2, SMALL: 3 },
          equalize: function(t, e) {
            (this.colPerRow = this.getColsPerRow(t)),
              1 !== this.colPerRow &&
                ((this.maxHeight = 0),
                (this.rowEnd = this.colPerRow),
                (this.$elements = []),
                (this.rating = {
                  present: !1,
                  height: 0,
                  dummy:
                    '<div class="js-star-rating star-rating" style="opacity: 0; visibility: hidden"></div>'
                }),
                this.loop(e));
          },
          getColsPerRow: function(t) {
            var e = jQuery(".shop-container .products").attr("class"),
              i = /large-columns-(\d+)/g,
              o = /medium-columns-(\d+)/g,
              r = /small-columns-(\d+)/g,
              a = void 0;
            switch (t) {
              case this.ScreenSize.LARGE:
                return (a = i.exec(e)), a ? parseInt(a[1]) : 3;
              case this.ScreenSize.MEDIUM:
                return (a = o.exec(e)), a ? parseInt(a[1]) : 3;
              case this.ScreenSize.SMALL:
                return (a = r.exec(e)), a ? parseInt(a[1]) : 2;
            }
          },
          maybeAddDummyRating: function(t) {
            var e = t;
            this.rating.present &&
              e.hasClass("price-wrapper") &&
              (e.children(".star-rating").length ||
                (e.prepend(this.rating.dummy),
                e.children(".js-star-rating").height(this.rating.height)));
          },
          loop: function(t) {
            var e = this;
            jQuery(t).each(function(t) {
              var i = jQuery(this);
              e.$elements.push(i),
                i.height(""),
                i.height() > e.maxHeight && (e.maxHeight = i.height()),
                i.children(".js-star-rating").remove();
              var o = i.children(".star-rating");
              o.length &&
                ((e.rating.present = !0), (e.rating.height = o.height())),
                (t !== e.rowEnd - 1 && t !== e.productCount - 1) ||
                  (e.$elements.forEach(function(t) {
                    t.height(e.maxHeight), e.maybeAddDummyRating(t);
                  }),
                  (e.rowEnd += e.colPerRow),
                  (e.maxHeight = 0),
                  (e.$elements = []),
                  (e.rating.present = !1));
            });
          },
          getScreenSize: function() {
            return window.matchMedia("(min-width: 850px)").matches
              ? this.ScreenSize.LARGE
              : window.matchMedia("(min-width: 550px) and (max-width: 849px)")
                  .matches
                ? this.ScreenSize.MEDIUM
                : window.matchMedia("(max-width: 549px)").matches
                  ? this.ScreenSize.SMALL
                  : void 0;
          },
          init: function() {
            if (jQuery(".products.equalize-box").length) {
              var t = this;
              if (
                ((this.productCount = jQuery(
                  ".products .product-small.box"
                ).length),
                this.productCount)
              ) {
                var e = [
                    ".products .box-text .product-title",
                    ".products .box-text .price-wrapper",
                    ".products .box-text .box-excerpt",
                    ".products .box-text .add-to-cart-button"
                  ],
                  i = t.getScreenSize();
                e.forEach(function(e) {
                  t.equalize(i, e);
                });
              }
            }
          }
        };
        t.init(),
          jQuery(window).resize(function() {
            t.init();
          });
      }
    });
  },
  124: function(t, e) {
    "use strict";
    Flatsome.behavior("quick-view", {
      attach: function(t) {
        jQuery(".quick-view", t).each(function(t, e) {
          jQuery(e).hasClass("quick-view-added") ||
            (jQuery(e).click(function(t) {
              if ("" != jQuery(this).attr("data-prod")) {
                jQuery(this)
                  .parent()
                  .parent()
                  .addClass("processing");
                var e = jQuery(this).attr("data-prod"),
                  i = { action: "flatsome_quickview", product: e };
                jQuery.post(flatsomeVars.ajaxurl, i, function(t) {
                  jQuery(".processing").removeClass("processing"),
                    jQuery.magnificPopup.open({
                      removalDelay: 300,
                      closeBtnInside: !0,
                      autoFocusLast: !1,
                      items: {
                        src:
                          '<div class="product-lightbox lightbox-content">' +
                          t +
                          "</div>",
                        type: "inline"
                      }
                    });
                  var e = jQuery(".product-gallery-slider img", t).length,
                    i = e > 1;
                  setTimeout(function() {
                    jQuery(".product-lightbox").imagesLoaded(function() {
                      jQuery(".product-lightbox .slider").flickity({
                        cellAlign: "left",
                        wrapAround: !0,
                        autoPlay: !1,
                        prevNextButtons: !0,
                        adaptiveHeight: !0,
                        imagesLoaded: !0,
                        dragThreshold: 15,
                        pageDots: i
                      });
                    });
                  }, 300);
                  var o = jQuery(".product-lightbox form.variations_form");
                  jQuery(".product-lightbox form").hasClass(
                    "variations_form"
                  ) && o.wc_variation_form();
                  var r = jQuery(".product-lightbox .product-gallery-slider"),
                    a = jQuery(
                      ".product-lightbox .product-gallery-slider .slide.first img"
                    ),
                    s = jQuery(
                      ".product-lightbox .product-gallery-slider .slide.first a"
                    ),
                    n = a.attr("data-src") ? a.attr("data-src") : a.attr("src");
                  o.on("show_variation", function(t, e) {
                    e.image.src
                      ? (a.attr("src", e.image.src).attr("srcset", ""),
                        s.attr("href", e.image_link),
                        r.flickity("select", 0))
                      : e.image_src &&
                        (a.attr("src", e.image_src).attr("srcset", ""),
                        s.attr("href", e.image_link),
                        r.flickity("select", 0));
                  }),
                    o.on("click", ".reset_variations", function() {
                      a.attr("src", n).attr("srcset", ""),
                        r.flickity("select", 0);
                    }),
                    jQuery(".product-lightbox .quantity").addQty();
                }),
                  t.preventDefault();
              }
            }),
            jQuery(e).addClass("quick-view-added"));
        });
      }
    });
  }
});
!(function(a, b) {
  "use strict";
  function c() {
    if (!e) {
      e = !0;
      var a,
        c,
        d,
        f,
        g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
        h = !!navigator.userAgent.match(/Trident.*rv:11\./),
        i = b.querySelectorAll("iframe.wp-embedded-content");
      for (c = 0; c < i.length; c++) {
        if (((d = i[c]), !d.getAttribute("data-secret")))
          (f = Math.random()
            .toString(36)
            .substr(2, 10)),
            (d.src += "#?secret=" + f),
            d.setAttribute("data-secret", f);
        if (g || h)
          (a = d.cloneNode(!0)),
            a.removeAttribute("security"),
            d.parentNode.replaceChild(a, d);
      }
    }
  }
  var d = !1,
    e = !1;
  if (b.querySelector) if (a.addEventListener) d = !0;
  if (((a.wp = a.wp || {}), !a.wp.receiveEmbedMessage))
    if (
      ((a.wp.receiveEmbedMessage = function(c) {
        var d = c.data;
        if (d)
          if (d.secret || d.message || d.value)
            if (!/[^a-zA-Z0-9]/.test(d.secret)) {
              var e,
                f,
                g,
                h,
                i,
                j = b.querySelectorAll(
                  'iframe[data-secret="' + d.secret + '"]'
                ),
                k = b.querySelectorAll(
                  'blockquote[data-secret="' + d.secret + '"]'
                );
              for (e = 0; e < k.length; e++) k[e].style.display = "none";
              for (e = 0; e < j.length; e++)
                if (((f = j[e]), c.source === f.contentWindow)) {
                  if ((f.removeAttribute("style"), "height" === d.message)) {
                    if (((g = parseInt(d.value, 10)), g > 1e3)) g = 1e3;
                    else if (~~g < 200) g = 200;
                    f.height = g;
                  }
                  if ("link" === d.message)
                    if (
                      ((h = b.createElement("a")),
                      (i = b.createElement("a")),
                      (h.href = f.getAttribute("src")),
                      (i.href = d.value),
                      i.host === h.host)
                    )
                      if (b.activeElement === f) a.top.location.href = d.value;
                } else;
            }
      }),
      d)
    )
      a.addEventListener("message", a.wp.receiveEmbedMessage, !1),
        b.addEventListener("DOMContentLoaded", c, !1),
        a.addEventListener("load", c, !1);
})(window, document);
!(function(a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function(a) {
  "use strict";
  function b(a) {
    if (a instanceof Date) return a;
    if (String(a).match(g))
      return (
        String(a).match(/^[0-9]*$/) && (a = Number(a)),
        String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
        new Date(a)
      );
    throw new Error("Couldn't cast `" + a + "` to a date object.");
  }
  function c(a) {
    var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    return new RegExp(b);
  }
  function d(a) {
    return function(b) {
      var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (d)
        for (var f = 0, g = d.length; g > f; ++f) {
          var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            j = c(h[0]),
            k = h[1] || "",
            l = h[3] || "",
            m = null;
          (h = h[2]),
            i.hasOwnProperty(h) && ((m = i[h]), (m = Number(a[m]))),
            null !== m &&
              ("!" === k && (m = e(l, m)),
              "" === k && 10 > m && (m = "0" + m.toString()),
              (b = b.replace(j, m.toString())));
        }
      return (b = b.replace(/%%/, "%"));
    };
  }
  function e(a, b) {
    var c = "s",
      d = "";
    return (
      a &&
        ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
        1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
      1 === Math.abs(b) ? d : c
    );
  }
  var f = [],
    g = [],
    h = { precision: 100, elapse: !1 };
  g.push(/^[0-9]*$/.source),
    g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    (g = new RegExp(g.join("|")));
  var i = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      w: "weeks",
      d: "daysToWeek",
      D: "totalDays",
      H: "hours",
      M: "minutes",
      S: "seconds"
    },
    j = function(b, c, d) {
      (this.el = b),
        (this.$el = a(b)),
        (this.interval = null),
        (this.offset = {}),
        (this.options = a.extend({}, h)),
        (this.instanceNumber = f.length),
        f.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        d &&
          ("function" == typeof d
            ? (this.$el.on("update.countdown", d),
              this.$el.on("stoped.countdown", d),
              this.$el.on("finish.countdown", d))
            : (this.options = a.extend({}, h, d))),
        this.setFinalDate(c),
        this.start();
    };
  a.extend(j.prototype, {
    start: function() {
      null !== this.interval && clearInterval(this.interval);
      var a = this;
      this.update(),
        (this.interval = setInterval(function() {
          a.update.call(a);
        }, this.options.precision));
    },
    stop: function() {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent("stoped");
    },
    toggle: function() {
      this.interval ? this.stop() : this.start();
    },
    pause: function() {
      this.stop();
    },
    resume: function() {
      this.start();
    },
    remove: function() {
      this.stop.call(this),
        (f[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance;
    },
    setFinalDate: function(a) {
      this.finalDate = b(a);
    },
    update: function() {
      if (0 === this.$el.closest("html").length) return void this.remove();
      var b,
        c = void 0 !== a._data(this.el, "events"),
        d = new Date();
      (b = this.finalDate.getTime() - d.getTime()),
        (b = Math.ceil(b / 1e3)),
        (b = !this.options.elapse && 0 > b ? 0 : Math.abs(b)),
        this.totalSecsLeft !== b &&
          c &&
          ((this.totalSecsLeft = b),
          (this.elapsed = d >= this.finalDate),
          (this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToMonth: Math.floor(
              (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
            ),
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
            years: Math.abs(this.finalDate.getFullYear() - d.getFullYear())
          }),
          this.options.elapse || 0 !== this.totalSecsLeft
            ? this.dispatchEvent("update")
            : (this.stop(), this.dispatchEvent("finish")));
    },
    dispatchEvent: function(b) {
      var c = a.Event(b + ".countdown");
      (c.finalDate = this.finalDate),
        (c.elapsed = this.elapsed),
        (c.offset = a.extend({}, this.offset)),
        (c.strftime = d(this.offset)),
        this.$el.trigger(c);
    }
  }),
    (a.fn.countdown = function() {
      var b = Array.prototype.slice.call(arguments, 0);
      return this.each(function() {
        var c = a(this).data("countdown-instance");
        if (void 0 !== c) {
          var d = f[c],
            e = b[0];
          j.prototype.hasOwnProperty(e)
            ? d[e].apply(d, b.slice(1))
            : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
              ? (d.setFinalDate.call(d, e), d.start())
              : a.error(
                  "Method %s does not exist on jQuery.countdown".replace(
                    /\%s/gi,
                    e
                  )
                );
        } else new j(this, b[0], b[1]);
      });
    });
});
Flatsome.behavior("ux-countdown", {
  attach: function(context) {
    jQuery("[data-countdown]", context).each(function() {
      var $this = jQuery(this),
        finalDate = jQuery(this).data("countdown");
      var t_hour = jQuery(this).data("text-hour"),
        t_min = jQuery(this).data("text-min"),
        t_week = jQuery(this).data("text-week"),
        t_day = jQuery(this).data("text-day"),
        t_sec = jQuery(this).data("text-sec"),
        t_min_p = jQuery(this).data("text-min-p"),
        t_hour_p = jQuery(this).data("text-hour-p"),
        t_week_p = jQuery(this).data("text-week-p"),
        t_day_p = jQuery(this).data("text-day-p"),
        t_sec_p = jQuery(this).data("text-sec-p"),
        t_plural = jQuery(this).data("text-plural");
      var hours_plural = t_hour + t_plural;
      var days_plural = t_day + t_plural;
      var weeks_plural = t_week + t_plural;
      var min_plural = t_min;
      var sec_plural = t_sec;
      if (t_hour_p) hours_plural = t_hour_p;
      if (t_min_p) min_plural = t_min_p;
      if (t_week_p) weeks_plural = t_week_p;
      if (t_day_p) days_plural = t_day_p;
      if (t_sec_p) sec_plural = t_sec_p;
      $this
        .countdown(finalDate)
        .on("update.countdown", function(event) {
          var format =
            "<span>%-H<strong>%!H:" +
            t_hour +
            "," +
            hours_plural +
            ";</strong></span><span>%-M<strong>%!M:" +
            t_min +
            "," +
            min_plural +
            ";</strong></span><span>%-S<strong>%!S:" +
            t_sec +
            "," +
            sec_plural +
            ";</strong></span>";
          if (event.offset.days > 0) {
            format =
              "<span>%-d<strong>%!d:" +
              t_day +
              "," +
              days_plural +
              ";</strong></span>" +
              format;
          }
          if (event.offset.weeks > 0) {
            format =
              "<span>%-w<strong>%!w:" +
              t_week +
              "," +
              weeks_plural +
              ";</strong></span>" +
              format;
          }
          jQuery(this).html(event.strftime(format));
        })
        .on("finish.countdown", function(event) {
          var format =
            "<span>%-H<strong>%!H:" +
            t_hour +
            "," +
            hours_plural +
            ";</strong></span><span>%-M<strong>%!M:" +
            t_min +
            "," +
            min_plural +
            ";</strong></span><span>%-S<strong>%!S:" +
            t_sec +
            "," +
            sec_plural +
            ";</strong></span>";
          jQuery(this).html(event.strftime(format));
        });
    });
  }
});
/*!
 * Packery PACKAGED v2.0.0
 * Gapless, draggable grid layouts
 *
 * Licensed GPLv3 for open source use
 * or Packery Commercial License for commercial use
 *
 * http://packery.metafizzy.co
 * Copyright 2016 Metafizzy
 */
!(function(t, e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        e(t, i);
      })
    : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("jquery")))
      : (t.jQueryBridget = e(t, t.jQuery));
})(window, function(t, e) {
  "use strict";
  function i(i, s, a) {
    function h(t, e, n) {
      var o,
        s = "$()." + i + '("' + e + '")';
      return (
        t.each(function(t, h) {
          var u = a.data(h, i);
          if (!u)
            return void r(
              i + " not initialized. Cannot call methods, i.e. " + s
            );
          var c = u[e];
          if (!c || "_" == e.charAt(0))
            return void r(s + " is not a valid method");
          var d = c.apply(u, n);
          o = void 0 === o ? d : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function(t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new s(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function(t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function(t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    s = t.console,
    r =
      "undefined" == typeof s
        ? function() {}
        : function(t) {
            s.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function(t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function() {
          return e();
        })
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.getSize = e());
  })(window, function() {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!c) {
        c = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (s.isBoxSizeOuter = r = 200 == t(o.width)), i.removeChild(e);
      }
    }
    function s(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var s = n(e);
        if ("none" == s.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var c = (a.isBorderBox = "border-box" == s.boxSizing), d = 0;
          u > d;
          d++
        ) {
          var f = h[d],
            l = s[f],
            p = parseFloat(l);
          a[f] = isNaN(p) ? 0 : p;
        }
        var m = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          x = a.borderTopWidth + a.borderBottomWidth,
          b = c && r,
          E = t(s.width);
        E !== !1 && (a.width = E + (b ? 0 : m + _));
        var T = t(s.height);
        return (
          T !== !1 && (a.height = T + (b ? 0 : g + x)),
          (a.innerWidth = a.width - (m + _)),
          (a.innerHeight = a.height - (g + x)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var r,
      a =
        "undefined" == typeof console
          ? e
          : function(t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth"
      ],
      u = h.length,
      c = !1;
    return s;
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
  })(this, function() {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function(t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function(t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var s = this._onceEvents && this._onceEvents[t]; o; ) {
            var r = s && s[o];
            r && (this.off(t, o), delete s[o]),
              o.apply(this, e),
              (n += r ? 0 : 1),
              (o = i[n]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function(t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.matchesSelector = e());
  })(window, function() {
    "use strict";
    var t = (function() {
      var t = Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function(e, i) {
      return e[t](i);
    };
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define("fizzy-ui-utils/utils", [
          "desandro-matches-selector/matches-selector"
        ], function(i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
        ? (module.exports = e(t, require("desandro-matches-selector")))
        : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function(t, e) {
    var i = {};
    (i.extend = function(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function(t, e) {
        return (t % e + e) % e;
      }),
      (i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function(t, i) {
        for (; t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function(t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)
                o.push(i[s]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function() {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            s = this;
          this[o] = setTimeout(function() {
            n.apply(s, e), delete s[o];
          }, i || 100);
        };
      }),
      (i.docReady = function(t) {
        "complete" == document.readyState
          ? t()
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function(t) {
        return t
          .replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function(e, o) {
        i.docReady(function() {
          var s = i.toDashed(o),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            h = document.querySelectorAll(".js-" + s),
            u = i.makeArray(a).concat(i.makeArray(h)),
            c = r + "-options",
            d = t.jQuery;
          u.forEach(function(t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(c);
            try {
              i = s && JSON.parse(s);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + r + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            d && d.data(t, o, h);
          });
        });
      }),
      i
    );
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define("outlayer/item", [
          "ev-emitter/ev-emitter",
          "get-size/get-size"
        ], e)
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("ev-emitter"), require("get-size")))
        : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function(t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function(t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
      }[r],
      u = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property"
      },
      c = (n.prototype = Object.create(t.prototype));
    (c.constructor = n),
      (c._create = function() {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (c.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.getSize = function() {
        this.size = e(this.element);
      }),
      (c.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
          var n = u[i] || i;
          e[n] = t[i];
        }
      }),
      (c.getPosition = function() {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          s = this.layout.size,
          r =
            -1 != n.indexOf("%")
              ? parseFloat(n) / 100 * s.width
              : parseInt(n, 10),
          a =
            -1 != o.indexOf("%")
              ? parseFloat(o) / 100 * s.height
              : parseInt(o, 10);
        (r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a);
      }),
      (c.layoutPosition = function() {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          c = n ? "bottom" : "top",
          d = this.position.y + t[h];
        (e[u] = this.getYValue(d)),
          (e[c] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (c.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? t / this.layout.size.width * 100 + "%"
          : t + "px";
      }),
      (c.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? t / this.layout.size.height * 100 + "%"
          : t + "px";
      }),
      (c._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          s = parseInt(e, 10),
          r = o === this.position.x && s === this.position.y;
        if ((this.setPosition(t, e), r && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          h = e - n,
          u = {};
        (u.transform = this.getTranslate(a, h)),
          this.transition({
            to: u,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0
          });
      }),
      (c.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (c.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (c.moveTo = c._transitionTo),
      (c.setPosition = function(t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (c._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (c.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var d = "opacity," + o(a);
    (c.enableTransition = function() {
      this.isTransitioning ||
        (this.css({
          transitionProperty: d,
          transitionDuration: this.layout.options.transitionDuration
        }),
        this.element.addEventListener(h, this, !1));
    }),
      (c.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t);
      }),
      (c.onotransitionend = function(t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (c.ontransitionend = function(t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (c.disableTransition = function() {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1);
      }),
      (c._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var l = { transitionProperty: "", transitionDuration: "" };
    return (
      (c.removeTransitionStyles = function() {
        this.css(l);
      }),
      (c.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (c.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function() {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (c.reveal = function() {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
          });
      }),
      (c.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal");
      }),
      (c.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (c.hide = function() {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
          });
      }),
      (c.onHideTransitionEnd = function() {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (c.destroy = function() {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: ""
        });
      }),
      n
    );
  }),
  (function(t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("outlayer/outlayer", [
          "ev-emitter/ev-emitter",
          "get-size/get-size",
          "fizzy-ui-utils/utils",
          "./item"
        ], function(i, n, o, s) {
          return e(t, i, n, o, s);
        })
      : "object" == typeof module && module.exports
        ? (module.exports = e(
            t,
            require("ev-emitter"),
            require("get-size"),
            require("fizzy-ui-utils"),
            require("./item")
          ))
        : (t.Outlayer = e(
            t,
            t.EvEmitter,
            t.getSize,
            t.fizzyUIUtils,
            t.Outlayer.Item
          ));
  })(window, function(t, e, i, n, o) {
    "use strict";
    function s(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          a &&
          a.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++c;
      (this.element.outlayerGUID = o), (d[o] = this), this._create();
      var s = this._getOption("initLayout");
      s && this.layout();
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    var a = t.console,
      h = t.jQuery,
      u = function() {},
      c = 0,
      d = {};
    (s.namespace = "outlayer"),
      (s.Item = o),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" }
      });
    var f = s.prototype;
    return (
      n.extend(f, e.prototype),
      (f.option = function(t) {
        n.extend(this.options, t);
      }),
      (f._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
      }),
      (f._create = function() {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (f.reloadItems = function() {
        this.items = this._itemize(this.element.children);
      }),
      (f._itemize = function(t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var s = e[o],
            r = new i(s, this);
          n.push(r);
        }
        return n;
      }),
      (f._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (f.getItemElements = function() {
        return this.items.map(function(t) {
          return t.element;
        });
      }),
      (f.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (f._init = f.layout),
      (f._resetLayout = function() {
        this.getSize();
      }),
      (f.getSize = function() {
        this.size = i(this.element);
      }),
      (f._getMeasurement = function(t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (f.layoutItems = function(t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (f._getItemsForLayout = function(t) {
        return t.filter(function(t) {
          return !t.isIgnored;
        });
      }),
      (f._layoutItems = function(t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function(t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (f._getItemLayoutPosition = function() {
        return { x: 0, y: 0 };
      }),
      (f._processLayoutQueue = function(t) {
        t.forEach(function(t) {
          this._positionItem(t.item, t.x, t.y, t.isInstant);
        }, this);
      }),
      (f._positionItem = function(t, e, i, n) {
        n ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (f._postLayout = function() {
        this.resizeContainer();
      }),
      (f.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (f._getContainerSize = u),
      (f._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (f._emitCompleteOnItems = function(t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          r++, r == s && i();
        }
        var o = this,
          s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
          e.once(t, n);
        });
      }),
      (f.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var o = h.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (f.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (f.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (f.stamp = function(t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (f.unstamp = function(t) {
        (t = this._find(t)),
          t &&
            t.forEach(function(t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (f._find = function(t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (f._manageStamps = function() {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (f._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        };
      }),
      (f._manageStamp = u),
      (f._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          s = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
          };
        return s;
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function() {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (f.unbindResize = function() {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (f.onresize = function() {
        this.resize();
      }),
      n.debounceMethod(s, "onresize", 100),
      (f.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (f.needsResizeLayout = function() {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (f.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (f.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (f.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (f.reveal = function(t) {
        this._emitCompleteOnItems("reveal", t),
          t &&
            t.length &&
            t.forEach(function(t) {
              t.reveal();
            });
      }),
      (f.hide = function(t) {
        this._emitCompleteOnItems("hide", t),
          t &&
            t.length &&
            t.forEach(function(t) {
              t.hide();
            });
      }),
      (f.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (f.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (f.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (f.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (f.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function(t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (f.destroy = function() {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function(t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete d[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && d[e];
      }),
      (s.create = function(t, e) {
        var i = r(s);
        return (
          (i.defaults = n.extend({}, s.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(o)),
          n.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      }),
      (s.Item = o),
      s
    );
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define("packery/rect", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : ((t.Packery = t.Packery || {}), (t.Packery.Rect = e()));
  })(window, function() {
    "use strict";
    function t(e) {
      for (var i in t.defaults) this[i] = t.defaults[i];
      for (i in e) this[i] = e[i];
    }
    t.defaults = { x: 0, y: 0, width: 0, height: 0 };
    var e = t.prototype;
    return (
      (e.contains = function(t) {
        var e = t.width || 0,
          i = t.height || 0;
        return (
          this.x <= t.x &&
          this.y <= t.y &&
          this.x + this.width >= t.x + e &&
          this.y + this.height >= t.y + i
        );
      }),
      (e.overlaps = function(t) {
        var e = this.x + this.width,
          i = this.y + this.height,
          n = t.x + t.width,
          o = t.y + t.height;
        return this.x < n && e > t.x && this.y < o && i > t.y;
      }),
      (e.getMaximalFreeRects = function(e) {
        if (!this.overlaps(e)) return !1;
        var i,
          n = [],
          o = this.x + this.width,
          s = this.y + this.height,
          r = e.x + e.width,
          a = e.y + e.height;
        return (
          this.y < e.y &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: this.width,
              height: e.y - this.y
            })),
            n.push(i)),
          o > r &&
            ((i = new t({
              x: r,
              y: this.y,
              width: o - r,
              height: this.height
            })),
            n.push(i)),
          s > a &&
            ((i = new t({ x: this.x, y: a, width: this.width, height: s - a })),
            n.push(i)),
          this.x < e.x &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: e.x - this.x,
              height: this.height
            })),
            n.push(i)),
          n
        );
      }),
      (e.canFit = function(t) {
        return this.width >= t.width && this.height >= t.height;
      }),
      t
    );
  }),
  (function(t, e) {
    if ("function" == typeof define && define.amd)
      define("packery/packer", ["./rect"], e);
    else if ("object" == typeof module && module.exports)
      module.exports = e(require("./rect"));
    else {
      var i = (t.Packery = t.Packery || {});
      i.Packer = e(i.Rect);
    }
  })(window, function(t) {
    "use strict";
    function e(t, e, i) {
      (this.width = t || 0),
        (this.height = e || 0),
        (this.sortDirection = i || "downwardLeftToRight"),
        this.reset();
    }
    var i = e.prototype;
    (i.reset = function() {
      this.spaces = [];
      var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
      this.spaces.push(e),
        (this.sorter = n[this.sortDirection] || n.downwardLeftToRight);
    }),
      (i.pack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
          var i = this.spaces[e];
          if (i.canFit(t)) {
            this.placeInSpace(t, i);
            break;
          }
        }
      }),
      (i.columnPack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
          var i = this.spaces[e],
            n =
              i.x <= t.x &&
              i.x + i.width >= t.x + t.width &&
              i.height >= t.height - 0.01;
          if (n) {
            (t.y = i.y), this.placed(t);
            break;
          }
        }
      }),
      (i.rowPack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
          var i = this.spaces[e],
            n =
              i.y <= t.y &&
              i.y + i.height >= t.y + t.height &&
              i.width >= t.width - 0.01;
          if (n) {
            (t.x = i.x), this.placed(t);
            break;
          }
        }
      }),
      (i.placeInSpace = function(t, e) {
        (t.x = e.x), (t.y = e.y), this.placed(t);
      }),
      (i.placed = function(t) {
        for (var e = [], i = 0; i < this.spaces.length; i++) {
          var n = this.spaces[i],
            o = n.getMaximalFreeRects(t);
          o ? e.push.apply(e, o) : e.push(n);
        }
        (this.spaces = e), this.mergeSortSpaces();
      }),
      (i.mergeSortSpaces = function() {
        e.mergeRects(this.spaces), this.spaces.sort(this.sorter);
      }),
      (i.addSpace = function(t) {
        this.spaces.push(t), this.mergeSortSpaces();
      }),
      (e.mergeRects = function(t) {
        var e = 0,
          i = t[e];
        t: for (; i; ) {
          for (var n = 0, o = t[e + n]; o; ) {
            if (o == i) n++;
            else {
              if (o.contains(i)) {
                t.splice(e, 1), (i = t[e]);
                continue t;
              }
              i.contains(o) ? t.splice(e + n, 1) : n++;
            }
            o = t[e + n];
          }
          e++, (i = t[e]);
        }
        return t;
      });
    var n = {
      downwardLeftToRight: function(t, e) {
        return t.y - e.y || t.x - e.x;
      },
      rightwardTopToBottom: function(t, e) {
        return t.x - e.x || t.y - e.y;
      }
    };
    return e;
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define("packery/item", ["outlayer/outlayer", "./rect"], e)
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer"), require("./rect")))
        : (t.Packery.Item = e(t.Outlayer, t.Packery.Rect));
  })(window, function(t, e) {
    "use strict";
    var i = document.documentElement.style,
      n = "string" == typeof i.transform ? "transform" : "WebkitTransform",
      o = function() {
        t.Item.apply(this, arguments);
      },
      s = (o.prototype = Object.create(t.Item.prototype)),
      r = s._create;
    s._create = function() {
      r.call(this), (this.rect = new e());
    };
    var a = s.moveTo;
    return (
      (s.moveTo = function(t, e) {
        var i = Math.abs(this.position.x - t),
          n = Math.abs(this.position.y - e),
          o =
            this.layout.dragItemCount &&
            !this.isPlacing &&
            !this.isTransitioning &&
            1 > i &&
            1 > n;
        return o ? void this.goTo(t, e) : void a.apply(this, arguments);
      }),
      (s.enablePlacing = function() {
        this.removeTransitionStyles(),
          this.isTransitioning && n && (this.element.style[n] = "none"),
          (this.isTransitioning = !1),
          this.getSize(),
          this.layout._setRectSize(this.element, this.rect),
          (this.isPlacing = !0);
      }),
      (s.disablePlacing = function() {
        this.isPlacing = !1;
      }),
      (s.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
          this.layout.packer.addSpace(this.rect),
          this.emitEvent("remove", [this]);
      }),
      (s.showDropPlaceholder = function() {
        var t = this.dropPlaceholder;
        t ||
          ((t = this.dropPlaceholder = document.createElement("div")),
          (t.className = "packery-drop-placeholder"),
          (t.style.position = "absolute")),
          (t.style.width = this.size.width + "px"),
          (t.style.height = this.size.height + "px"),
          this.positionDropPlaceholder(),
          this.layout.element.appendChild(t);
      }),
      (s.positionDropPlaceholder = function() {
        this.dropPlaceholder.style[n] =
          "translate(" + this.rect.x + "px, " + this.rect.y + "px)";
      }),
      (s.hideDropPlaceholder = function() {
        this.layout.element.removeChild(this.dropPlaceholder);
      }),
      o
    );
  }),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define([
          "get-size/get-size",
          "outlayer/outlayer",
          "./rect",
          "./packer",
          "./item"
        ], e)
      : "object" == typeof module && module.exports
        ? (module.exports = e(
            require("get-size"),
            require("outlayer"),
            require("./rect"),
            require("./packer"),
            require("./item")
          ))
        : (t.Packery = e(
            t.getSize,
            t.Outlayer,
            t.Packery.Rect,
            t.Packery.Packer,
            t.Packery.Item
          ));
  })(window, function(t, e, i, n, o) {
    "use strict";
    function s(t, e) {
      return t.position.y - e.position.y || t.position.x - e.position.x;
    }
    function r(t, e) {
      return t.position.x - e.position.x || t.position.y - e.position.y;
    }
    function a(t, e) {
      var i = e.x - t.x,
        n = e.y - t.y;
      return Math.sqrt(i * i + n * n);
    }
    i.prototype.canFit = function(t) {
      return this.width >= t.width - 1 && this.height >= t.height - 1;
    };
    var h = e.create("packery");
    h.Item = o;
    var u = h.prototype;
    (u._create = function() {
      e.prototype._create.call(this),
        (this.packer = new n()),
        (this.shiftPacker = new n()),
        (this.isEnabled = !0),
        (this.dragItemCount = 0);
      var t = this;
      (this.handleDraggabilly = {
        dragStart: function() {
          t.itemDragStart(this.element);
        },
        dragMove: function() {
          t.itemDragMove(this.element, this.position.x, this.position.y);
        },
        dragEnd: function() {
          t.itemDragEnd(this.element);
        }
      }),
        (this.handleUIDraggable = {
          start: function(e, i) {
            i && t.itemDragStart(e.currentTarget);
          },
          drag: function(e, i) {
            i &&
              t.itemDragMove(e.currentTarget, i.position.left, i.position.top);
          },
          stop: function(e, i) {
            i && t.itemDragEnd(e.currentTarget);
          }
        });
    }),
      (u._resetLayout = function() {
        this.getSize(), this._getMeasurements();
        var t, e, i;
        this._getOption("horizontal")
          ? ((t = 1 / 0),
            (e = this.size.innerHeight + this.gutter),
            (i = "rightwardTopToBottom"))
          : ((t = this.size.innerWidth + this.gutter),
            (e = 1 / 0),
            (i = "downwardLeftToRight")),
          (this.packer.width = this.shiftPacker.width = t),
          (this.packer.height = this.shiftPacker.height = e),
          (this.packer.sortDirection = this.shiftPacker.sortDirection = i),
          this.packer.reset(),
          (this.maxY = 0),
          (this.maxX = 0);
      }),
      (u._getMeasurements = function() {
        this._getMeasurement("columnWidth", "width"),
          this._getMeasurement("rowHeight", "height"),
          this._getMeasurement("gutter", "width");
      }),
      (u._getItemLayoutPosition = function(t) {
        if (
          (this._setRectSize(t.element, t.rect),
          this.isShifting || this.dragItemCount > 0)
        ) {
          var e = this._getPackMethod();
          this.packer[e](t.rect);
        } else this.packer.pack(t.rect);
        return this._setMaxXY(t.rect), t.rect;
      }),
      (u.shiftLayout = function() {
        (this.isShifting = !0), this.layout(), delete this.isShifting;
      }),
      (u._getPackMethod = function() {
        return this._getOption("horizontal") ? "rowPack" : "columnPack";
      }),
      (u._setMaxXY = function(t) {
        (this.maxX = Math.max(t.x + t.width, this.maxX)),
          (this.maxY = Math.max(t.y + t.height, this.maxY));
      }),
      (u._setRectSize = function(e, i) {
        var n = t(e),
          o = n.outerWidth,
          s = n.outerHeight;
        (o || s) &&
          ((o = this._applyGridGutter(o, this.columnWidth)),
          (s = this._applyGridGutter(s, this.rowHeight))),
          (i.width = Math.min(o, this.packer.width)),
          (i.height = Math.min(s, this.packer.height));
      }),
      (u._applyGridGutter = function(t, e) {
        if (!e) return t + this.gutter;
        e += this.gutter;
        var i = t % e,
          n = i && 1 > i ? "round" : "ceil";
        return (t = Math[n](t / e) * e);
      }),
      (u._getContainerSize = function() {
        return this._getOption("horizontal")
          ? { width: this.maxX - this.gutter }
          : { height: this.maxY - this.gutter };
      }),
      (u._manageStamp = function(t) {
        var e,
          n = this.getItem(t);
        if (n && n.isPlacing) e = n.rect;
        else {
          var o = this._getElementOffset(t);
          e = new i({
            x: this._getOption("originLeft") ? o.left : o.right,
            y: this._getOption("originTop") ? o.top : o.bottom
          });
        }
        this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e);
      }),
      (u.sortItemsByPosition = function() {
        var t = this._getOption("horizontal") ? r : s;
        this.items.sort(t);
      }),
      (u.fit = function(t, e, i) {
        var n = this.getItem(t);
        n &&
          (this.stamp(n.element),
          n.enablePlacing(),
          this.updateShiftTargets(n),
          (e = void 0 === e ? n.rect.x : e),
          (i = void 0 === i ? n.rect.y : i),
          this.shift(n, e, i),
          this._bindFitEvents(n),
          n.moveTo(n.rect.x, n.rect.y),
          this.shiftLayout(),
          this.unstamp(n.element),
          this.sortItemsByPosition(),
          n.disablePlacing());
      }),
      (u._bindFitEvents = function(t) {
        function e() {
          n++, 2 == n && i.dispatchEvent("fitComplete", null, [t]);
        }
        var i = this,
          n = 0;
        t.once("layout", e), this.once("layoutComplete", e);
      }),
      (u.resize = function() {
        this.isResizeBound &&
          this.needsResizeLayout() &&
          (this.options.shiftPercentResize
            ? this.resizeShiftPercentLayout()
            : this.layout());
      }),
      (u.needsResizeLayout = function() {
        var e = t(this.element),
          i = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
        return e[i] != this.size[i];
      }),
      (u.resizeShiftPercentLayout = function() {
        var e = this._getItemsForLayout(this.items),
          i = this._getOption("horizontal"),
          n = i ? "y" : "x",
          o = i ? "height" : "width",
          s = i ? "rowHeight" : "columnWidth",
          r = i ? "innerHeight" : "innerWidth",
          a = this[s];
        if ((a = a && a + this.gutter)) {
          this._getMeasurements();
          var h = this[s] + this.gutter;
          e.forEach(function(t) {
            var e = Math.round(t.rect[n] / a);
            t.rect[n] = e * h;
          });
        } else {
          var u = t(this.element)[r] + this.gutter,
            c = this.packer[o];
          e.forEach(function(t) {
            t.rect[n] = t.rect[n] / c * u;
          });
        }
        this.shiftLayout();
      }),
      (u.itemDragStart = function(t) {
        if (this.isEnabled) {
          this.stamp(t);
          var e = this.getItem(t);
          e &&
            (e.enablePlacing(),
            e.showDropPlaceholder(),
            this.dragItemCount++,
            this.updateShiftTargets(e));
        }
      }),
      (u.updateShiftTargets = function(t) {
        this.shiftPacker.reset(), this._getBoundingRect();
        var e = this._getOption("originLeft"),
          n = this._getOption("originTop");
        this.stamps.forEach(function(t) {
          var o = this.getItem(t);
          if (!o || !o.isPlacing) {
            var s = this._getElementOffset(t),
              r = new i({ x: e ? s.left : s.right, y: n ? s.top : s.bottom });
            this._setRectSize(t, r), this.shiftPacker.placed(r);
          }
        }, this);
        var o = this._getOption("horizontal"),
          s = o ? "rowHeight" : "columnWidth",
          r = o ? "height" : "width";
        (this.shiftTargetKeys = []), (this.shiftTargets = []);
        var a,
          h = this[s];
        if ((h = h && h + this.gutter)) {
          var u = Math.ceil(t.rect[r] / h),
            c = Math.floor((this.shiftPacker[r] + this.gutter) / h);
          a = (c - u) * h;
          for (var d = 0; c > d; d++) this._addShiftTarget(d * h, 0, a);
        } else
          (a = this.shiftPacker[r] + this.gutter - t.rect[r]),
            this._addShiftTarget(0, 0, a);
        var f = this._getItemsForLayout(this.items),
          l = this._getPackMethod();
        f.forEach(function(t) {
          var e = t.rect;
          this._setRectSize(t.element, e),
            this.shiftPacker[l](e),
            this._addShiftTarget(e.x, e.y, a);
          var i = o ? e.x + e.width : e.x,
            n = o ? e.y : e.y + e.height;
          if ((this._addShiftTarget(i, n, a), h))
            for (var s = Math.round(e[r] / h), u = 1; s > u; u++) {
              var c = o ? i : e.x + h * u,
                d = o ? e.y + h * u : n;
              this._addShiftTarget(c, d, a);
            }
        }, this);
      }),
      (u._addShiftTarget = function(t, e, i) {
        var n = this._getOption("horizontal") ? e : t;
        if (!(0 !== n && n > i)) {
          var o = t + "," + e,
            s = -1 != this.shiftTargetKeys.indexOf(o);
          s ||
            (this.shiftTargetKeys.push(o),
            this.shiftTargets.push({ x: t, y: e }));
        }
      }),
      (u.shift = function(t, e, i) {
        var n,
          o = 1 / 0,
          s = { x: e, y: i };
        this.shiftTargets.forEach(function(t) {
          var e = a(t, s);
          o > e && ((n = t), (o = e));
        }),
          (t.rect.x = n.x),
          (t.rect.y = n.y);
      });
    var c = 120;
    (u.itemDragMove = function(t, e, i) {
      function n() {
        s.shift(o, e, i), o.positionDropPlaceholder(), s.layout();
      }
      var o = this.isEnabled && this.getItem(t);
      if (o) {
        (e -= this.size.paddingLeft), (i -= this.size.paddingTop);
        var s = this,
          r = new Date();
        this._itemDragTime && r - this._itemDragTime < c
          ? (clearTimeout(this.dragTimeout),
            (this.dragTimeout = setTimeout(n, c)))
          : (n(), (this._itemDragTime = r));
      }
    }),
      (u.itemDragEnd = function(t) {
        function e() {
          n++,
            2 == n &&
              (i.element.classList.remove("is-positioning-post-drag"),
              i.hideDropPlaceholder(),
              o.dispatchEvent("dragItemPositioned", null, [i]));
        }
        var i = this.isEnabled && this.getItem(t);
        if (i) {
          clearTimeout(this.dragTimeout),
            i.element.classList.add("is-positioning-post-drag");
          var n = 0,
            o = this;
          i.once("layout", e),
            this.once("layoutComplete", e),
            i.moveTo(i.rect.x, i.rect.y),
            this.layout(),
            (this.dragItemCount = Math.max(0, this.dragItemCount - 1)),
            this.sortItemsByPosition(),
            i.disablePlacing(),
            this.unstamp(i.element);
        }
      }),
      (u.bindDraggabillyEvents = function(t) {
        this._bindDraggabillyEvents(t, "on");
      }),
      (u.unbindDraggabillyEvents = function(t) {
        this._bindDraggabillyEvents(t, "off");
      }),
      (u._bindDraggabillyEvents = function(t, e) {
        var i = this.handleDraggabilly;
        t[e]("dragStart", i.dragStart),
          t[e]("dragMove", i.dragMove),
          t[e]("dragEnd", i.dragEnd);
      }),
      (u.bindUIDraggableEvents = function(t) {
        this._bindUIDraggableEvents(t, "on");
      }),
      (u.unbindUIDraggableEvents = function(t) {
        this._bindUIDraggableEvents(t, "off");
      }),
      (u._bindUIDraggableEvents = function(t, e) {
        var i = this.handleUIDraggable;
        t[e]("dragstart", i.start)
          [e]("drag", i.drag)
          [e]("dragstop", i.stop);
      });
    var d = u.destroy;
    return (
      (u.destroy = function() {
        d.apply(this, arguments), (this.isEnabled = !1);
      }),
      (h.Rect = i),
      (h.Packer = n),
      h
    );
  });

