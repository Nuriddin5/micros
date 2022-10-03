namespace MicrosTest_01_10.Exception;

[Serializable]
public class AuthException : System.Exception
{
    public AuthException()
    {
    }

    public AuthException(string message)
        : base(message)
    {
    }
}