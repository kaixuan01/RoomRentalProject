using Konscious.Security.Cryptography;
using System.Security.Cryptography;
using System.Text;

namespace Utils.Tools
{
    public static class PasswordHelper
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 4;
        private const int MemorySize = 65536; // 64 MB
        private const int Parallelism = 1;

        // Hashes the password using Argon2
        public static string HashPassword(string password)
        {
            var salt = new byte[SaltSize];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.Salt = salt;
                hasher.DegreeOfParallelism = Parallelism;
                hasher.MemorySize = MemorySize;
                hasher.Iterations = Iterations;

                var hash = hasher.GetBytes(HashSize);
                var hashBytes = new byte[SaltSize + HashSize];
                Array.Copy(salt, 0, hashBytes, 0, SaltSize);
                Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

                return Convert.ToBase64String(hashBytes);
            }
        }

        // Verifies if the provided password matches the stored hash
        public static bool VerifyPassword(string password, string storedHash)
        {
            var hashBytes = Convert.FromBase64String(storedHash);
            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);
            var storedHashOnly = new byte[HashSize];
            Array.Copy(hashBytes, SaltSize, storedHashOnly, 0, HashSize);

            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.Salt = salt;
                hasher.DegreeOfParallelism = Parallelism;
                hasher.MemorySize = MemorySize;
                hasher.Iterations = Iterations;

                var hash = hasher.GetBytes(HashSize);
                for (int i = 0; i < HashSize; i++)
                {
                    if (storedHashOnly[i] != hash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
