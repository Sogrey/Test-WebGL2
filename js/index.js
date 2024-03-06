/**/
var BrowserDetect = {
    init: function() {
        var info = this.searchString(this.dataBrowser) || {
            identity: "unknown"
        }
        this.browser = info.identity;
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.platformInfo = this.searchString(this.dataPlatform) || this.dataPlatform["unknown"];
        this.platform = this.platformInfo.identity;
        var browserInfo = this.urls[this.browser];
        if (!browserInfo) {
            browserInfo = this.urls["unknown"];
        } else if (browserInfo.platforms) {
            var info = browserInfo.platforms[this.platform];
            if (info) {
                browserInfo = info;
            }
        }
        this.urls = browserInfo;
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var info = data[i];
            var dataString = info.string;
            var dataProp = info.prop;
            this.versionSearchString = info.versionSearch || info.identity;
            if (dataString) {
                if (dataString.indexOf(info.subString) != -1) {
                    var shouldExclude = false;
                    if (info.excludeSubstrings) {
                        for (var ii = 0; ii < info.excludeSubstrings.length; ++ii) {
                            if (dataString.indexOf(info.excludeSubstrings[ii]) != -1) {
                                shouldExclude = true;
                                break;
                            }
                        }
                    }
                    if (!shouldExclude)
                        return info;
                }
            } else if (dataProp) {
                return info;
            }
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) {
            return;
        }
        return parseFloat(dataString.substring(
            index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        excludeSubstrings: ["OPR/", "Edge/"],
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "Opera",
        identity: "Opera"
    }, {
        string: navigator.userAgent,
        subString: "Android",
        identity: "Android"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, { // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "Edge/",
        identity: "Edge"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, { // for IE11+
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, { // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataPlatform: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows",
        browsers: [{
            url: "https://www.mozilla.org/en-US/firefox/new/",
            name: "Mozilla Firefox"
        }, {
            url: "https://support.google.com/chrome/thread/1906535?hl=en",
            name: "Google Chrome"
        }, ]
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac",
        browsers: [{
            url: "https://www.mozilla.org/en-US/firefox/new/",
            name: "Mozilla Firefox"
        }, {
            url: "https://support.google.com/chrome/thread/1906535?hl=en",
            name: "Google Chrome"
        }, ]
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod",
        browsers: [
            //{url: "https://www.mozilla.org/en-US/firefox/new/", name: "Mozilla Firefox"}
        ]
    }, {
        string: navigator.platform,
        subString: "iPad",
        identity: "iPad",
        browsers: [
            //{url: "https://www.mozilla.org/en-US/firefox/new/", name: "Mozilla Firefox"}
        ]
    }, {
        string: navigator.userAgent,
        subString: "Android",
        identity: "Android",
        browsers: [{
            url: "https://play.google.com/store/apps/details?id=org.mozilla.firefox",
            name: "Mozilla Firefox"
        }, {
            url: "https://play.google.com/store/apps/details?id=com.android.chrome",
            name: "Google Chrome"
        }]
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux",
        browsers: [{
            url: "https://www.mozilla.org/en-US/firefox/new/",
            name: "Mozilla Firefox"
        }, {
            url: "https://support.google.com/chrome/thread/1906535?hl=en",
            name: "Google Chrome"
        }, ]
    }, {
        string: "unknown",
        subString: "unknown",
        identity: "unknown",
        browsers: [{
            url: "https://www.mozilla.org/en-US/firefox/new/",
            name: "Mozilla Firefox"
        }, {
            url: "https://support.google.com/chrome/thread/1906535?hl=en",
            name: "Google Chrome"
        }, ]
    }],
    /*
    upgradeUrl:         Tell the user how to upgrade their browser.
    troubleshootingUrl: Help the user.
    platforms:          Urls by platform. See dataPlatform.identity for valid platform names.
    */
    urls: {
        "Chrome": {
            upgradeUrl: "https://get.webgl.org/webgl2/enable.html#chrome",
            //upgradeUrl: "http://www.google.com/support/chrome/bin/answer.py?answer=95346",
            troubleshootingUrl: "http://www.google.com/support/chrome/bin/answer.py?answer=1220892"
        },
        "Firefox": {
            upgradeUrl: "https://get.webgl.org/webgl2/enable.html#firefox",
            //upgradeUrl: "https://www.mozilla.org/en-US/firefox/new/",
            troubleshootingUrl: "https://support.mozilla.com/en-US/kb/how-do-i-upgrade-my-graphics-drivers"
        },
        "Opera": {
            platforms: {
                "Android": {
                    upgradeUrl: "https://market.android.com/details?id=com.opera.browser",
                    troubleshootingUrl: "https://www.opera.com/support/"
                }
            },
            upgradeUrl: "https://www.opera.com/",
            troubleshootingUrl: "https://www.opera.com/support/"
        },
        "Android": {
            upgradeUrl: null,
            troubleshootingUrl: null
        },
        "Safari": {
            platforms: {
                "iPhone/iPod": {
                    upgradeUrl: "https://www.apple.com/ios/",
                    troubleshootingUrl: "https://support.apple.com/iphone"
                },
                "iPad": {
                    upgradeUrl: "https://www.apple.com/ios/",
                    troubleshootingUrl: "http://www.apple.com/support/ipad/"
                },
                "Mac": {
                    upgradeUrl: "https://webkit.org",
                    troubleshootingUrl: "https://support.apple.com/en-ca/guide/safari/ibrwe2159f50/mac"
                }
            },
            upgradeUrl: "https://webkit.org",
            troubleshootingUrl: "https://support.apple.com/en-ca/guide/safari/ibrwe2159f50/mac"
        },
        "Explorer": {
            upgradeUrl: "http://www.microsoft.com/ie",
            troubleshootingUrl: "https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/dev-guides/bg182648(v=vs.85)"
        },
        "Edge": {
            upgradeUrl: "http://www.microsoft.com/en-us/windows/windows-10-upgrade",
            troubleshootingUrl: "https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/dev-guides/bg182648(v=vs.85)"
        },
        "unknown": {
            upgradeUrl: null,
            troubleshootingUrl: null
        }
    }
};

/////////////////////////////////

function $$(x) {
    return document.getElementById(x);
}

// Add indexOf to IE.
if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

function launchLogo(gl) {
    initializeLogo(gl.canvas);
}

function log(msg) {
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(msg));
    document.body.appendChild(d);
}

function removeClass(element, clas) {
    // Does not work in IE var classes = element.getAttribute("class");
    var classes = element.className;
    if (classes) {
        var cs = classes.split(/\s+/);
        if (cs.indexOf(clas) != -1) {
            cs.splice(cs.indexOf(clas), 1);
        }
        // Does not work in IE element.setAttribute("class", cs.join(" "));
        element.className = cs.join(" ");
    }
}

function addClass(element, clas) {
    element.className = element.className + " " + clas;
}

function pageLoaded() {
    removeClass($$("have-javascript"), "webgl-hidden");
    addClass($$("no-javascript"), "webgl-hidden");
    b = BrowserDetect;
    b.init();
    var badImpl = false;
    var canvas = document.getElementById("webgl-logo");
    try {
        gl = canvas.getContext("webgl2");
    } catch (x) {
        gl = null;
    }

    if (gl) {
        // check if it really supports WebGL2. Issues, Some browers claim to support WebGL2
        // but in reality pass less than 20% of the conformance tests. Add a few simple
        // tests to fail so as not to mislead users.
        var params = [{
            pname: 'MAX_3D_TEXTURE_SIZE',
            min: 256,
        }, {
            pname: 'MAX_DRAW_BUFFERS',
            min: 4,
        }, {
            pname: 'MAX_COLOR_ATTACHMENTS',
            min: 4,
        }, {
            pname: 'MAX_VERTEX_UNIFORM_BLOCKS',
            min: 12,
        }, {
            pname: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
            min: 16,
        }, {
            pname: 'MAX_FRAGMENT_INPUT_COMPONENTS',
            min: 60,
        }, {
            pname: 'MAX_UNIFORM_BUFFER_BINDINGS',
            min: 24,
        }, {
            pname: 'MAX_COMBINED_UNIFORM_BLOCKS',
            min: 24,
        }, ];
        for (var i = 0; i < params.length; ++i) {
            var param = params[i];
            var value = gl.getParameter(gl[param.pname]);
            if (typeof value !== 'number' || Number.isNaN(value) || value < params.min) {
                gl = null;
                badImpl = true;
                break;
            }
        }
    }

    if (gl) {
        // Set the support link to the correct URL for the browser.
        // $$("support-link").href = b.urls.troubleshootingUrl;

        // show webgl supported div, and launch webgl demo
        removeClass($$("webgl-yes"), "webgl-hidden");
        launchLogo(gl);
    } else if (!badImpl && window.WebGL2RenderingContext) {
        // not a foolproof way to check if the browser
        // might actually support WebGL, but better than nothing
        removeClass($$("webgl-disabled"), "webgl-hidden");

        // Do we know this browser?
        if (b.browser !== "unknown") {
            // Yes. So show the known-browser message.
            removeClass($$("known-browser"), "webgl-hidden");

            // Hide the unknonw-browser message.
            addClass($$("unknown-browser"), "webgl-hidden");

            // Set the correct link for troubleshooting.
            $$("troubleshooting-link").href = b.urls.troubleshootingUrl;
        }
    } else {
        // Show the no webgl message.
        removeClass($$("webgl-no"), "webgl-hidden");

        // Do we know the browser and can it be upgraded?
        if (b.browser != "unknown" && b.urls.upgradeUrl) {
            // Yes, show the browser and the upgrade link.
            $$("name").innerHTML = b.browser;
            $$("upgrade-link").href = b.urls.upgradeUrl;
        } else {
            // No, so only the link for browser for this platform.
            randomizeBrowsers();
            addClass($$("upgrade-browser"), "webgl-hidden");
            removeClass($$("get-browser"), "webgl-hidden");
            $$("platform").innerHTML = b.platform;
        }
    }
}

function randomizeBrowsers() {

    var bl = $$("webgl-browser-list");
    var browsers = [];
    var infos = b.platformInfo.browsers;
    for (var ii = 0; ii < infos.length; ++ii) {
        browsers.push({
            info: infos[ii],
            weight: Math.random()
        });
    }

    browsers = browsers.sort(function(a, b) {
        if (a.weight < b.weight) return -1;
        if (a.weight > b.weight) return 1;
        return 0;
    });

    for (var ii = 0; ii < browsers.length; ++ii) {
        var info = browsers[ii].info;
        var div = document.createElement("p");
        var a = document.createElement("a");
        a.href = info.url;
        a.innerHTML = info.name;
        div.appendChild(a);
        bl.appendChild(div);
    }
}

// addEventListener does not work on IE7/8.
window.onload = pageLoaded;