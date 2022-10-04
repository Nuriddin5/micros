namespace MicrosTest_01_10.Exception;

[Serializable]
public class CustomException : System.Exception
{
    public CustomException()
    {
    }

    public CustomException(string message)
        : base(message)
    {
    }
}