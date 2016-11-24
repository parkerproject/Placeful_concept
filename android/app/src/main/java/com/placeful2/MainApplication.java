package com.Placeful;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import io.intercom.android.sdk.Intercom;
import com.robinpowered.react.Intercom.IntercomPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final String API_KEY = "android_sdk-f2bd0e9d87931501d6e565f701f6c2a7414f606f";
  private final String APP_ID = "qe156k2a";


  @Override
  public void onCreate() {
     super.onCreate();
     Intercom.initialize(this, API_KEY, APP_ID);
   }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
           new MainReactPackage(),
            new ReactNativePermissionsPackage(),
            new RealmReactPackage(),
           new IntercomPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
