var TopPage = (function () {
    function TopPage(app) {
        this.app = app;
    }
    TopPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TopPage;
}());
/// <reference path="./kii.d.ts"/>
var APP_ID = 'orueuntaxbsi';
var APP_KEY = 'c681148710d045fe9ad1bc94f4a209b0';
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        Kii.initializeWithSite(APP_ID, APP_KEY, KiiSite.JP);
    };
    Application.prototype.showPage = function (page) {
        this.router.navigate(page, { trigger: true });
    };
    return Application;
}());
/// <reference path="./kii.d.ts"/>
/// <reference path="./Application.ts"/>
var LoginPage = (function () {
    function LoginPage(app) {
        this.app = app;
    }
    LoginPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#LoginTemplate',
            showNext: function () {
                var email = _this.ractive.get("email");
                var password = _this.ractive.get("password");
                KiiUser.authenticate(email, password).then(function (theUser) {
                    alert("ログインしました");
                    _this.app.showPage("newuser");
                })["catch"](function (error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("ログイン失敗");
                });
            }
        });
    };
    return LoginPage;
}());
/// <reference path="./kii.d.ts"/>
var NewUserPage = (function () {
    function NewUserPage(app) {
        this.app = app;
    }
    NewUserPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#NewUserTemplate',
            showNext: function () {
                var email = _this.ractive.get("email");
                var password = _this.ractive.get("password");
                var user = KiiUser.userWithEmailAddress(email, password);
                user.register().then(function (theUser) {
                    alert("成功");
                })["catch"](function (error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("登録できません");
                });
            }
        });
    };
    return NewUserPage;
}());
var TimeLinePage = (function () {
    function TimeLinePage(app) {
        this.app = app;
    }
    TimeLinePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#TimeLineTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TimeLinePage;
}());
var NewsPage = (function () {
    function NewsPage(app) {
        this.app = app;
    }
    NewsPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#NewsTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return NewsPage;
}());
var TroublePage = (function () {
    function TroublePage(app) {
        this.app = app;
    }
    TroublePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#TroubleTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TroublePage;
}());
var PostPage = (function () {
    function PostPage(app) {
        this.app = app;
    }
    PostPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#PostTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return PostPage;
}());
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./NewUserPage.ts"/>
/// <reference path="./TimeLinePage.ts"/>
/// <reference path="./NewsPage.ts"/>
/// <reference path="./TroublePage.ts"/>
/// <reference path="./PostPage.ts"/>
/// <reference path="./Application.ts"/>
function createRouter(app) {
    var showPage = function (p) {
        app.page = p;
        p.onCreate();
    };
    return Backbone.Router.extend({
        routes: {
            "": "top",
            "login": "login",
            "newuser": "newuser",
            "timeline": "timeline",
            "news": "news",
            "trouble": "trouble",
            "post": "post"
        },
        top: function () {
            showPage(new TopPage(app));
        },
        login: function () {
            showPage(new LoginPage(app));
        },
        newuser: function () {
            showPage(new NewUserPage(app));
        },
        timeline: function () {
            showPage(new TimeLinePage(app));
        },
        news: function () {
            showPage(new NewsPage(app));
        },
        trouble: function () {
            showPage(new TroublePage(app));
        },
        post: function () {
            showPage(new PostPage(app));
        }
    });
}
$(function () {
    var app = new Application();
    app.start();
    var AppRouter = createRouter(app);
    app.router = new AppRouter();
    Backbone.history.start();
});
