"use strict";
! function(n) {
    $(document).ready(function() {
        var a = 1.3;
        n._F = 1, n.middleCurrency = "EUR", n.rates = [], n.margins = {}, n.tokens = {}, "sell" === n.exchangeType ? n.currencies = ["ETH", "CHF"] : n.currencies = ["CHF", "ETH"], n.getRates = function(e) {
            $.getJSON("https://api.mtpelerin.com/currency_rates/last").done(function(n) {
                $.getJSON("https://api.mtpelerin.com/forms/vKnrLxzfT9RTKhijRFuWZADLTxd98B2UJgNfpbJV").done(function(r) {
                    $.getJSON("https://api.mtpelerin.com/currencies/tokens").done(function(e) {
                        rates = n, margins = r, tokens = e
                    })
                })
            })
        }, n.setCurrency = function(e, r) {
            currencies[e] = r
        }, n.getRateForAmount = function(e, r, n) {
            var t = n[e] || n.default;
            if (t.length)
                for (var i = 0; i < t.length; i++)
                    if (r >= t[i].min && r < t[i].max) return t[i].rate;
            return a
        }, n.computeFeeRate = function(e) {
            var r = a;
            return "sell" === n.exchangeType ? (r = margins.sellExtended ? getRateForAmount(currencies[0], e, margins.sellExtended) : margins.sell[currencies[0]] || margins.sell.default || a, currencies[1] && margins.out[currencies[1]] && (r += margins.out[currencies[1]]), r) : margins.buyExtended ? getRateForAmount(currencies[1], e, margins.buyExtended) : margins[currencies[1]] || margins.default || a
        }, n.getRate = function(r, n) {
            if (!rates) return {
                rate: 0,
                isInverted: !1
            };
            var e = null,
                t = !1;
            if ((e = rates.find(function(e) {
                    return e.currency_pair_id === r + n
                })) || (t = !0, e = rates.find(function(e) {
                    return e.currency_pair_id === n + r
                })), !e) {
                t = !1;
                var i = rates.find(function(e) {
                        return e.currency_pair_id === r + middleCurrency
                    }),
                    a = rates.find(function(e) {
                        return e.currency_pair_id === n + middleCurrency
                    });
                i && a && (e = {
                    rate: i.rate * a.rate_inverted,
                    bid: i.rate / a.ask,
                    ask: i.rate / a.bid,
                    strong: n,
                    currency_pair_id: r + n
                })
            }
            return {
                rate: e,
                isInverted: t
            }
        }, n.convertCcy = function(e, r, n, t) {
            return t = t || 1, r && r.currency_pair_id && 0 != r.rate ? Math.max(1e-13, 0 === r.currency_pair_id.indexOf(n) ? e / (parseFloat(r.rate) * t) : e * (parseFloat(r.rate) / t)) : 0
        }, n.getRates(), setInterval(n.getRates, 6e4)
    })
}(window);
"use strict";
$(function() {
    $.validator.setDefaults({
        ignore: [],
        highlight: function(e) {
            $(e).addClass("is-invalid")
        },
        unhighlight: function(e) {
            $(e).removeClass("is-invalid")
        },
        errorElement: "div",
        errorClass: "invalid-feedback",
        errorPlacement: function(e, a) {
            a.parent(".input-group").length || a.parent("label").length ? e.insertAfter(a.parent()) : e.insertAfter(a)
        }
    });
    var s = $("#phpcontactform"),
        n = $("#js-contact-btn"),
        i = $("#js-contact-result");
    s.submit(function(e) {
        e.preventDefault()
    }).validate({
        rules: {
            name: "required",
            email: {
                required: !0,
                email: !0
            },
            message: "required"
        },
        messages: {
            name: "Your full name please",
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            message: "Please enter your message"
        },
        submitHandler: function(e) {
            n.attr("disabled", !0);
            var a = s.data("redirect"),
                t = !1;
            "none" != a && "" != a && null != a || (t = !0), i.html('<p class="mt-3 help-block">Please wait...</p>');
            var r = i.data("success-msg"),
                l = (i.data("error-msg"), {
                    body: JSON.stringify($(e).serializeArray(), null, 2),
                    subject: "Mt Pelerin contact form"
                });
            return l.newsletter = $("#phpcontactform input[name=newsletter]").val(), l.email = $("#phpcontactform input[name=email]").val(), l.firstName = $("#phpcontactform input[name=name]").val(), $.ajax({
                type: "POST",
                data: l,
                url: "https://api.mtpelerin.com/mails/hello-mtpelerin",
                cache: !1,
                success: function(e) {
                    t ? (s[0].reset(), i.fadeIn("slow").html('<div class="mt-3 help-block text-success">' + r + "</div>").delay(3e3).fadeOut("slow")) : window.location.href = a, n.attr("disabled", !1)
                },
                error: function(e) {
                    i.fadeIn("slow").html('<div class="mt-3 help-block text-danger"> Cannot access Server</div>').delay(3e3).fadeOut("slow"), n.attr("disabled", !1), window.console && console.log("Ajax Error: " + e.statusText)
                }
            }), !1
        }
    })
});
"use strict";
! function(n) {
    $(document).ready(function() {
        n.checkEmail = function(e) {
            return new RegExp("^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d))*$").test(e)
        }, n.trackGAEvent = function(e, r, t) {
            if (n.ga) {
                var a = ga.getAll()[0];
                a && a.send(e, r, t)
            }
        }, n.getCookie = function(e) {
            for (var r = e + "=", t = decodeURIComponent(document.cookie).split(";"), a = 0; a < t.length; a++) {
                for (var n = t[a];
                    " " == n.charAt(0);) n = n.substring(1);
                if (0 == n.indexOf(r)) return n.substring(r.length, n.length)
            }
            return ""
        }, n.getUrlParameter = function(e) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var r = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
            return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
        }, n.sendPhone = function(r) {
            if ($("#_name").val()) n.trackGAEvent("event", "referral", "spam-detected");
            else if ($("#phone").intlTelInput("isValidNumber") && isValid()) {
                $("#get-started-invalid").hide(), $("#send-get-started").attr("disabled", "disabled");
                var e = {
                    type: "phone",
                    identifier: $("#phone").intlTelInput("getNumber"),
                    code: getUrlParameter("rfr"),
                    attributes: {
                        _ga: getCookie("_ga"),
                        _fbp: getCookie("_fbp")
                    }
                };
                $.post("https://api.mtpelerin.com/referrals/create", e, function(e) {
                    $("#send-get-started").removeAttr("disabled"), $("#get-started-form").hide(), $("#get-started-confirm").show(), r && (n.location = r)
                }, "json")
            } else $("#phone").addClass("invalid").removeClass("valid"), $("#get-started-invalid").show()
        }, n.getUrlVars = function() {
            for (var e, r = [], t = n.location.href.slice(n.location.href.indexOf("?") + 1).split("&"), a = 0; a < t.length; a++) e = t[a].split("="), r.push(e[0]), r[e[0]] = decodeURIComponent(e[1]);
            return r
        }, n.populateForm = function() {
            var r = {
                    firstname: "fname",
                    lastname: "lname",
                    email: "email"
                },
                t = getUrlVars();
            Object.keys(r).forEach(function(e) {
                $("[name=" + e + "]").val(t[r[e]])
            })
        }, n.isValid = function(e, r) {
            r = r || "whitepaper-form";
            var t = !0,
                a = e ? "#" + r + " #" + e + " [required]:visible" : "#" + r + " [required]:visible";
            return $(".invalid").removeClass("invalid").addClass("valid"), $(a).each(function(e, r) {
                $(r).val() ? "email" === $(r).attr("type") ? checkEmail($(r).val()) || (t = !1, $(r).addClass("invalid").removeClass("valid")) : "radio" === $(r).attr("type") && 0 === $("[name='" + $(r).attr("name") + "']:checked").length ? (t = !1, $(r).parent().addClass("invalid").removeClass("valid")) : "checkbox" !== $(r).attr("type") || $(r).prop("checked") ? $(r).removeClass("invalid").addClass("valid") : (t = !1, $(r).parent().addClass("invalid").removeClass("valid")) : (t = !1, $(r).addClass("invalid").removeClass("valid"))
            }), t
        }, n.switchPanel = function(e, r, t, a) {
            return "back" === t || isValid(e, a) ? ($("#" + e + " .section-invalid").hide(), $("#" + e + " .panel-body").hide(), $("#" + r + " .panel-body").show(), !0) : ($("#" + e + " .section-invalid").show(), !1)
        }, n.sendExtendedContact = function(r, e, t) {
            if (r = r || "contact", isValid(null, r + "-form")) {
                $("#" + r + "-invalid").hide(), $("#send-" + r).attr("disabled", "disabled");
                var a = {};
                $("#" + r + "-form").serializeArray().forEach(function(e) {
                    a[e.name] = e.value
                });
                var n = {
                    body: JSON.stringify(a, null, 2),
                    subject: e || "Mt Pelerin contact form"
                };
                $.ajax({
                    url: "https://api.mtpelerin.com/mails/hello-mtpelerin",
                    data: n,
                    type: "POST",
                    success: function(e) {
                        t ? t(r, a, e) : ($("#" + r + "-error").hide(), $("#send-" + r).removeAttr("disabled"), $("#" + r + "-form").hide(), $("#" + r + "-confirm").show())
                    },
                    error: function(e) {
                        $("#" + r + "-confirm").hide(), $("#" + r + "-error").show()
                    }
                })
            }
        }, n.sendRequest = function(e, r, t) {
            if (r = r || "whitepaper", isValid(null, r + "-form")) {
                $("#" + r + "-invalid").hide(), $("#send-" + r).attr("disabled", "disabled");
                var a = {};
                $("#" + r + "-form").serializeArray().forEach(function(e) {
                    a[e.name] = e.value
                }), a.reference = a.reference || n.getUrlParameter("referralCode"), $.post("https://api.mtpelerin.com/forms/" + e, a, function(e) {
                    t ? t(r, a, e) : ($("#send-" + r).removeAttr("disabled"), $("#" + r + "-form").hide(), $("#" + r + "-confirm").show())
                }, "json").fail(function(e) {
                    e && e.responseJSON && e.responseJSON.error && e.responseJSON.error.message && ($("#" + r + "-rest-invalid").html(e.responseJSON.error.message), $("#" + r + "-rest-invalid").show()), $("#send-" + r).removeAttr("disabled")
                })
            } else $("#" + r + "-invalid").show(), $("#send-" + r).removeAttr("disabled")
        }, n.getBalanceForToken = function(e, r, t) {
            var a = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + r + "&address=" + e + "&tag=latest";
            $.get(a, function(e) {
                t(e.result)
            })
        }, n.checkAddressKyc = function(e, r, t) {
            if (e && r) {
                $.post("https://api.mtpelerin.com/forms/wg5T6AgbmSn3ApJBGapMDzWuGHPvJSyHe5udc6Dr", {
                    address: e,
                    prefix: r
                }, function(e) {
                    t(e.isValid)
                }, "json").fail(function(e) {
                    t(!1)
                })
            } else t(!1)
        }, n.checkShareholderAddress = function(e, t, a, n) {
            var o = $("#ethereum_address").val();
            e && o && 42 === o.length && o.match(/^0x[a-fA-F0-9]{40}$/) ? ($("#ethereum_address_invalid").hide(), $("#ethereum_address_already_kyc").hide(), getBalanceForToken(o, e, function(r) {
                $("#ethereum_address_balance").html(r + " " + a), $("#ethereum_address_balance_container").show(), checkAddressKyc(o, t, function(e) {
                    e ? $("#ethereum_address_already_kyc").show() : ($("#investment").val(Number(r) * Number(n)), $("#ethereum_address_next").removeAttr("disabled"))
                })
            })) : $("#ethereum_address_invalid").show()
        }, n.finalizeShareholderKyc = function(n, e, o) {
            $("#" + n + "-progress").show(), $("#" + n + "-progress .progress-bar").width("10%"), $("#" + n + "-progress .progress-bar").html("10%");
            var s = {
                    id_1: "ID",
                    id_2: "ID",
                    selfie: "selfie",
                    proof_of_residency: "address_proof",
                    signed_agreement: "signed_agreement"
                },
                t = function(e, r) {
                    if (!$("#" + e)[0].files[0]) return r();
                    var t = new FormData;
                    documentDataKeys = Object.keys(o);
                    for (var a = 0; a < documentDataKeys.length; a++) t.append(documentDataKeys[a], o[documentDataKeys[a]]);
                    t.append("type", s[e]), t.append("file", $("#" + e)[0].files[0]), $.ajax({
                        url: "https://api.mtpelerin.com/documents/put",
                        data: t,
                        processData: !1,
                        contentType: !1,
                        type: "POST",
                        success: function(e) {
                            r(null, e)
                        },
                        error: function(e) {
                            r(e, null)
                        }
                    })
                },
                i = function(e) {
                    $("#" + n + "-error").show()
                };
            t("id_1", function(e, r) {
                if (e) return i();
                $("#" + n + "-progress .progress-bar").width("30%"), $("#" + n + "-progress .progress-bar").html("30%"), t("id_2", function(e, r) {
                    if (e) return i();
                    $("#" + n + "-progress .progress-bar").width("50%"), $("#" + n + "-progress .progress-bar").html("50%"), t("selfie", function(e, r) {
                        if (e) return i();
                        $("#" + n + "-progress .progress-bar").width("70%"), $("#" + n + "-progress .progress-bar").html("70%"), t("proof_of_residency", function(e, r) {
                            if (e) return i();
                            $("#" + n + "-progress .progress-bar").width("100%"), $("#" + n + "-progress .progress-bar").html("100%"), $("#send-" + n).removeAttr("disabled"), $("#" + n + "-form").hide(), $("#" + n + "-confirm").show();
                            var t = $("#ethereum_address").val(),
                                a = "0x" + Number(o.code.substr(0, 5)).toString(16);
                            $.get("https://ethgasstation.info/json/ethgasAPI.json", function(e) {
                                e && e.average && $("#gas-price").html((e.average / 10).toFixed(1))
                            }), $(".ethereum-address-success").html(t), $(".hex-verification-code").html(a), $("#verification_code").html(o.code)
                        })
                    })
                })
            })
        }, n.finalizeKyc = function(t, n, o) {
            $("#" + t + "-progress").show(), $("#" + t + "-progress .progress-bar").width("10%"), $("#" + t + "-progress .progress-bar").html("10%");
            var s = {
                    id_1: "ID",
                    id_2: "ID",
                    selfie: "selfie",
                    proof_of_residency: "address_proof",
                    signed_agreement: "signed_agreement"
                },
                a = function(e, r) {
                    if (!$("#" + e)[0].files[0]) return r();
                    var t = new FormData;
                    documentDataKeys = Object.keys(o);
                    for (var a = 0; a < documentDataKeys.length; a++) t.append(documentDataKeys[a], o[documentDataKeys[a]]);
                    t.append("type", s[e]), t.append("issued_by", n.consumer || "public"), t.append("file", $("#" + e)[0].files[0]), $.ajax({
                        url: "https://api.mtpelerin.com/documents/put",
                        data: t,
                        processData: !1,
                        contentType: !1,
                        type: "POST",
                        success: function(e) {
                            r(null, e)
                        },
                        error: function(e) {
                            r(e, null)
                        }
                    })
                },
                i = function(e) {
                    $("#" + t + "-error").show()
                };
            a("id_1", function(e, r) {
                if (e) return i();
                $("#" + t + "-progress .progress-bar").width("30%"), $("#" + t + "-progress .progress-bar").html("30%"), a("id_2", function(e, r) {
                    if (e) return i();
                    $("#" + t + "-progress .progress-bar").width("50%"), $("#" + t + "-progress .progress-bar").html("50%"), a("selfie", function(e, r) {
                        if (e) return i();
                        $("#" + t + "-progress .progress-bar").width("70%"), $("#" + t + "-progress .progress-bar").html("70%"), a("proof_of_residency", function(e, r) {
                            if (e) return i();
                            $("#" + t + "-progress .progress-bar").width("90%"), $("#" + t + "-progress .progress-bar").html("90%"), $("#kyc-form").serializeArray().forEach(function(e) {
                                n[e.name] = e.value
                            }), n.entity_id = o.entity_id, n.user_id = o.user_id, $.post("https://api.mtpelerin.com/forms/Le9VQKJN6g7qarSoBy8Rc54sQVNUz43e", n, function(e) {
                                $("#" + t + "-progress .progress-bar").width("100%"), $("#" + t + "-progress .progress-bar").html("100%"), $("#send-" + t).removeAttr("disabled"), $("#" + t + "-form").hide(), $("#" + t + "-confirm").show(), trackGAEvent("event", "kyc", "submit"), gtag && gtag("event", "conversion", {
                                    send_to: "AW-779811211/WcDzCJb3go0BEIvz6_MC"
                                })
                            }, "json")
                        })
                    })
                })
            })
        }, n.sendAllocationRequest = function(e) {
            if (isValid(null, "allocation-form")) {
                $("#allocation-invalid").hide(), $("#send-allocation").attr("disabled", "disabled");
                var r = {};
                $("#allocation-form").serializeArray().forEach(function(e) {
                    r[e.name] = e.value
                }), $.post("https://api.mtpelerin.com/forms/" + e, r, function(e) {
                    $("#send-allocation").removeAttr("disabled"), $("#allocation-form").hide(), $("#allocation-confirm").show()
                }, "json")
            } else $("#allocation-invalid").show()
        }, n.generateTransactionCodePayload = function() {
            var e = $("#code").val();
            6 === e.length && Number(e.length) ? ($("#transaction-code-invalid").hide(), $("#transaction-code-valid #code-container").html("0xpayload"), $("#transaction-code-valid").show()) : $("#transaction-code-invalid").show()
        }, n.copyToClipboard = function(e) {
            var r = document.getElementById(e),
                t = document.createElement("textarea");
            t.value = r.innerText || r.value, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t), $("#" + e + "-copy").html("copied")
        }, n.getUrlParameter = function(e) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var r = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
            return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
        }, n.setSpaCode = function() {
            $("#code").val(getUrlParameter("code"))
        }, n.displayPublicPaymentInfo = function(e, r, t) {
            for (var a = Object.keys(t), n = 0; n < a.length; n++) $("#sale-info-valid ." + a[n]).html(t[a[n]]);
            $("#" + e + "-form").hide(), $("#sale-info-valid").show()
        }, n.populateForm()
    })
}(window);
"use strict";
jQuery(document).ready(function(p) {
    var e = p(".cd-horizontal-timeline"),
        d = 60;

    function f(e, t, n) {
        var i = w(e.eventsWrapper),
            a = Number(e.timelineWrapper.css("width").replace("px", ""));
        "next" == n ? m(e, i - a + d, a - t) : m(e, i + a - d)
    }

    function c(e, t, n) {
        var i, a, r, l, s, o, p, d, f = e.eventsContent.find(".selected");
        if (0 < ("next" == n ? f.next() : f.prev()).length) {
            var c = e.eventsWrapper.find(".selected"),
                v = "next" == n ? c.parent("li").next("li").children("a") : c.parent("li").prev("li").children("a");
            u(v, e.fillingLine, t), g(v, e.eventsContent), v.addClass("selected"), c.removeClass("selected"), h(v), i = n, a = v, r = e, l = t, s = window.getComputedStyle(a.get(0), null), o = Number(s.getPropertyValue("left").replace("px", "")), p = Number(r.timelineWrapper.css("width").replace("px", "")), l = Number(r.eventsWrapper.css("width").replace("px", "")), d = w(r.eventsWrapper), ("next" == i && p - d < o || "prev" == i && o < -d) && m(r, p / 2 - o, p - l)
        }
    }

    function m(e, t, n) {
        t = 0 < t ? 0 : t, s(e.eventsWrapper.get(0), "translateX", (t = void 0 !== n && t < n ? n : t) + "px"), 0 == t ? e.timelineNavigation.find(".prev").addClass("inactive") : e.timelineNavigation.find(".prev").removeClass("inactive"), t == n ? e.timelineNavigation.find(".next").addClass("inactive") : e.timelineNavigation.find(".next").removeClass("inactive")
    }

    function u(e, t, n) {
        var i = window.getComputedStyle(e.get(0), null),
            a = i.getPropertyValue("left"),
            r = i.getPropertyValue("width"),
            l = (a = Number(a.replace("px", "")) + Number(r.replace("px", "")) / 2) / n;
        s(t.get(0), "scaleX", l)
    }

    function g(e, t) {
        var n = e.data("date"),
            i = t.find(".selected"),
            a = t.find('[data-date="' + n + '"]'),
            r = a.height();
        if (a.index() > i.index()) var l = "selected enter-right",
            s = "leave-left";
        else l = "selected enter-left", s = "leave-right";
        a.attr("class", l), i.attr("class", s).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
            i.removeClass("leave-right leave-left"), a.removeClass("enter-left enter-right")
        }), t.css("height", r + "px")
    }

    function h(e) {
        e.parent("li").prevAll("li").children("a").addClass("older-event").end().end().nextAll("li").children("a").removeClass("older-event")
    }

    function w(e) {
        var t = window.getComputedStyle(e.get(0), null);
        if (0 <= (n = t.getPropertyValue("-webkit-transform") || t.getPropertyValue("-moz-transform") || t.getPropertyValue("-ms-transform") || t.getPropertyValue("-o-transform") || t.getPropertyValue("transform")).indexOf("(")) var n, i = (n = (n = (n = n.split("(")[1]).split(")")[0]).split(","))[4];
        else i = 0;
        return Number(i)
    }

    function s(e, t, n) {
        e.style["-webkit-transform"] = t + "(" + n + ")", e.style["-moz-transform"] = t + "(" + n + ")", e.style["-ms-transform"] = t + "(" + n + ")", e.style["-o-transform"] = t + "(" + n + ")", e.style.transform = t + "(" + n + ")"
    }

    function v(e, t) {
        return Math.round(t - e)
    }

    function x(e) {
        for (var t = e.offsetTop, n = e.offsetLeft, i = e.offsetWidth, a = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, n += e.offsetLeft;
        return t < window.pageYOffset + window.innerHeight && n < window.pageXOffset + window.innerWidth && t + a > window.pageYOffset && n + i > window.pageXOffset
    }

    function y() {
        return window.getComputedStyle(document.querySelector(".cd-horizontal-timeline"), "::before").getPropertyValue("content").replace(/'/g, "").replace(/"/g, "")
    }
    0 < e.length && (e.each(function() {
        var e, n, t = p(this),
            i = {};
        i.timelineWrapper = t.find(".events-wrapper"), i.eventsWrapper = i.timelineWrapper.children(".events"), i.fillingLine = i.eventsWrapper.children(".filling-line"), i.timelineEvents = i.eventsWrapper.find("a"), i.timelineDates = (e = i.timelineEvents, n = [], e.each(function() {
                var e = p(this).data("date").split("/"),
                    t = new Date(e[2], e[1] - 1, e[0]);
                n.push(t)
            }), n), i.eventsMinLapse = function(e) {
                for (var t = [], n = 1; n < e.length; n++) {
                    var i = v(e[n - 1], e[n]);
                    t.push(i)
                }
                return Math.min.apply(null, t)
            }(i.timelineDates), i.timelineNavigation = t.find(".cd-timeline-navigation"), i.eventsContent = t.children(".events-content"),
            function(e, t) {
                for (var n = 0; n < e.timelineDates.length; n++) {
                    var i = v(e.timelineDates[0], e.timelineDates[n]),
                        a = Math.round(i / e.eventsMinLapse) + 2;
                    e.timelineEvents.eq(n).css("left", a * t + "px")
                }
            }(i, d);
        var a, r, l, s, o = (r = d, l = v((a = i).timelineDates[0], a.timelineDates[a.timelineDates.length - 1]) / a.eventsMinLapse, s = (l = Math.round(l) + 4) * r, a.eventsWrapper.css("width", s + "px"), u(a.timelineEvents.eq(0), a.fillingLine, s), s);
        t.addClass("loaded"), i.timelineNavigation.on("click", ".next", function(e) {
            e.preventDefault(), f(i, o, "next")
        }), i.timelineNavigation.on("click", ".prev", function(e) {
            e.preventDefault(), f(i, o, "prev")
        }), i.eventsWrapper.on("click", "a", function(e) {
            e.preventDefault(), i.timelineEvents.removeClass("selected"), p(this).addClass("selected"), h(p(this)), u(p(this), i.fillingLine, o), g(p(this), i.eventsContent)
        }), i.eventsContent.on("swipeleft", function() {
            var e = y();
            "mobile" == e && c(i, o, "next")
        }), i.eventsContent.on("swiperight", function() {
            var e = y();
            "mobile" == e && c(i, o, "prev")
        }), p(document).keyup(function(e) {
            "37" == e.which && x(t.get(0)) ? c(i, o, "prev") : "39" == e.which && x(t.get(0)) && c(i, o, "next")
        })
    }), p("#roadmap a[data-date='01/10/2018']").click(), p("#roadmap a.next").click(), setTimeout(function() {
        p("#roadmap a.next").click()
    }, 1e3))
});
"use strict";

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function onePager() {
    var e = document.getElementById("onepager");
    "none" === e.style.display ? e.style.display = "block" : e.style.display = "none"
}

function loadGoogleMapsAPI() {
    var e = document.createElement("script"),
        t = document.getElementById("gmaps").getAttribute("data-maps-apikey");
    e.src = "https://maps.googleapis.com/maps/api/js?callback=loadMap&key=" + t, e.type = "text/javascript", document.getElementsByTagName("body")[0].appendChild(e)
}

function loadMap() {
    var e = $("#gmaps"),
        t = e.data("lat") || "40.6700",
        o = e.data("lon") || "-73.9400",
        n = {
            zoom: e.data("zoom") || "12",
            center: new google.maps.LatLng(t, o),
            scrollwheel: !1,
            styles: [{
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#e9e9e9"
                }, {
                    lightness: 17
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 17
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 29
                }, {
                    weight: .2
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 18
                }]
            }, {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 21
                }]
            }, {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#dedede"
                }, {
                    lightness: 21
                }]
            }, {
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 36
                }, {
                    color: "#333333"
                }, {
                    lightness: 40
                }]
            }, {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#f2f2f2"
                }, {
                    lightness: 19
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }]
        },
        a = document.getElementById("gmaps"),
        i = new google.maps.Map(a, n);
    new google.maps.Marker({
        position: new google.maps.LatLng(t, o),
        map: i,
        title: "We are here!"
    })
}

function filterSelection(e) {
    var t, o;
    for (t = document.getElementsByClassName("filterDiv"), "all" == e && (e = ""), o = 0; o < t.length; o++) w3AddClass(t[o].parentElement, "hide"), -1 < t[o].className.indexOf(e) && (w3AddClass(t[o], "show"), w3RemoveClass(t[o].parentElement, "hide"))
}

function w3AddClass(e, t) {
    var o, n, a;
    for (n = e.className.split(" "), a = t.split(" "), o = 0; o < a.length; o++) - 1 == n.indexOf(a[o]) && (e.className += " " + a[o])
}

function w3RemoveClass(e, t) {
    var o, n, a;
    for (n = e.className.split(" "), a = t.split(" "), o = 0; o < a.length; o++)
        for (; - 1 < n.indexOf(a[o]);) n.splice(n.indexOf(a[o]), 1);
    e.className = n.join(" ")
}
$(function() {
    $("#preloader").on("click", function() {
        $(this).fadeOut()
    }), $('.one-page-scrolling a[href*="#"]').not('[href="#"]').not('[href="#0"]').on("click", function(e) {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length && (e.preventDefault(), $("html, body").animate({
                scrollTop: t.offset().top
            }, 1e3, function() {
                var e = $(t);
                if (e.focus(), e.is(":focus")) return !1;
                e.attr("tabindex", "-1"), e.focus()
            }))
        }
    });
    var e = $(".screen-slider");
    e.length && $.fn.owlCarousel && e.owlCarousel({
        loop: !0,
        autoplay: !0,
        margin: 0,
        nav: !1,
        items: 1,
        dots: !1
    }), $(".client-slide").length && $.fn.owlCarousel && $(".client-slide").owlCarousel({
        margin: 30,
        loop: !0,
        autoWidth: !0,
        autoplay: !0,
        items: 5
    });
    var t = $(".screen-carousel-1");
    t.length && $.fn.owlCarousel && t.owlCarousel({
        loop: !0,
        center: !0,
        autoplay: !0,
        responsive: {
            0: {
                items: 1,
                margin: 50,
                autoWidth: !1,
                dots: !0
            },
            600: {
                items: 4,
                margin: 100,
                autoWidth: !0,
                dots: !1
            }
        }
    });
    var o = $(".detailed-carousel");
    o.length && $.fn.owlCarousel && o.owlCarousel({
        loop: !0,
        margin: 10,
        nav: !0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1e3: {
                items: 5
            }
        }
    });
    var n = $(".loop");
    n.length && $.fn.slick && n.slick({
        centerMode: !0,
        centerPadding: "60px",
        autoplay: !0,
        autoplaySpeed: 5e3,
        arrows: !0,
        dots: !0,
        slidesToShow: 3,
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "40px",
                slidesToShow: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "40px",
                slidesToShow: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "40px",
                slidesToShow: 1
            }
        }]
    });
    var a = $(".video-play");
    a.length && $.fn.magnificPopup && a.magnificPopup({
        type: "iframe",
        iframe: {
            patterns: {
                youtube: {
                    src: "//www.youtube.com/embed/%id%?autoplay=1&controls=1&showinfo=0&rel=0"
                }
            }
        }
    }), $(document).off("click.bs.tab.data-api", '.vertical-tabs [data-hover="tab"]'), $(document).on("mouseenter.bs.tab.data-api", '.vertical-tabs [data-toggle="tab"], .vertical-tabs [data-hover="tab"]', function() {
        $(this).tab("show")
    });
    var i = $("#fullpage");

    function s() {
        if (992 <= $(window).width()) skrollr.init({
            smoothScrolling: !1,
            forceHeight: !1
        })
    }
    i.length && $.fn.fullpage && i.fullpage({
        scrollBar: !0,
        navigation: !0,
        navigationPosition: "right",
        responsiveWidth: 1100
    });
    var r = $(".sticky-phone-wrap");
    r.length && s(), $(window).on("resize", function() {
        r.length && $.fn.skrollr && ($(window).width() < 991 ? skrollr.init().destroy() : s())
    })
}), $(window).on("load", function() {
    $("#preloader").fadeOut(), !0 === $("body").data("scroll-animation") && new WOW({
        boxClass: "reveal",
        mobile: !1
    }).init(), $("#gmaps").length && loadGoogleMapsAPI()
}), jQuery(document).ready(function(o) {
    o("a.scroll-link").click(function(e) {
        e.preventDefault();
        var t = o(this).attr("href");
        t && o("body,html").animate({
            scrollTop: o(t).offset().top - 20
        }, 750)
    })
}), jQuery(document).ready(function(e) {
    var t = e("#ModalForm")[0];
    if (t) {
        var o = e("#ModalForm .close")[0];
        void 0 !== o && o && (o.onclick = function() {
            t.style.display = "none"
        }), "undefined" != typeof window && window && e(window).click(function(e) {
            e.target == t && (t.style.display = "none")
        }), e(".modal-form-button").on("click", function() {
            e("#ModalForm").show()
        }), e("#radio-one").change(function() {
            e(this).is(":checked") ? (e("#radio-one-group").show(), e("#radio-two-group").hide()) : e("#radio-one-group").hide()
        }), e("#radio-one").trigger("change"), e("#radio-two").change(function() {
            e(this).is(":checked") ? (e("#radio-two-group").show(), e("#radio-one-group").hide()) : e("#radio-two-group").hide()
        }), e("#radio-two").trigger("change")
    }
}), jQuery(document).ready(function(e) {
    var t = e("#ModalFormNewsletter")[0];
    if (t) {
        var o = e("#ModalFormNewsletter .close")[0];
        void 0 !== o && o && (o.onclick = function() {
            t.style.display = "none"
        }), "undefined" != typeof window && window && e(window).click(function(e) {
            e.target == t && (t.style.display = "none")
        }), e(".modal-form-newsletter-button").on("click", function() {
            e("#ModalFormNewsletter").show()
        }), e("#radio-one").change(function() {
            e(this).is(":checked") ? (e("#radio-one-group").show(), e("#radio-two-group").hide()) : e("#radio-one-group").hide()
        }), e("#radio-one").trigger("change"), e("#radio-two").change(function() {
            e(this).is(":checked") ? (e("#radio-two-group").show(), e("#radio-one-group").hide()) : e("#radio-two-group").hide()
        }), e("#radio-two").trigger("change")
    }
}), filterSelection("all");
var btnContainer = document.getElementById("myBtnContainer");
if (btnContainer)
    for (var btns = btnContainer.getElementsByClassName("btn"), i = 0; i < btns.length; i++) btns[i].addEventListener("click", function() {
        var e = document.getElementsByClassName("active");
        e[0].className = e[0].className.replace(" active", ""), this.className += " active"
    });
! function(e, t) {
    var o = function(n, c) {
        if (c.getElementsByClassName) {
            var f, u, m = c.documentElement,
                i = n.Date,
                a = n.HTMLPictureElement,
                s = "addEventListener",
                p = "getAttribute",
                o = n[s],
                g = n.setTimeout,
                r = n.requestAnimationFrame || g,
                l = n.requestIdleCallback,
                y = /^picture$/i,
                d = ["load", "error", "lazyincluded", "_lazyloaded"],
                h = {},
                v = Array.prototype.forEach,
                w = function(e, t) {
                    return h[t] || (h[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), h[t].test(e[p]("class") || "") && h[t]
                },
                b = function(e, t) {
                    w(e, t) || e.setAttribute("class", (e[p]("class") || "").trim() + " " + t)
                },
                z = function(e, t) {
                    var o;
                    (o = w(e, t)) && e.setAttribute("class", (e[p]("class") || "").replace(o, " "))
                },
                C = function e(t, o, n) {
                    var a = n ? s : "removeEventListener";
                    n && e(t, o), d.forEach(function(e) {
                        t[a](e, o)
                    })
                },
                T = function(e, t, o, n, a) {
                    var i = c.createEvent("CustomEvent");
                    return o || (o = {}), o.instance = f, i.initCustomEvent(t, !n, !a, o), e.dispatchEvent(i), i
                },
                $ = function(e, t) {
                    var o;
                    !a && (o = n.picturefill || u.pf) ? (t && t.src && !e[p]("srcset") && e.setAttribute("srcset", t.src), o({
                        reevaluate: !0,
                        elements: [e]
                    })) : t && t.src && (e.src = t.src)
                },
                k = function(e, t) {
                    return (getComputedStyle(e, null) || {})[t]
                },
                E = function(e, t, o) {
                    for (o = o || e.offsetWidth; o < u.minSize && t && !e._lazysizesWidth;) o = t.offsetWidth, t = t.parentNode;
                    return o
                },
                A = (Ce = [], Te = ze = [], (ke = function(e, t) {
                    we && !t ? e.apply(this, arguments) : (Te.push(e), be || (be = !0, (c.hidden ? g : r)($e)))
                })._lsFlush = $e = function() {
                    var e = Te;
                    for (Te = ze.length ? Ce : ze, be = !(we = !0); e.length;) e.shift()();
                    we = !1
                }, ke),
                e = function(o, e) {
                    return e ? function() {
                        A(o)
                    } : function() {
                        var e = this,
                            t = arguments;
                        A(function() {
                            o.apply(e, t)
                        })
                    }
                },
                M = function(e) {
                    var t, o, n = function() {
                            t = null, e()
                        },
                        a = function e() {
                            var t = i.now() - o;
                            t < 99 ? g(e, 99 - t) : (l || n)(n)
                        };
                    return function() {
                        o = i.now(), t || (t = g(a, 99))
                    }
                };
            ! function() {
                var e, t = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                for (e in u = n.lazySizesConfig || n.lazysizesConfig || {}, t) e in u || (u[e] = t[e]);
                n.lazySizesConfig = u, g(function() {
                    u.init && x()
                })
            }();
            var t = (oe = /^img$/i, ne = /^iframe$/i, ae = "onscroll" in n && !/(gle|ing)bot/.test(navigator.userAgent), re = -1, le = function e(t) {
                    se--, t && t.target && C(t.target, e), (!t || se < 0 || !t.target) && (se = 0)
                }, de = function(e, t) {
                    var o, n = e,
                        a = "hidden" == k(c.body, "visibility") || "hidden" != k(e.parentNode, "visibility") && "hidden" != k(e, "visibility");
                    for (j -= t, q += t, H -= t, Q += t; a && (n = n.offsetParent) && n != c.body && n != m;)(a = 0 < (k(n, "opacity") || 1)) && "visible" != k(n, "overflow") && (o = n.getBoundingClientRect(), a = Q > o.left && H < o.right && q > o.top - 1 && j < o.bottom + 1);
                    return a
                }, U = ce = function() {
                    var e, t, o, n, a, i, s, r, l, d = f.elements;
                    if ((O = u.loadMode) && se < 8 && (e = d.length)) {
                        t = 0, re++, null == J && ("expand" in u || (u.expand = 500 < m.clientHeight && 500 < m.clientWidth ? 500 : 370), G = u.expand, J = G * u.expFactor), ie < J && se < 1 && 2 < re && 2 < O && !c.hidden ? (ie = J, re = 0) : ie = 1 < O && 1 < re && se < 6 ? G : 0;
                        for (; t < e; t++)
                            if (d[t] && !d[t]._lazyRace)
                                if (ae)
                                    if ((r = d[t][p]("data-expand")) && (i = 1 * r) || (i = ie), l !== i && (I = innerWidth + i * K, R = innerHeight + i, s = -1 * i, l = i), o = d[t].getBoundingClientRect(), (q = o.bottom) >= s && (j = o.top) <= R && (Q = o.right) >= s * K && (H = o.left) <= I && (q || Q || H || j) && (u.loadHidden || "hidden" != k(d[t], "visibility")) && (F && se < 3 && !r && (O < 3 || re < 4) || de(d[t], i))) {
                                        if (he(d[t]), a = !0, 9 < se) break
                                    } else !a && F && !n && se < 4 && re < 4 && 2 < O && (P[0] || u.preloadAfterLoad) && (P[0] || !r && (q || Q || H || j || "auto" != d[t][p](u.sizesAttr))) && (n = P[0] || d[t]);
                        else he(d[t]);
                        n && !a && he(n)
                    }
                }, X = se = ie = 0, Y = u.throttleDelay, Z = u.ricTimeout, ee = function() {
                    V = !1, X = i.now(), U()
                }, te = l && 49 < Z ? function() {
                    l(ee, {
                        timeout: Z
                    }), Z !== u.ricTimeout && (Z = u.ricTimeout)
                } : e(function() {
                    g(ee)
                }, !0), fe = function(e) {
                    var t;
                    (e = !0 === e) && (Z = 33), V || (V = !0, (t = Y - (i.now() - X)) < 0 && (t = 0), e || t < 9 ? te() : g(te, t))
                }, me = e(ue = function(e) {
                    b(e.target, u.loadedClass), z(e.target, u.loadingClass), C(e.target, pe), T(e.target, "lazyloaded")
                }), pe = function(e) {
                    me({
                        target: e.target
                    })
                }, ge = function(e) {
                    var t, o = e[p](u.srcsetAttr);
                    (t = u.customMedia[e[p]("data-media") || e[p]("media")]) && e.setAttribute("media", t), o && e.setAttribute("srcset", o)
                }, ye = e(function(e, t, o, n, a) {
                    var i, s, r, l, d, c;
                    (d = T(e, "lazybeforeunveil", t)).defaultPrevented || (n && (o ? b(e, u.autosizesClass) : e.setAttribute("sizes", n)), s = e[p](u.srcsetAttr), i = e[p](u.srcAttr), a && (r = e.parentNode, l = r && y.test(r.nodeName || "")), c = t.firesLoad || "src" in e && (s || i || l), d = {
                        target: e
                    }, c && (C(e, le, !0), clearTimeout(L), L = g(le, 2500), b(e, u.loadingClass), C(e, pe, !0)), l && v.call(r.getElementsByTagName("source"), ge), s ? e.setAttribute("srcset", s) : i && !l && (ne.test(e.nodeName) ? function(t, o) {
                        try {
                            t.contentWindow.location.replace(o)
                        } catch (e) {
                            t.src = o
                        }
                    }(e, i) : e.src = i), a && (s || l) && $(e, {
                        src: i
                    })), e._lazyRace && delete e._lazyRace, z(e, u.lazyClass), A(function() {
                        (!c || e.complete && 1 < e.naturalWidth) && (c ? le(d) : se--, ue(d))
                    }, !0)
                }), ve = function e() {
                    if (!F) {
                        if (i.now() - D < 999) return void g(e, 999);
                        var t = M(function() {
                            u.loadMode = 3, fe()
                        });
                        F = !0, u.loadMode = 3, fe(), o("scroll", function() {
                            3 == u.loadMode && (u.loadMode = 2), t()
                        }, !0)
                    }
                }, {
                    _: function() {
                        D = i.now(), f.elements = c.getElementsByClassName(u.lazyClass), P = c.getElementsByClassName(u.lazyClass + " " + u.preloadClass), K = u.hFac, o("scroll", fe, !0), o("resize", fe, !0), n.MutationObserver ? new MutationObserver(fe).observe(m, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (m[s]("DOMNodeInserted", fe, !0), m[s]("DOMAttrModified", fe, !0), setInterval(fe, 999)), o("hashchange", fe, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(e) {
                            c[s](e, fe, !0)
                        }), /d$|^c/.test(c.readyState) ? ve() : (o("load", ve), c[s]("DOMContentLoaded", fe), g(ve, 2e4)), f.elements.length ? (ce(), A._lsFlush()) : fe()
                    },
                    checkElems: fe,
                    unveil: he = function(e) {
                        var t, o = oe.test(e.nodeName),
                            n = o && (e[p](u.sizesAttr) || e[p]("sizes")),
                            a = "auto" == n;
                        (!a && F || !o || !e[p]("src") && !e.srcset || e.complete || w(e, u.errorClass) || !w(e, u.lazyClass)) && (t = T(e, "lazyunveilread").detail, a && N.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, se++, ye(e, t, a, n, o))
                    }
                }),
                N = (B = e(function(e, t, o, n) {
                    var a, i, s;
                    if (e._lazysizesWidth = n, n += "px", e.setAttribute("sizes", n), y.test(t.nodeName || ""))
                        for (a = t.getElementsByTagName("source"), i = 0, s = a.length; i < s; i++) a[i].setAttribute("sizes", n);
                    o.detail.dataAttr || $(e, o.detail)
                }), W = function(e, t, o) {
                    var n, a = e.parentNode;
                    a && (o = E(e, a, o), n = T(e, "lazybeforesizes", {
                        width: o,
                        dataAttr: !!t
                    }), n.defaultPrevented || (o = n.detail.width) && o !== e._lazysizesWidth && B(e, a, n, o))
                }, {
                    _: function() {
                        S = c.getElementsByClassName(u.autosizesClass), o("resize", _)
                    },
                    checkElems: _ = M(function() {
                        var e, t = S.length;
                        if (t)
                            for (e = 0; e < t; e++) W(S[e])
                    }),
                    updateElem: W
                }),
                x = function e() {
                    e.i || (e.i = !0, N._(), t._())
                };
            return f = {
                cfg: u,
                autoSizer: N,
                loader: t,
                init: x,
                uP: $,
                aC: b,
                rC: z,
                hC: w,
                fire: T,
                gW: E,
                rAF: A
            }
        }
        var S, B, W, _;
        var P, F, L, O, D, I, R, j, H, Q, q, G, J, K, U, V, X, Y, Z, ee, te, oe, ne, ae, ie, se, re, le, de, ce, fe, ue, me, pe, ge, ye, he, ve;
        var we, be, ze, Ce, Te, $e, ke
    }(e, e.document);
    e.lazySizes = o, "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports && (module.exports = o)
}(window);
"use strict";
$(function() {
    $.validator.setDefaults({
        ignore: [],
        highlight: function(e) {
            $(e).closest(".form-group").addClass("has-danger"), $(e).addClass("form-control-danger")
        },
        unhighlight: function(e) {
            $(e).closest(".form-group").removeClass("has-danger"), $(e).removeClass("form-control-danger")
        },
        errorElement: "p",
        errorClass: "form-control-feedback text-white help-block mt-3",
        errorPlacement: function(e, r) {
            r.parent(".input-group").length || r.parent("label").length ? e.insertAfter(r.parent()) : e.insertAfter(r)
        }
    }), $("#subscribeform").submit(function(e) {
        e.preventDefault()
    }).validate({
        rules: {
            email: {
                required: !0,
                email: !0
            }
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            }
        },
        submitHandler: function(e) {
            var r = $("#js-subscribe-btn"),
                t = $("#js-subscribe-result");
            r.attr("disabled", !0);
            var s = $("#subscribeform").data("redirect"),
                a = !1;
            "none" != s && "" != s && null != s || (a = !0), t.fadeIn("slow").html('<p class="mt-3 help-block text-white">Please wait...</p>');
            var l = t.data("success-msg"),
                o = (t.data("error-msg"), $(e).serialize());
            return $.ajax({
                type: "POST",
                data: o,
                url: "https://api.mtpelerin.com/mails/signup-mtpelerin",
                cache: !1,
                success: function(e) {
                    $(".form-group").removeClass("has-success"), a ? t.fadeIn("slow").html('<p class="mt-3 help-block text-white">' + l + "</p>").delay(3e3).fadeOut("slow") : window.location.href = s, r.attr("disabled", !1)
                },
                error: function(e) {
                    t.fadeIn("slow").html('<p class="mt-3 help-block text-white"> Sorry. Cannot access the server</p>').delay(3e3).fadeOut("slow"), r.attr("disabled", !1), window.console && console.log("Ajax Error: " + e.statusText)
                }
            }), !1
        }
    })
});
"use strict";
$(document).ready(function() {
    var r = document.getElementById("ramp-widget-id");
    if (r && r.src) {
        var a = window.location.search;
        if (a) {
            var c = "",
                e = "";
            r.src.includes("?") ? (c = r.src.split("?")[0], e = r.src.split("?")[1]) : c = r.src;
            var n = new URLSearchParams(e);
            new URLSearchParams(a).forEach(function(r, a) {
                n.append(a, r)
            });
            var s = n.toString();
            c += s ? "?" + s : "", r.src = c
        }
    }
});