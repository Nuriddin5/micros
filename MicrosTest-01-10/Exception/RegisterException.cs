namespace MicrosTest_01_10.Exception;

[Serializable]
public class RegisterException : System.Exception
{
    public RegisterException()
    {
    }

    public RegisterException(string message)
        : base(message)
    {
    }
}