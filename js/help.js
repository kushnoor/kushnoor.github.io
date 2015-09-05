! function() {
    var e = function() {};
    e.prototype.load = function() {
        var e = function() {
                var e = document.createElement("script");
                e.type = "text/javascript", e.src = "//assets.helpful.io/assets/widget-content.js", document.body.appendChild(e)
            },
            t = document.createElement("link");
        t.rel = "stylesheet", t.type = "text/css", t.addEventListener("load", e), t.href = "//assets.helpful.io/assets/widget.css", t.media = "all", document.head.appendChild(t)
    }, e.prototype.getSourceOffsetTop = function() {
        for (var e = this.source, t = this.source.offsetTop; e.offsetParent;) t += e.offsetParent.offsetTop, e = e.offsetParent;
        return t
    }, e.prototype.getSourceOffsetLeft = function() {
        for (var e = this.source, t = this.source.offsetLeft; e.offsetParent;) t += e.offsetParent.offsetLeft, e = e.offsetParent;
        return t
    }, e.prototype.showWidget = function() {
        this.widget.className = this.widget.className.replace("helpful-shown-below", ""), this.options.overlay ? this.overlay.className = this.overlay.className.replace("transparent", "") : -1 == this.overlay.className.indexOf("transparent") && (this.overlay.className += " transparent");
        var e = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight),
            t = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth),
            o = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            n = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (this.options.modal) document.querySelector(".helpful-pointer").style.display = "none", this.widget.style.top = n / 2 - 170 + "px", this.widget.style.left = o / 2 - 175 + "px", this.widget.style.position = "fixed";
        else {
            var l = this.source.getBoundingClientRect(),
                i = 0,
                s = 0;
            if (l.top < 355 && (this.getSourceOffsetTop() + this.source.offsetHeight + 355 < e || this.getSourceOffsetTop() < 355) ? (i = this.getSourceOffsetTop() + this.source.offsetHeight + 15, this.widget.className += " helpful-shown-below") : i = this.getSourceOffsetTop() - 355, s = this.getSourceOffsetLeft() + this.source.offsetWidth / 2 - 175, document.querySelector(".helpful-pointer").style.left = "50%", 0 > s) {
                s = Math.min(this.getSourceOffsetLeft(), 25);
                var a = this.getSourceOffsetLeft() + this.source.offsetWidth / 2 - s;
                document.querySelector(".helpful-pointer").style.left = a + "px"
            }
            if (s + 350 > t) {
                s = Math.min(this.getSourceOffsetLeft() + this.source.offsetWidth - 300, t - 25);
                var a = this.getSourceOffsetLeft() + this.source.offsetWidth / 2 - s;
                document.querySelector(".helpful-pointer").style.left = a + "px"
            }
            this.widget.style.top = i + "px", this.widget.style.left = s + "px"
        }
        document.querySelector("#helpful-name").value = this.options.name, document.querySelector("#helpful-email").value = this.options.email, this.overlay.style.display = "block", this.container.style.display = "block", document.querySelector("#helpful-question").focus()
    }, e.prototype.checkTextarea = function() {
        var e = document.querySelector(".helpful-embed textarea");
        e.value.length > 0 ? -1 == this.widget.className.indexOf("helpful-textarea-filled") && (this.widget.className += " helpful-textarea-filled") : this.widget.className = this.widget.className.replace("helpful-textarea-filled", "")
    }, e.prototype.setupEvents = function(e) {
        var t = this;
        e || document.querySelector(".helpful-overlay").addEventListener("click", function(e) {
            e.stopPropagation(), helpful_embed.close()
        }), document.querySelector(".helpful-embed textarea").addEventListener("keyup", function() {
            t.checkTextarea()
        }), document.querySelector(".helpful-question-container button").addEventListener("click", function() {
            document.querySelector(".helpful-question-container").style.display = "none", document.querySelector(".helpful-details-container").style.display = "block", t.widget.className = t.widget.className.replace("helpful-textarea-filled", "")
        }), document.querySelector(".helpful-back-button").addEventListener("click", function() {
            document.querySelector(".helpful-details-container").style.display = "none", document.querySelector(".helpful-question-container").style.display = "block", t.checkTextarea()
        }), [].forEach.call(document.querySelectorAll(".helpful-close-button"), function(e) {
            e.addEventListener("click", function() {
                helpful_embed.close()
            })
        }), document.querySelector(".helpful-btn-return").addEventListener("click", function() {
            document.querySelector(".helpful-embed textarea").value = "", document.querySelector(".helpful-thanks-container").style.display = "none", document.querySelector(".helpful-question-container").style.display = "block", t.checkTextarea()
        }), document.querySelector(".helpful-embed input[type=submit]").addEventListener("click", function() {
            var e = "content=" + encodeURIComponent(document.querySelector("#helpful-question").value);
            e += "&email=" + encodeURIComponent(document.querySelector("#helpful-name").value + " <" + document.querySelector("#helpful-email").value + ">"), e += "&account=" + encodeURIComponent(t.options.company), e += "&callback=helpful_embed.gotResponse";
            var o = document.createElement("script");
            o.type = "text/javascript", o.src = "//helpful.io/incoming_message?" + e, document.body.appendChild(o)
        })
    }, e.prototype.gotResponse = function() {
        document.querySelector(".helpful-details-container").style.display = "none", document.querySelector(".helpful-thanks-container").style.display = "block"
    }, e.prototype.createContainer = function() {
        this.container = document.createElement("div"), this.container.style.display = "none", this.container.className = "helpful-container", this.overlay = document.createElement("div"), this.overlay.style.display = "none", this.overlay.className = "helpful-overlay", document.body.appendChild(this.overlay), document.body.appendChild(this.container)
    }, e.prototype.open = function(e) {
        var t = !1;
        return this.source != e && (t = !0), this.source = e, this.options = {
            company: e.getAttribute("data-helpful"),
            overlay: "off" != e.getAttribute("data-helpful-overlay"),
            modal: "on" == e.getAttribute("data-helpful-modal"),
            name: e.getAttribute("data-helpful-name") || "",
            email: e.getAttribute("data-helpful-email") || "",
            strings: e.getAttribute("data-helpful-strings")
        }, this.loaded && this.widget && this.widget.parentElement.parentElement.parentElement ? (t && (this.setHTML(), this.setupEvents(!0)), this.showWidget()) : (this.createContainer(), this.load(), void 0)
    }, e.prototype.setHTML = function() {
        var e = this.HTMLcache;
        for (var t in this.stringDefaults) e = e.replace("[" + t + "]", this.getString(t));
        this.container.innerHTML = e, this.widget = document.querySelector(".helpful-embed")
    }, e.prototype.htmlLoaded = function(e) {
        this.HTMLcache = e.html, this.setHTML(), this.showWidget(), this.setupEvents(), this.loaded = !0
    }, e.prototype.close = function() {
        this.container.style.display = "none", this.overlay.style.display = "none"
    }, e.prototype.stringDefaults = {
        title: "How may we help you?",
        message_placeholder: "Type your message here...",
        next: "Next",
        contact_information: "Your contact information.",
        contact_information_info: "So we can respond to your question.",
        name_placeholder: "Name",
        email_placeholder: "Email",
        submit: "Submit your Question",
        thanks: "Thanks!",
        thanks_message: "Have a wonderful day.",
        submit_another: "Submit another question?"
    }, e.prototype.getString = function(e) {
        return this.source.hasAttribute("data-helpful-" + e.replace("_", "-")) ? this.source.getAttribute("data-helpful-" + e.replace("_", "-")) : "string" == typeof this.options.strings && "undefined" != typeof window.HelpfulStrings && "undefined" != typeof window.HelpfulStrings[this.options.strings] && "undefined" != typeof window.HelpfulStrings[this.options.strings][e] ? window.HelpfulStrings[this.options.strings][e] : this.stringDefaults[e]
    }, window.helpful_embed = new e, document.addEventListener("click", function(e) {
        e.target.hasAttribute("data-helpful") && (e.preventDefault(), e.stopPropagation(), helpful_embed.open(e.target))
    })
}();