function showToast(text){
    Java.perform(function () { 
        Java.scheduleOnMainThread(function() {
                var toast = Java.use("android.widget.Toast");
                toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(text), 1).show();
        });
    });
}


var Activity = Java.use("android.app.Activity");
Activity.onCreate.overload('android.os.Bundle').implementation = function(savedInstanceState) {
    showToast("OnCreate was called.")
    
    this.onCreate(savedInstanceState);
};