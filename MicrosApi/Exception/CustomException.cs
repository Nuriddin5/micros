namespace MicrosApi.Exception;

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