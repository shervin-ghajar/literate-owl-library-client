rm ./android/app/src/main/assets/index.android.bundle
cd android
./gradlew clean
cd .. 
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res --sourcemap-output ./sourcemap.android.js
rm -r ./android/app/src/main/res/drawable-hdpi
rm -r ./android/app/src/main/res/drawable-mdpi
rm -r ./android/app/src/main/res/drawable-xhdpi
rm -r ./android/app/src/main/res/drawable-xxhdpi
rm -r ./android/app/src/main/res/drawable-xxxhdpi
cd android
./gradlew assembleRelease