using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;

namespace Utils.Tools
{
    public static class EncryptionHelper
    {
        private static string _key;

        // Static method to initialize the secret key from configuration
        public static void Initialize(IConfiguration configuration)
        {
            // Get the secret key from appsettings.json
            _key = configuration["EncryptionSettings:SecretKey"];
        }

        // Encrypt method that accepts a generic type and converts it to a string for encryption
        public static string Encrypt<T>(T plainText)
        {
            string plainTextStr = plainText.ToString(); // Convert the generic type to string
            byte[] key = Convert.FromBase64String(_key);
            using (Aes aes = Aes.Create())
            {
                aes.Key = key;
                aes.GenerateIV();
                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    using (var ms = new MemoryStream())
                    {
                        ms.Write(aes.IV, 0, aes.IV.Length);
                        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                        {
                            using (var sw = new StreamWriter(cs))
                            {
                                sw.Write(plainTextStr);
                            }
                        }
                        return Convert.ToBase64String(ms.ToArray());
                    }
                }
            }
        }

        // Decrypt method that handles generic types and returns the decrypted value in the appropriate type
        public static T Decrypt<T>(string cipherText)
        {
            byte[] fullCipher = Convert.FromBase64String(cipherText);
            byte[] key = Convert.FromBase64String(_key);

            using (Aes aes = Aes.Create())
            {
                byte[] iv = new byte[aes.BlockSize / 8];
                byte[] cipher = new byte[fullCipher.Length - iv.Length];

                Array.Copy(fullCipher, iv, iv.Length);
                Array.Copy(fullCipher, iv.Length, cipher, 0, cipher.Length);

                aes.Key = key;
                aes.IV = iv;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    using (var ms = new MemoryStream(cipher))
                    {
                        using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                        {
                            using (var sr = new StreamReader(cs))
                            {
                                string decryptedStr = sr.ReadToEnd();
                                return (T)Convert.ChangeType(decryptedStr, typeof(T)); // Convert the decrypted string back to the generic type
                            }
                        }
                    }
                }
            }
        }
    }
}
