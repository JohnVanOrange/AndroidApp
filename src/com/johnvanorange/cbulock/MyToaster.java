package com.johnvanorange.cbulock;

import org.apache.cordova.*; 
import android.content.Context; 
import android.view.inputmethod.InputMethodManager; 
import android.webkit.WebView; 
import android.widget.Toast; 

public class MyToaster 
{ 
        private WebView mAppView; 
        private DroidGap mGap; 

        public MyToaster(DroidGap gap, WebView view) 
        { 
                mAppView = view; 
                mGap = gap; 
        } 

        //Show toast for a long time
        public void lng(String message) {
                Toast.makeText(mGap, message, Toast.LENGTH_LONG).show();
        }
        
        //Show toast for a short time
        public void srt(String message) {  
                Toast.makeText(mGap, message, Toast.LENGTH_SHORT).show();
        }
} 