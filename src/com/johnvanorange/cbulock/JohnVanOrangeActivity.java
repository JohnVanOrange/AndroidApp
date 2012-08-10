package com.johnvanorange.cbulock;

/*import android.app.Activity;*/
import android.os.Bundle;
import org.apache.cordova.*;
import android.webkit.WebSettings;


public class JohnVanOrangeActivity extends DroidGap {
	private MyToaster toast;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        toast = new MyToaster(this, appView);
        appView.addJavascriptInterface(toast, "MyToast");
    	super.setIntegerProperty("loadUrlTimeoutValue", 60000);
    	super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html",1500);
        WebSettings ws = super.appView.getSettings();
        ws.setUserAgentString("Mozilla/5.0 AppleWebKit " + getString(R.string.app_name) + " Mobile App " + getString(R.string.version_name));
        ws.setSupportZoom(true);
        ws.setBuiltInZoomControls(true);
    }
}