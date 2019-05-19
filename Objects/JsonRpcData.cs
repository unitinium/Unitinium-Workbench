namespace Unitinium_Workbench
{
    public class JsonRpcRequestData
    {
        public string method { get; set; }
        public object[] @params  { get; set; }
        public object id { get; set; }
    }

    public class JsonRpcResponseData<T>
    {
        public T result { get; set; }
        public object error { get; set; }
        public object id { get; set; }
    }
}