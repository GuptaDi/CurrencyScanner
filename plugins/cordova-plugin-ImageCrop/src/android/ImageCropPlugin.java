package com.piyush.crop;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;

import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.widget.Toast;

import java.io.File;

public class ImageCropPlugin extends CordovaPlugin {
    private CallbackContext callbackContext;
    private Uri inputUri;
    private Uri outputUri;
    public static final int RESULT_OK  = -1;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
      if (action.equals("cropImage")) {
          String imagePath = args.getString(0);

          this.inputUri = Uri.parse(imagePath);
          
          PluginResult pr = new PluginResult(PluginResult.Status.NO_RESULT);
          pr.setKeepCallback(true);
          callbackContext.sendPluginResult(pr);
          this.callbackContext = callbackContext;

          cordova.setActivityResultCallback(this);

           
        CropImage.activity(inputUri)
                .setGuidelines(CropImageView.Guidelines.ON)
                .setMultiTouchEnabled(true)
                .start(cordova.getActivity());
       
          return true;
      }
      return false;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        // handle result of CropImageActivity
        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {
               // ((ImageView) findViewById(R.id.quick_start_cropped_image)).setImageURI(result.getUri());
              JSONObject uriObj = new JSONObject();
                try {
                    uriObj.put("URI", result.getUri().toString());
                    this.callbackContext.success(uriObj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
              

             //   Toast.makeText(this, "Cropping successful, Sample: " + result.getSampleSize(), Toast.LENGTH_LONG).show();
            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
             //   Toast.makeText(this, "Cropping failed: " + result.getError(), Toast.LENGTH_LONG).show();
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
