class TopPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#topTemplate',
            showSignup : () => {
                this.app.showPage("newuser");
            },
            newArticle : () => {
                this.app.showPage("article");
            },
            showTrouble : () => {
                this.app.showPage("trouble");
            },
        });
    }
}