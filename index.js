const _sodium = require('libsodium-wrappers');
const fs = require('fs');

(async()=>{
    await _sodium.ready;
    const sodium = _sodium;
    // Generate signing key pair
    const signing_key = sodium.crypto_sign_keypair();
    const signing_key_public_base64 = sodium.to_base64(signing_key.publicKey, _sodium.base64_variants.ORIGINAL);
    const signing_key_private_base64 = sodium.to_base64(signing_key.privateKey, _sodium.base64_variants.ORIGINAL);


    // Generate encryption key pair
    const encr_key = sodium.crypto_box_keypair();
    const encr_key_public_base64 = sodium.to_base64(encr_key.publicKey, _sodium.base64_variants.ORIGINAL);
    const encr_key_private_base64 = sodium.to_base64(encr_key.privateKey, _sodium.base64_variants.ORIGINAL);

    // Current date time
    const date = new Date();
    const date_string = date.toISOString();

    // Create a file
    let content = "ALL KEYS WILL BE BASE64 ENCODED";
    content = "\n------- Key pair for signing -------\n";
    content += "Public key: " + signing_key_public_base64 + "\n";
    content += "Private key: " + signing_key_private_base64 + "\n";
    content += "\n------- Key pair for encryption -------\n";
    content += "Public key: " + encr_key_public_base64 + "\n";
    content += "Private key: " + encr_key_private_base64 + "\n";
    content += "\n------- Date and time -------\n";
    content += "Generated at : " + date_string + "\n";
    fs.writeFileSync('keypair.txt', content);
    console.log("File created. Check keypair.txt file for details");

})()
