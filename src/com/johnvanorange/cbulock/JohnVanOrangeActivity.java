package com.johnvanorange.cbulock;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class JohnVanOrangeActivity extends DroidGap {
	private MyToaster toast;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        toast = new MyToaster(this, appView);
        appView.addJavascriptInterface(toast, "MyToast"); 
        super.loadUrl("file:///android_asset/www/index.html");
    }
}