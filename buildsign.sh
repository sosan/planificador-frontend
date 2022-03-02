#!
ionic capacitor build android --prod --no-open
cd android 
./gradlew build --no-daemon
# jarsigner -keystore ../src/keystorefile.jks -storepass kleptor123 -keypass kleptor123 ./app/build/outputs/apk/release/app-release-unsigned.apk key0
mv ./app/build/outputs/apk/release/app-release.apk ../dietario-release.apk
