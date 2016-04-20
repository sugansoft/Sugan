Enter keystore password: 123456

First and last name: abhilash

Organization: mobbanner

Name: mobbanner

City: mysore

State: Karnataka

Country: in 

[no] : yes

<mobapp3ReleaseKey> password: 987654

>>>>>>>>>> mobapp3.keystore


// To generate a Keystore file

•	keytool -genkey -v -keystore MobApp.keystore -alias MobApp -keyalg RSA -keysize 2048 -validity 10000



// ant.properties  file


key.store=E:\\mobapp3\\platforms\\android\\ MobApp.keystore key.alias= MobApp


// To generate a file

•	cordova build --release android
